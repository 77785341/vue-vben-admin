import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    name: 'Family',
    path: '/family',
    meta: {
      title: $t('page.family.list'),
      icon: 'lucide:home',
      order: 50,
    },
    children: [
      {
        name: 'FamilyList',
        path: '',
        component: () => import('#/views/family/index.vue'),
        meta: {
          title: $t('page.family.list'),
          hideInMenu: true,
        },
      },
      {
        name: 'FamilyDetail',
        path: 'detail',
        component: () => import('#/views/family/family-detail/index.vue'),
        meta: {
          title: $t('page.family.detail'),
          hideInMenu: true,
          activeMenu: '/family',
        },
      },
    ],
  },
];

export default routes;
