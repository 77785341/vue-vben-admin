/**
 * 故障代码数据结构定义
 * Fault code data structure definitions
 */

/** 逆变器故障代码数据结构 (Inverter) */
export interface InverterFaultEntry {
  alarmBit: string;
  alarmWord: string;
  descDe: string;
  descEn: string;
  descZh: string;
  faultCode: string;
  faultTitle: string;
  faultType: '' | 'Error' | 'Warning';
  solutionDe: string;
  solutionEn: string;
  solutionZh: string;
}

/** 充电桩故障代码数据结构 (Wallbox) */
export interface WallboxFaultEntry {
  alarmBit: string;
  alarmWord: string;
  descDe: string;
  descEn: string;
  descZh: string;
  faultCode: string;
  faultTitleDe: string;
  faultTitleEn: string;
  faultTitleZh: string;
  faultType: '' | 'Error' | 'Warning';
  solutionDe: string;
  solutionEn: string;
  solutionZh: string;
}

/** 热泵故障代码数据结构 (Heat Pump) */
export interface PumpFaultEntry {
  descDe: string;
  descEn: string;
  descZh: string;
  faultCode: string;
  faultTitle: string;
  faultType: '' | 'Error' | 'Warning';
  solutionDe: string;
  solutionEn: string;
  solutionZh: string;
}

/** 逆变器数据映射 (Inverter fault code map) */
export type InverterFaultCodeMap = Record<number | string, InverterFaultEntry>;

/** 充电桩数据映射 (Wallbox fault code map) */
export type WallboxFaultCodeMap = Record<string, WallboxFaultEntry>;

/** 热泵数据映射 (Heat pump fault code map) */
export type PumpFaultCodeMap = Record<string, PumpFaultEntry>;

/** 支持的语言类型 */
export type LocaleType = 'de' | 'en' | 'zh';

/** 设备类型 */
export enum DeviceType {
  INVERTER = 'inverter',
  PUMP = 'pump',
  WALLBOX = 'wallbox',
}

/** 故障详情消息类型 */
export interface FaultDetails {
  code?: string;
  description?: string;
  solution?: string;
  title?: string;
  type?: string;
}
