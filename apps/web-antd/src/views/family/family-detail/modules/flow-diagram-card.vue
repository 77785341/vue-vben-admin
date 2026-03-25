<script lang="ts" setup>
type LocalFlowStatus = 'dis' | 'in' | 'out';

defineProps<{
  activeBottomFlowNodes: any[];
  batteryFlowStatus: LocalFlowStatus;
  batteryPower: number;
  bottomFlowNodes: any[];
  bottomTrunkStatus: LocalFlowStatus;
  flowIcons: Record<string, string>;
  flowPathConfig: Record<string, any>;
  formatNumber: (value: unknown, digits?: number) => string;
  getFlowMotionPath: (
    status: LocalFlowStatus,
    forwardStatus: 'in' | 'out',
    forwardPath: string,
    reversePath: string,
  ) => string;
  gridFlowStatus: LocalFlowStatus;
  gridPowerDisplay: number;
  isFlowActive: (status: LocalFlowStatus) => boolean;
  powerVo: Record<string, any>;
  solarFlowStatus: LocalFlowStatus;
}>();
</script>

<template>
  <div class="relative min-h-[390px] rounded-xl bg-[#f5f7fb] p-4">
    <svg
      class="pointer-events-none absolute left-1/2 top-0 h-[390px] w-[390px] -translate-x-1/2"
      viewBox="0 0 390 390"
      fill="none"
    >
      <path
        class="flow-path"
        :class="{ 'flow-path-active': isFlowActive(solarFlowStatus) }"
        :d="flowPathConfig.solar.base"
      />
      <circle v-if="isFlowActive(solarFlowStatus)" class="flow-dot" r="3">
        <animateMotion
          dur="2.4s"
          repeatCount="indefinite"
          :path="
            getFlowMotionPath(
              solarFlowStatus,
              'in',
              flowPathConfig.solar.forwardPath,
              flowPathConfig.solar.reversePath,
            )
          "
        />
      </circle>

      <path
        class="flow-path"
        :class="{ 'flow-path-active': isFlowActive(gridFlowStatus) }"
        :d="flowPathConfig.grid.base"
      />
      <circle v-if="isFlowActive(gridFlowStatus)" class="flow-dot" r="3">
        <animateMotion
          dur="2.4s"
          repeatCount="indefinite"
          :path="
            getFlowMotionPath(
              gridFlowStatus,
              'in',
              flowPathConfig.grid.forwardPath,
              flowPathConfig.grid.reversePath,
            )
          "
        />
      </circle>

      <path
        class="flow-path"
        :class="{ 'flow-path-active': isFlowActive(batteryFlowStatus) }"
        :d="flowPathConfig.battery.base"
      />
      <circle v-if="isFlowActive(batteryFlowStatus)" class="flow-dot" r="3">
        <animateMotion
          dur="2.4s"
          repeatCount="indefinite"
          :path="
            getFlowMotionPath(
              batteryFlowStatus,
              'out',
              flowPathConfig.battery.forwardPath,
              flowPathConfig.battery.reversePath,
            )
          "
        />
      </circle>

      <path
        class="flow-path"
        :class="{ 'flow-path-active': isFlowActive(bottomTrunkStatus) }"
        :d="flowPathConfig.bottomTrunk.base"
      />
      <circle v-if="isFlowActive(bottomTrunkStatus)" class="flow-dot" r="3">
        <animateMotion
          dur="2.4s"
          repeatCount="indefinite"
          calcMode="linear"
          keyPoints="0;1;1"
          keyTimes="0;0.5;1"
          :path="
            getFlowMotionPath(
              bottomTrunkStatus,
              'out',
              flowPathConfig.bottomTrunk.forwardPath,
              flowPathConfig.bottomTrunk.reversePath,
            )
          "
        />
        <animate
          attributeName="opacity"
          dur="2.4s"
          repeatCount="indefinite"
          values="1;1;0;0"
          keyTimes="0;0.45;0.5;1"
        />
      </circle>

      <path
        v-for="item in bottomFlowNodes"
        :key="`path-${item.id}`"
        class="flow-path"
        :class="{ 'flow-path-active': isFlowActive(item.flowStatus) }"
        :d="item.path.base"
      />
      <circle
        v-for="item in activeBottomFlowNodes"
        :key="`dot-${item.id}`"
        class="flow-dot"
        r="3"
        :style="{ fill: item.color }"
      >
        <animateMotion
          dur="2.4s"
          repeatCount="indefinite"
          calcMode="linear"
          keyPoints="0;0;1"
          keyTimes="0;0.5;1"
          :path="
            getFlowMotionPath(
              item.flowStatus,
              'out',
              item.path.forwardPath,
              item.path.reversePath,
            )
          "
        />
        <animate
          attributeName="opacity"
          dur="2.4s"
          repeatCount="indefinite"
          values="0;0;1;1"
          keyTimes="0;0.5;0.55;1"
        />
      </circle>
    </svg>

    <div
      class="absolute left-1/2 top-1/2 h-[124px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-slate-100"
    >
      <div
        class="h-full w-full rounded-lg bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200"
      ></div>
    </div>

    <div class="absolute left-1/2 top-8 -translate-x-1/2 text-center">
      <div
        class="mx-auto mb-1 flex h-[32px] w-[32px] items-center justify-center"
      >
        <img
          :src="flowIcons.solar"
          alt="Solar"
          class="h-[32px] w-[32px] object-contain"
        />
      </div>
      <div class="text-sm text-slate-500">Solar</div>
      <div class="text-[28px] font-semibold text-slate-700">
        {{ formatNumber(powerVo.pv_power)
        }}<span class="text-base font-normal">kW</span>
      </div>
    </div>

    <div class="absolute left-10 top-1/2 -translate-y-1/2 text-center">
      <div
        class="mx-auto mb-1 flex h-[32px] w-[32px] items-center justify-center"
      >
        <img
          :src="flowIcons.grid"
          alt="Grid"
          class="h-[32px] w-[32px] object-contain"
        />
      </div>
      <div class="text-sm text-slate-500">Grid</div>
      <div class="text-[28px] font-semibold text-slate-700">
        {{ formatNumber(gridPowerDisplay)
        }}<span class="text-base font-normal">kW</span>
      </div>
    </div>

    <div class="absolute right-10 top-1/2 -translate-y-1/2 text-center">
      <div
        class="mx-auto mb-1 flex h-[32px] w-[32px] items-center justify-center"
      >
        <img
          :src="flowIcons.battery"
          alt="Battery"
          class="h-[32px] w-[32px] object-contain"
        />
      </div>
      <div class="text-sm text-slate-500">Battery</div>
      <div class="text-[28px] font-semibold text-slate-700">
        {{ formatNumber(batteryPower)
        }}<span class="text-base font-normal">kW</span>
      </div>
    </div>

    <div class="absolute bottom-6 left-0 right-0 h-[86px] text-center">
      <div
        v-for="item in bottomFlowNodes"
        :key="item.id"
        class="absolute -translate-x-1/2"
        :style="{ left: `calc(50% + ${item.offset}px)` }"
      >
        <div
          class="mx-auto mb-1 flex h-[32px] w-[32px] items-center justify-center"
        >
          <img
            :src="item.icon"
            :alt="item.label"
            class="h-[32px] w-[32px] object-contain"
          />
        </div>
        <div class="text-sm text-slate-500">{{ item.label }}</div>
        <div class="text-[28px] font-semibold text-slate-700">
          {{ formatNumber(item.power)
          }}<span class="text-base font-normal">kW</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flow-path {
  stroke: #b8cad9;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.flow-path-active {
  stroke: #d9eaf7;
}

.flow-dot {
  filter: drop-shadow(0 0 4px rgb(85 162 223 / 30%));
  fill: #55a2df;
}
</style>
