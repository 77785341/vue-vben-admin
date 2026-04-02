<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { computed, onMounted, ref, watch } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

import { DatePicker } from 'ant-design-vue';

import { getWebMonitorData, getWebYearStatistics } from '#/api/monitor';

type OverviewCard = {
  backgroundImage: string;
  bottomLabel: string;
  bottomUnit?: string;
  bottomValue: number | string;
  topLabel: string;
  topValue: number | string;
};

type WebMonitorData = {
  totalInverterNum: number;
  totalInverterOnlineNum: number;
  totalPumpNum: number;
  totalPumpOnlineNum: number;
  totalPvCapacity: number;
  totalStationNum: number;
  totalWallboxNum: number;
  totalWallboxOnlineNum: number;
};

const monitorData = ref<WebMonitorData>({
  totalInverterNum: 0,
  totalInverterOnlineNum: 0,
  totalPumpNum: 0,
  totalPumpOnlineNum: 0,
  totalPvCapacity: 0,
  totalStationNum: 0,
  totalWallboxNum: 0,
  totalWallboxOnlineNum: 0,
});

function formatCapacity(value: number) {
  if (!Number.isFinite(value)) return '0.0';
  return value.toFixed(1);
}

const overviewCards = computed<OverviewCard[]>(() => {
  const data = monitorData.value;

  return [
    {
      backgroundImage: '/images/analytics/home-family@2x.png',
      bottomLabel: 'Total Installed Capacity',
      bottomUnit: 'kWp',
      bottomValue: formatCapacity(data.totalPvCapacity),
      topLabel: 'Total Homes',
      topValue: data.totalStationNum,
    },
    {
      backgroundImage: '/images/analytics/home-pv-storage@2x.png',
      bottomLabel: 'Online',
      bottomValue: data.totalInverterOnlineNum,
      topLabel: 'Total PV Systems',
      topValue: data.totalInverterNum,
    },
    {
      backgroundImage: '/images/analytics/home-heat-pump@2x.png',
      bottomLabel: 'Online',
      bottomValue: data.totalPumpOnlineNum,
      topLabel: 'Total Heat Pumps',
      topValue: data.totalPumpNum,
    },
    {
      backgroundImage: '/images/analytics/home-charger@2x.png',
      bottomLabel: 'Online',
      bottomValue: data.totalWallboxOnlineNum,
      topLabel: 'Total Charging Stations',
      topValue: data.totalWallboxNum,
    },
  ];
});

const selectedYear = ref(`${new Date().getFullYear()}`);
const yearStatisticsData = ref<number[]>(Array.from({ length: 12 }, () => 0));

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

function getMonthIndex(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    const month = Math.trunc(value);
    return month >= 1 && month <= 12 ? month - 1 : -1;
  }

  if (typeof value === 'string') {
    if (/^\d{4}-\d{2}/.test(value)) {
      const month = Number(value.slice(5, 7));
      return month >= 1 && month <= 12 ? month - 1 : -1;
    }
    const month = Number(value);
    return Number.isFinite(month) && month >= 1 && month <= 12 ? month - 1 : -1;
  }

  return -1;
}

function toNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeYearStatisticsData(raw: unknown) {
  const result = Array.from({ length: 12 }, () => 0);

  const container =
    raw && typeof raw === 'object' && 'data' in raw
      ? (raw as { data?: unknown }).data
      : raw;

  if (Array.isArray(container)) {
    const seriesList = container.filter(
      (item) => item && typeof item === 'object',
    ) as Array<Record<string, unknown>>;

    const pvSeries =
      seriesList.find(
        (item) => String(item.name || '').toLowerCase() === 'pvpower',
      ) ||
      seriesList[1] ||
      seriesList[0];

    if (pvSeries) {
      const dateTime = Array.isArray(pvSeries.dateTime)
        ? pvSeries.dateTime
        : [];
      const values = Array.isArray(pvSeries.data) ? pvSeries.data : [];

      if (dateTime.length > 0) {
        dateTime.forEach((item, index) => {
          const monthIndex = getMonthIndex(item);
          if (monthIndex >= 0) {
            result[monthIndex] = toNumber(values[index]);
          }
        });
        return result;
      }

      if (values.length > 0) {
        values.slice(0, 12).forEach((item, index) => {
          result[index] = toNumber(item);
        });
        return result;
      }
    }

    if (
      container.every(
        (item) => typeof item === 'number' || typeof item === 'string',
      )
    ) {
      container.slice(0, 12).forEach((item, index) => {
        result[index] = toNumber(item);
      });
    }

    return result;
  }

  if (container && typeof container === 'object') {
    Object.entries(container as Record<string, unknown>).forEach(
      ([key, value]) => {
        const monthIndex = getMonthIndex(key);
        if (monthIndex >= 0) {
          result[monthIndex] = toNumber(value);
        }
      },
    );
    return result;
  }

  return result;
}

function renderPowerChart() {
  const xAxisData = Array.from({ length: 12 }, (_item, index) => {
    return `${selectedYear.value}-${String(index + 1).padStart(2, '0')}`;
  });

  renderEcharts({
    grid: {
      bottom: 12,
      containLabel: true,
      left: 20,
      right: 20,
      top: 34,
    },
    series: [
      {
        barWidth: 30,
        data: yearStatisticsData.value,
        itemStyle: {
          borderRadius: [8, 8, 0, 0],
          color: '#9fd2f5',
        },
        type: 'bar',
      },
    ],
    tooltip: {
      trigger: 'axis',
      valueFormatter(value) {
        return `${value} kWh`;
      },
    },
    xAxis: {
      axisLine: {
        lineStyle: {
          color: '#d9e6f2',
        },
      },
      axisTick: {
        show: false,
      },
      data: xAxisData,
      type: 'category',
    },
    yAxis: {
      axisLabel: {
        color: '#9ca3af',
      },
      splitLine: {
        lineStyle: {
          color: '#ecf2f8',
          type: 'dashed',
        },
      },
      type: 'value',
    },
  });
}

async function fetchWebMonitorData() {
  try {
    const data = await getWebMonitorData();
    monitorData.value = {
      totalInverterNum: Number(data?.totalInverterNum || 0),
      totalInverterOnlineNum: Number(data?.totalInverterOnlineNum || 0),
      totalPumpNum: Number(data?.totalPumpNum || 0),
      totalPumpOnlineNum: Number(data?.totalPumpOnlineNum || 0),
      totalPvCapacity: Number(data?.totalPvCapacity || 0),
      totalStationNum: Number(data?.totalStationNum || 0),
      totalWallboxNum: Number(data?.totalWallboxNum || 0),
      totalWallboxOnlineNum: Number(data?.totalWallboxOnlineNum || 0),
    };
  } catch (error) {
    console.error('Failed to fetch web monitor data:', error);
  }
}

async function fetchWebYearStatistics() {
  try {
    const response = await getWebYearStatistics(selectedYear.value);
    yearStatisticsData.value = normalizeYearStatisticsData(response);
  } catch (error) {
    console.error('Failed to fetch web year statistics:', error);
    yearStatisticsData.value = Array.from({ length: 12 }, () => 0);
  } finally {
    renderPowerChart();
  }
}

onMounted(() => {
  fetchWebYearStatistics();
  fetchWebMonitorData();
});

watch(selectedYear, () => {
  fetchWebYearStatistics();
});
</script>

