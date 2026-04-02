<script lang="ts" setup>
import type { OnActionClickParams, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { PvStorageApi } from '#/api/pv-storage/pv-storage';

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getInverterDevicePage } from '#/api';

import { useColumns, useGridFormSchema } from './data';

const router = useRouter();

const [Grid] = useVbenVxeGrid({
  separator: false,
  formOptions: {
    schema: useGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getInverterDevicePage({
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    cellConfig: {
      height: 60,
    },
    rowConfig: {
      keyField: 'id',
    },
    toolbarConfig: {
      custom: false,
      export: false,
      refresh: false,
      search: false,
      zoom: false,
    },
  } as VxeTableGridOptions<PvStorageApi.InverterDeviceItem>,
});

function onActionClick(e: OnActionClickParams<PvStorageApi.InverterDeviceItem>) {
  switch (e.code) {
    case 'view': {
      onView(e.row);
      break;
    }
  }
}

function onView(row: PvStorageApi.InverterDeviceItem) {
  router.push({
    name: 'PvStorageDetail',
    query: {
      sn: String(row.inverterSn),
      type: 'inverter',
    },
  });
}

// 组件挂载时初始化
onMounted(() => {
  // 列表会自动加载
});
</script>
<template>
  <Page auto-content-height>
    <Grid>
      <template #fault-type="{ row }">
        <div
          v-if="row.faultType === 'Error'"
          class="inline-flex items-center gap-2 text-red-400 font-medium"
        >
          <span class="inline-block size-2 rounded-full bg-red-400 ring-2 ring-red-100"></span>
          <span>故障</span>
        </div>
        <div
          v-else-if="row.faultType === 'Warning'"
          class="inline-flex items-center gap-2 text-orange-400 font-medium"
        >
          <span
            class="inline-block size-2 rounded-full bg-orange-400 ring-2 ring-orange-100"
          ></span>
          <span>警告</span>
        </div>
        <div
          v-else-if="row.faultType === 'Normal'"
          class="inline-flex items-center gap-2 text-emerald-400 font-medium"
        >
          <span
            class="inline-block size-2 rounded-full bg-emerald-400 ring-2 ring-emerald-100"
          ></span>
          <span>正常</span>
        </div>
        <span v-else class="text-slate-400">-</span>
      </template>
      <template #online-status="{ row }">
        <div
          v-if="row.status === 'online'"
          class="inline-flex items-center gap-2 text-emerald-400 font-medium"
        >
          <span
            class="inline-block size-2 rounded-full bg-emerald-400 ring-2 ring-emerald-100"
          ></span>
          <span>Online</span>
        </div>
        <div
          v-else-if="row.status === 'offline'"
          class="inline-flex items-center gap-2 text-slate-400 font-medium"
        >
          <span class="inline-block size-2 rounded-full bg-slate-400 ring-2 ring-slate-100"></span>
          <span>Offline</span>
        </div>
        <span v-else class="text-slate-400">-</span>
      </template>
    </Grid>
  </Page>
</template>
