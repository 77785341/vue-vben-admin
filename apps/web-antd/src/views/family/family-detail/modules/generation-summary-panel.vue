<script lang="ts" setup>
defineProps<{
  summaryCards: Array<{
    icon: string;
    label: string;
    unit: string;
    value: string;
  }>;
}>();
</script>

<template>
  <div
    class="grid w-full max-w-[560px] grid-cols-2 content-center auto-rows-max justify-items-center gap-4 self-center justify-self-center 2xl:justify-items-stretch 2xl:justify-self-end"
  >
    <div
      v-for="item in summaryCards"
      :key="item.label"
      class="grid w-full max-w-[260px] min-h-[clamp(84px,9vw,112px)] grid-cols-[52px_minmax(0,1fr)] items-center gap-2 px-3 py-2 sm:grid-cols-[60px_minmax(0,1fr)] sm:gap-3 lg:grid-cols-[64px_minmax(0,1fr)] 2xl:max-w-none 2xl:grid-cols-[80px_minmax(0,1fr)]"
    >
      <div
        class="flex aspect-square w-full max-w-[52px] items-center justify-center rounded-lg sm:max-w-[60px] lg:max-w-[64px] 2xl:max-w-[80px]"
      >
        <img
          :src="item.icon"
          :alt="item.label"
          class="h-auto w-full object-contain max-h-[52px] max-w-[52px] sm:max-h-[60px] sm:max-w-[60px] lg:max-h-[64px] lg:max-w-[64px] 2xl:max-h-[80px] 2xl:max-w-[80px]"
        />
      </div>
      <div class="min-w-0">
        <div
          :title="item.label"
          class="whitespace-nowrap overflow-visible text-[clamp(9px,0.75vw,12px)] leading-tight text-[#9EA8B2]"
        >
          {{ item.label }}
        </div>
        <div class="mt-1 flex items-baseline whitespace-nowrap text-[#237EBC]">
          <span
            class="text-[clamp(16px,1.6vw,28px)] font-semibold leading-none"
          >
            {{ item.value }}
          </span>
          <span
            class="ml-1 shrink-0 text-[clamp(10px,0.8vw,13px)] font-normal leading-none text-[#237EBC]"
            >{{ item.unit }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
