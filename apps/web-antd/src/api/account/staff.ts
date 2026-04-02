import type { Recordable } from '@vben/types';

import { useUserStore } from '@vben/stores';

import { requestClient } from '#/api/request';

/**
 * 员工管理接口
 */
export namespace StaffApi {
  /** 员工信息 */
  export interface Staff {
    id: string;
    loginName: string;
    deptId?: string;
    roleIds?: number | number[] | string | string[];
    email?: string;
    phone?: string;
    status?: 'Active' | 'Inactive' | 'off' | 'on';
    state?: 'Active' | 'Inactive' | 'off' | 'on';
    createTime: string;
  }
}

/**
 * 获取员工列表数据 post方式
 */
async function getStaffList(params?: Recordable<any>) {
  const userStore = useUserStore();
  const userInfo = userStore.userInfo;
  // 优先使用传进来的installerInfoId，否则使用用户信息中的
  const installerInfoId =
    params?.installerInfoId ||
    (userInfo as any)?.installer?.installerInfoId ||
    userInfo?.installerInfoId ||
    '';

  return requestClient.post<{ items: StaffApi.Staff[]; total: number }>(
    '/installer/getEmployeePage/',
    {
      ...params,
      installerInfoId,
    },
  );
}

/**
 * 创建员工
 */
async function createStaff(data: Omit<StaffApi.Staff, 'createTime' | 'id'>) {
  return requestClient.post<StaffApi.Staff>('/installer/addEmployee', data);
}

/**
 * 更新员工 修改成post方式
 */
async function updateStaff(id: string, data: Partial<StaffApi.Staff>) {
  return requestClient.post(`/installer/updateEmployeeInfo`, data);
}

/**
 * 删除员工
 */
async function deleteStaff(id: string) {
  return requestClient.delete(`/installer/deleteEmployee/${id}`);
}

export { createStaff, deleteStaff, getStaffList, updateStaff };
