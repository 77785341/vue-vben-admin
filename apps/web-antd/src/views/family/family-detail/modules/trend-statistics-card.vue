<script lang="ts" setup>
import { Button, DatePicker } from 'ant-design-vue';

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
</script>

<template>
  <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
    <div class="mb-3 flex items-center gap-2">
      <Button
        size="small"
        :type="trendPeriod === 'day' ? 'primary' : 'default'"
        @click="emit('periodChange', 'day')"
        >
日统计
</Button>
      <Button
        size="small"
        :type="trendPeriod === 'month' ? 'primary' : 'default'"
        @click="emit('periodChange', 'month')"
        >
月统计
</Button>
      <Button
        size="small"
        :type="trendPeriod === 'year' ? 'primary' : 'default'"
        @click="emit('periodChange', 'year')"
        >
年统计
</Button>
      <DatePicker
        :allow-clear="false"
        :format="trendDateFormat"
        :picker="trendPicker"
        :value="trendDate"
        :value-format="trendDateFormat"
        class="ml-auto w-[150px]"
        size="small"
        @change="handleDateChange"
      />
    </div>
    <div class="h-[310px]">
      <slot></slot>
    </div>
  </div>
</template>
