<script lang="ts" setup>
import { Button, Select } from 'ant-design-vue';

import { $t } from '#/locales';

defineProps<{
  deviceCards: Array<{
    faultNum: number;
    id: string;
    image?: string;
    key: string;
    sn: string;
    status: string;
    title: string;
    typeKey: string;
  }>;
  deviceType?: string;
  deviceTypeOptions?: Array<{ label: string; value: string }>;
}>();

const emit = defineEmits<{
  create: [];
  delete: [id: string, typeKey: string];
  reset: [];
  search: [];
  'update:deviceType': [value: string | undefined];
}>();

const actionIcons = {
  delete: '/images/family/family-device-action-delete@2x.png',
  view: '/images/family/family-device-action-view@2x.png',
};
</script>

<template>
  <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
    <div class="mb-4 flex items-center gap-2">
      <Select
        :options="deviceTypeOptions"
        :value="deviceType"
        class="device-filter-select w-[180px]"
        :placeholder="$t('page.family.deviceType')"
        allow-clear
        @update:value="
          emit('update:deviceType', ($event as string | undefined) || undefined)
        "
      />
      <Button
        class="device-filter-btn device-filter-btn-soft"
        @click="emit('reset')"
      >
        {{ $t('common.reset') }}
      </Button>
      <Button
        class="device-filter-btn device-filter-btn-soft"
        @click="emit('search')"
      >
        {{ $t('common.query') }}
      </Button>
      <Button
        class="device-filter-btn device-filter-btn-primary"
        type="primary"
        @click="emit('create')"
      >
        {{ $t('common.create') }}
      </Button>
    </div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="item in deviceCards"
        :key="item.key"
        class="device-card flex flex-col rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
      >
        <div class="flex flex-1 items-start gap-3">
          <div class="device-image-wrap shrink-0">
            <img
              :src="
                item.image || '/images/family/family-device-inverter@2x.png'
              "
              :alt="item.title"
              class="device-image"
            />
          </div>
          <div class="flex min-w-0 flex-1 flex-col">
            <div class="text-[17px] font-bold leading-snug text-[#1a2636]">
              {{ item.title }}
            </div>
            <div
              class="mt-2 break-all text-[13px] leading-normal text-[#7a8fa6]"
            >
              {{ item.sn }}
            </div>
            <div class="mt-2 flex flex-wrap items-center gap-x-4 text-[13px]">
              <!-- prettier-ignore -->
              <span v-if="item.status === 'online'" class="text-[#22c55e]">● {{ $t('page.family.online') }}</span>
              <!-- prettier-ignore -->
              <span v-else class="text-[#94a3b8]">● {{ $t('page.family.offline') }}</span>
              <!-- prettier-ignore -->
              <span v-if="Number(item.faultNum) > 0" class="text-[#ff6b6b]">● {{ $t('page.family.fault') }} {{ item.faultNum }}</span>
            </div>
          </div>
        </div>
        <div class="mt-4 grid grid-cols-2 gap-3">
          <button
            class="device-action-btn device-action-delete"
            @click="emit('delete', item.id, item.typeKey)"
          >
            <img :src="actionIcons.delete" alt="delete" class="action-icon" />
            {{ $t('common.delete') }}
          </button>
          <button class="device-action-btn device-action-view">
            <img :src="actionIcons.view" alt="view" class="action-icon" />
            View
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.device-filter-select :deep(.ant-select-selector) {
  height: 36px !important;
  border-radius: 6px !important;
}

.device-filter-select :deep(.ant-select-selection-item),
.device-filter-select :deep(.ant-select-selection-placeholder) {
  line-height: 34px !important;
}

.device-filter-btn {
  height: 36px;
  padding: 0 14px;
  line-height: 34px;
  border-radius: 6px;
}

.device-filter-btn-soft {
  color: #2e7fbe !important;
  background: #e8f2fd !important;
  border-color: #9ec1e8 !important;
  box-shadow: none !important;
}

.device-filter-btn-soft:hover {
  color: #2e7fbe !important;
  background: #deecfa !important;
  border-color: #89b4e3 !important;
}

.device-filter-btn-soft:active {
  color: #2e7fbe !important;
  background: #d4e6f8 !important;
  border-color: #7aaadc !important;
}

.device-filter-btn-primary {
  color: #fff !important;
  background: #2e7fbe !important;
  border-color: #2e7fbe !important;
  box-shadow: none !important;
}

.device-filter-btn-primary:hover {
  color: #fff !important;
  background: #3b8fce !important;
  border-color: #3b8fce !important;
}

.device-filter-btn-primary:active {
  color: #fff !important;
  background: #256fab !important;
  border-color: #256fab !important;
}

.device-card {
  min-height: 0;
}

.device-image-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 110px;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
}

.device-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.device-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid;
  border-radius: 999px;
}

.device-action-delete {
  color: #ff7b7b;
  background: #fff7f7;
  border-color: #fecaca;
}

.device-action-view {
  color: #4a90e2;
  background: #f3f9ff;
  border-color: #bfdbfe;
}

.action-icon {
  width: 14px;
  height: 14px;
  margin-right: 4px;
  object-fit: contain;
}
</style>
