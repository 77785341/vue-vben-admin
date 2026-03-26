<!--
 * @Author: Felix 77785341@qq.com
 * @Date: 2026-03-25 11:56:56
 * @LastEditors: Felix 77785341@qq.com
 * @LastEditTime: 2026-03-26 11:54:02
 * @FilePath: \vue-vben-admin\apps\web-antd\src\views\family\family-detail\modules\trend-statistics-card.vue
 * @Description: 
 * 
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved. 
-->
<script lang="ts" setup>
import { DatePicker } from 'ant-design-vue';

defineProps<{
  trendDate: string;
  trendDateFormat: string;
  trendPeriod: 'day' | 'month' | 'year';
  trendPicker: 'date' | 'month' | 'year';
}>();

const emit = defineEmits<{
  periodChange: [value: 'day' | 'month' | 'year'];
  'update:trendDate': [value: string];
}>();

function handleDateChange(
  value: string | { format: (pattern?: string) => string },
) {
  if (!value) return;
  emit('update:trendDate', typeof value === 'string' ? value : value.format());
}

const periods = [
  { label: '日统计', value: 'day' },
  { label: '月统计', value: 'month' },
  { label: '年统计', value: 'year' },
] as const;
</script>

<template>
  <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
    <div class="trend-filter-bar mb-3 inline-flex items-center gap-3">
      <div class="flex items-center gap-1 rounded-md bg-[#f3f4f6] p-1">
        <button
          v-for="p in periods"
          :key="p.value"
          class="inline-flex h-[28px] cursor-pointer items-center rounded-md px-3 text-sm transition-colors"
          :class="
            trendPeriod === p.value
              ? 'bg-[#1b83d7] text-white'
              : 'text-[#9aa3af] hover:text-[#6b7280]'
          "
          @click="emit('periodChange', p.value)"
        >
          {{ p.label }}
        </button>
      </div>
      <DatePicker
        :allow-clear="false"
        :format="trendDateFormat"
        :picker="trendPicker"
        :value="trendDate"
        :value-format="trendDateFormat"
        class="trend-date-picker w-[170px]"
        placeholder="选择日期"
        size="small"
        @change="handleDateChange"
      />
    </div>
    <div class="h-[310px]">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.trend-filter-bar :deep(.ant-picker) {
  border-color: #d6dbe2;
  border-radius: 6px;
  box-shadow: none;
}

.trend-filter-bar :deep(.trend-date-picker.ant-picker) {
  height: 36px;
}

.trend-filter-bar :deep(.ant-picker-input > input) {
  height: 100%;
  font-size: 14px;
  line-height: 36px;
  color: #6b7280;
}

.trend-filter-bar :deep(.ant-picker-suffix) {
  color: #b4bcc8;
}
</style>
