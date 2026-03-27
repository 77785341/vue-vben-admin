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
    class="grid w-full max-w-[560px] grid-cols-2 content-center auto-rows-max gap-[55px] self-center justify-self-end"
  >
    <div
      v-for="item in summaryCards"
      :key="item.label"
      class="grid min-h-[118px] grid-cols-[86px_1fr] items-center gap-3 px-3 py-2"
    >
      <div
        class="flex h-[86px] w-[86px] shrink-0 items-center justify-center rounded-lg"
      >
        <img
          :src="item.icon"
          :alt="item.label"
          class="h-[86px] w-[86px] object-contain"
        />
      </div>
      <div>
        <div class="text-[12px] text-[#9EA8B2]">{{ item.label }}</div>
        <div
          class="mt-1 text-[clamp(18px,1.8vw,28px)] font-semibold leading-none text-[#237EBC]"
        >
          <!-- prettier-ignore -->
          {{ item.value }}
          <span
            class="ml-1 text-[clamp(11px,0.9vw,13px)] font-normal text-[#237EBC]"
            >{{ item.unit }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
