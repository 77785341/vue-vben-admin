<!--
 * @Author: Felix 77785341@qq.com
 * @Date: 2026-03-11 16:39:30
 * @LastEditors: Felix 77785341@qq.com
 * @LastEditTime: 2026-03-27 13:57:23
 * @FilePath: \vue-vben-admin\apps\web-antd\src\views\_core\authentication\login.vue
 * @Description:
 *
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved.
-->
<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import { computed, markRaw } from 'vue';

import { AuthenticationLogin, SliderCaptcha, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      fieldName: 'loginName',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    {
      component: markRaw(SliderCaptcha),
      fieldName: 'captcha',
      rules: z.boolean().refine((value) => value, {
        message: $t('authentication.verifyRequiredTip'),
      }),
    },
  ];
});
</script>

<template>
  <AuthenticationLogin
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    :show-code-login="false"
    :show-forget-password="false"
    :show-qrcode-login="false"
    :show-register="false"
    :show-third-party-login="false"
    @submit="authStore.authLogin"
  >
    <template #title>
      <div class="mb-7 sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          class="mb-3 text-3xl/9 font-bold tracking-tight text-foreground lg:text-4xl"
        >
          {{ `${$t('authentication.welcomeBack')}` }}
        </h2>
      </div>
    </template>
  </AuthenticationLogin>
</template>
