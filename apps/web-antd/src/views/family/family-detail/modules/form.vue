<!--
 * @Author: Felix 77785341@qq.com
 * @Date: 2026-03-20 14:00:00
 * @LastEditors: Felix 77785341@qq.com
 * @LastEditTime: 2026-03-20 14:00:00
 * @FilePath: \vue-vben-admin\apps\web-antd\src\views\family\family-detail\modules\form.vue
 * @Description:
 *
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved.
-->
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { updateFamily } from '#/api/family/family';
import { $t } from '#/locales';

import { useFormSchema } from '../../data';

const emit = defineEmits<{
  success: [];
}>();

const _isUpdate = ref(true);
const rowId = ref<string>('');

// 计算表单配置
const formSchema = computed(() => {
  return useFormSchema();
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
      await updateFamily(rowId.value, values);
      emit('success');
      drawerApi.close();
    } finally {
      drawerApi.setState({ loading: false });
    }
  },
  onOpenChange: async (isOpen: boolean) => {
    if (!isOpen) return;

    const data = drawerApi.getData<any>();
    if (data?.id) {
      rowId.value = data.id;
      await formApi.setValues(data);
    } else {
      rowId.value = '';
      await formApi.resetForm();
    }
  },
  title: $t('ui.actionTitle.edit', [$t('page.family.name')]),
});
</script>

<template>
  <Drawer>
    <Form />
  </Drawer>
</template>
