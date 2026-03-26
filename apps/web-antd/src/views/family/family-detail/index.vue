<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';
import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

import { message, Skeleton } from 'ant-design-vue';

import {
  getDailyStatistics,
  getDeviceByStationAndType,
  getMonthStatistics,
  getStationMonitor,
  getYearStatistics,
} from '#/api';
import { getFamilyById } from '#/api/family/family';

import DeviceListCard from './modules/device-list-card.vue';
import FamilyInfoCard from './modules/family-info-card.vue';
import FlowDiagramCard from './modules/flow-diagram-card.vue';
import GenerationSummaryPanel from './modules/generation-summary-panel.vue';
import TrendStatisticsCard from './modules/trend-statistics-card.vue';

const API_BASE_URL =
  'https://test-bucket-borochi.s3.eu-central-1.amazonaws.com/';

const route = useRoute();
const familyId = ref<string>('');
const stationId = ref<string>('');
const familyData = ref<any>(null);
const monitorData = ref<any>(null);
const stationDevicesRaw = ref<any[]>([]);
const loading = ref(true);
const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

function formatNumber(value: unknown, digits = 2) {
  const num = Number(value ?? 0);
  return Number.isFinite(num) ? num.toFixed(digits) : (0).toFixed(digits);
}

type FlowStatus = 'dis' | 'in' | 'out';
type TrendPeriod = 'day' | 'month' | 'year';
type TrendStatisticsSeries = {
  color?: string;
  data?: number[];
  dateTime?: string[];
  isDefault?: boolean;
  name?: string;
  time?: string[];
};

function getFlowMotionPath(
  status: FlowStatus,
  forwardStatus: Exclude<FlowStatus, 'dis'>,
  forwardPath: string,
  reversePath: string,
) {
  // 根据流向状态选择动画路径，静止状态不渲染运动轨迹。
  if (status === 'dis') {
    return '';
  }
  return status === forwardStatus ? forwardPath : reversePath;
}

const FLOW_VIEWBOX_SIZE = 390;

function toPercent(value: number) {
  return `${(value / FLOW_VIEWBOX_SIZE) * 100}%`;
}

function buildNodeStyle(x: number, y: number) {
  return {
    left: toPercent(x),
    top: toPercent(y),
    transform: 'translateX(-50%)',
  };
}

const flowNodeStyleConfig = {
  bottomById: {
    'heat-pump': buildNodeStyle(195, 315),
    household: buildNodeStyle(275, 315),
    wallbox: buildNodeStyle(115, 315),
  },
  bottomDefault: buildNodeStyle(195, 310),
  staticNodes: {
    battery: buildNodeStyle(330, 120),
    grid: buildNodeStyle(79, 180),
    solar: buildNodeStyle(195, 8),
  },
} as const;

// 兼容不同接口层级：station -> familyInfo -> 根对象。
const stationBase = computed(() => {
  return (
    familyData.value?.station ??
    familyData.value?.familyInfo ??
    familyData.value ??
    {}
  );
});

const stationName = computed(
  () =>
    stationBase.value?.installerStationName ??
    stationBase.value?.familyName ??
    '--',
);

const stationAddress = computed(
  () =>
    stationBase.value?.installerStationAddress ??
    stationBase.value?.address ??
    '--',
);

const stationPhone = computed(
  () =>
    stationBase.value?.customerPhone ??
    stationBase.value?.phone ??
    stationBase.value?.mobile ??
    '--',
);

const stationPicture = computed(() => {
  const picture = stationBase.value?.installerStationPicture;
  return picture ? `${API_BASE_URL}${picture}` : '';
});

const onlineInfo = computed(() => {
  const isOffline = [0, 'off'].includes(stationBase.value?.status);
  return isOffline
    ? {
        dot: 'bg-rose-400 shadow-[0_0_0_4px_rgba(251,113,133,0.2)]',
        label: 'Offline',
        text: 'text-rose-400',
      }
    : {
        dot: 'bg-emerald-500 shadow-[0_0_0_4px_rgba(34,197,94,0.2)]',
        label: 'Online',
        text: 'text-emerald-500',
      };
});

