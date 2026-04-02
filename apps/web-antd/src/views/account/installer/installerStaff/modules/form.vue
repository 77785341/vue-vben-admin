<!--
 * @Author: Felix 77785341@qq.com
 * @Date: 2026-03-18 13:42:51
 * @LastEditors: Felix 77785341@qq.com
 * @LastEditTime: 2026-03-19 18:36:27
 * @FilePath: \vue-vben-admin\apps\web-antd\src\views\account\installer\installerStaff\modules\form.vue
 * @Description:
 *
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved.
-->
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { createStaff, updateStaff } from '#/api/account/staff';
import { getAllRoles } from '#/api/system/role';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits<{
  success: [];
}>();

const isUpdate = ref(false);
const rowId = ref<string>('');
const installerInfoId = ref<string>('');
const deptOptions = ref<{ label: string; value: string }[]>([]);
const roleOptions = ref<{ label: string; value: string }[]>([]);

// 获取部门选项
async function fetchDeptOptions() {
  try {
    // 这里需要添加获取部门列表的接口调用
    // 暂时使用空数组
    deptOptions.value = [];
  } catch (error) {
    console.error('获取部门选项失败:', error);
    deptOptions.value = [];
  }
}

// 获取角色选项
async function fetchRoleOptions() {
  try {
    const response = await getAllRoles();
    roleOptions.value = (response.data || []).map((role: any) => ({
      label: role.rolename || role.name || '未知角色',
      value: String(role.id),
    }));
  } catch (error) {
    console.error('获取角色选项失败:', error);
    roleOptions.value = [];
  }
}

// 计算表单配置，传入部门和角色选项
const formSchema = computed(() => {
  return useFormSchema(deptOptions.value, roleOptions.value, isUpdate.value);
});

// 创建响应式的表单选项
const formOptions = reactive({
  commonConfig: {
    formItemClass: 'col-span-1',
  },
  schema: formSchema,
  showDefaultActions: false,
  wrapperClass: 'grid-cols-1 gap-4',
  itemProps: {
    style: {
      width: '100%',
    },
  },
});

const [Form, formApi] = useVbenForm(formOptions);

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    const { valid } = await formApi.validate();
    if (!valid) return;

    try {
      drawerApi.setState({ loading: true });
      const values = await formApi.getValues();
      // 添加installerInfoId参数
      const submitValues = {
        ...values,
        id: String(values.id ?? rowId.value ?? ''),
        installerInfoId: installerInfoId.value,
      };
      await (isUpdate.value
        ? updateStaff(rowId.value, submitValues)
        : createStaff(submitValues as any));
      emit('success');
      drawerApi.close();
    } finally {
      drawerApi.setState({ loading: false });
    }
  },
  onOpenChange: async (isOpen: boolean) => {
    if (!isOpen) return;

    // 获取部门和角色选项
    await Promise.all([fetchDeptOptions(), fetchRoleOptions()]);

    const data = drawerApi.getData<any>();
    isUpdate.value = !!(data?.installerId ?? data?.id);

    // 获取installerInfoId参数
    if (data?.installerInfoId) {
      installerInfoId.value = data.installerInfoId;
    }

    if (isUpdate.value && data) {
      rowId.value = String(data.installerId ?? data.id ?? '');
      await formApi.setValues({
        ...data,
        id: String(data.installerId ?? data.id ?? ''),
      });
    } else {
      rowId.value = '';
      await formApi.resetForm();
    }
  },
  title: isUpdate.value
    ? $t('ui.actionTitle.edit', [$t('system.staff.name')])
    : $t('ui.actionTitle.create', [$t('system.staff.name')]),
});
</script>

<template>
  <Drawer>
    <Form />
  </Drawer>
</template>
