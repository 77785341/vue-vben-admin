import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    name: 'Installer',
    path: '/installer',
    meta: {
      title: $t('page.account.installer'),
      icon: 'lucide:user',
      order: 40,
    },
    children: [
      {
        name: 'InstallerList',
        path: '/installer',
        component: () => import('#/views/account/installer/index.vue'),
        meta: {
          title: $t('page.account.installer'),
          hideInMenu: true,
        },
      },
      {
        name: 'InstallerStaff',
        path: '/installer/staff',
        component: () =>
          import('#/views/account/installer/installerStaff/index.vue'),
        meta: {
          title: $t('page.account.staff'),
          hideInMenu: true,
          activePath: '/installer',
        },
      },
    ],
  },
  {
    name: 'Staff',
    path: '/staff',
    component: () => import('#/views/account/staff/index.vue'),
    meta: {
      title: $t('page.account.staff'),
      icon: 'lucide:user',
      order: 41,
    },
  },
];

export default routes;
