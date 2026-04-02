<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';

import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import {
  getFaultDesc,
  getFaultSolution,
  getFaultTitle,
} from '@borochi/device-fault-codes';
import {
  Button,
  Card,
  Form,
  FormItem,
  InputNumber,
  message,
  Modal,
  Segmented,
  Select,
  Spin,
  Switch,
  Tabs,
} from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  getDeviceFaultByPage,
  getDeviceInfo,
  getDeviceInfoBySn,
  pollingControlSettings,
  pollingWriteControlSettings,
  readControlSettings,
  saveBatterySettings,
  saveMeterSettings,
  saveSystemSettings,
} from '#/api/pv-storage/pv-storage';

import {
  useFaultFormSchema,
  useHistoryFaultColumns,
  useRealtimeFaultColumns,
} from './data';

type FaultFilterValues = {
  type?: 'all' | 'error' | 'warning';
};

type ControlTab = 'battery' | 'meter' | 'system';

type FaultRow = {
  descEn: string;
  endTime: string;
  errorCode: string;
  faultName: string;
  faultTime: string;
  faultType: 'Alarm' | 'Fault';
  id: number;
  solutionEn: string;
  startTime: string;
  status: 'RESOLVED' | 'UNRESOLVED';
  type?: string;
};

const { TabPane } = Tabs;

const route = useRoute();
const router = useRouter();
const debugWindow = window as Window & { cells?: any[] };

const sn = computed(() => String(route.query.sn ?? ''));
const deviceType = computed(() => String(route.query.type ?? 'inverter'));

const deviceInfo = ref<any>(null);
const leftSideInfo = ref<any>(null);
const loading = ref(false);

function unwrapResponseData(response: any) {
  if (response === null || response === undefined) {
    return null;
  }

  if (typeof response === 'object' && 'data' in response) {
    return response.data ?? null;
  }

  return response;
}

function goBack() {
  if (controlLoading.value) {
    message.warning('设备控制数据读取中，请稍后');
    return;
  }

  router.push({ path: '/pv-storage' });
}

async function fetchDeviceInfo() {
  if (!sn.value) {
    message.warning('设备SN不存在');
    return;
  }

  loading.value = true;
  try {
    const response = await getDeviceInfoBySn(sn.value);
    deviceInfo.value = unwrapResponseData(response);
  } catch (error) {
    deviceInfo.value = null;
    message.error('获取设备信息失败');
    console.error('Failed to fetch device info:', error);
  } finally {
    loading.value = false;
  }
}

async function fetchLeftSideInfo() {
  if (!sn.value) {
    leftSideInfo.value = null;
    return;
  }

  loading.value = true;
  try {
    const response = await getDeviceInfo(sn.value, deviceType.value);
    leftSideInfo.value = unwrapResponseData(response);
  } catch (error) {
    leftSideInfo.value = null;
    message.error('获取左侧信息失败');
    console.error('Failed to fetch left side info:', error);
  } finally {
    loading.value = false;
  }
}

// 假设 cells 数据已通过接口获取到
// 你可以替换为实际接口数据
const cells = ref([] as any[]); // 例如 ref(props.data.cells) 或接口返回的 cells

// mock: window.cells = [...]; // 调试用
if (debugWindow.cells) cells.value = debugWindow.cells;

const batteryGroups = computed(() => {
  const batterySize = 32; // 每个电池32个数据
  const tableSize = 16; // 每个表格16个数据
  const arr = deviceInfo.value?.cells || cells.value || [];
  const result = [];

  // 最多处理4个电池
  for (let batteryIndex = 0; batteryIndex < 4; batteryIndex++) {
    const batteryStart = batteryIndex * batterySize;
    if (batteryStart >= arr.length) break;

    // 每个电池分成两个表格
    const table1 = arr.slice(batteryStart, batteryStart + tableSize);
    const table2 = arr.slice(
      batteryStart + tableSize,
      batteryStart + batterySize,
    );

    result.push([table1, table2]);
  }

  return result;
});

const activeTab = ref('base');
const faultTabs = reactive([
  { label: '实时故障', value: 'realtime' },
  { label: '历史故障', value: 'history' },
]);
const currentFaultTab = ref<'history' | 'realtime'>('realtime');
function onTabChange(key: number | string) {
  activeTab.value = String(key);
}

// 设备控制
const controlTab = ref<ControlTab>('system');
const controlTabs = [
  { label: 'System', value: 'system' },
  { label: 'Meter', value: 'meter' },
  { label: 'Battery', value: 'battery' },
];

function withCurrentOption<T extends number | string>(
  options: Array<{ label: string; value: T }>,
  currentValue: null | T | undefined,
  labelFormatter?: (value: T) => string,
) {
  if (
    currentValue === undefined ||
    currentValue === null ||
    currentValue === ''
  ) {
    return options;
  }

  if (options.some((option) => option.value === currentValue)) {
    return options;
  }

  return [
    {
      label: labelFormatter
        ? labelFormatter(currentValue)
        : String(currentValue),
      value: currentValue,
    },
    ...options,
  ];
}

const systemPvConnectionModeOptions = [
  { label: 'Independent', value: 0 },
  { label: 'Parallel', value: 1 },
];

const systemWorkModeOptions = [
  { label: 'Self-consumption', value: 0 },
  { label: 'Feed-in priority', value: 1 },
  { label: 'Backup', value: 2 },
  { label: 'Off-grid', value: 3 },
  { label: 'User-defined', value: 4 },
];

const systemGridIntegrationStandardsOptions = computed(() => {
  return withCurrentOption(
    [
      { label: 'Default', value: 35 },
      { label: 'NB/T 32004-2018', value: 0 },
      { label: 'VDE 4105', value: 1 },
      { label: 'CEI 0-21', value: 2 },
      { label: 'BR 140', value: 3 },
      { label: 'EN 50549-1', value: 4 },
      { label: 'EN 50549-2', value: 5 },
      { label: 'EN 50549-10', value: 6 },
      { label: 'IEC 61727', value: 7 },
      { label: 'Thailand-PEA', value: 8 },
      { label: 'Thailand-MEA(230V)', value: 9 },
      { label: 'IEC 61727(220V 60Hz)', value: 10 },
    ],
    systemForm.gridIntegrationStandards,
  );
});