const summaryCards = computed(() => {
  const energyShowVo = monitorData.value?.energyShowVo ?? {};
  return [
    {
      icon: '/images/family/daily-generation.png',
      label: '当日发电量',
      unit: 'kWh',
      value: formatNumber(energyShowVo.todayGenerateEnergy, 1),
    },
    {
      icon: '/images/family/daily-consumption.png',
      label: '当日用电量',
      unit: 'kWh',
      value: formatNumber(energyShowVo.todayUseEnergy, 1),
    },
    {
      icon: '/images/family/daily-feed-in.png',
      label: '当日售电量',
      unit: 'kWh',
      value: formatNumber(energyShowVo.todaySellEnergy, 1),
    },
    {
      icon: '/images/family/daily-purchase.png',
      label: '当日购电量',
      unit: 'kWh',
      value: formatNumber(energyShowVo.todayBuyEnergy, 1),
    },
  ];
});

const powerVo = computed(() => monitorData.value?.powerVo ?? {});
const powerUseVo = computed(() => monitorData.value?.powerUseVo ?? {});

const batteryPower = computed(() => {
  const batteryPowerIn = Number(powerVo.value?.battery_power_in ?? 0);
  const batteryPowerOut = Number(powerVo.value?.battery_power_out ?? 0);
  const rawBatteryPower = batteryPowerIn - batteryPowerOut;
  return Math.abs(rawBatteryPower);
});

const batteryStatus = computed<'dis' | 'in' | 'out'>(() => {
  const batteryPowerIn = Number(powerVo.value?.battery_power_in ?? 0);
  const batteryPowerOut = Number(powerVo.value?.battery_power_out ?? 0);
  const rawBatteryPower = batteryPowerIn - batteryPowerOut;
  if (rawBatteryPower > 0) return 'in';
  if (rawBatteryPower < 0) return 'out';
  return 'dis';
});

const gridStatus = computed<'dis' | 'in' | 'out'>(() => {
  const gridPowerIn = Number(powerVo.value?.grid_power_in ?? 0);
  const gridPowerOut = Number(powerVo.value?.grid_power_out ?? 0);
  if (gridPowerIn === 0 && gridPowerOut > 0) return 'out';
  if (gridPowerIn > 0 && gridPowerOut === 0) return 'in';
  return 'dis';
});

const solarStatus = computed<'dis' | 'in'>(() => {
  const pvPower = Number(powerVo.value?.pv_power ?? 0);
  return pvPower > 0 ? 'in' : 'dis';
});

const chargingPileStatus = computed<'dis' | 'out'>(() => {
  const wallboxPower = Number(powerUseVo.value?.wallboxPower ?? 0);
  return wallboxPower > 0 ? 'out' : 'dis';
});

const illuminationStatus = computed<'dis' | 'out'>(() => {
  const pumpPower = Number(powerUseVo.value?.pumpPower ?? 0);
  return pumpPower > 0 ? 'out' : 'dis';
});

const inverterStatus = computed<'dis' | 'out'>(() => {
  const otherUsePower = Number(powerUseVo.value?.otherUsePower ?? 0);
  return otherUsePower > 0 ? 'out' : 'dis';
});

const gridPowerDisplay = computed(() => {
  const gridPowerIn = Number(powerVo.value?.grid_power_in ?? 0);
  const gridPowerOut = Number(powerVo.value?.grid_power_out ?? 0);
  if (gridPowerIn > 0) return gridPowerIn;
  if (gridPowerOut > 0) return gridPowerOut;
  return 0;
});

const solarFlowStatus = computed<FlowStatus>(() => solarStatus.value);
const gridFlowStatus = computed<FlowStatus>(() => gridStatus.value);
const batteryFlowStatus = computed<FlowStatus>(() => batteryStatus.value);
const wallboxFlowStatus = computed<FlowStatus>(() => chargingPileStatus.value);
const heatPumpFlowStatus = computed<FlowStatus>(() => illuminationStatus.value);
const householdFlowStatus = computed<FlowStatus>(() => inverterStatus.value);
// 底部主干有任一负载用电则判定为向外流动。
const bottomTrunkStatus = computed<FlowStatus>(() => {
  if (
    wallboxFlowStatus.value === 'out' ||
    heatPumpFlowStatus.value === 'out' ||
    householdFlowStatus.value === 'out'
  ) {
    return 'out';
  }
  return 'dis';
});

