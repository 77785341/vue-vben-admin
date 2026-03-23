/*
 * @Author: Felix 77785341@qq.com
 * @Date: 2026-03-12 14:16:24
 * @LastEditors: Felix 77785341@qq.com
 * @LastEditTime: 2026-03-19 10:40:43
 * @FilePath: \vue-vben-admin\apps\web-antd\src\api\system\role.ts
 * @Description:
 *
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved.
 */
import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SystemRoleApi {
  export interface SystemRole {
    [key: string]: any;
    id: string;
    name: string;
    roleCode: string;
    permissions: string[];
    /** 角色描述 */
    description?: string;
    /** 排序 */
    sort?: number;
    /** 状态 */
    status: 'off' | 'on';
  }
}

/**
 * 获取角色列表数据
 */
async function getRoleList(params?: Recordable<any>) {
  return requestClient.get<Array<SystemRoleApi.SystemRole>>('/roles', {
    params,
  });
}

/**
 * 获取角色详情
 * @param id 角色ID
 */
async function getRoleById(id: string) {
  return requestClient.get<SystemRoleApi.SystemRole>(`/roles/${id}`);
}

/**
 * 创建角色
 * @param data 角色数据
 */
async function createRole(data: Omit<SystemRoleApi.SystemRole, 'id'>) {
  return requestClient.post('/roles', data);
}

/**
 * 更新角色
 *
 * @param id 角色 ID
 * @param data 角色数据
 */
async function updateRole(
  id: string,
  data: Omit<SystemRoleApi.SystemRole, 'id'>,
) {
  return requestClient.put(`/roles/${id}`, data);
}

/**
 * 删除角色
 * @param id 角色 ID
 */
async function deleteRole(id: string) {
  return requestClient.delete(`/roles/${id}`);
}

/**
 * 获取所有角色
 */
async function getAllRoles() {
  return requestClient.get<Array<SystemRoleApi.SystemRole>>('/roles/all');
}
export {
  createRole,
  deleteRole,
  getAllRoles,
  getRoleById,
  getRoleList,
  updateRole,
};
