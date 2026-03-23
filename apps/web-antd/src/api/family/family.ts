import { requestClient } from '#/api/request';

import { useUserStore } from '@vben/stores';

export namespace FamilyApi {
  export interface Family {
    id: number;
    installerStationId: string;
    installerInfoId: string;
    installerStationName: string;
    installerStationAddress: string;
    installerStationPicture: string;
    totalFaultCount: number;
    pvCapacity: any;
    batteryCapacity: any;
    devicesParameters: [
      {
        deviceModel: string;
        deviceSn: string;
        deviceType: string;
        parameterValue: number;
      },
    ];
  }

  export interface FamilyListParams {
    pageNum: number;
    pageSize: number;
    installerInfoId?: string;
  }
}

/**
 * 获取家庭列表数据
 */
async function getFamilyList(params: FamilyApi.FamilyListParams) {
  const userStore = useUserStore();
  const userInfo = userStore.userInfo;
  // 优先使用传进来的installerInfoId，否则使用用户信息中的
  const installerInfoId =
    params?.installerInfoId || userInfo?.installerInfoId || '';
  return requestClient.post<{ items: FamilyApi.Family[]; total: number }>(
    '/installerStation/getInstallerStationByPage',
    {
      ...params,
      installerInfoId,
      faultNum: 0,
    },
  );
}

/**
 * 获取家庭详情
 * @param id 家庭ID
 */
async function getFamilyById(id: string) {
  return requestClient.get<FamilyApi.Family>(
    `/installerStation/getInstallerStation/${id}`,
  );
}

/**
 * 创建家庭
 * @param data 家庭数据
 */
async function createFamily(data: Omit<FamilyApi.Family, 'createTime' | 'id'>) {
  return requestClient.post<FamilyApi.Family>(
    '/installerStation/addInstallerStation',
    data,
  );
}

/**
 * 更新家庭
 * @param id 家庭ID
 * @param data 家庭数据
 */
async function updateFamily(
  id: string,
  data: Omit<FamilyApi.Family, 'createTime' | 'id'>,
) {
  return requestClient.post<FamilyApi.Family>(
    `/installerStation/updateInstallerStation/${id}`,
    data,
  );
}

/**
 * 删除家庭
 * @param id 家庭ID
 */
async function deleteFamily(id: string) {
  return requestClient.get<boolean>(
    `/installerStation/deleteInstallerStation/${id}`,
  );
}

export {
  createFamily,
  deleteFamily,
  getFamilyById,
  getFamilyList,
  updateFamily,
};