const flowPathConfig = {
  battery: {
    base: 'M260 228 L330 228 L330 194',
    forwardPath: 'M330 194 L330 228 L260 228',
    reversePath: 'M260 228 L330 228 L330 194',
  },
  grid: {
    base: 'M79 173 L79 139 L156 139',
    forwardPath: 'M79 173 L79 139 L156 139',
    reversePath: 'M156 139 L79 139 L79 173',
  },
  bottomTrunk: {
    base: 'M195 268 L195 288',
    forwardPath: 'M195 268 L195 288',
    reversePath: 'M195 288 L195 268',
  },
  heatPump: {
    base: 'M195 288 L195 310',
    forwardPath: 'M195 288 L195 310',
    reversePath: 'M195 310 L195 288',
  },
  household: {
    base: 'M195 288 L275 288 L275 310',
    forwardPath: 'M195 288 L275 288 L275 310',
    reversePath: 'M275 310 L275 288 L195 288',
  },
  wallbox: {
    base: 'M195 288 L115 288 L115 310',
    forwardPath: 'M195 288 L115 288 L115 310',
    reversePath: 'M115 310 L115 288 L195 288',
  },
  solar: {
    base: 'M195 80 L195 125',
    forwardPath: 'M195 80 L195 125',
    reversePath: 'M195 125 L195 80',
  },
} as const;

function isFlowActive(status: FlowStatus) {
  return status !== 'dis';
}

const bottomFlowNodes = computed(() => {
  return [
    {
      flowStatus: wallboxFlowStatus.value,
      icon: flowIcons.wallbox,
      id: 'wallbox',
      label: 'Wallbox',
      path: flowPathConfig.wallbox,
      power: Number(powerUseVo.value?.wallboxPower ?? 0),
      offset: -80,
      color: '#FF6B6B',
    },
    {
      flowStatus: heatPumpFlowStatus.value,
      icon: flowIcons.heatPump,
      id: 'heat-pump',
      label: 'Heat Pump',
      path: flowPathConfig.heatPump,
      power: Number(powerUseVo.value?.pumpPower ?? 0),
      offset: 0,
      color: '#4A90E2',
    },
    {
      flowStatus: householdFlowStatus.value,
      icon: flowIcons.household,
      id: 'household',
      label: 'Household',
      path: flowPathConfig.household,
      power: Number(powerUseVo.value?.otherUsePower ?? 0),
      offset: 80,
      color: '#2ECE89',
    },
  ];
});

const activeBottomFlowNodes = computed(() =>
  bottomFlowNodes.value.filter((item) => isFlowActive(item.flowStatus)),
);

const flowIcons = {
  battery: '/images/family/family-icon-battery@2x.png',
  centerHouse: '/images/family/family-house-center-black@2x.png',
  grid: '/images/family/family-icon-grid@2x.png',
  heatPump: '/images/family/family-icon-heat-pump@2x.png',
  household: '/images/family/family-icon-household@2x.png',
  solar: '/images/family/family-icon-solar@2x.png',
  wallbox: '/images/family/family-icon-wallbox@2x.png',
};

type DeviceTypeKey = 'inverters' | 'pumps' | 'wallboxes';

const deviceTypeOptions = [
  { label: '光储系统', value: 'inverters' },
  { label: '热泵', value: 'pumps' },
  { label: '充电桩', value: 'wallboxes' },
];

const deviceTypeImageMap: Record<DeviceTypeKey, string> = {
  inverters: '/images/family/family-device-inverter@2x.png',
  pumps: '/images/family/family-device-heat-pump@2x.png',
  wallboxes: '/images/family/family-device-wallbox@2x.png',
};

const deviceTypeQuery = ref<string>('');

function resolveDeviceTypeKey(typeValue: unknown): DeviceTypeKey | null {
  const normalized = String(typeValue ?? '')
    .trim()
    .toLowerCase();
  if (!normalized) return null;

  if (['1', 'inverter', 'inverters', 'pv', 'solar'].includes(normalized)) {
    return 'inverters';
  }
  if (['2', 'heat-pump', 'heatpump', 'pump', 'pumps'].includes(normalized)) {
    return 'pumps';
  }
  if (['3', 'charger', 'wallbox', 'wallboxes'].includes(normalized)) {
    return 'wallboxes';
  }
  return null;
}

