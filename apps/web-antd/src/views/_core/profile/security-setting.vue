<script setup lang="ts">
import { computed } from 'vue';

import { ProfileSecuritySetting } from '@vben/common-ui';

import { $t } from '#/locales';

const formSchema = computed(() => {
  return [
    {
      value: true,
      fieldName: 'accountPassword',
      label: $t('page.profile.accountPassword'),
      description: $t('page.profile.passwordStrength'),
    },
    {
      value: true,
      fieldName: 'securityPhone',
      label: $t('page.profile.securityPhone'),
      description: $t('page.profile.boundPhone'),
    },
    {
      value: true,
      fieldName: 'securityQuestion',
      label: $t('page.profile.securityQuestion'),
      description: $t('page.profile.securityQuestionDesc'),
    },
    {
      value: true,
      fieldName: 'securityEmail',
      label: $t('page.profile.backupEmail'),
      description: $t('page.profile.boundEmail'),
    },
    {
      value: false,
      fieldName: 'securityMfa',
      label: $t('page.profile.mfaDevice'),
      description: $t('page.profile.mfaDesc'),
    },
  ];
});
</script>
<template>
  <ProfileSecuritySetting :form-schema="formSchema" />
</template>
