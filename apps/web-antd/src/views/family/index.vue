<script lang="ts" setup>
import type { Recordable } from '@vben/types';

import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { FamilyApi } from '#/api/family/family';

import { onMounted } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { Button, message, Modal } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteFamily, getFamilyList } from '#/api/family';
import { $t } from '#/locales';

import { useColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: Form,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  separator: false,
  formOptions: {
    schema: useGridFormSchema(),
    submitOnChange: true,
    showCollapseButton: false,
    actionWrapperClass: 'pb-0',
    layout: 'inline',
    wrapperClass: 'grid-cols-4 pb-0',
    commonConfig: {
      // 所有表单项
      componentProps: {
        class: 'grid-cols-4 pb-0',
      },
      formItemClass: 'grid-cols-4 pb-0',
      hideLabel: true,
    },
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
    case 'delete': {
      onDelete(e.row);
      break;
    }
    case 'edit': {
      onEdit(e.row);
      break;
    }
  }
}

/**
 * 将Antd的Modal.confirm封装为promise，方便在异步函数中调用。
 * @param content 提示内容
 * @param title 提示标题
 */
function confirm(content: string, title: string) {
  return new Promise((reslove, reject) => {
    Modal.confirm({
      content,
      onCancel() {
        reject(new Error('已取消'));
      },
      onOk() {
        reslove(true);
      },
      title,
    });
  });
}

/**
 * 状态开关即将改变
 * @param newStatus 期望改变的状态值
 * @param row 行数据
 * @returns 返回false则中止改变，返回其他值（undefined、true）则允许改变
 */
async function onStatusChange(newStatus: 'off' | 'on' | number) {
  const status: Recordable<string> = {
    off: '禁用',
    on: '启用',
  };
  try {
    // 将数字状态转换为字符串
    const statusValue = newStatus === 1 ? 'on' : 'off';
    await confirm(
      `你要将状态切换为 【${status[statusValue] || '未知状态'}】 吗？`,
      `切换状态`,
    );
    // 由于staff接口没有单独的状态更新方法，这里可以在后续添加
    return true;
  } catch {
    return false;
  }
}

async function onEdit(row: FamilyApi.Family) {
  // 打开编辑抽屉
  formDrawerApi.setData(row).open();
}
function onDelete(row: FamilyApi.Family) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.installerStationName]),
    duration: 0,
    key: 'action_process_msg',
  });
  deleteFamily(row.id.toString())
    .then(() => {
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [
          row.installerStationName,
        ]),
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

// function onRoleSelectSuccess() {
//   onRefresh();
// }

function onCreate() {
  formDrawerApi.setData({}).open();
}

// 组件挂载时初始化
onMounted(() => {
  // 家庭列表会自动加载
});
</script>
<template>
  <Page auto-content-height>
    <FormDrawer @success="onRefresh" />
    <Grid>
      <template #submit-before>
        <Button type="primary" @click="onCreate">添加</Button>
      </template>
    </Grid>
  </Page>
</template>
