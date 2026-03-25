<script lang="ts" setup>
defineProps<{
  createTime: string;
  customerName: string;
  familyId: string;
  onlineInfo: { dot: string; label: string; text: string };
  stationAddress: string;
  stationName: string;
  stationPicture: string;
}>();
</script>

<template>
  <div class="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
    <div class="overflow-hidden rounded-xl bg-slate-100">
      <img
        v-if="stationPicture"
        :src="stationPicture"
        :alt="stationName"
        class="mx-auto h-[224px] w-[374px] object-cover"
      />
      <div
        v-else
        class="mx-auto flex h-[224px] w-[374px] items-center justify-center text-slate-400"
      >
        暂无图片
      </div>
    </div>
    <div class="mt-2 space-y-2">
      <div class="flex items-center gap-2 text-slate-700">
        <span class="text-[20px] leading-none font-semibold">{{
          stationName
        }}</span>
        <span
          class="mt-1 inline-flex -translate-y-px items-center gap-1.5 text-[14px]"
          :class="onlineInfo.text"
        >
          <span
            class="inline-block size-2 rounded-full"
            :class="onlineInfo.dot"
          ></span>
          {{ onlineInfo.label }}
        </span>
      </div>
      <div class="flex items-center text-xl text-slate-500">
        <span class="mr-2 inline-block h-4 w-4 rounded bg-slate-200"></span>
        <span>{{ stationAddress }}</span>
      </div>
      <div class="flex items-center text-xl text-slate-500">
        <span class="mr-2 inline-block h-4 w-4 rounded bg-slate-200"></span>
        <span>{{ createTime || '--' }}</span>
      </div>
      <div class="flex items-center text-xl text-slate-500">
        <span class="mr-2 inline-block h-4 w-4 rounded bg-slate-200"></span>
        <span>{{ customerName || 'Mr Li' }}</span>
      </div>
      <div class="flex items-center text-xl text-slate-500">
        <span class="mr-2 inline-block h-4 w-4 rounded bg-slate-200"></span>
        <span>{{ familyId || '--' }}</span>
      </div>
    </div>
  </div>
</template>