<template>
  <div class="min-h-full bg-[#f3f7fb] p-[clamp(0.75rem,1.6vw,1.25rem)]">
    <div
      class="mb-[clamp(0.75rem,1.4vw,1rem)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-[clamp(0.5rem,1vw,0.75rem)]"
    >
      <div
        v-for="card in overviewCards"
        :key="card.topLabel"
        class="rounded-md"
      >
        <div
          class="flex h-full flex-col justify-between aspect-[406/280] bg-[#f7fbff] bg-center bg-no-repeat bg-[length:100%_100%] p-[clamp(1rem,2vw,1.5rem)]"
          :style="{ backgroundImage: `url(${card.backgroundImage})` }"
        >
          <div
            class="pt-[clamp(0.125rem,0.5vw,0.375rem)] pl-[clamp(0.2rem,0.6vw,0.4rem)] text-slate-700"
          >
            <div
              class="flex items-center gap-[clamp(0.25rem,0.6vw,0.375rem)] text-[clamp(0.7rem,0.9vw,0.8125rem)] leading-none text-slate-500 mb-[clamp(0.2rem,0.55vw,0.5rem)]"
            >
              <span
                class="inline-block size-[clamp(0.375rem,0.7vw,0.5rem)] rounded-full bg-blue-400 shadow-[0_0_0_3px_rgba(96,165,250,0.2)]"
              ></span>
              <span>{{ card.topLabel }}</span>
            </div>
            <div
              class="mt-[clamp(0.125rem,0.35vw,0.25rem)] text-[clamp(1.625rem,4.2vw,2.5rem)] leading-none font-bold tracking-[-0.5px] text-gray-800"
            >
              {{ card.topValue }}
            </div>
          </div>

          <div
            class="pb-[clamp(0.125rem,0.5vw,0.375rem)] pl-[clamp(0.2rem,0.6vw,0.4rem)] text-slate-700"
          >
            <div
              class="flex items-center gap-[clamp(0.25rem,0.6vw,0.375rem)] text-[clamp(0.7rem,0.9vw,0.8125rem)] leading-none text-slate-500 mb-[clamp(0.2rem,0.55vw,0.5rem)]"
            >
              <span
                class="inline-block size-[clamp(0.375rem,0.7vw,0.5rem)] rounded-full"
                :class="
                  card.bottomUnit
                    ? 'bg-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.2)]'
                    : 'bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.2)]'
                "
              ></span>
              <span>{{ card.bottomLabel }}</span>
            </div>
            <div
              class="mt-[clamp(0.125rem,0.35vw,0.25rem)] text-[clamp(1.625rem,4.2vw,2.5rem)] leading-none font-bold tracking-[-0.5px] text-gray-800"
            >
              {{ card.bottomValue }}
              <span
                v-if="card.bottomUnit"
                class="ml-[clamp(1px,0.2vw,2px)] text-[12px] font-medium text-slate-400"
              >
                {{ card.bottomUnit }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="rounded-md border border-[#e6edf5] bg-white p-[clamp(0.75rem,1.4vw,1rem)]"
    >
      <div
        class="mb-[clamp(0.5rem,1vw,0.75rem)] flex flex-wrap items-center justify-between gap-[clamp(0.5rem,1vw,0.75rem)]"
      >
        <div class="flex items-center gap-[clamp(0.375rem,0.8vw,0.5rem)]">
          <img
            src="/images/analytics/power-generation-icon@2x.png"
            alt="generation icon"
            class="size-[clamp(1rem,1.6vw,1.25rem)]"
          />
          <span
            class="text-[clamp(1rem,2.2vw,1.5rem)] leading-none font-bold text-gray-800"
          >
            Power Generation Statistics
          </span>
        </div>
        <DatePicker
          v-model:value="selectedYear"
          :allow-clear="false"
          class="w-[clamp(8.5rem,18vw,10.625rem)]"
          picker="year"
          placeholder="Select Year"
          value-format="YYYY"
        />
      </div>
      <div class="relative h-[clamp(14rem,34vh,20rem)]">
        <span
          class="pointer-events-none absolute top-1 left-0 z-10 text-xs text-slate-400"
        >
          kWh
        </span>
        <EchartsUI ref="chartRef" />
      </div>
    </div>
  </div>
</template>