const meterModelOptions = [
  { label: 'Invalid', value: 0 },
  { label: 'EASTRON-SDM230', value: 257 },
  { label: 'EASTRON-SDM120CT', value: 258 },
  { label: 'CHINT-DTSU666', value: 513 },
  { label: 'CHINT-DTSU666CT', value: 514 },
  { label: 'SKYWORTH-CT', value: 769 },
];

const feederPowerLimitOptions = computed(() => {
  return withCurrentOption(
    [
      { label: '100W', value: 0 },
      { label: '500W', value: 1 },
      { label: '1000W', value: 2 },
    ],
    meterForm.feederPowerLimit,
    String,
  );
});

const batteryModelOptions = computed(() => {
  return withCurrentOption(
    [
      { label: 'CNEnergy-EHVS500', value: 257 },
      { label: 'Dyness-CNERGY_EHVS500', value: 513 },
      { label: 'BOR-5120-Hx', value: 769 },
      { label: 'PYLONTECH-FH9637M', value: 1025 },
      { label: 'Voltsmile_Hseries', value: 1281 },
    ],
    batteryForm.batteryModel,
  );
});

const systemForm = reactive({
  powerOn: true,
  pvConnectionMode: 0 as number | undefined,
  workMode: undefined as number | undefined,
  gridIntegrationStandards: undefined as number | undefined,
});

const meterForm = reactive({
  meterModel: undefined as number | undefined,
  feederSwitch: true,
  feederPowerLimit: undefined as number | undefined,
  ctRatio: undefined as number | undefined,
});

const batteryForm = reactive({
  batteryModel: undefined as number | undefined,
  maxSocLimit: undefined as number | undefined,
  minSocToGrid: undefined as number | undefined,
  minSocOffGrid: undefined as number | undefined,
});

function onControlCancel() {
  // reset or navigate back
}

const controlBusinessId = ref('');
const controlLoading = ref(false);
const controlPollingErrorShown = ref(false);
const controlPollingRawData = ref<any>(null);
const controlSaving = ref(false);
const controlWritePollingErrorShown = ref(false);
const CONTROL_POLLING_INTERVAL = 1500;
const CONTROL_POLLING_MAX_RETRIES = 20;

let controlPollingTimer: null | ReturnType<typeof setTimeout> = null;
let controlPollingTaskId = 0;

// 故障详情弹窗
const faultDetailVisible = ref(false);
const faultDetailRow = ref<any>(null);
const realtimeFaultFilters = ref<FaultFilterValues>({ type: 'all' });
const historyFaultFilters = ref<FaultFilterValues>({ type: 'all' });
const realtimeFaultData = ref<FaultRow[]>([]);
const historyFaultData = ref<FaultRow[]>([]);

function stopControlPolling() {
  controlPollingTaskId += 1;
  controlBusinessId.value = '';
  controlLoading.value = false;
  controlSaving.value = false;
  if (controlPollingTimer) {
    clearTimeout(controlPollingTimer);
    controlPollingTimer = null;
  }
}

function isWritePollingFinished(payload: any) {
  if (payload === true || payload === 1) {
    return true;
  }

  if (typeof payload === 'string') {
    return payload.trim().length > 0;
  }

  if (payload && typeof payload === 'object') {
    if ('success' in payload) {
      return Boolean(payload.success);
    }
    if ('status' in payload) {
      return String(payload.status).toUpperCase() === 'SUCCESS';
    }

    return Object.keys(payload).length > 0;
  }

  return false;
}

async function pollWriteControlSettingsTask(
  businessId: string,
  type: ControlTab,
  taskId: number,
  attempt = 1,
) {
  if (taskId !== controlPollingTaskId) {
    return;
  }

  try {
    const response = await pollingWriteControlSettings(businessId, type);
    if (taskId !== controlPollingTaskId) {
      return;
    }

    const payload = response?.data ?? response;
    if (isWritePollingFinished(payload)) {
      controlLoading.value = false;
      controlSaving.value = false;
      controlWritePollingErrorShown.value = false;
      controlPollingTimer = null;
      message.success('Saved successfully');
      return;
    }

    if (attempt >= CONTROL_POLLING_MAX_RETRIES) {
      controlLoading.value = false;
      controlSaving.value = false;
      message.error('保存超时，请稍后重试');
      return;
    }

    controlPollingTimer = setTimeout(() => {
      pollWriteControlSettingsTask(businessId, type, taskId, attempt + 1);
    }, CONTROL_POLLING_INTERVAL);
  } catch (error) {
    if (taskId !== controlPollingTaskId) {
      return;
    }

    controlLoading.value = false;
    controlSaving.value = false;
    if (!controlWritePollingErrorShown.value) {
      controlWritePollingErrorShown.value = true;
      message.error('保存状态获取失败');
    }
    console.error('Failed to poll write control settings:', error);
  }
}

