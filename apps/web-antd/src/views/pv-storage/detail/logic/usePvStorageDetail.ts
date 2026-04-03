import type {
  BatteryFormModel,
  ControlTab,
  FaultFilterValues,
  FaultRow,
  FaultTab,
  LeftSideInfo,
  MeterFormModel,
  StatusIndicator,
  SystemFormModel,
} from '../types';

import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';

import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';

import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  getDeviceFaultByPage,
  getDeviceInfoBySn,
  getInverterDevice,
  pollingControlSettings,
  pollingWriteControlSettings,
  readControlSettings,
  saveBatterySettings,
  saveMeterSettings,
  saveSystemSettings,
} from '#/api/pv-storage/pv-storage';
import {
  getFaultDesc,
  getFaultSolution,
  getFaultTitle,
  getFaultType,
  inverterFaultCodeMap,
  pumpFaultCodeMap,
  wallboxFaultCodeMap,
} from '#/shared/device-fault-codes';

import {
  useFaultFormSchema,
  useHistoryFaultColumns,
  useRealtimeFaultColumns,
} from '../data';

function normalizeCount(value: unknown) {
  const count = Number(value ?? 0);
  return Number.isFinite(count) && count > 0 ? count : 0;
}

function normalizeOnlineStatus(status: unknown) {
  const value = String(status ?? '')
    .trim()
    .toLowerCase();
  return value === 'online' || value === '1' || value === 'true';
}

function normalizeBindStatus(isBind: unknown) {
  const value = String(isBind ?? '')
    .trim()
    .toLowerCase();

  if (value === 'no' || value === '0' || value === 'false') {
    return false;
  }

  if (value === 'yes' || value === '1' || value === 'true') {
    return true;
  }

  return Boolean(isBind);
}

function normalizeLeftSideInfo(payload: any) {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const faultCount = normalizeCount(payload.totalFaultCount);
  const warningCount = Number(payload.totalWarningCount ?? 0);

  return {
    ...payload,
    collectorSn: payload.collectorSn ?? payload.collectionSn,
    updatedAt: payload.updatedAt ?? payload.createTime,
    isOnline: normalizeOnlineStatus(payload.status),
    isBound: normalizeBindStatus(payload.isBind),
    totalFaultCount: faultCount,
    totalWarningCount: Number.isNaN(warningCount) ? 0 : warningCount,
  };
}

function unwrapResponseData(response: any) {
  if (response === null || response === undefined) {
    return null;
  }

  if (typeof response === 'object' && 'data' in response) {
    return response.data ?? null;
  }

  return response;
}

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

function normalizeCode(value: unknown) {
  return String(value ?? '')
    .trim()
    .toUpperCase();
}

function normalizeFaultType(type?: string): 'Error' | 'Warning' {
  const normalized = String(type ?? '')
    .trim()
    .toLowerCase();

  if (
    normalized === 'warning' ||
    normalized === 'warn' ||
    normalized === 'alarm' ||
    normalized === '3'
  ) {
    return 'Warning';
  }

  return 'Error';
}

function extractCodeCandidates(value: unknown) {
  const raw = String(value ?? '').trim();
  if (!raw || raw === '--') {
    return [] as string[];
  }

  return raw
    .split(/[\s,;|/]+/)
    .map((item) => normalizeCode(item))
    .filter(Boolean);
}

function mapFaultType(type?: string): 'Error' | 'Warning' {
  return normalizeFaultType(type);
}

function resolveFaultTypeByErrorCode(
  errorCode: unknown,
  fallbackType?: string,
): 'Error' | 'Warning' {
  const codeCandidates = extractCodeCandidates(errorCode);

  if (codeCandidates.length === 0) {
    return mapFaultType(fallbackType);
  }

  for (const code of codeCandidates) {
    const directType = getFaultType(code);
    if (directType === 'Error' || directType === 'Warning') {
      return directType;
    }
  }

  const allEntries = [
    ...Object.values(inverterFaultCodeMap),
    ...Object.values(wallboxFaultCodeMap),
    ...Object.values(pumpFaultCodeMap),
  ] as Array<Record<string, any>>;

  const matchedEntry = allEntries.find((entry) => {
    const faultCode = normalizeCode(entry?.faultCode);
    return codeCandidates.includes(faultCode);
  });

  const matchedType =
    matchedEntry?.faultType ?? matchedEntry?.['#sym:faultType'];
  if (matchedType === 'Error' || matchedType === 'Warning') {
    return matchedType;
  }

  return mapFaultType(fallbackType);
}

