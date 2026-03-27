<script lang="ts" setup>
import { AuthPageLayout } from '@vben/layouts';
</script>

<template>
  <AuthPageLayout
    class="borochi-auth-layout"
    page-description="Management System"
    page-title="Borochi Installer Back-end"
    slogan-image="/images/login/login_house.png"
    :toolbar-list="['language', 'theme']"
  >
    <template #logo></template>
    <!-- 自定义工具栏 -->
    <!-- <template #toolbar></template> -->
  </AuthPageLayout>
</template>

<style scoped>
.borochi-auth-layout :deep(.login-background) {
  background: url('/images/login/login.png') center center / cover no-repeat !important;
  filter: none !important;
}

.borochi-auth-layout :deep(.mr-20.flex-col-center.h-full) {
  margin-right: 0 !important;
}

.borochi-auth-layout :deep(img.animate-float) {
  width: min(620px, 78%);
  height: auto;
  animation: none;
}

.borochi-auth-layout :deep(.mr-20.flex-col-center.h-full > [class~='text-1xl']) {
  margin-top: 16px;
  font-size: clamp(28px, 2vw, 40px);
  font-weight: 700;
  color: #2c3744;
}

.borochi-auth-layout :deep(.mr-20.flex-col-center.h-full > [class~='mt-2']) {
  margin-top: 8px;
  font-size: clamp(18px, 1.2vw, 34px);
  font-weight: 500;
  color: #8f9aa5;
}
</style>