async function onControlConfirm() {
  if (!sn.value) {
    message.warning('设备SN不存在');
    return;
  }

  stopControlPolling();
  controlLoading.value = true;
  controlSaving.value = true;
  controlWritePollingErrorShown.value = false;

  const taskId = controlPollingTaskId + 1;
  controlPollingTaskId = taskId;

  try {
    let response: any;

    if (controlTab.value === 'system') {
      response = await saveSystemSettings({
        sn: sn.value,
        powerOn: systemForm.powerOn ? 1 : 0,
        pvConnectionMode: Number(systemForm.pvConnectionMode ?? 0),
        workMode: Number(systemForm.workMode ?? 0),
        gridIntegrationStandards: Number(
          systemForm.gridIntegrationStandards ?? 0,
        ),
      });
    } else if (controlTab.value === 'meter') {
      response = await saveMeterSettings({
        sn: sn.value,
        meterModel: Number(meterForm.meterModel ?? 0),
        feederSwitch: meterForm.feederSwitch ? 1 : 0,
        feederPowerLimit: Number(meterForm.feederPowerLimit ?? 0),
        meterRatio: Number(meterForm.ctRatio ?? 1),
      });
    } else {
      response = await saveBatterySettings({
        sn: sn.value,
        batteryModel: Number(batteryForm.batteryModel ?? 0),
        maxSocLimit: Number(batteryForm.maxSocLimit ?? 0),
        minSocToGrid: Number(batteryForm.minSocToGrid ?? 0),
        minSocOffGrid: Number(batteryForm.minSocOffGrid ?? 0),
      });
    }

    if (taskId !== controlPollingTaskId) {
      return;
    }

    const businessId = String((response as any)?.data ?? response ?? '');
    if (!businessId) {
      controlLoading.value = false;
      controlSaving.value = false;
      message.error('保存业务号获取失败');
      return;
    }

    controlBusinessId.value = businessId;
    await pollWriteControlSettingsTask(businessId, controlTab.value, taskId);
  } catch (error) {
    if (taskId !== controlPollingTaskId) {
      return;
    }

    controlLoading.value = false;
    controlSaving.value = false;
    message.error('保存失败');
    console.error('Failed to save control settings:', error);
  }
}

function applyControlPollingData(type: ControlTab, payload: any) {
  controlPollingRawData.value = payload;

  if (!payload || typeof payload !== 'object') {
    return;
  }

  if (type === 'system') {
    systemForm.powerOn = payload.powerOn === 1;
    systemForm.pvConnectionMode = payload.pvConnectionMode;
    systemForm.workMode = payload.workMode;
    systemForm.gridIntegrationStandards = payload.gridIntegrationStandards;
    return;
  }

  if (type === 'meter') {
    meterForm.meterModel = payload.meterModel;
    meterForm.feederSwitch =
      payload.feederSwitch === 5 || payload.feederSwitch === 1;
    meterForm.feederPowerLimit = payload.feederPowerLimit;
    meterForm.ctRatio = Number(payload.meterRatio);
    return;
  }

  batteryForm.batteryModel = payload.batteryModel;
  batteryForm.maxSocLimit = Number(payload.maxSocLimit);
  batteryForm.minSocToGrid = Number(payload.minSocToGrid);
  batteryForm.minSocOffGrid = Number(payload.minSocOffGrid);
}

async function pollControlSettingsTask(
  businessId: string,
  type: ControlTab,
  taskId: number,
  attempt = 1,
) {
  if (taskId !== controlPollingTaskId) {
    return;
  }

  try {
    const response = await pollingControlSettings(businessId, type);
    if (taskId !== controlPollingTaskId) {
      return;
    }

    const payload = response?.data ?? response;
    if (
      payload &&
      typeof payload === 'object' &&
      Object.keys(payload).length > 0
    ) {
      applyControlPollingData(type, payload);
      controlLoading.value = false;
      controlPollingErrorShown.value = false;
      controlPollingTimer = null;
      return;
    }

    if (attempt >= CONTROL_POLLING_MAX_RETRIES) {
      controlLoading.value = false;
      message.error('设备控制数据读取超时');
      return;
    }

    controlPollingTimer = setTimeout(() => {
      pollControlSettingsTask(businessId, type, taskId, attempt + 1);
    }, CONTROL_POLLING_INTERVAL);
  } catch (error) {
    if (taskId !== controlPollingTaskId) {
      return;
    }

    controlLoading.value = false;
    if (!controlPollingErrorShown.value) {
      controlPollingErrorShown.value = true;
      message.error('获取设备控制数据失败');
    }
    console.error('Failed to poll control settings:', error);
  }
}

async function startControlPolling(type: ControlTab) {
  if (activeTab.value !== 'control' || !sn.value) {
    return;
  }

  stopControlPolling();
  controlLoading.value = true;
  controlPollingErrorShown.value = false;

  const taskId = controlPollingTaskId + 1;
  controlPollingTaskId = taskId;

  try {
    const response = await readControlSettings({ sn: sn.value, type });
    if (taskId !== controlPollingTaskId) {
      return;
    }

    const businessId = String((response as any)?.data ?? response ?? '');
    if (!businessId) {
      controlLoading.value = false;
      message.error('设备控制业务号获取失败');
      return;
    }

    controlBusinessId.value = businessId;
    await pollControlSettingsTask(businessId, type, taskId);
  } catch (error) {
    if (taskId !== controlPollingTaskId) {
      return;
    }

    controlLoading.value = false;
    message.error('初始化设备控制读取失败');
    console.error('Failed to read control settings:', error);
  }
}

function mapFaultType(type?: string): 'Alarm' | 'Fault' {
  return type === 'warning' ? 'Alarm' : 'Fault';
}

function mapFaultStatus(status?: string): 'RESOLVED' | 'UNRESOLVED' {
  return status === 'RESOLVED' ? 'RESOLVED' : 'UNRESOLVED';
}

async function fetchFaultList(tab: 'history' | 'realtime') {
  try {
    const filters =
      tab === 'realtime'
        ? realtimeFaultFilters.value
        : historyFaultFilters.value;
    const response = await getDeviceFaultByPage({
      keyword: '',
      pageNum: 1,
      pageSize: 10,
      status: tab === 'history' ? 'RESOLVED' : 'UN_RESOLVE',
      type: filters.type ?? 'all',
    });

    const records = (response as any)?.data?.records ?? response.records ?? [];
    const mappedRows: FaultRow[] = records.map((item: any, index: number) => ({
      descEn: '--',
      endTime: item.resolveTime || '--',
      errorCode: item.errorCode || '--',
      faultName: item.errorCode || '--',
      faultTime: item.reportTime || '--',
      faultType: mapFaultType(item.type),
      id: index + 1,
      solutionEn: '--',
      startTime: item.reportTime || '--',
      status: mapFaultStatus(item.faultStatus),
      type: item.type,
    }));

    if (tab === 'realtime') {
      realtimeFaultData.value = mappedRows;
      return;
    }

    historyFaultData.value = mappedRows;
  } catch (error) {
    message.error('获取故障列表失败');
    console.error('Failed to fetch fault list:', error);
  }
}