async function fetchStationDevices(type = '') {
  if (!stationId.value) {
    stationDevicesRaw.value = [];
    return;
  }

  const responseData = await getDeviceByStationAndType(stationId.value, type);
  const payload = Array.isArray(responseData)
    ? responseData
    : ((responseData as any)?.data ?? []);
  if (!Array.isArray(payload)) {
    stationDevicesRaw.value = [];
    return;
  }

  stationDevicesRaw.value = payload.map((item: any) => {
    const resolvedType =
      resolveDeviceTypeKey(item?.type) ??
      resolveDeviceTypeKey(item?.deviceType) ??
      resolveDeviceTypeKey(type) ??
      'inverters';
    return { ...item, __type: resolvedType };
  });
}

function handleDeviceTypeSearch(type?: string) {
  void fetchStationDevices(type ?? deviceTypeQuery.value);
}

function handleDeviceTypeReset() {
  deviceTypeQuery.value = '';
  void fetchStationDevices('');
}

// 设备列表做多字段兼容，避免后端字段命名不一致导致展示空值。
const deviceCards = computed(() => {
  const source = stationDevicesRaw.value;

  const typeNameMap: Record<string, string> = {
    inverters: '光储系统',
    pumps: '热泵',
    wallboxes: '充电桩',
  };

  const typeSnFieldMap: Record<string, string> = {
    inverters: 'inverterSn',
    pumps: 'pumpSn',
    wallboxes: 'wallboxSn',
  };

  return source.map((item: any, index: number) => {
    const resolvedTypeKey =
      resolveDeviceTypeKey(item?.type) ??
      resolveDeviceTypeKey(item?.deviceType) ??
      resolveDeviceTypeKey(item?.__type) ??
      'inverters';

    const snField = typeSnFieldMap[resolvedTypeKey] ?? '';
    const rawSn =
      item?.[snField] ??
      item?.deviceSn ??
      item?.sn ??
      item?.serialNumber ??
      '--';
    const rawStatus = item?.status ?? item?.onlineStatus ?? item?.state;
    let status = String(rawStatus ?? '未知');
    if (
      rawStatus === 1 ||
      rawStatus === '1' ||
      rawStatus === true ||
      String(rawStatus ?? '').toLowerCase() === 'online'
    ) {
      status = '在线';
    } else if (
      rawStatus === 0 ||
      rawStatus === '0' ||
      rawStatus === false ||
      String(rawStatus ?? '').toLowerCase() === 'offline'
    ) {
      status = '离线';
    }

    const rawFault =
      item?.faultCount ??
      item?.faultNum ??
      item?.alarmCount ??
      item?.fault ??
      0;
    const faultCount = Number(rawFault);

    return {
      key: `${rawSn}-${index}`,
      title: item?.deviceName || typeNameMap[resolvedTypeKey] || '设备',
      sn: `SN:${rawSn}`,
      status,
      fault: `${Number.isFinite(faultCount) ? faultCount : 0}`,
      image: deviceTypeImageMap[resolvedTypeKey],
    };
  });
});

const trendPeriod = ref<TrendPeriod>('day');
const trendStatisticsRaw = ref<TrendStatisticsSeries[]>([]);

function getDefaultTrendDate(period: TrendPeriod) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  if (period === 'month') return `${year}-${month}`;
  if (period === 'year') return `${year}`;
  return `${year}-${month}-${day}`;
}

const trendDate = ref<string>(getDefaultTrendDate('day'));

const trendPicker = computed<'date' | 'month' | 'year'>(() => {
  if (trendPeriod.value === 'month') return 'month';
  if (trendPeriod.value === 'year') return 'year';
  return 'date';
});

const trendDateFormat = computed(() => {
  if (trendPeriod.value === 'month') return 'YYYY-MM';
  if (trendPeriod.value === 'year') return 'YYYY';
  return 'YYYY-MM-DD';
});