function mapFaultStatus(status?: string): 'RESOLVED' | 'UNRESOLVED' {
  return status === 'RESOLVED' ? 'RESOLVED' : 'UNRESOLVED';
}

export function usePvStorageDetail() {
  const route = useRoute();
  const router = useRouter();
  const debugWindow = window as Window & { cells?: any[] };

  const sn = computed(() => String(route.query.sn ?? ''));

  const deviceInfo = ref<any>(null);
  const leftSideInfo = ref<LeftSideInfo | null>(null);
  const loading = ref(false);

  const leftBindIndicator = computed<StatusIndicator>(() => {
    const isBound = Boolean(leftSideInfo.value?.isBound);
    return {
      colorClass: isBound ? 'text-[#237EBC]' : 'text-gray-400',
      text: isBound ? '已绑定' : '未绑定',
    };
  });

  const leftStatusIndicator = computed<StatusIndicator>(() => {
    const faultCount = normalizeCount(leftSideInfo.value?.totalFaultCount);
    const warningCount = normalizeCount(leftSideInfo.value?.totalWarningCount);

    if (faultCount > 0 || (faultCount > 0 && warningCount > 0)) {
      return {
        colorClass: 'text-red-500',
        text: `故障${faultCount}`,
      };
    }

    if (warningCount > 0) {
      return {
        colorClass: 'text-orange-400',
        text: `警告${warningCount}`,
      };
    }
    return {
      colorClass: 'text-green-500',
      text: '正常',
    };
  });

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
      const response = await getInverterDevice(sn.value);
      leftSideInfo.value = normalizeLeftSideInfo(unwrapResponseData(response));
    } catch (error) {
      leftSideInfo.value = null;
      message.error('获取左侧信息失败');
      console.error('Failed to fetch left side info:', error);
    } finally {
      loading.value = false;
    }
  }

  const cells = ref([] as any[]);
  if (debugWindow.cells) cells.value = debugWindow.cells;

  const batteryGroups = computed(() => {
    const batterySize = 32;
    const tableSize = 16;
    const arr = deviceInfo.value?.cells || cells.value || [];
    const result = [];

    for (let batteryIndex = 0; batteryIndex < 4; batteryIndex++) {
      const batteryStart = batteryIndex * batterySize;
      if (batteryStart >= arr.length) break;

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
  const currentFaultTab = ref<FaultTab>('realtime');
  function onTabChange(key: number | string) {
    activeTab.value = String(key);
  }

  const controlTab = ref<ControlTab>('system');
  const controlTabs = [
    { label: 'System', value: 'system' },
    { label: 'Meter', value: 'meter' },
    { label: 'Battery', value: 'battery' },
  ];

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

  const systemForm = reactive<SystemFormModel>({
    powerOn: true,
    pvConnectionMode: 0 as number | undefined,
    workMode: undefined as number | undefined,
    gridIntegrationStandards: undefined as number | undefined,
  });

  const meterForm = reactive<MeterFormModel>({
    meterModel: undefined as number | undefined,
    feederSwitch: true,
    feederPowerLimit: undefined as number | undefined,
    ctRatio: undefined as number | undefined,
  });

  const batteryForm = reactive<BatteryFormModel>({
    batteryModel: undefined as number | undefined,
    maxSocLimit: undefined as number | undefined,
    minSocToGrid: undefined as number | undefined,
    minSocOffGrid: undefined as number | undefined,
  });

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

  const faultDetailVisible = ref(false);
  const faultDetailRow = ref<any>(null);
  const realtimeFaultFilters = ref<FaultFilterValues>({ type: 'all' });
  const historyFaultFilters = ref<FaultFilterValues>({ type: 'all' });

  function mapFaultRows(
    records: any[],
    pageNum: number,
    pageSize: number,
  ): FaultRow[] {
    return records.map((item: any, index: number) => ({
      descEn: '--',
      endTime: item.resolveTime || '--',
      errorCode: item.errorCode || '--',
      faultName: item.errorCode || '--',
      faultTime: item.reportTime || '--',
      faultType: resolveFaultTypeByErrorCode(item.errorCode, item.type),
      id: (pageNum - 1) * pageSize + index + 1,
      solutionEn: '--',
      startTime: item.reportTime || '--',
      status: mapFaultStatus(item.faultStatus),
      type: item.type,
    }));
  }

  async function queryFaultList(
    tab: 'history' | 'realtime',
    pageNum: number,
    pageSize: number,
    filters: FaultFilterValues,
  ) {
    const response = await getDeviceFaultByPage({
      keyword: '',
      pageNum,
      pageSize,
      status: tab === 'history' ? 'RESOLVED' : 'UN_RESOLVE',
      type: filters.type ?? 'all',
    });

    const payload = (response as any)?.data ?? response ?? {};
    const records = payload.records ?? [];
    const total = Number(payload.total ?? 0);

    return {
      records: mapFaultRows(records, pageNum, pageSize),
      total: Number.isNaN(total) ? 0 : total,
    };
  }

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

  const [RealtimeFaultGrid, realtimeFaultGridApi] = useVbenVxeGrid({
    class: 'fault-grid-panel',
    separator: false,
    formOptions: {
      actionWrapperClass:
        'vben-grid-form-actions order-first inline-flex items-center gap-3',
      handleValuesChange(values) {
        realtimeFaultFilters.value = {
          type: values.type || 'all',
        };
        realtimeFaultGridApi.query();
      },
      resetButtonOptions: {
        show: false,
      },
      schema: useFaultFormSchema(),
      submitButtonOptions: {
        show: false,
      },
      submitOnChange: false,
    },
    gridOptions: {
      columns: useRealtimeFaultColumns(onFaultActionClick),
      minHeight: 260,
      keepSource: true,
      proxyConfig: {
        ajax: {
          query: async ({ page }: any) => {
            try {
              return await queryFaultList(
                'realtime',
                page.currentPage,
                page.pageSize,
                realtimeFaultFilters.value,
              );
            } catch (error) {
              message.error('获取故障列表失败');
              console.error('Failed to fetch realtime fault list:', error);
              return { records: [], total: 0 };
            }
          },
        },
      },
      pagerConfig: {
        currentPage: 1,
        layouts: [
          'PrevJump',
          'PrevPage',
          'Number',
          'NextPage',
          'NextJump',
          'Sizes',
          'Total',
        ],
        pageSize: 10,
      },
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

  const [HistoryFaultGrid, historyFaultGridApi] = useVbenVxeGrid({
    class: 'fault-grid-panel',
    separator: false,
    formOptions: {
      actionWrapperClass:
        'vben-grid-form-actions order-first inline-flex items-center gap-3',
      handleValuesChange(values) {
        historyFaultFilters.value = {
          type: values.type || 'all',
        };
        historyFaultGridApi.query();
      },
      resetButtonOptions: {
        show: false,
      },
      schema: useFaultFormSchema(),
      submitButtonOptions: {
        show: false,
      },
      submitOnChange: false,
    },
    gridOptions: {
      columns: useHistoryFaultColumns(onFaultActionClick),
      minHeight: 260,
      keepSource: true,
      proxyConfig: {
        ajax: {
          query: async ({ page }: any) => {
            try {
              return await queryFaultList(
                'history',
                page.currentPage,
                page.pageSize,
                historyFaultFilters.value,
              );
            } catch (error) {
              message.error('获取故障列表失败');
              console.error('Failed to fetch history fault list:', error);
              return { records: [], total: 0 };
            }
          },
        },
      },
      pagerConfig: {
        currentPage: 1,
        layouts: [
          'PrevJump',
          'PrevPage',
          'Number',
          'NextPage',
          'NextJump',
          'Sizes',
          'Total',
        ],
        pageSize: 10,
      },
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

  function goBack() {
    if (controlLoading.value) {
      message.warning('设备控制数据读取中，请稍后');
      return;
    }

    router.back();
  }

  onMounted(() => {
    fetchDeviceInfo();
    fetchLeftSideInfo();
  });

  watch(
    currentFaultTab,
    (tab) => {
      if (tab === 'realtime') {
        realtimeFaultGridApi.query();
        return;
      }

      historyFaultGridApi.query();
    },
    { immediate: false },
  );

  watch(activeTab, (tab) => {
    if (tab === 'fault') {
      nextTick(() => {
        if (currentFaultTab.value === 'realtime') {
          realtimeFaultGridApi.query();
        } else {
          historyFaultGridApi.query();
        }
      });
      return;
    }

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

  return {
    activeTab,
    batteryForm,
    batteryGroups,
    batteryModelOptions,
    controlLoading,
    controlTab,
    controlTabs,
    currentFaultTab,
    deviceInfo,
    faultDetailRow,
    faultDetailVisible,
    faultTabs,
    feederPowerLimitOptions,
    goBack,
    HistoryFaultGrid,
    leftBindIndicator,
    leftSideInfo,
    leftStatusIndicator,
    meterForm,
    meterModelOptions,
    onControlCancel,
    onControlConfirm,
    onTabChange,
    RealtimeFaultGrid,
    systemForm,
    systemGridIntegrationStandardsOptions,
    systemPvConnectionModeOptions,
    systemWorkModeOptions,
  };
}
