/*
 * @Author: Felix 77785341@qq.com
 * @Date: 2026-03-23 15:15:46
 * @LastEditors: Felix 77785341@qq.com
 * @LastEditTime: 2026-03-23 16:17:15
 * @FilePath: \vue-vben-admin\apps\web-antd\src\router\routes\modules\demos.ts
 * @Description:
 *
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved.
 */
import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: $t('demos.title'),
    },
    name: 'Demos1',
    path: '/demos',
    children: [
      {
        meta: {
          title: $t('demos.antd'),
        },
        name: 'AntDesignDemos',
        path: '/demos/ant-design',
        component: () => import('#/views/demos/antd/index.vue'),
      },
    ],
  },
];

export default routes;
