<script lang="ts" setup>
import type { FaultTab } from '../types';

import { Segmented } from 'ant-design-vue';

import { useFaultInfoPanelLogic } from './logic/useFaultInfoPanelLogic';

const props = defineProps<{
  activeTab: string;
  currentFaultTab: FaultTab;
  faultTabs: Array<{ label: string; value: string }>;
  historyFaultGrid: any;
  realtimeFaultGrid: any;
}>();

const emit = defineEmits<{
  'update:currentFaultTab': [value: FaultTab];
}>();

const { updateCurrentFaultTab } = useFaultInfoPanelLogic(emit);
</script>

<template>
  <div v-if="props.activeTab === 'fault'" class="-mt-4">
    <div class="overflow-x-auto">
      <component
        :is="props.realtimeFaultGrid"
        v-if="props.currentFaultTab === 'realtime'"
      >
        <template #reset-before>
          <Segmented
            :value="props.currentFaultTab"
            :options="props.faultTabs"
            class="fault-tab-segmented"
            @update:value="updateCurrentFaultTab"
          />
        </template>
        <template #fault-type="{ row }">
          <div
            v-if="row.faultType === 'Error'"
            class="inline-flex items-center gap-1 text-red-500"
          >
            <span class="inline-block size-2 rounded-full bg-red-500"></span>
            Error
          </div>
          <div
            v-else-if="row.faultType === 'Warning'"
            class="inline-flex items-center gap-1 text-orange-500"
          >
            <span class="inline-block size-2 rounded-full bg-orange-500"></span>
            Warning
          </div>
        </template>
        <template #fault-status="{ row }">
          <span
            v-if="row.status === 'UNRESOLVED'"
            class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
          >
            UNRESOLVED
          </span>
          <span
            v-else-if="row.status === 'RESOLVED'"
            class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
          >
            RESOLVED
          </span>
        </template>
      </component>

      <component
        :is="props.historyFaultGrid"
        v-else-if="props.currentFaultTab === 'history'"
      >
        <template #reset-before>
          <Segmented
            :value="props.currentFaultTab"
            :options="props.faultTabs"
            class="fault-tab-segmented"
            @update:value="updateCurrentFaultTab"
          />
        </template>
        <template #fault-type="{ row }">
          <div
            v-if="row.faultType === 'Error'"
            class="inline-flex items-center gap-1 text-red-500"
          >
            <span class="inline-block size-2 rounded-full bg-red-500"></span>
            Error
          </div>
          <div
            v-else-if="row.faultType === 'Warning'"
            class="inline-flex items-center gap-1 text-orange-500"
          >
            <span class="inline-block size-2 rounded-full bg-orange-500"></span>
            Warning
          </div>
        </template>
        <template #fault-status="{ row }">
          <span
            v-if="row.status === 'UNRESOLVED'"
            class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
          >
            UNRESOLVED
          </span>
          <span
            v-else-if="row.status === 'RESOLVED'"
            class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
          >
            RESOLVED
          </span>
        </template>
      </component>
    </div>
  </div>
</template>