function normalizeSeriesData(
  source: unknown,
  length: number,
): Array<null | number> {
  // 保留 null，图表端展示断点而不是补 0，避免误导趋势判断。
  if (Array.isArray(source)) {
    const numbers = source
      .map((item) => {
        if (item === null || item === undefined) return null;
        if (typeof item === 'number') return item;
        if (item && typeof item === 'object') {
          const value =
            (item as any).value ??
            (item as any).data ??
            (item as any).y ??
            (item as any).amount;
          if (value === null || value === undefined) return null;
          const parsedValue = Number(value);
          return Number.isFinite(parsedValue) ? parsedValue : null;
        }
        const parsedValue = Number(item);
        return Number.isFinite(parsedValue) ? parsedValue : null;
      })
      .map((item) =>
        item === null || item === undefined || Number.isFinite(item)
          ? item
          : null,
      );

    if (numbers.length >= length) return numbers.slice(0, length);
    return [
      ...numbers,
      ...Array.from({ length: length - numbers.length }, () => null),
    ];
  }

  if (source && typeof source === 'object') {
    const objectValues = Object.values(source as Record<string, unknown>).map(
      (item) => {
        if (item === null || item === undefined) return null;
        const numberValue = Number(item);
        return Number.isFinite(numberValue) ? numberValue : null;
      },
    );
    if (objectValues.length >= length) return objectValues.slice(0, length);
    return [
      ...objectValues,
      ...Array.from({ length: length - objectValues.length }, () => null),
    ];
  }

  return Array.from({ length }, () => null);
}

function getDaysInTrendMonth(value: string) {
  const [yearString, monthString] = value.split('-');
  const year = Number(yearString);
  const month = Number(monthString);
  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    month < 1 ||
    month > 12
  ) {
    return 30;
  }
  return new Date(year, month, 0).getDate();
}

function handleTrendPeriodChange(period: TrendPeriod) {
  if (trendPeriod.value === period) return;
  trendPeriod.value = period;
  trendDate.value = getDefaultTrendDate(period);
  void fetchTrendStatistics();
}

function handleTrendDateChange(
  value: string | { format: (pattern?: string) => string },
) {
  if (!value) return;
  trendDate.value =
    typeof value === 'string' ? value : value.format(trendDateFormat.value);
  void fetchTrendStatistics();
}

async function fetchTrendStatistics() {
  // 统计接口必须使用 stationId；无 stationId 时清空图表。
  if (!stationId.value) {
    trendStatisticsRaw.value = [];
    renderTrendChart();
    return;
  }

  try {
    let response: unknown;
    if (trendPeriod.value === 'day') {
      response = await getDailyStatistics(trendDate.value, stationId.value);
    } else if (trendPeriod.value === 'month') {
      response = await getMonthStatistics(trendDate.value, stationId.value);
    } else {
      response = await getYearStatistics(trendDate.value, stationId.value);
    }
    const apiData = (
      Array.isArray(response) ? response : (response as any)?.data
    ) as unknown;
    trendStatisticsRaw.value = Array.isArray(apiData)
      ? (apiData as TrendStatisticsSeries[])
      : [];
  } catch (error) {
    console.error('获取统计图数据失败:', error);
    trendStatisticsRaw.value = [];
    message.warning('统计图接口暂无数据');
  } finally {
    renderTrendChart();
  }
}

