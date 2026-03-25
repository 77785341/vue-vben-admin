<!--
 * @Author: Felix 77785341@qq.com
 * @Date: 2026-03-18 13:42:51
 * @LastEditors: Felix 77785341@qq.com
 * @LastEditTime: 2026-03-24 14:21:20
 * @FilePath: \vue-vben-admin\apps\web-antd\src\views\family\modules\form.vue
 * @Description:
 *
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved.
-->
<script lang="ts" setup>
import type { FamilyApi } from '#/api/family/family';

import { computed, reactive, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { createFamily, updateFamily } from '#/api/family';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits<{
  success: [];
}>();

const isUpdate = ref(false);
const rowId = ref<string>('');

const getTitle = computed(() => {
  return isUpdate.value
    ? $t('ui.actionTitle.edit', [$t('page.family.familyName')])
    : $t('ui.actionTitle.create', [$t('page.family.familyName')]);
});

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
  wrapperClass: 'grid-cols-1',
});

const [Form, formApi] = useVbenForm(formOptions);

const [Modal, modalApi] = useVbenModal({
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    const { valid } = await formApi.validate();
    if (!valid) return;

    try {
      modalApi.setState({ loading: true });
      const values =
        (await formApi.getValues()) as FamilyApi.FamilySubmitParams;
      await (isUpdate.value
        ? updateFamily(rowId.value, values)
        : createFamily(values));
      emit('success');
      modalApi.close();
    } finally {
      modalApi.setState({ loading: false });
    }
  },
  onOpenChange: async (isOpen: boolean) => {
    if (!isOpen) return;

    const data = modalApi.getData<any>();
    isUpdate.value = !!data?.id;

    if (isUpdate.value && data) {
      rowId.value = data.id;
      await formApi.setValues(data);
    } else {
      rowId.value = '';
      await formApi.resetForm();
    }
  },
});
</script>

<template>
  <Modal :title="getTitle">
    <Form />
  </Modal>
</template>