// 故障表格操作点击处理
function onFaultActionClick(e: OnActionClickParams<any>) {
  switch (e.code) {
    case 'view': {
      const item = e.row;
      const faultTitle =
        getFaultTitle(item.errorCode, item.type) || item.errorCode;
      const desc = getFaultDesc(item.errorCode);
      const solution = getFaultSolution(item.errorCode);

      faultDetailRow.value = {
        ...item,
        faultName: faultTitle,
        descEn: desc,
        solutionEn: solution,
      };
      faultDetailVisible.value = true;
      break;
    }
  }
}

// 实时故障表格
const [RealtimeFaultGrid] = useVbenVxeGrid({
  class: 'fault-grid-panel',
  separator: false,
  formOptions: {
    actionWrapperClass:
      'vben-grid-form-actions order-first inline-flex items-center gap-3',
    handleValuesChange(values) {
      realtimeFaultFilters.value = {
        type: values.type || 'all',
      };
      fetchFaultList('realtime');
    },
    resetButtonOptions: {
      show: false,
    },
    schema: useFaultFormSchema(),
    submitButtonOptions: {
      show: false,
    },
    submitOnChange: true,
  },
  gridOptions: {
    columns: useRealtimeFaultColumns(onFaultActionClick),
    minHeight: 260,
    keepSource: true,
    data: realtimeFaultData.value,
    cellConfig: {
      height: 60,
    },
    rowConfig: {
      keyField: 'id',
    },
    toolbarConfig: {
      custom: false,
      export: false,
      refresh: false,
      search: false,
      zoom: false,
    },
  } as VxeTableGridOptions<any>,
});

// 历史故障表格
const [HistoryFaultGrid] = useVbenVxeGrid({
  class: 'fault-grid-panel',
  separator: false,
  formOptions: {
    actionWrapperClass:
      'vben-grid-form-actions order-first inline-flex items-center gap-3',
    handleValuesChange(values) {
      historyFaultFilters.value = {
        type: values.type || 'all',
      };
      fetchFaultList('history');
    },
    resetButtonOptions: {
      show: false,
    },
    schema: useFaultFormSchema(),
    submitButtonOptions: {
      show: false,
    },
    submitOnChange: true,
  },
  gridOptions: {
    columns: useHistoryFaultColumns(onFaultActionClick),
    minHeight: 260,
    keepSource: true,
    data: historyFaultData.value,
    cellConfig: {
      height: 60,
    },
    rowConfig: {
      keyField: 'id',
    },
    toolbarConfig: {
      custom: false,
      export: false,
      refresh: false,
      search: false,
      zoom: false,
    },
  } as VxeTableGridOptions<any>,
});

onMounted(() => {
  fetchDeviceInfo();
  fetchLeftSideInfo();
  fetchFaultList('realtime');
});

watch(currentFaultTab, (tab) => {
  fetchFaultList(tab);
});

watch(activeTab, (tab) => {
  if (tab === 'control') {
    startControlPolling(controlTab.value);
    return;
  }

  stopControlPolling();
});

watch(controlTab, (tab) => {
  if (activeTab.value === 'control') {
    startControlPolling(tab);
  }
});

onBeforeUnmount(() => {
  stopControlPolling();
});

onBeforeRouteLeave(() => {
  if (controlLoading.value) {
    message.warning('设备控制数据读取中，请稍后');
    return false;
  }

  stopControlPolling();
  return true;
});
</script>

