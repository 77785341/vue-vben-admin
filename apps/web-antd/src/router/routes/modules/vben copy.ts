/*
 * @Author: Felix 77785341@qq.com
 * @Date: 2026-03-11 16:39:30
 * @LastEditors: Felix 77785341@qq.com
 * @LastEditTime: 2026-03-12 14:06:41
 * @FilePath: \vue-vben-admin\apps\web-antd\src\router\routes\modules\vben.ts
 * @Description:
 *
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved.
 */
import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    name: 'Profile',
    path: '/profile',
    component: () => import('#/views/_core/profile/index.vue'),
    meta: {
      icon: 'lucide:user',
      hideInMenu: true,
      title: $t('page.auth.profile'),
    },
  },
];

export default routes;
