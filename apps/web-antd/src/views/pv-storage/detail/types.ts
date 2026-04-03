export type ControlTab = 'battery' | 'meter' | 'system';

export type FaultTab = 'history' | 'realtime';

export type FaultFilterValues = {
  type?: 'all' | 'error' | 'warning';
};

export type FaultRow = {
  descEn: string;
  endTime: string;
  errorCode: string;
  faultName: string;
  faultTime: string;
  faultType: 'Error' | 'Warning';
  id: number;
  solutionEn: string;
  startTime: string;
  status: 'RESOLVED' | 'UNRESOLVED';
  type?: string;
};

export type StatusIndicator = {
  colorClass: string;
  text: string;
};

export type LeftSideInfo = {
  [key: string]: any;
  collectorSn?: string;
  installerInfoName?: string;
  inverterName?: string;
  inverterSn?: string;
  isBound?: boolean;
  isOnline?: boolean;
  stationName?: string;
  totalFaultCount?: number;
  totalWarningCount?: number;
  updatedAt?: string;
};

export type SystemFormModel = {
  gridIntegrationStandards?: number;
  powerOn: boolean;
  pvConnectionMode?: number;
  workMode?: number;
};

export type MeterFormModel = {
  ctRatio?: number;
  feederPowerLimit?: number;
  feederSwitch: boolean;
  meterModel?: number;
};

export type BatteryFormModel = {
  batteryModel?: number;
  maxSocLimit?: number;
  minSocOffGrid?: number;
  minSocToGrid?: number;
};
