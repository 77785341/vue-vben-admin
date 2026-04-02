import { requestClient } from '#/api/request';

export namespace MonitorApi {
  export interface WebMonitorData {
    totalInverterNum: number;
    totalInverterOnlineNum: number;
    totalPumpNum: number;
    totalPumpOnlineNum: number;
    totalPvCapacity: number;
    totalStationNum: number;
    totalWallboxNum: number;
    totalWallboxOnlineNum: number;
  }

  export type WebYearStatistics = unknown;
}

export async function getWebMonitorData() {
  return requestClient.get<MonitorApi.WebMonitorData>(
    '/monitor/getWebMonitorData',
  );
}

export async function getWebYearStatistics(year: string) {
  return requestClient.get<MonitorApi.WebYearStatistics>(
    `/statistics/getWebYearStatistics/${year}`,
  );
}
