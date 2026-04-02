<script lang="ts" setup>
import type { Recordable } from '@vben/types';

import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { StaffApi } from '#/api/account/staff';

import { onMounted, ref } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { Button, message, Modal } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteStaff, getAllRoles, getStaffList, updateStaff } from '#/api';
import { $t } from '#/locales';

import { useColumns, useGridFormSchema } from './data';
import AssignRoleForm from './modules/assign-role-form.vue';
import Form from './modules/form.vue';

// 定义API基础URL
// const API_BASE_URL = import.meta.env.VITE_GLOB_API_URL;
const API_BASE_URL =
  'https://test-bucket-borochi.s3.eu-central-1.amazonaws.com/';

// 角色列表
const roles = ref<Array<{ id: string; roleName: string }>>([]);

// 获取所有角色
async function fetchRoles() {
  try {
    const response = await getAllRoles();
    roles.value = (response || []).map((role: any) => ({
      id: String(role.id),
      roleName:
        role.roleName ||
        role.rolename ||
        role.name ||
        $t('system.staff.unknownRole'),
    }));
  } catch (error) {
    console.error('获取角色列表失败:', error);
  }
}

// 根据roleId获取角色名称
function getRoleNames(roleId: number | number[] | string | string[]) {
  if (!roleId) return '';
  const ids = Array.isArray(roleId) ? roleId : [roleId];
  return ids
    .map((id) => {
      const role = roles.value.find((r) => String(r.id) === String(id));
      return role ? role.roleName : String(id);
    })
    .join(', ');
}

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: Form,
  destroyOnClose: true,
});

const [AssignRoleDrawer, assignRoleDrawerApi] = useVbenDrawer({
  connectedComponent: AssignRoleForm,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  separator: false,
  formOptions: {
    fieldMappingTime: [['createTime', ['startTime', 'endTime']]],
    schema: useGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(onActionClick, onStatusChange),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }: any, formValues: Record<string, any>) => {
          return await getStaffList({
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
  } as VxeTableGridOptions<StaffApi.Staff>,
});

function onActionClick(e: OnActionClickParams<StaffApi.Staff>) {
  switch (e.code) {
    case 'assignRole': {
      onAssignRole(e.row);
      break;
    }
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
async function onStatusChange(
  newStatus: 'Active' | 'Inactive' | 'off' | 'on' | number,
  row: StaffApi.Staff,
) {
  const status: Recordable<string> = {
    Inactive: $t('system.staff.statusOff'),
    Active: $t('system.staff.statusOn'),
  };
  try {
    const statusValue =
      newStatus === 'Active' || newStatus === 1 ? 'Active' : 'Inactive';
    await confirm(
      $t('system.staff.switchStatusContent', [
        status[statusValue] || $t('system.staff.statusUnknown'),
      ]),
      $t('system.staff.switchStatusTitle'),
    );

    const staffId = String((row as any).installerId ?? row.id ?? '');
    await updateStaff(staffId, {
      id: staffId,
      loginName: row.loginName,
      phone: row.phone,
      email: row.email,
      state: statusValue,
    } as any);

    message.success($t('common.operationSuccess'));
    onRefresh();
    return true;
  } catch {
    return false;
  }
}

async function onEdit(row: StaffApi.Staff) {
  // 打开编辑抽屉
  formDrawerApi.setData(row).open();
}
async function onAssignRole(row: StaffApi.Staff) {
  // 先获取角色选项，确保数据已加载
  assignRoleDrawerApi.setData(row).open();
}
function onDelete(row: StaffApi.Staff) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.loginName]),
    duration: 0,
    key: 'action_process_msg',
  });
  deleteStaff(row.id)
    .then(() => {
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [row.loginName]),
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

// 组件挂载时获取角色列表
onMounted(() => {
  fetchRoles();
});
</script>
<template>
  <Page auto-content-height>
    <FormDrawer @success="onRefresh" />
    <AssignRoleDrawer @success="onRefresh" />
    <Grid>
      <template #expand-before>
        <Button type="primary" @click="onCreate">
          {{ $t('system.staff.add') }}
        </Button>
      </template>
      <template #image-url="{ row }">
        <div class="flex-center h-full">
          <img
            v-if="(row as any).avatar"
            :src="API_BASE_URL + (row as any).avatar"
            :alt="row.loginName"
            class="size-10 rounded-full object-cover"
          />
          <div v-else class="flex-center size-10 rounded-full bg-gray-200">
            {{ row.loginName?.charAt(0) || '?' }}
          </div>
        </div>
      </template>
      <template #role-names="{ row }">
        {{ getRoleNames(row.roleIds || []) }}
      </template>
    </Grid>
  </Page>
</template>
