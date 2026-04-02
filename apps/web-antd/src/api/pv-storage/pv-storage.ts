import { requestClient } from '#/api/request';

export namespace PvStorageApi {
  export type ControlModuleType = 'battery' | 'meter' | 'system';

  export interface GetInverterDevicePageParams {
    pageNum: number;
    pageSize: number;
    collectionSn?: string;
    inverterSn?: string;
    stationName?: string;
    installerInfoName?: string;
    status?: string;
    faultType?: string;
    installerInfoId?: string;
  }

  export interface InverterDeviceItem {
    id: number;
    inverterId: string;
    inverterName: string;
    stationName: string;
    collectionSn: null | string;
    inverterSn: string;
    installerInfoName: string;
    createTime: string;
    status: string;
    faultType: string;
    totalFaultCount: number;
    totalWarningCount: number;
  }

  export interface GetInverterDevicePageResponse {
    total: number;
    records: InverterDeviceItem[];
  }

  export interface GetDeviceFaultByPageParams {
    keyword: string;
    pageNum: number;
    pageSize: number;
    status: 'RESOLVED' | 'UN_RESOLVE';
    type: 'all' | 'error' | 'warning';
  }

  export interface DeviceFaultRecord {
    errorCode: string;
    faultStatus: string;
    installerStationName: string;
    reportTime: string;
    resolveTime: string;
    snCode: string;
    type: string;
  }

  export interface GetDeviceFaultByPageResponse {
    current: number;
    records: DeviceFaultRecord[];
    total: number;
  }

  export interface ReadControlSettingsParams {
    sn: string;
    type: ControlModuleType;
  }

  export interface SaveSystemSettingsParams {
    sn: string;
    powerOn: number;
    pvConnectionMode: number;
    workMode: number;
    gridIntegrationStandards: number;
  }

  export interface SaveMeterSettingsParams {
    sn: string;
    meterModel: number;
    feederSwitch: number;
    feederPowerLimit: number;
    meterRatio: number;
  }

  export interface SaveBatterySettingsParams {
    sn: string;
    batteryModel: number;
    maxSocLimit: number;
    minSocToGrid: number;
    minSocOffGrid: number;
  }
}

/**
 * 获取逆变器设备分页列表
 * @param params 查询参数
 */
async function getInverterDevicePage(
  params: PvStorageApi.GetInverterDevicePageParams,
) {
  return requestClient.post<PvStorageApi.GetInverterDevicePageResponse>(
    '/installerStation/getInverterDevicePage',
    params,
  );
}

/**
 * 获取光储详情（通过SN）
 * @param sn 设备SN
 */
async function getDeviceInfoBySn(sn: string) {
  return requestClient.get(`/devices/getDeviceInfoBySn/${sn}`);
}

/**
 * 通用设备详情接口（支持光储、充电桩、热泵等）
 * @param sn 设备SN
 * @param type 设备类型
 */
async function getDeviceInfo(sn: string, type: string) {
  return requestClient.get(`/devices/getDeviceInfo/${sn}/${type}`);
}

/**
 * 故障列表分页查询
 * @param params 查询参数
 */
async function getDeviceFaultByPage(
  params: PvStorageApi.GetDeviceFaultByPageParams,
) {
  return requestClient.post<PvStorageApi.GetDeviceFaultByPageResponse>(
    '/deviceFault/getDeviceFaultByPage',
    params,
  );
}

/**
 * 发起设备控制读操作，返回 businessId
 */
async function readControlSettings(
  params: PvStorageApi.ReadControlSettingsParams,
) {
  return requestClient.post<string>('/setting/systemRead', params);
}

/**
 * 根据 businessId 轮询设备控制读结果
 */
async function pollingControlSettings(
  businessId: string,
  type: PvStorageApi.ControlModuleType,
) {
  return requestClient.get(`/setting/pollingRead/${businessId}/${type}`);
}

/**
 * 保存系统设置，返回 businessId
 */
async function saveSystemSettings(
  params: PvStorageApi.SaveSystemSettingsParams,
) {
  return requestClient.post<string>('/setting/systemSetting', params);
}

/**
 * 保存电表设置，返回 businessId
 */
async function saveMeterSettings(params: PvStorageApi.SaveMeterSettingsParams) {
  return requestClient.post<string>('/setting/meterSetting', params);
}

/**
 * 保存电池设置，返回 businessId
 */
async function saveBatterySettings(
  params: PvStorageApi.SaveBatterySettingsParams,
) {
  return requestClient.post<string>('/setting/BatterySetting', params);
}

/**
 * 根据 businessId 轮询设备控制写结果
 */
async function pollingWriteControlSettings(
  businessId: string,
  type: PvStorageApi.ControlModuleType,
) {
  return requestClient.get(`/setting/pollingWrite/${businessId}/${type}`);
}

export {
  getDeviceFaultByPage,
  getDeviceInfo,
  getDeviceInfoBySn,
  getInverterDevicePage,
  pollingControlSettings,
  pollingWriteControlSettings,
  readControlSettings,
  saveBatterySettings,
  saveMeterSettings,
  saveSystemSettings,
};