<template>
  <Page auto-content-height>
    <Spin :spinning="controlLoading" tip="Loading...">
      <div class="mb-4">
        <img
          src="/images/icon/detail-back@2x.png"
          alt="back"
          class="inline-block h-7 w-7 cursor-pointer object-contain"
          @click="goBack"
        />
      </div>
      <div class="flex gap-6">
        <!-- 左侧信息卡 -->
        <div class="w-[300px] min-w-[260px]">
          <Card>
            <div class="flex flex-col">
              <div class="text-xl font-bold mb-1">光储</div>
              <div class="w-full flex items-center gap-2">
                <span class="text-green-500 text-xs">
                  ●
                  {{ leftSideInfo?.status === 'online' ? 'Online' : 'Offline' }}
                </span>
                <span class="text-blue-500 text-xs">● 已绑定</span>
                <span class="text-orange-400 text-xs">● 警告</span>
              </div>
              <div class="flex flex-col gap-2 w-full mt-3">
                <div class="flex items-center gap-2 w-full">
                  <img
                    src="/images/icon/collector-en@2x.png"
                    alt="collector"
                    class="h-4 w-4 object-contain"
                  />
                  <span class="text-xs text-gray-500 flex-1">
                    采集器SN: {{ leftSideInfo?.collectorSn || '--' }}
                  </span>
                </div>
                <!-- <div class="flex items-center gap-2 w-full">
                <img
                  src="/images/icon/inverter-en@2x.png"
                  alt="inverter"
                  class="h-4 w-4 object-contain"
                />
                <span class="text-xs text-gray-500 flex-1"
                  >逆变器SN: {{ leftSideInfo?.inverterSn || 'A215451515' }}</span
                >
              </div> -->

                <div class="flex items-center gap-2 w-full">
                  <img
                    src="/images/icon/home-en@2x.png"
                    alt="home"
                    class="h-4 w-4 object-contain"
                  />
                  <span class="text-xs text-gray-500 flex-1">{{
                    leftSideInfo?.stationName || "Zhang's Home"
                  }}</span>
                </div>
                <div class="flex items-center gap-2 w-full">
                  <img
                    src="/images/icon/time-en@2x.png"
                    alt="time"
                    class="h-4 w-4 object-contain"
                  />
                  <span class="text-xs text-gray-500 flex-1">{{
                    leftSideInfo?.updatedAt || '2025/07/17 09:14:30 UTC+8'
                  }}</span>
                </div>
                <div class="flex items-center gap-2 w-full">
                  <img
                    src="/images/icon/installer-en@2x.png"
                    alt="installer"
                    class="h-4 w-4 object-contain"
                  />
                  <span class="text-xs text-gray-500 flex-1">{{
                    leftSideInfo?.installerInfoName || 'Borochi EU'
                  }}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <!-- 右侧Tab信息栏 -->
        <div class="flex-1 min-w-0">
          <Card :body-style="{ paddingTop: 0 }">
            <Tabs
              v-model:active-key="activeTab"
              class="mb-0"
              @change="onTabChange"
            >
              <TabPane key="base" tab="基本信息">
                <div class="mb-4">
                  <Card size="small" :body-style="{ padding: '12px' }">
                    <div class="font-bold mb-2">Data Logger</div>
                    <div class="flex flex-wrap">
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">SN：</span>
                        <span style="color: #6c7680">{{
                          deviceInfo?.collectionSn || '--'
                        }}</span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">Last reported time：</span>
                        <span style="color: #6c7680">{{
                          deviceInfo?.sendTime || '--'
                        }}</span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2"
                          >Current total power：</span
                        >
                        <span style="color: #6c7680">{{
                          deviceInfo?.p7 ?? '--'
                        }}</span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">Hardware version：</span>
                        <span style="color: #6c7680">{{
                          deviceInfo?.s4 || '--'
                        }}</span>
                      </Card.Grid>
                    </div>
                  </Card>
                </div>
                <div class="mb-4">
                  <Card size="small" :body-style="{ padding: '12px' }">
                    <div class="font-bold mb-2">Inverter</div>
                    <div class="flex flex-wrap">
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">SN：</span>
                        <span style="color: #6c7680">{{
                          deviceInfo?.inverterSn ?? '--'
                        }}</span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">Rated power：</span>
                        <span style="color: #6c7680">{{
                          deviceInfo?.p7 ?? '--'
                        }}</span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2"
                          >Main ARM software version：</span
                        >
                        <span style="color: #6c7680">{{
                          deviceInfo?.p12 ?? '--'
                        }}</span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2"
                          >ARM auxiliary software version：</span
                        >
                        <span style="color: #6c7680">{{
                          deviceInfo?.p20 ?? '--'
                        }}</span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2"
                          >Main DSP software version：</span
                        >
                        <span style="color: #6c7680">{{
                          deviceInfo?.p18 ?? '--'
                        }}</span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2"
                          >Auxiliary DSP software version：</span
                        >
                        <span style="color: #6c7680">{{
                          deviceInfo?.auxiliaryDspSoftwareVersion || '2.0'
                        }}</span>
                      </Card.Grid>
                    </div>
                  </Card>
                </div>
                <div class="mb-4">
                  <Card size="small" :body-style="{ padding: '12px' }">
                    <div class="font-bold mb-2">PV Module</div>
                    <div class="flex flex-wrap">
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">Installed capacity：</span>
                        <span style="color: #6c7680">{{
                          deviceInfo?.capacity ?? '--'
                        }}</span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">MPPT Channels：</span>
                        <span style="color: #6c7680">{{
                          deviceInfo?.p6 ?? '--'
                        }}</span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2"
                          >Current total power：</span
                        >
                        <span style="color: #6c7680">{{
                          deviceInfo?.p42 ?? '--'
                        }}</span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2"
                          >Total power generation：</span
                        >
                        <span style="color: #6c7680">{{
                          deviceInfo?.p196 ?? '--'
                        }}</span>
                      </Card.Grid>
                    </div>
                    <div style="width: 100%; margin-top: 1rem">
                      <table
                        class="w-full text-center text-xs"
                        style="
                          font-size: 0.875rem;
                          border-collapse: collapse;
                          border: none;
                        "
                      >
                        <thead
                          style="color: #839bb3; background-color: #f1f8ff"
                        >
                          <tr style="height: 2rem">
                            <th
                              style="
                                padding: 0.5rem;
                                border-top: none;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              名称
                            </th>
                            <th
                              style="
                                padding: 0.5rem;
                                border-top: none;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              Voltage (V)
                            </th>
                            <th
                              style="
                                padding: 0.5rem;
                                border-top: none;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              Current (A)
                            </th>
                            <th
                              style="
                                padding: 0.5rem;
                                border-top: none;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              Power(kW)
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          style="color: #6c7680; background-color: #fbfdff"
                        >
                          <tr style="height: 2rem">
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              PV1
                            </td>
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              {{ deviceInfo?.p43 ?? '--' }}
                            </td>
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              {{ deviceInfo?.p44 ?? '--' }}
                            </td>
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              {{ deviceInfo?.power1 ?? '--' }}
                            </td>
                          </tr>
                          <tr style="height: 2rem">
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: none;
                                border-left: none;
                              "
                            >
                              PV2
                            </td>
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: none;
                                border-left: none;
                              "
                            >
                              {{ deviceInfo?.p45 ?? '--' }}
                            </td>
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: none;
                                border-left: none;
                              "
                            >
                              {{ deviceInfo?.p46 ?? '--' }}
                            </td>
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: none;
                                border-left: none;
                              "
                            >
                              {{ deviceInfo?.power2 ?? '--' }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
                <div class="mb-4">
                  <Card size="small" :body-style="{ padding: '12px' }">
                    <div class="font-bold mb-2">Electricity meter</div>
                    <div class="flex flex-wrap">
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">Available status:</span>
                        <span
                          :style="{
                            color: deviceInfo?.e2 !== 0 ? '#4CAF50' : '#6C7680',
                          }"
                        >
                          {{
                            deviceInfo?.e2 !== 0 ? 'Available' : 'Unavailable'
                          }}
                        </span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2"
                          >Total electricity purchased:</span
                        >
                        <span style="color: #6c7680">{{
                          deviceInfo?.e43 ?? '--'
                        }}</span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2"
                          >Total electricity sales:</span
                        >
                        <span style="color: #6c7680">{{
                          deviceInfo?.e44 ?? '--'
                        }}</span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">Current power:</span>
                        <span style="color: #6c7680">{{
                          deviceInfo?.e19 ?? '--'
                        }}</span>
                      </Card.Grid>
                    </div>
                    <div style="width: 100%; margin-top: 1rem">
                      <table
                        class="w-full text-center text-xs"
                        style="
                          font-size: 0.875rem;
                          border-collapse: collapse;
                          border: none;
                        "
                      >
                        <thead
                          style="color: #839bb3; background-color: #f1f8ff"
                        >
                          <tr style="height: 2rem">
                            <th
                              style="
                                padding: 0.5rem;
                                border-top: none;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              名称
                            </th>
                            <th
                              style="
                                padding: 0.5rem;
                                border-top: none;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              Voltage (V)
                            </th>
                            <th
                              style="
                                padding: 0.5rem;
                                border-top: none;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              Current (A)
                            </th>
                            <th
                              style="
                                padding: 0.5rem;
                                border-top: none;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              Frequency(Hz)
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          style="color: #6c7680; background-color: #fbfdff"
                        >
                          <tr style="height: 2rem">
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              Phase A
                            </td>
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              {{ deviceInfo?.e4 ?? '--' }}
                            </td>
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              {{ deviceInfo?.e7 ?? '--' }}
                            </td>
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              {{ deviceInfo?.e16 ?? '--' }}
                            </td>
                          </tr>
                          <tr style="height: 2rem">
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              Phase B
                            </td>
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              {{ deviceInfo?.e5 ?? '--' }}
                            </td>
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              {{ deviceInfo?.e8 ?? '--' }}
                            </td>
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: 1px solid #e4e9f2;
                                border-left: none;
                              "
                            >
                              {{ deviceInfo?.e16 ?? '--' }}
                            </td>
                          </tr>
                          <tr style="height: 2rem">
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: none;
                                border-left: none;
                              "
                            >
                              Phase C
                            </td>
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: none;
                                border-left: none;
                              "
                            >
                              {{ deviceInfo?.e6 ?? '--' }}
                            </td>
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: none;
                                border-left: none;
                              "
                            >
                              {{ deviceInfo?.e9 ?? '--' }}
                            </td>
                            <td
                              style="
                                padding: 0.5rem;
                                border-top: 1px solid #e4e9f2;
                                border-right: none;
                                border-bottom: none;
                                border-left: none;
                              "
                            >
                              {{ deviceInfo?.e16 ?? '--' }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
                <div class="mb-4">
                  <Card size="small" :body-style="{ padding: '12px' }">
                    <div class="font-bold mb-2">Battery</div>
                    <div class="flex flex-wrap">
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">Online status：</span>
                        <span
                          :style="{
                            color:
                              deviceInfo?.b36 !== 0 ? '#4CAF50' : '#6C7680',
                          }"
                        >
                          {{ deviceInfo?.b36 !== 0 ? '● Online' : '● Offline' }}
                        </span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">SN：</span>
                        <span style="color: #6c7680">{{
                          deviceInfo?.batterySn ?? '--'
                        }}</span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">BMS version：</span>
                        <span style="color: #6c7680">{{
                          deviceInfo?.b6 ?? '--'
                        }}</span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">Battery capacity：</span>
                        <span style="color: #6c7680">{{
                          deviceInfo?.b22 ?? '--'
                        }}</span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2"
                          >Battery cycle count：</span
                        >
                        <span style="color: #6c7680">{{
                          deviceInfo?.b5 ?? '--'
                        }}</span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">Battery SOH：</span>
                        <span style="color: #6c7680"
                          >{{ deviceInfo?.b8 ?? '--' }} %</span
                        >
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">Battery SOC：</span>
                        <span style="color: #6c7680"
                          >{{ deviceInfo?.b7 ?? '--' }} %</span
                        >
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">Battery voltage：</span>
                        <span style="color: #6c7680"
                          >{{ deviceInfo?.b9 ?? '--' }} V</span
                        >
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">Charging current：</span>
                        <span style="color: #6c7680"
                          >{{ deviceInfo?.b10 ?? '--' }} A</span
                        >
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2">Discharge current：</span>
                        <span style="color: #6c7680"
                          >{{ deviceInfo?.b11 ?? '--' }} A</span
                        >
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2"
                          >Battery temperature：</span
                        >
                        <span style="color: #6c7680"
                          >{{ deviceInfo?.b4 ?? '--' }} ℃
                        </span>
                      </Card.Grid>
                      <Card.Grid
                        style="width: 33.33%; padding: 0; box-shadow: none"
                      >
                        <span style="color: #9ea8b2"
                          >BMS motherboard temperature：</span
                        >
                        <span style="color: #6c7680"
                          >{{ deviceInfo?.b21 ?? '--' }} ℃</span
                        >
                      </Card.Grid>
                    </div>
                    <div style="width: 100%; margin-top: 1rem">
                      <div v-if="batteryGroups.length > 0">
                        <div
                          v-for="(battery, batteryIdx) in batteryGroups"
                          :key="batteryIdx"
                          class="mb-4"
                        >
                          <div class="font-bold mb-2">
                            电池{{ batteryIdx + 1 }}
                          </div>
                          <div
                            v-for="(table, tableIdx) in battery"
                            :key="tableIdx"
                            class="mb-4"
                          >
                            <div style="width: 100%; overflow-x: auto">
                              <table
                                class="min-w-full text-center text-xs"
                                style="
                                  font-size: 0.875rem;
                                  border-collapse: collapse;
                                  border: none;
                                "
                              >
                                <thead
                                  style="
                                    color: #839bb3;
                                    background-color: #f1f8ff;
                                  "
                                >
                                  <tr style="height: 2rem">
                                    <th
                                      style="
                                        padding: 0.5rem;
                                        border-top: none;
                                        border-right: none;
                                        border-bottom: 1px solid #e4e9f2;
                                        border-left: none;
                                      "
                                    >
                                      Cells
                                    </th>
                                    <th
                                      v-for="cell in table"
                                      :key="cell.cellIndex"
                                      style="
                                        padding: 0.5rem;
                                        border-top: none;
                                        border-right: none;
                                        border-bottom: 1px solid #e4e9f2;
                                        border-left: none;
                                      "
                                    >
                                      {{ cell.cellIndex.toUpperCase() }}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody
                                  style="
                                    color: #6c7680;
                                    background-color: #fbfdff;
                                  "
                                >
                                  <tr style="height: 2rem">
                                    <td
                                      style="
                                        padding: 0.5rem;
                                        border-top: 1px solid #e4e9f2;
                                        border-right: none;
                                        border-bottom: 1px solid #e4e9f2;
                                        border-left: none;
                                      "
                                    >
                                      V
                                    </td>
                                    <td
                                      v-for="cell in table"
                                      :key="`${cell.cellIndex}-v`"
                                      style="
                                        padding: 0.5rem;
                                        border-top: 1px solid #e4e9f2;
                                        border-right: none;
                                        border-bottom: 1px solid #e4e9f2;
                                        border-left: none;
                                      "
                                    >
                                      {{ cell.cellVoltage }}
                                    </td>
                                  </tr>
                                  <tr style="height: 2rem">
                                    <td
                                      style="
                                        padding: 0.5rem;
                                        border-top: 1px solid #e4e9f2;
                                        border-right: none;
                                        border-bottom: none;
                                        border-left: none;
                                      "
                                    >
                                      ℃
                                    </td>
                                    <td
                                      v-for="cell in table"
                                      :key="`${cell.cellIndex}-t`"
                                      style="
                                        padding: 0.5rem;
                                        border-top: 1px solid #e4e9f2;
                                        border-right: none;
                                        border-bottom: none;
                                        border-left: none;
                                      "
                                    >
                                      {{ cell.cellTemperature }}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabPane>
              <TabPane key="fault" tab="故障信息">
                <div v-if="activeTab === 'fault'" class="-mt-4">
                  <div class="overflow-x-auto">
                    <RealtimeFaultGrid
                      v-if="currentFaultTab === 'realtime'"
                      :table-data="realtimeFaultData"
                    >
                      <template #reset-before>
                        <Segmented
                          v-model:value="currentFaultTab"
                          :options="faultTabs"
                          class="fault-tab-segmented"
                        />
                      </template>
                      <template #fault-type="{ row }">
                        <div
                          v-if="row.faultType === 'Fault'"
                          class="inline-flex items-center gap-1 text-orange-500"
                        >
                          <span
                            class="inline-block size-2 rounded-full bg-orange-500"
                          ></span>
                          Fault
                        </div>
                        <div
                          v-else-if="row.faultType === 'Alarm'"
                          class="inline-flex items-center gap-1 text-red-500"
                        >
                          <span
                            class="inline-block size-2 rounded-full bg-red-500"
                          ></span>
                          Alarm
                        </div>
                      </template>
                      <template #fault-status="{ row }">
                        <span
                          v-if="row.status === 'UNRESOLVED'"
                          class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          UNRESOLVED
                        </span>
                        <span
                          v-else-if="row.status === 'RESOLVED'"
                          class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
                        >
                          RESOLVED
                        </span>
                      </template>
                    </RealtimeFaultGrid>
                    <HistoryFaultGrid
                      v-else-if="currentFaultTab === 'history'"
                      :table-data="historyFaultData"
                    >
                      <template #reset-before>
                        <Segmented
                          v-model:value="currentFaultTab"
                          :options="faultTabs"
                          class="fault-tab-segmented"
                        />
                      </template>
                      <template #fault-type="{ row }">
                        <div
                          v-if="row.faultType === 'Fault'"
                          class="inline-flex items-center gap-1 text-orange-500"
                        >
                          <span
                            class="inline-block size-2 rounded-full bg-orange-500"
                          ></span>
                          Fault
                        </div>
                        <div
                          v-else-if="row.faultType === 'Alarm'"
                          class="inline-flex items-center gap-1 text-red-500"
                        >
                          <span
                            class="inline-block size-2 rounded-full bg-red-500"
                          ></span>
                          Alarm
                        </div>
                      </template>
                      <template #fault-status="{ row }">
                        <span
                          v-if="row.status === 'UNRESOLVED'"
                          class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          UNRESOLVED
                        </span>
                        <span
                          v-else-if="row.status === 'RESOLVED'"
                          class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
                        >
                          RESOLVED
                        </span>
                      </template>
                    </HistoryFaultGrid>
                  </div>
                </div>
              </TabPane>
              <TabPane key="control" tab="设备控制">
                <div v-if="activeTab === 'control'">
                  <!-- 子类型切换 -->
                  <div class="mb-6">
                    <Segmented
                      v-model:value="controlTab"
                      :options="controlTabs"
                      class="control-tab-segmented"
                    />
                  </div>

                  <!-- System -->
                  <Form
                    v-if="controlTab === 'system'"
                    :label-col="{ style: { width: '200px' } }"
                    :wrapper-col="{ style: { width: '440px' } }"
                    label-align="left"
                    class="max-w-[640px]"
                  >
                    <FormItem>
                      <template #label
                        ><span class="text-red-500">*</span>Power On</template
                      >
                      <Switch v-model:checked="systemForm.powerOn" />
                    </FormItem>
                    <FormItem>
                      <template #label>
                        <span class="text-red-500">*</span>PV Connection Mode
                      </template>
                      <Select
                        v-model:value="systemForm.pvConnectionMode"
                        placeholder="Select..."
                        :options="systemPvConnectionModeOptions"
                      />
                    </FormItem>
                    <FormItem>
                      <template #label
                        ><span class="text-red-500">*</span>Work Mode</template
                      >
                      <Select
                        v-model:value="systemForm.workMode"
                        placeholder="Select..."
                        :options="systemWorkModeOptions"
                      />
                    </FormItem>
                    <FormItem>
                      <template #label>
                        <span class="text-red-500">*</span>Grid Code
                      </template>
                      <Select
                        v-model:value="systemForm.gridIntegrationStandards"
                        placeholder="Select..."
                        :options="systemGridIntegrationStandardsOptions"
                      />
                    </FormItem>
                    <FormItem>
                      <div class="flex gap-3">
                        <Button @click="onControlCancel">Cancel</Button>
                        <Button
                          type="primary"
                          style="background: #237ebc"
                          @click="onControlConfirm"
                        >
                          Confirm
                        </Button>
                      </div>
                    </FormItem>
                  </Form>

                  <!-- Meter -->
                  <Form
                    v-else-if="controlTab === 'meter'"
                    :label-col="{ style: { width: '200px' } }"
                    :wrapper-col="{ style: { width: '440px' } }"
                    label-align="left"
                    class="max-w-[640px]"
                  >
                    <FormItem>
                      <template #label
                        ><span class="text-red-500">*</span>Meter
                        Model</template
                      >
                      <Select
                        v-model:value="meterForm.meterModel"
                        placeholder="Select..."
                        :options="meterModelOptions"
                      />
                    </FormItem>
                    <FormItem>
                      <template #label
                        ><span class="text-red-500">*</span>Feeder
                        switch</template
                      >
                      <Switch v-model:checked="meterForm.feederSwitch" />
                    </FormItem>
                    <FormItem v-if="meterForm.feederSwitch">
                      <template #label>
                        <span class="text-red-500">*</span>Feeder Power limit(w)
                      </template>
                      <Select
                        v-model:value="meterForm.feederPowerLimit"
                        placeholder="Select..."
                        :options="feederPowerLimitOptions"
                      />
                    </FormItem>
                    <FormItem>
                      <template #label
                        ><span class="text-red-500">*</span>CT Ratio</template
                      >
                      <InputNumber
                        v-model:value="meterForm.ctRatio"
                        :min="1"
                        :precision="0"
                        placeholder="Input..."
                        style="width: 100%"
                      />
                    </FormItem>
                    <FormItem>
                      <div class="flex gap-3">
                        <Button @click="onControlCancel">Cancel</Button>
                        <Button
                          type="primary"
                          style="background: #237ebc"
                          @click="onControlConfirm"
                        >
                          Confirm
                        </Button>
                      </div>
                    </FormItem>
                  </Form>

                  <!-- Battery -->
                  <Form
                    v-else-if="controlTab === 'battery'"
                    :label-col="{ style: { width: '200px' } }"
                    :wrapper-col="{ style: { width: '440px' } }"
                    label-align="left"
                    class="max-w-[640px]"
                  >
                    <FormItem>
                      <template #label
                        ><span class="text-red-500">*</span>Battery
                        Model</template
                      >
                      <Select
                        v-model:value="batteryForm.batteryModel"
                        placeholder="Select..."
                        :options="batteryModelOptions"
                      />
                    </FormItem>
                    <FormItem>
                      <template #label>
                        <span class="text-red-500">*</span>Max. SoC limit (%)
                      </template>
                      <InputNumber
                        v-model:value="batteryForm.maxSocLimit"
                        placeholder="Input..."
                        :min="0"
                        :max="100"
                        style="width: 100%"
                      />
                    </FormItem>
                    <FormItem>
                      <template #label>
                        <span class="text-red-500">*</span>Min. SoC on-grid (%)
                      </template>
                      <InputNumber
                        v-model:value="batteryForm.minSocToGrid"
                        placeholder="Input..."
                        :min="0"
                        :max="100"
                        style="width: 100%"
                      />
                    </FormItem>
                    <FormItem>
                      <template #label>
                        <span class="text-red-500">*</span>Min. SoC off-grid (%)
                      </template>
                      <InputNumber
                        v-model:value="batteryForm.minSocOffGrid"
                        placeholder="Input..."
                        :min="0"
                        :max="100"
                        style="width: 100%"
                      />
                    </FormItem>
                    <FormItem>
                      <div class="flex gap-3">
                        <Button @click="onControlCancel">Cancel</Button>
                        <Button
                          type="primary"
                          style="background: #237ebc"
                          @click="onControlConfirm"
                        >
                          Confirm
                        </Button>
                      </div>
                    </FormItem>
                  </Form>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </div>

      <!-- 故障描述弹窗 -->
      <Modal
        v-model:open="faultDetailVisible"
        :footer="null"
        width="420px"
        :body-style="{ padding: '0 24px 24px' }"
      >
        <template #title>
          <div class="flex items-center gap-2">
            <img
              src="/images/icon/fault-info@2x.png"
              alt="fault"
              class="h-5 w-5 object-contain"
            />
            <span class="text-base font-semibold">{{
              faultDetailRow?.faultName ?? '--'
            }}</span>
          </div>
        </template>
        <div v-if="faultDetailRow" class="flex flex-col gap-4 pt-2">
          <div class="rounded-md bg-gray-50 p-4">
            <div class="mb-1 text-sm font-medium text-gray-700">
              Description:
            </div>
            <div class="text-sm text-gray-500">
              {{ faultDetailRow.descEn ?? '--' }}
            </div>
          </div>
          <div class="rounded-md bg-gray-50 p-4">
            <div class="mb-1 text-sm font-medium text-gray-700">Solution:</div>
            <div class="whitespace-pre-line text-sm text-gray-500">
              {{ faultDetailRow.solutionEn ?? '--' }}
            </div>
          </div>
        </div>
      </Modal>
    </Spin>
  </Page>
</template>

<style scoped>
.fault-tab-segmented :deep(.ant-segmented-item-selected) {
  background-color: #237ebc;
}

.fault-tab-segmented
  :deep(.ant-segmented-item-selected .ant-segmented-item-label) {
  color: #fff;
}

.control-tab-segmented :deep(.ant-segmented-item-selected) {
  background-color: #237ebc;
}

.control-tab-segmented
  :deep(.ant-segmented-item-selected .ant-segmented-item-label) {
  color: #fff;
}

.fault-grid-panel :deep(.relative.rounded-sm.py-3) {
  padding-top: 0;
}
</style>
