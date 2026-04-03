<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

type LocalFlowStatus = 'dis' | 'in' | 'out';

// 能流图渲染组件：根据父层传入状态决定路径高亮和粒子动画方向。
defineProps<{
  activeBottomFlowNodes: any[];
  batteryFlowStatus: LocalFlowStatus;
  batteryPower: number;
  bottomFlowNodes: any[];
  bottomTrunkStatus: LocalFlowStatus;
  flowIcons: Record<string, string>;
  flowNodeStyleConfig: {
    bottomById: Record<string, Record<string, string>>;
    bottomDefault: Record<string, string>;
    staticNodes: {
      battery: Record<string, string>;
      grid: Record<string, string>;
      solar: Record<string, string>;
    };
  };
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

// 粒子点基准半径（viewBox 坐标单位）。
const DOT_R = 3;
// 补偿后的 x 半径：当容器非正方形时，通过缩小 rx 抵消横向拉伸，使点在屏幕上呈现为正圆。
const dotRx = ref(DOT_R);
const svgEl = ref<null | SVGSVGElement>(null);

let ro: null | ResizeObserver = null;

function updateDotRx() {
  if (!svgEl.value) return;
  const { width, height } = svgEl.value.getBoundingClientRect();
  if (width > 0 && height > 0) {
    // rx * (W/390) == DOT_R * (H/390)  →  rx = DOT_R * H/W
    dotRx.value = DOT_R * (height / width);
  }
}

onMounted(() => {
  ro = new ResizeObserver(updateDotRx);
  if (svgEl.value) {
    ro.observe(svgEl.value);
    updateDotRx();
  }
});

onUnmounted(() => {
  ro?.disconnect();
});
</script>

<template>
  <div
    class="relative mx-auto h-full min-h-[18rem] w-full max-w-full rounded-xl xl:mx-0"
  >
    <!-- 能流路径层：负责绘制主干线、分支线和流动粒子动画 -->
    <svg
      ref="svgEl"
      class="pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox="0 0 390 390"
      preserveAspectRatio="none"
      fill="none"
    >
      <!-- 光伏主路由 -->
      <path
        class="flow-path"
        :class="{ 'flow-path-active': isFlowActive(solarFlowStatus) }"
        :d="flowPathConfig.solar.base"
      />
      <ellipse
        v-if="isFlowActive(solarFlowStatus)"
        class="flow-dot"
        :rx="dotRx"
        ry="3"
      >
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
      </ellipse>

      <!-- 电网主路由 -->
      <path
        class="flow-path"
        :class="{ 'flow-path-active': isFlowActive(gridFlowStatus) }"
        :d="flowPathConfig.grid.base"
      />
      <ellipse
        v-if="isFlowActive(gridFlowStatus)"
        class="flow-dot"
        :rx="dotRx"
        ry="3"
      >
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
      </ellipse>

      <!-- 电池主路由 -->
      <path
        class="flow-path"
        :class="{ 'flow-path-active': isFlowActive(batteryFlowStatus) }"
        :d="flowPathConfig.battery.base"
      />
      <ellipse
        v-if="isFlowActive(batteryFlowStatus)"
        class="flow-dot"
        :rx="dotRx"
        ry="3"
      >
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
      </ellipse>

      <!-- 底部总线（汇总到底部负载区） -->
      <path
        class="flow-path"
        :class="{ 'flow-path-active': isFlowActive(bottomTrunkStatus) }"
        :d="flowPathConfig.bottomTrunk.base"
      />
      <ellipse
        v-if="isFlowActive(bottomTrunkStatus)"
        class="flow-dot"
        :rx="dotRx"
        ry="3"
      >
        <animateMotion
          dur="3.6s"
          repeatCount="indefinite"
          calcMode="linear"
          keyPoints="0;1;1"
          keyTimes="0;0.2;1"
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
          dur="3.6s"
          repeatCount="indefinite"
          values="1;1;0;0"
          keyTimes="0;0.18;0.2;1"
        />
      </ellipse>

      <!-- 底部各分支路径和对应粒子动画 -->
      <path
        v-for="item in bottomFlowNodes"
        :key="`path-${item.id}`"
        class="flow-path"
        :class="{ 'flow-path-active': isFlowActive(item.flowStatus) }"
        :d="item.path.base"
      />
      <ellipse
        v-for="item in activeBottomFlowNodes"
        :key="`dot-${item.id}`"
        class="flow-dot"
        :rx="dotRx"
        ry="3"
        :style="{ fill: item.color }"
      >
        <animateMotion
          dur="3.6s"
          repeatCount="indefinite"
          calcMode="linear"
          keyPoints="0;0;1"
          keyTimes="0;0.2;1"
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
          dur="3.6s"
          repeatCount="indefinite"
          values="0;0;1;1"
          keyTimes="0;0.2;0.23;1"
        />
      </ellipse>
    </svg>

    <!-- 中央房屋主体 -->
    <div
      class="absolute left-1/2 top-1/2 z-10 h-[39.49%] w-[60%] -translate-x-1/2 -translate-y-1/2"
    >
      <img
        :src="flowIcons.centerHouse"
        alt="House"
        class="h-full w-full object-contain"
      />
    </div>

    <!-- 顶部节点：光伏 -->
    <div
      class="absolute z-20 text-center"
      :style="flowNodeStyleConfig.staticNodes.solar"
    >
      <div class="mx-auto mb-1 flex h-8 w-8 items-center justify-center">
        <img
          :src="flowIcons.solar"
          alt="Solar"
          class="h-8 w-8 object-contain"
        />
      </div>
      <div class="text-[10px] text-[#6C7680] sm:text-[11px] md:text-[12px]">
        Solar
      </div>
      <div
        class="text-[12px] font-semibold text-[#303940] sm:text-[14px] md:text-[15px]"
      >
        {{ formatNumber(powerVo.pv_power)
        }}<span class="text-[10px] font-normal sm:text-[11px]">kW</span>
      </div>
    </div>

    <!-- 左侧节点：电网 -->
    <div
      class="absolute z-20 text-center"
      :style="flowNodeStyleConfig.staticNodes.grid"
    >
      <div class="mx-auto mb-1 flex h-8 w-8 items-center justify-center">
        <img :src="flowIcons.grid" alt="Grid" class="h-8 w-8 object-contain" />
      </div>
      <div class="text-[10px] text-[#6C7680] sm:text-[11px] md:text-[12px]">
        Grid
      </div>
      <div
        class="text-[12px] font-semibold text-[#303940] sm:text-[14px] md:text-[15px]"
      >
        {{ formatNumber(gridPowerDisplay)
        }}<span class="text-[10px] font-normal sm:text-[11px]">kW</span>
      </div>
    </div>

    <!-- 右侧节点：电池 -->
    <div
      class="absolute z-20 text-center"
      :style="flowNodeStyleConfig.staticNodes.battery"
    >
      <div class="mx-auto mb-1 flex h-8 w-8 items-center justify-center">
        <img
          :src="flowIcons.battery"
          alt="Battery"
          class="h-8 w-8 object-contain"
        />
      </div>
      <div class="text-[10px] text-[#6C7680] sm:text-[11px] md:text-[12px]">
        Battery
      </div>
      <div
        class="text-[12px] font-semibold text-[#303940] sm:text-[14px] md:text-[15px]"
      >
        {{ formatNumber(batteryPower)
        }}<span class="text-[10px] font-normal sm:text-[11px]">kW</span>
      </div>
    </div>

    <!-- 底部节点：Wallbox / Heat Pump / Household -->
    <div class="absolute inset-0 z-20 text-center">
      <div
        v-for="item in bottomFlowNodes"
        :key="item.id"
        class="absolute text-center"
        :style="
          flowNodeStyleConfig.bottomById[item.id] ??
          flowNodeStyleConfig.bottomDefault
        "
      >
        <div class="mx-auto mb-1 flex h-8 w-8 items-center justify-center">
          <img
            :src="item.icon"
            :alt="item.label"
            class="h-8 w-8 object-contain"
          />
        </div>
        <div class="text-[10px] text-[#6C7680] sm:text-[11px] md:text-[12px]">
          {{ item.label }}
        </div>
        <div
          class="text-[12px] font-semibold text-[#303940] sm:text-[14px] md:text-[15px]"
        >
          {{ formatNumber(item.power)
          }}<span class="text-[10px] font-normal sm:text-[11px]">kW</span>
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
  vector-effect: non-scaling-stroke;
}

.flow-path-active {
  stroke: #55a2df;
}

.flow-dot {
  filter: drop-shadow(0 0 4px rgb(85 162 223 / 30%));
  fill: #55a2df;
}
</style>
