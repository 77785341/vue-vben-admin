<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';
import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

import { message, Skeleton } from 'ant-design-vue';

import {
  getDailyStatistics,
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
const familyData = ref<any>(null);
const monitorData = ref<any>(null);
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
  name?: string;
  time?: string[];
};

function getFlowMotionPath(
  status: FlowStatus,
  forwardStatus: Exclude<FlowStatus, 'dis'>,
  forwardPath: string,
  reversePath: string,
) {
  if (status === 'dis') {
    return '';
  }
  return status === forwardStatus ? forwardPath : reversePath;
}

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
    base: 'M203 228 L361 228 L361 194',
    forwardPath: 'M361 194 L361 228 L203 228',
    reversePath: 'M203 228 L361 228 L361 194',
  },
  grid: {
    base: 'M29 228 L29 194 L187 194',
    forwardPath: 'M29 228 L29 194 L187 194',
    reversePath: 'M187 194 L29 194 L29 228',
  },
  bottomTrunk: {
    base: 'M195 254 L195 294',
    forwardPath: 'M195 254 L195 294',
    reversePath: 'M195 294 L195 254',
  },
  heatPump: {
    base: 'M195 294 L195 324',
    forwardPath: 'M195 294 L195 324',
    reversePath: 'M195 324 L195 294',
  },
  household: {
    base: 'M195 294 L315 294 L315 324',
    forwardPath: 'M195 294 L315 294 L315 324',
    reversePath: 'M315 324 L315 294 L195 294',
  },
  solar: {
    base: 'M195 64 L195 166',
    forwardPath: 'M195 64 L195 166',
    reversePath: 'M195 166 L195 64',
  },
  wallbox: {
    base: 'M195 294 L75 294 L75 324',
    forwardPath: 'M195 294 L75 294 L75 324',
    reversePath: 'M75 324 L75 294 L195 294',
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
      offset: -120,
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
      offset: 120,
      color: '#2ECE89',
    },
  ];
});

const activeBottomFlowNodes = computed(() =>
  bottomFlowNodes.value.filter((item) => isFlowActive(item.flowStatus)),
);

const flowIcons = {
  battery: '/images/family/daily-generation.png',
  grid: '/images/family/daily-generation.png',
  heatPump: '/images/family/daily-generation.png',
  household: '/images/family/daily-generation.png',
  solar: '/images/family/daily-generation.png',
  wallbox: '/images/family/daily-generation.png',
};

const deviceCards = computed(() => {
  const station = familyData.value ?? {};
  const source = [
    ...(Array.isArray(station?.inverters)
      ? station.inverters.map((item: any) => ({ ...item, __type: 'inverters' }))
      : []),
    ...(Array.isArray(station?.pumps)
      ? station.pumps.map((item: any) => ({ ...item, __type: 'pumps' }))
      : []),
    ...(Array.isArray(station?.wallboxes)
      ? station.wallboxes.map((item: any) => ({ ...item, __type: 'wallboxes' }))
      : []),
  ];

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
    const snField = typeSnFieldMap[item?.__type] ?? '';
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
      title: typeNameMap[item?.__type] ?? '设备',
      sn: `SN:${rawSn}`,
      status,
      fault: `故障 ${Number.isFinite(faultCount) ? faultCount : 0}`,
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
      .map((item) => (item === null || item === undefined || Number.isFinite(item) ? item : null));

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
  if (!familyId.value) {
    trendStatisticsRaw.value = [];
    renderTrendChart();
    return;
  }

  try {
    let response: unknown;
    if (trendPeriod.value === 'day') {
      response = await getDailyStatistics(trendDate.value, familyId.value);
    } else if (trendPeriod.value === 'month') {
      response = await getMonthStatistics(trendDate.value, familyId.value);
    } else {
      response = await getYearStatistics(trendDate.value, familyId.value);
    }
    const apiData = ((response as any)?.data ?? []) as unknown;
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
    xData = Array.from({ length: 24 }).map(
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
  const axisSource = apiSeries[0];
  const apiAxis = isDay ? axisSource?.time : axisSource?.dateTime;
  if (Array.isArray(apiAxis) && apiAxis.length > 0) {
    xData = apiAxis.map(String);
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

  const series = seriesSource.map((seriesItem, index) => {
    const fallback = defaultSeriesMeta[index] ?? {
      color: '#89C0FF',
      name: `Series ${index + 1}`,
    };
    const data = normalizeSeriesData(seriesItem?.data, xData.length);

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

  renderEcharts({
    color: chartColors,
    grid: {
      bottom: 20,
      containLabel: true,
      left: 0,
      right: 0,
      top: 24,
    },
    legend: {
      bottom: 0,
      itemHeight: 6,
      itemWidth: 12,
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
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false },
      data: xData,
      type: 'category',
    },
    yAxis: {
      axisLabel: { color: '#94a3b8' },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      type: 'value',
    },
  });
}

async function fetchFamilyDetail() {
  try {
    loading.value = true;
    const id = route.query.stationId as string;
    if (!id) {
      message.error('家庭ID不存在');
      return;
    }
    familyId.value = id;
    const [familyResponse, monitorResponse] = await Promise.all([
      getFamilyById(id),
      getStationMonitor(id),
    ]);
    const familyPayload =
      (familyResponse as any)?.data ?? familyResponse ?? null;
    familyData.value = familyPayload;
    monitorData.value =
      (monitorResponse as any)?.data ?? monitorResponse ?? null;
    console.warn('家庭详情数据', familyResponse);
    await fetchTrendStatistics();
  } catch (error) {
    console.error('获取家庭详情失败:', error);
    message.error('获取家庭数据失败');
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
          <div class="grid grid-cols-1 gap-4 xl:grid-cols-[398px_1fr]">
            <FamilyInfoCard
              :create-time="stationBase?.createTime || '--'"
              :customer-name="stationBase?.customerName || 'Mr Li'"
              :family-id="familyId || '--'"
              :online-info="onlineInfo"
              :station-address="stationAddress"
              :station-name="stationName"
              :station-picture="stationPicture"
            />

            <div
              class="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100"
            >
              <div
                class="grid grid-cols-1 gap-4 rounded-xl p-3 2xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.78fr)] 2xl:items-start"
              >
                <FlowDiagramCard
                  :active-bottom-flow-nodes="activeBottomFlowNodes"
                  :battery-flow-status="batteryFlowStatus"
                  :battery-power="batteryPower"
                  :bottom-flow-nodes="bottomFlowNodes"
                  :bottom-trunk-status="bottomTrunkStatus"
                  :flow-icons="flowIcons"
                  :flow-path-config="flowPathConfig"
                  :format-number="formatNumber"
                  :get-flow-motion-path="getFlowMotionPath"
                  :grid-flow-status="gridFlowStatus"
                  :grid-power-display="gridPowerDisplay"
                  :is-flow-active="isFlowActive"
                  :power-vo="powerVo"
                  :solar-flow-status="solarFlowStatus"
                />

                <GenerationSummaryPanel :summary-cards="summaryCards" />
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

      <DeviceListCard :device-cards="deviceCards" />
    </div>
  </Page>
</template>
