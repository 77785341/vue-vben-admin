import { useUserStore } from '@vben/stores';

import { requestClient } from '#/api/request';

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
    faultType: string;
    countryName: string;
    createTime: string;
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
    country?: string;
    countryId?: string;
    faultNum?: number | string;
    installerInfoId?: string;
    installerStationName?: string;
    stationName?: string;
  }

  export interface FamilySubmitParams {
    country: string;
    customerEmail?: string;
    customerName?: string;
    customerPhone?: string;
    installerInfoId?: string;
    installerStationAddress: string;
    installerStationName: string;
    installerStationPicture?: string;
    zipCode: string;
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
      // 仅在未选择故障类型时给默认值，避免覆盖筛选条件
      faultNum: params?.faultNum ?? 0,
      installerInfoId,
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
async function createFamily(data: FamilyApi.FamilySubmitParams) {
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
async function updateFamily(id: string, data: FamilyApi.FamilySubmitParams) {
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

// 获取国家下拉列表 get请求，没有参数
async function getCountryList() {
  return requestClient.get<{ label: string; value: string }[]>(
    '/installerStation/getCountryOptions',
  );
}
export {
  createFamily,
  deleteFamily,
  getCountryList,
  getFamilyById,
  getFamilyList,
  updateFamily,
};
