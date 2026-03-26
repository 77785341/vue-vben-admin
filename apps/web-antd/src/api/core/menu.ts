/*
 * @Author: Felix 77785341@qq.com
 * @Date: 2026-03-23 15:54:59
 * @LastEditors: Felix 77785341@qq.com
 * @LastEditTime: 2026-03-26 13:52:19
 * @FilePath: \vue-vben-admin\apps\web-antd\src\api\core\menu.ts
 * @Description:
 *
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved.
 */
import type { RouteRecordStringComponent } from '@vben/types';

import { requestClient } from '#/api/request';

function normalizeMenus(
  menus: RouteRecordStringComponent[],
): RouteRecordStringComponent[] {
  return (menus || []).map((menu) => {
    const rawMeta = (menu as any).meta ?? {};

    const normalized = {
      ...menu,
      meta: {
        ...rawMeta,
      },
      children: Array.isArray(menu.children)
        ? normalizeMenus(menu.children)
        : [],
      component: menu.component ?? '',
    } as RouteRecordStringComponent;

    // 避免后端返回自重定向（path === redirect）触发路由递归。
    if (normalized.redirect && normalized.redirect === normalized.path) {
      delete normalized.redirect;
    }

    return normalized;
  });
}

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  const menus =
    await requestClient.get<RouteRecordStringComponent[]>('/menus/user');
  return normalizeMenus(menus);
}
