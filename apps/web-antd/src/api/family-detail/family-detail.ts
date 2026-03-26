import { requestClient } from '#/api/request';

export namespace FamilyDetailApi {
  export interface PowerVo {
    battery_power_in: number;
    battery_power_out: number;
    battery_soc: number;
    grid_power_in: number;
    grid_power_out: number;
    pv_power: number;
  }

  export interface PowerUseVo {
    otherUsePower: number;
    pumpPower: number;
    wallboxPower: number;
  }

  export interface EnergyShowVo {
    selfUseRatio: number;
    todayBuyEnergy: number;
    todayGenerateEnergy: number;
    todaySellEnergy: number;
    todayUseEnergy: number;
  }

  export interface StationMonitorData {
    energyShowVo: EnergyShowVo;
    powerUseVo: PowerUseVo;
    powerVo: PowerVo;
  }

  export type TrendStatisticsData = Record<string, unknown>;
  export type StationDeviceItem = Record<string, unknown>;
}

/**
 * 获取电站流图信息
 * @param stationId 电站ID
 */
async function getStationMonitor(stationId: string) {
  return requestClient.get<FamilyDetailApi.StationMonitorData>(
    `/monitor/getStationMonitor/${stationId}`,
  );
}

/**
 * 日统计
 * @param date 日期，格式 yyyy-MM-dd
 * @param stationId 电站ID
 */
async function getDailyStatistics(date: string, stationId: string) {
  return requestClient.get<FamilyDetailApi.TrendStatisticsData>(
    `/statistics/getDailyStatistics/${date}/${stationId}`,
  );
}

/**
 * 月统计
 * @param yearMonth 月份，格式 yyyy-MM
 * @param stationId 电站ID
 */
async function getMonthStatistics(yearMonth: string, stationId: string) {
  return requestClient.get<FamilyDetailApi.TrendStatisticsData>(
    `/statistics/getMonthStatistics/${yearMonth}/${stationId}`,
  );
}

/**
 * 年统计
 * @param year 年份，格式 yyyy
 * @param stationId 电站ID
 */
async function getYearStatistics(year: string, stationId: string) {
  return requestClient.get<FamilyDetailApi.TrendStatisticsData>(
    `/statistics/getYearStatistics/${year}/${stationId}`,
  );
}

/**
 * 按电站和设备类型查询设备列表
 * @param stationId 电站ID
 * @param type 设备类型
 */
async function getDeviceByStationAndType(stationId: string, type: string) {
  return requestClient.get<FamilyDetailApi.StationDeviceItem[]>(
    `/installerStation/getDeviceByStationAndType`,
    {
      params: {
        stationId,
        type,
      },
    },
  );
}

export {
  getDailyStatistics,
  getDeviceByStationAndType,
  getMonthStatistics,
  getStationMonitor,
  getYearStatistics,
};
