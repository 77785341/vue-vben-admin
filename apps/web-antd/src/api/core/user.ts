import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

export type UserInfoWithAccessCodes = {
  installer?: {
    avatar?: null | string;
    email?: null | string;
    installerId?: string;
    installerInfoId?: string;
    loginName?: string;
  };
  /**
   * 后端在用户信息接口返回权限码
   */
  permissions?: string[];
} & UserInfo;

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfoWithAccessCodes>('/auth/info');
}
