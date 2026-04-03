<script lang="ts" setup>
import type { LeftSideInfo, StatusIndicator } from '../types';

import { Card } from 'ant-design-vue';

defineProps<{
  leftBindIndicator: StatusIndicator;
  leftSideInfo: LeftSideInfo | null;
  leftStatusIndicator: StatusIndicator;
}>();

function getDotClassByColorClass(colorClass: string) {
  if (colorClass.includes('text-[#237EBC]')) {
    return 'bg-[#237EBC] ring-2 ring-[#237EBC]/20';
  }
  if (colorClass.includes('text-red-500')) {
    return 'bg-red-500 ring-2 ring-red-100';
  }
  if (colorClass.includes('text-orange-400')) {
    return 'bg-orange-400 ring-2 ring-orange-100';
  }
  if (colorClass.includes('text-green-500')) {
    return 'bg-green-500 ring-2 ring-green-100';
  }
  if (colorClass.includes('text-gray-400')) {
    return 'bg-gray-400 ring-2 ring-gray-100';
  }
  return 'bg-slate-400 ring-2 ring-slate-100';
}
</script>

<template>
  <div class="w-[300px] min-w-[260px]">
    <Card>
      <div class="flex flex-col">
        <div class="text-xl font-bold mb-1">
          {{ leftSideInfo?.inverterName || '--' }}
        </div>
        <div class="w-full flex items-center gap-2">
          <span
            class="inline-flex items-center gap-1 text-xs"
            :class="leftSideInfo?.isOnline ? 'text-green-500' : 'text-gray-400'"
          >
            <span
              class="inline-block size-2 rounded-full"
              :class="
                leftSideInfo?.isOnline
                  ? 'bg-green-500 ring-2 ring-green-100'
                  : 'bg-gray-400 ring-2 ring-gray-100'
              "
            ></span>
            {{ leftSideInfo?.isOnline ? 'Online' : 'Offline' }}
          </span>
          <span
            class="inline-flex items-center gap-1 text-xs"
            :class="leftBindIndicator.colorClass"
          >
            <span
              class="inline-block size-2 rounded-full"
              :class="getDotClassByColorClass(leftBindIndicator.colorClass)"
            ></span>
            {{ leftBindIndicator.text }}
          </span>
          <span
            class="inline-flex items-center gap-1 text-xs"
            :class="leftStatusIndicator.colorClass"
          >
            <span
              class="inline-block size-2 rounded-full"
              :class="getDotClassByColorClass(leftStatusIndicator.colorClass)"
            ></span>
            {{ leftStatusIndicator.text }}
          </span>
        </div>
        <div class="flex flex-col gap-2 w-full mt-3">
          <div class="flex items-center gap-2 w-full">
            <img
              src="/images/icon/collector-en@2x.png"
              alt="collector"
              class="h-4 w-4 object-contain"
            />
            <span class="text-xs text-gray-500 flex-1">
              采集器SN: {{ leftSideInfo?.collectorSn || '--' }}
            </span>
          </div>
          <div class="flex items-center gap-2 w-full">
            <img
              src="/images/icon/inverter-en@2x.png"
              alt="inverter"
              class="h-4 w-4 object-contain"
            />
            <span class="text-xs text-gray-500 flex-1">
              逆变器SN: {{ leftSideInfo?.inverterSn || '--' }}
            </span>
          </div>

          <div class="flex items-center gap-2 w-full">
            <img
              src="/images/icon/home-en@2x.png"
              alt="home"
              class="h-4 w-4 object-contain"
            />
            <span class="text-xs text-gray-500 flex-1">{{
              leftSideInfo?.stationName || '--'
            }}</span>
          </div>
          <div class="flex items-center gap-2 w-full">
            <img
              src="/images/icon/time-en@2x.png"
              alt="time"
              class="h-4 w-4 object-contain"
            />
            <span class="text-xs text-gray-500 flex-1">{{
              leftSideInfo?.updatedAt || '--'
            }}</span>
          </div>
          <div class="flex items-center gap-2 w-full">
            <img
              src="/images/icon/installer-en@2x.png"
              alt="installer"
              class="h-4 w-4 object-contain"
            />
            <span class="text-xs text-gray-500 flex-1">{{
              leftSideInfo?.installerInfoName || '--'
            }}</span>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
