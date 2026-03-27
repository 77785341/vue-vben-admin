<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { InstallerApi } from '#/api/account/installer';

// 路由跳转页面带着row的installerInfoId
import { useRouter } from 'vue-router';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { Button, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteInstaller, getInstallerList } from '#/api';
import { $t } from '#/locales';

import { useColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const router = useRouter();
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
        query: async ({ page }, formValues) => {
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
    </Grid>
  </Page>
</template>
