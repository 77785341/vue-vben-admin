<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { FamilyApi } from '#/api/family/family';

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getFamilyList } from '#/api/family';

import { useColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const API_BASE_URL =
  'https://test-bucket-borochi.s3.eu-central-1.amazonaws.com/';
const router = useRouter();
const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
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
          return await getFamilyList({
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
  } as VxeTableGridOptions<FamilyApi.Family>,
});

function onActionClick(e: OnActionClickParams<FamilyApi.Family>) {
  switch (e.code) {
    case 'view': {
      onView(e.row);
      break;
    }
  }
}

function onView(row: FamilyApi.Family) {
  router.push({
    name: 'FamilyDetail',
    query: {
      stationId: String(row.installerStationId),
      familyId: String(row.id),
    },
  });
}

function onRefresh() {
  gridApi.query();
}

// function onRoleSelectSuccess() {
//   onRefresh();
// }

function onCreate() {
  formModalApi.setData({}).open();
}

// 组件挂载时初始化
onMounted(() => {
  // 家庭列表会自动加载
});
</script>
<template>
  <Page auto-content-height>
    <FormModal @success="onRefresh" />
    <Grid>
      <template #expand-before>
        <Button type="primary" @click="onCreate">添加</Button>
      </template>
      <template #image-url="{ row }">
        <div class="flex-center h-full">
          <img
            v-if="(row as any).installerStationPicture"
            :src="API_BASE_URL + (row as any).installerStationPicture"
            :alt="row.installerStationName"
            class="size-10 rounded-full object-cover"
          />
        </div>
      </template>
      <template #fault-type="{ row }">
        <div
          v-if="row.faultType === 'Error'"
          class="inline-flex items-center gap-2 text-red-400 font-medium"
        >
          <span
            class="inline-block size-2 rounded-full bg-red-400 ring-2 ring-red-100"
          ></span>
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
    </Grid>
  </Page>
</template>
