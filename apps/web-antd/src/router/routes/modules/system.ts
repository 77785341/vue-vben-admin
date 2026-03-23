/*
 * @Author: Felix 77785341@qq.com
 * @Date: 2026-03-12 13:29:41
 * @LastEditors: Felix 77785341@qq.com
 * @LastEditTime: 2026-03-12 15:25:45
 * @FilePath: \vue-vben-admin\apps\web-antd\src\router\routes\modules\system.ts
 * @Description:
 *
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved.
 */
import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:settings',
      order: 200,
      title: $t('page.system.title'),
    },
    name: 'System',
    path: '/system',
    children: [
      {
        name: 'SystemRole',
        path: '/system/role',
        component: () => import('#/views/system/role/index.vue'),
        meta: {
          icon: 'lucide:user-cog',
          title: $t('page.system.role'),
        },
      },
      {
        name: 'SystemMenu',
        path: '/system/menu',
        component: () => import('#/views/system/menu/index.vue'),
        meta: {
          icon: 'lucide:menu',
          title: $t('page.system.menu'),
        },
      },
    ],
  },
];

export default routes;
