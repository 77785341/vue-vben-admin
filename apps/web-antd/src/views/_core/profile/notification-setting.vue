<script setup lang="ts">
import { computed } from 'vue';

import { ProfileNotificationSetting } from '@vben/common-ui';

import { $t } from '#/locales';

const formSchema = computed(() => {
  return [
    {
      value: true,
      fieldName: 'accountPassword',
      label: $t('page.profile.accountPassword'),
      description: $t('page.profile.notifyOthers'),
    },
    {
      value: true,
      fieldName: 'systemMessage',
      label: $t('page.profile.systemMessage'),
      description: $t('page.profile.notifySystem'),
    },
    {
      value: true,
      fieldName: 'todoTask',
      label: $t('page.profile.todoTask'),
      description: $t('page.profile.notifyTodo'),
    },
  ];
});
</script>
<template>
  <ProfileNotificationSetting :form-schema="formSchema" />
</template>
