/*
 * @Author: Felix 77785341@qq.com
 * @Date: 2026-03-18 13:40:18
 * @LastEditors: Felix 77785341@qq.com
 * @LastEditTime: 2026-03-19 17:42:07
 * @FilePath: \vue-vben-admin\apps\web-antd\src\api\account\installer.ts
 * @Description:
 *
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved.
 */
import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace InstallerApi {
  export interface Installer {
    id: number;
    installerName: string;
    installerInfoId: string;
    installerPhone: string;
    installerEmail: string;
    country?: string;
    countryId?: string;
    countryName?: string;
  }

  export interface InstallerInfoOption {
    installerInfoId: string;
    installerName: string;
  }
}

/**
 * 获取安装商列表数据 post接口
 */
async function getInstallerList(params?: Recordable<any>) {
  return requestClient.post<{ items: InstallerApi.Installer[]; total: number }>(
    '/installerInfo/getInstallerInfoPage',
    params,
  );
}

/**
 * 创建安装商
 */
async function createInstaller(data: Omit<InstallerApi.Installer, 'id'>) {
  return requestClient.post<InstallerApi.Installer>(
    '/installerInfo/saveInstallerInfo',
    data,
  );
}

/**
 * 更新安装商
 */
async function updateInstaller(data: Partial<InstallerApi.Installer>) {
  return requestClient.post(`/installerInfo/updateInstallerInfo`, data);
}

/**
 * 删除安装商
 */
async function deleteInstaller(id: number) {
  return requestClient.delete(`/installerInfo/deleteInstallerInfoById/${id}`);
}

/**
 * 获取安装商信息选项
 */
async function getInstallerInfoOptions() {
  return requestClient.get<{
    items: InstallerApi.InstallerInfoOption[];
    total: number;
  }>('/installerInfo/getInstallerInfoOptions');
}

/**
 * 为人员分配角色
 */
async function assignRoleToInstaller(id: string, roleId: string[]) {
  return requestClient.post(`/installers/assignRoles`, { id, roleId });
}

export const installerAvatarUploadUrl = '/account/installer/avatar';

export {
  assignRoleToInstaller,
  createInstaller,
  deleteInstaller,
  getInstallerInfoOptions,
  getInstallerList,
  updateInstaller,
};
