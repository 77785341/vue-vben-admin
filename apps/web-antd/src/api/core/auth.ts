/*
 * @Author: Felix 77785341@qq.com
 * @Date: 2026-03-11 16:39:30
 * @LastEditors: Felix 77785341@qq.com
 * @LastEditTime: 2026-03-16 11:02:51
 * @FilePath: \vue-vben-admin\apps\web-antd\src\api\core\auth.ts
 * @Description:
 *
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved.
 */

import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    loginName?: string;
    type?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    token: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('/login/installerLogin', {
    username: data.loginName,
    password: data.password,
    type: data.type || 'WEB',
  });
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', {
    withCredentials: true,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/auth/logout', {
    withCredentials: true,
  });
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/auth/codes');
}