function renderTrendChart() {
  const isDay = trendPeriod.value === 'day';
  const isMonth = trendPeriod.value === 'month';
  let xData: string[] = [];
  if (isDay) {
    xData = Array.from({ length: 25 }).map(
      (_item, index) => `${String(index).padStart(2, '0')}:00`,
    );
  } else if (isMonth) {
    xData = Array.from({ length: getDaysInTrendMonth(trendDate.value) }).map(
      (_item, index) => `${index + 1}`,
    );
  } else {
    xData = Array.from({ length: 12 }).map((_item, index) => `${index + 1}月`);
  }

  const defaultSeriesMeta = [
    { color: '#89C0FF', name: 'Consumption' },
    { color: '#FFD1D1', name: 'PV Production' },
    { color: '#FFDBA0', name: 'Grid In' },
    { color: '#C3EAFF', name: 'Grid Out' },
    { color: '#76D9E6', name: 'Battery Charged' },
    { color: '#D7CAFF', name: 'Diacharged' },
  ];

  const apiSeries = trendStatisticsRaw.value;
  const normalizeDayAxisLabel = (value: string) => {
    const text = String(value);
    if (text.includes(' ')) {
      return text.split(' ')[1]?.slice(0, 5) || text;
    }
    if (text.includes('T')) {
      return text.split('T')[1]?.slice(0, 5) || text;
    }
    return text.slice(0, 5);
  };

  // 日维度使用 time，月/年维度使用 dateTime；按接口时间轴统一对齐数据。
  const getSeriesAxis = (seriesItem?: TrendStatisticsSeries) => {
    const axis = isDay ? seriesItem?.time : seriesItem?.dateTime;
    if (!Array.isArray(axis)) return [];
    return axis.map((item) => {
      const rawValue = String(item);
      return isDay ? normalizeDayAxisLabel(rawValue) : rawValue;
    });
  };

  const mergedAxis: string[] = [];
  apiSeries.forEach((seriesItem, index) => {
    const currentAxis = getSeriesAxis(seriesItem);
    if (currentAxis.length === 0) {
      return;
    }
    if (index === 0 && mergedAxis.length === 0) {
      mergedAxis.push(...currentAxis);
      return;
    }
    currentAxis.forEach((axisValue) => {
      if (!mergedAxis.includes(axisValue)) {
        mergedAxis.push(axisValue);
      }
    });
  });

  if (mergedAxis.length > 0) {
    if (isDay) {
      if (!mergedAxis.includes('00:00')) {
        mergedAxis.unshift('00:00');
      }
      if (!mergedAxis.includes('24:00')) {
        mergedAxis.push('24:00');
      }
    }
    xData = mergedAxis;
  }

  let barStyle = {};
  if (isMonth) {
    barStyle = {
      barCategoryGap: '60%',
      barGap: '40%',
      barMaxWidth: 6,
      barMinWidth: 2,
    };
  } else if (!isDay) {
    barStyle = {
      barCategoryGap: '40%',
      barGap: '30%',
      barMaxWidth: 12,
      barMinWidth: 4,
    };
  }

  const seriesSource = apiSeries;
  const yAxisUnit = isDay ? 'kW' : 'kWh';

  const series = seriesSource.map((seriesItem, index) => {
    const fallback = defaultSeriesMeta[index] ?? {
      color: '#89C0FF',
      name: `Series ${index + 1}`,
    };
    const seriesAxis = getSeriesAxis(seriesItem);
    let data: Array<null | number>;

    if (seriesAxis.length > 0 && Array.isArray(seriesItem?.data)) {
      const valueByAxis: Record<string, null | number> = {};
      seriesAxis.forEach((axisValue, axisIndex) => {
        const rawValue = seriesItem.data?.[axisIndex];
        if (rawValue === null || rawValue === undefined) {
          valueByAxis[axisValue] = null;
          return;
        }
        const parsedValue = Number(rawValue);
        valueByAxis[axisValue] = Number.isFinite(parsedValue)
          ? parsedValue
          : null;
      });
      data = xData.map((axisValue) => {
        return Object.prototype.hasOwnProperty.call(valueByAxis, axisValue)
          ? (valueByAxis[axisValue] ?? null)
          : null;
      });
    } else {
      data = normalizeSeriesData(seriesItem?.data, xData.length);
    }

    return {
      ...barStyle,
      data,
      name: seriesItem?.name || fallback.name,
      smooth: isDay,
      symbol: isDay ? 'none' : 'circle',
      type: (isDay ? 'line' : 'bar') as 'bar' | 'line',
    };
  }) as any[];

  const chartColors = seriesSource.map((seriesItem, index) => {
    return seriesItem?.color || defaultSeriesMeta[index]?.color || '#89C0FF';
  });

  // 接口 isDefault 控制初始渲染状态，未默认显示的系列可通过底部图例点击显示。
  const legendSelected: Record<string, boolean> = {};
  seriesSource.forEach((seriesItem, index) => {
    const fallbackName =
      defaultSeriesMeta[index]?.name || `Series ${index + 1}`;
    const seriesName = seriesItem?.name || fallbackName;
    legendSelected[seriesName] = seriesItem?.isDefault !== false;
  });

  const dayAxisFormatter = (value: string) => normalizeDayAxisLabel(value);

  renderEcharts({
    color: chartColors,
    grid: {
      bottom: 56,
      containLabel: true,
      left: 24,
      right: 16,
      top: 24,
    },
    legend: {
      bottom: 4,
      itemHeight: 6,
      itemWidth: 12,
      selected: legendSelected,
      textStyle: {
        color: '#64748b',
        fontSize: 12,
      },
    },
    series,
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      axisLabel: {
        color: '#94a3b8',
        formatter: (value: string) => (isDay ? dayAxisFormatter(value) : value),
      },
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false },
      data: xData,
      type: 'category',
    },
    yAxis: {
      axisLabel: { color: '#94a3b8' },
      name: yAxisUnit,
      nameGap: 10,
      nameLocation: 'end',
      nameTextStyle: {
        color: '#64748b',
        fontSize: 12,
      },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      type: 'value',
    },
  });
}

