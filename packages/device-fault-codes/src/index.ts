import type { FaultDetails, LocaleType } from './types';

import inverterFaultCodeMap from './inverter';
import pumpFaultCodeMap from './pump';
import { DeviceType } from './types';
import wallboxFaultCodeMap from './wallbox';

/**
 * 合并的故障代码数据映射
 * Merged fault code data mapping
 */
const mergedFaultCodeMap = {
  ...inverterFaultCodeMap,
  ...pumpFaultCodeMap,
  ...wallboxFaultCodeMap,
};

type FaultCodeKey = number | string;

/**
 * 获取故障类型
 * Get fault type
 * @param key - 故障代码 (fault code)
 * @returns 故障类型 (fault type)
 */
export function getFaultType(key: FaultCodeKey): string {
  if (!key) {
    throw new Error('getFaultType: 错误码(fault code key)不能为空');
  }
  const entry = (mergedFaultCodeMap as any)?.[key];
  return entry?.faultType || '';
}

/**
 * 获取故障标题
 * Get fault title
 * @param key - 故障代码 (fault code)
 * @param deviceType - 设备类型 (device type) - 'inverter' | 'wallbox' | 'pump'
 * @param locale - 语言 (language) - 'zh' | 'de' | 'en', 默认 'en'
 * @returns 故障标题 (fault title)
 */
export function getFaultTitle(
  key: FaultCodeKey,
  deviceType?: string,
  locale: LocaleType = 'en',
): string {
  if (!key) {
    throw new Error('getFaultTitle: 参数 key 不能为空');
  }

  const entry = (mergedFaultCodeMap as any)?.[key];
  if (!entry) return '';

  // 逆变器 - faultTitle (Inverter uses faultTitle)
  if (deviceType === DeviceType.INVERTER || !deviceType) {
    return entry?.faultTitle || '';
  }

  // 充电桩 - 根据语言返回对应的 faultTitle (Wallbox - locale-specific)
  if (deviceType === DeviceType.WALLBOX) {
    if (locale === 'de') {
      return (entry as any)?.faultTitleDe || '';
    }
    return (entry as any)?.faultTitleEn || '';
  }

  // 热泵 - faultCode (Heat pump uses faultCode)
  if (deviceType === DeviceType.PUMP) {
    return entry?.faultCode || '';
  }

  return entry?.faultTitle || '';
}

/**
 * 获取故障代码
 * Get fault code
 * @param key - 故障代码 (fault code key)
 * @returns 故障代码 (fault code)
 */
export function getFaultCode(key: FaultCodeKey): string {
  if (!key) {
    throw new Error('getFaultCode: 参数 key 不能为空');
  }
  const entry = (mergedFaultCodeMap as any)?.[key];
  return entry?.faultCode || '';
}

/**
 * 获取故障描述
 * Get fault description
 * @param key - 故障代码 (fault code key)
 * @param locale - 语言 (language) - 'zh' | 'de' | 'en', 默认 'en'
 * @returns 故障描述 (fault description)
 */
export function getFaultDesc(
  key: FaultCodeKey,
  locale: LocaleType = 'en',
): string {
  if (!key) {
    throw new Error('getFaultDesc: 故障代码 key 不能为空');
  }

  const entry = (mergedFaultCodeMap as any)?.[key];
  if (!entry) return '--';

  // 根据语言返回对应的描述
  if (locale === 'de') {
    return entry?.descDe || '--';
  }
  if (locale === 'zh') {
    return entry?.descZh || '--';
  }
  return entry?.descEn || '--';
}

/**
 * 获取故障解决方案
 * Get fault solution
 * @param key - 故障代码 (fault code key)
 * @param locale - 语言 (language) - 'zh' | 'de' | 'en', 默认 'en'
 * @returns 故障解决方案 (fault solution)
 */
export function getFaultSolution(
  key: FaultCodeKey,
  locale: LocaleType = 'en',
): string {
  if (!key) {
    throw new Error('getFaultSolution: 故障代码 key 不能为空');
  }

  const entry = (mergedFaultCodeMap as any)?.[key];
  if (!entry) return 'Please contact after-sales support.';

  // 根据语言返回对应的解决方案
  if (locale === 'de') {
    return (
      entry?.solutionDe ||
      'Bitte kontaktieren Sie den technischen Kundendienst.'
    );
  }
  if (locale === 'zh') {
    return entry?.solutionZh || '请联系售后技术工程师';
  }
  return entry?.solutionEn || 'Please contact after-sales support.';
}

/**
 * 获取完整的故障详情
 * Get complete fault details
 * @param key - 故障代码 (fault code key)
 * @param deviceType - 设备类型 (device type)
 * @param locale - 语言 (language) - 'zh' | 'de' | 'en', 默认 'en'
 * @returns 故障详情 (fault details)
 */
export function getFaultDetails(
  key: FaultCodeKey,
  deviceType?: string,
  locale: LocaleType = 'en',
): FaultDetails {
  return {
    type: getFaultType(key),
    code: getFaultCode(key),
    title: getFaultTitle(key, deviceType, locale),
    description: getFaultDesc(key, locale),
    solution: getFaultSolution(key, locale),
  };
}

/**
 * 导出数据映射以供高级用途
 * Export raw data maps for advanced usage
 */
export { inverterFaultCodeMap, pumpFaultCodeMap, wallboxFaultCodeMap };
export { DeviceType, type FaultDetails, type LocaleType };
