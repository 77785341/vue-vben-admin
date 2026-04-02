<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { InstallerApi } from '#/api/account/installer';

// 路由跳转页面带着row的installerInfoId
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { Button, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteInstaller, getInstallerList } from '#/api';
import { getCountryList } from '#/api/family';
import { $t } from '#/locales';

import { useColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const router = useRouter();
const countryOptions = ref<Array<{ countryId: string; countryName: string }>>(
  [],
);

async function fetchCountryOptions() {
  try {
    const response = await getCountryList();
    countryOptions.value = (response || []).map((item: any) => ({
      countryId: String(item.countryId ?? item.value ?? ''),
      countryName: String(item.countryName ?? item.label ?? ''),
    }));
  } catch {
    countryOptions.value = [];
  }
}

function getCountryName(country?: string) {
  if (!country) return '-';
  const countryOption = countryOptions.value.find(
    (item) => item.countryId === country,
  );
  if (countryOption) return countryOption.countryName;
  const countryByName = countryOptions.value.find(
    (item) => item.countryName === country,
  );
  if (countryByName) return countryByName.countryName;
  return country;
}

const [FormDrawer, formDrawerApi] = useVbenDrawer({
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
        query: async ({ page }: any, formValues: Record<string, any>) => {
          return await getInstallerList({
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
  } as VxeTableGridOptions<InstallerApi.Installer>,
});

function onActionClick(e: OnActionClickParams<InstallerApi.Installer>) {
  switch (e.code) {
    case 'delete': {
      onDelete(e.row);
      break;
    }
    case 'edit': {
      onEdit(e.row);
      break;
    }
    // view
    case 'view': {
      router.push({
        path: '/installer/staff',
        query: {
          installerInfoId: e.row.installerInfoId,
        },
      });
      break;
    }
  }
}

async function onEdit(row: InstallerApi.Installer) {
  formDrawerApi.setData(row).open();
}
function onDelete(row: InstallerApi.Installer) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.installerName]),
    duration: 0,
    key: 'action_process_msg',
  });
  deleteInstaller(row.id)
    .then(() => {
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [row.installerName]),
        key: 'action_process_msg',
      });
      onRefresh();
    })
    .catch(() => {
      hideLoading();
    });
}

function onRefresh() {
  gridApi.query();
}

function onCreate() {
  formDrawerApi.setData({}).open();
}

onMounted(() => {
  fetchCountryOptions();
});
</script>
<template>
  <Page auto-content-height>
    <FormDrawer @success="onRefresh" />
    <Grid>
      <template #expand-before>
        <Button type="primary" @click="onCreate">
          {{ $t('common.create') }}
        </Button>
      </template>
      <template #country-name="{ row }">
        {{ getCountryName((row as any).country ?? (row as any).countryId) }}
      </template>
    </Grid>
  </Page>
</template>
