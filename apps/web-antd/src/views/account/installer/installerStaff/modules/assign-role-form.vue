<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { assignRoleToInstaller, getAllRoles } from '#/api';
import { $t } from '#/locales';

const emit = defineEmits<{
  success: [];
}>();

const rowId = ref<string>('');

function normalizeToArray<T>(value: T | T[] | undefined) {
  if (Array.isArray(value)) {
    return value;
  }
  if (value !== undefined && value !== null && value !== '') {
    return [value];
  }
  return [] as T[];
}

const [Form, formApi] = useVbenForm({
  schema: [
    {
      component: 'ApiSelect',
      componentProps: {
        api: getAllRoles,
        class: 'w-full',
        labelField: 'roleName',
        valueField: 'id',
      },
      fieldName: 'roleId',
      label: $t('system.staff.role'),
      rules: 'required',
    },
  ],
  showDefaultActions: false,
});

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
      const roleId = normalizeToArray(values.roleId);
      await assignRoleToInstaller(rowId.value, roleId);
      emit('success');
      drawerApi.close();
    } finally {
      drawerApi.setState({ loading: false });
    }
  },
  onOpenChange: async (isOpen: boolean) => {
    if (!isOpen) return;

    const data = drawerApi.getData<any>();
    rowId.value = data?.id;
    const roleIds = normalizeToArray(data?.roleIds);
    await formApi.setValues({ roleId: roleIds[0] ?? undefined });
  },
  title: $t('system.staff.assignRole'),
});
</script>

<template>
  <Drawer>
    <Form />
  </Drawer>
</template>
