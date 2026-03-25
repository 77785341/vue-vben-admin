<script lang="ts" setup>
import { Button } from 'ant-design-vue';

defineProps<{
  deviceCards: Array<{
    fault: string;
    key: string;
    sn: string;
    status: string;
    title: string;
  }>;
}>();
</script>

<template>
  <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
    <div class="mb-3 flex items-center gap-2">
      <Button size="small">设备类型</Button>
      <Button size="small">重置</Button>
      <Button size="small" type="primary">查询</Button>
      <Button size="small" type="primary">添加</Button>
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="item in deviceCards"
        :key="item.key"
        class="rounded-xl border border-slate-100 bg-slate-50 p-3"
      >
        <div class="mb-2 text-sm font-semibold text-slate-700">
          {{ item.title }}
        </div>
        <div class="text-xs text-slate-400">{{ item.sn }}</div>
        <div class="mt-2 flex items-center gap-4 text-xs">
          <span class="text-emerald-500">● {{ item.status }}</span>
          <span class="text-rose-400">● {{ item.fault }}</span>
        </div>
        <div class="mt-3 flex gap-2">
          <Button danger size="small">Delete</Button>
          <Button size="small">View</Button>
        </div>
      </div>
    </div>
  </div>
</template>