async function fetchFamilyDetail() {
  try {
    loading.value = true;
    // 路由约定：stationId 用于监控/统计，familyId 用于家庭详情。
    const queryStationId = route.query.stationId as string;
    const queryFamilyId = route.query.familyId as string;
    if (!queryStationId && !queryFamilyId) {
      message.error('家庭ID不存在');
      return;
    }
    stationId.value = queryStationId || '';
    familyId.value = queryFamilyId || queryStationId || '';
    const [familyResponse, monitorResponse] = await Promise.all([
      getFamilyById(familyId.value),
      getStationMonitor(stationId.value),
    ]);
    const familyPayload =
      (familyResponse as any)?.data ?? familyResponse ?? null;
    familyData.value = familyPayload;
    monitorData.value =
      (monitorResponse as any)?.data ?? monitorResponse ?? null;
    await fetchStationDevices();
    console.warn('家庭详情数据', familyResponse);
    await fetchTrendStatistics();
  } catch (error) {
    console.error('获取家庭详情失败:', error);
    message.error('获取家庭数据失败');
    stationDevicesRaw.value = [];
    renderTrendChart();
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchFamilyDetail();
});
</script>
<template>
  <Page auto-content-height>
    <div class="space-y-4 p-4">
      <div>
        <Skeleton :loading="loading" active>
          <div
            class="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(18rem,24%)_minmax(0,1fr)] 2xl:grid-cols-[minmax(20rem,22%)_minmax(0,1fr)]"
          >
            <FamilyInfoCard
              :create-time="stationBase?.createTime || '--'"
              :customer-name="stationBase?.customerName || 'Mr Li'"
              :online-info="onlineInfo"
              :station-address="stationAddress"
              :station-name="stationName"
              :phone="stationPhone"
              :station-picture="stationPicture"
            />

            <div
              class="h-full rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100"
            >
              <div
                class="grid h-full grid-cols-1 gap-4 rounded-xl xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] xl:items-stretch"
              >
                <div class="h-full min-h-0">
                  <FlowDiagramCard
                    :active-bottom-flow-nodes="activeBottomFlowNodes"
                    :battery-flow-status="batteryFlowStatus"
                    :battery-power="batteryPower"
                    :bottom-flow-nodes="bottomFlowNodes"
                    :bottom-trunk-status="bottomTrunkStatus"
                    :flow-icons="flowIcons"
                    :flow-node-style-config="flowNodeStyleConfig"
                    :flow-path-config="flowPathConfig"
                    :format-number="formatNumber"
                    :get-flow-motion-path="getFlowMotionPath"
                    :grid-flow-status="gridFlowStatus"
                    :grid-power-display="gridPowerDisplay"
                    :is-flow-active="isFlowActive"
                    :power-vo="powerVo"
                    :solar-flow-status="solarFlowStatus"
                  />
                </div>

                <div class="flex h-full items-center">
                  <GenerationSummaryPanel :summary-cards="summaryCards" />
                </div>
              </div>
            </div>
          </div>
        </Skeleton>
      </div>

      <TrendStatisticsCard
        :trend-date="trendDate"
        :trend-date-format="trendDateFormat"
        :trend-period="trendPeriod"
        :trend-picker="trendPicker"
        @period-change="handleTrendPeriodChange"
        @update:trend-date="handleTrendDateChange"
      >
        <EchartsUI ref="chartRef" />
      </TrendStatisticsCard>

      <DeviceListCard
        :device-cards="deviceCards"
        :device-type="deviceTypeQuery"
        :device-type-options="deviceTypeOptions"
        @reset="handleDeviceTypeReset"
        @search="handleDeviceTypeSearch"
        @update:device-type="deviceTypeQuery = $event"
      />
    </div>
  </Page>
</template>
