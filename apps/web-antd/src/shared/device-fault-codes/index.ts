import type { FaultDetails, LocaleType } from './types';

import inverterFaultCodeMap from './inverter';
import pumpFaultCodeMap from './pump';
import { DeviceType } from './types';
import wallboxFaultCodeMap from './wallbox';

const mergedFaultCodeMap = {
  ...inverterFaultCodeMap,
  ...pumpFaultCodeMap,
  ...wallboxFaultCodeMap,
};

type FaultCodeKey = number | string;

export function getFaultType(key: FaultCodeKey): string {
  if (!key) {
    throw new Error('getFaultType: 错误码(fault code key)不能为空');
  }
  const entry = (mergedFaultCodeMap as any)?.[key];
  return entry?.faultType || '';
}

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

  if (deviceType === DeviceType.INVERTER || !deviceType) {
    return entry?.faultTitle || '';
  }

  if (deviceType === DeviceType.WALLBOX) {
    if (locale === 'de') {
      return (entry as any)?.faultTitleDe || '';
    }
    return (entry as any)?.faultTitleEn || '';
  }

  if (deviceType === DeviceType.PUMP) {
    return entry?.faultCode || '';
  }

  return entry?.faultTitle || '';
}

export function getFaultCode(key: FaultCodeKey): string {
  if (!key) {
    throw new Error('getFaultCode: 参数 key 不能为空');
  }
  const entry = (mergedFaultCodeMap as any)?.[key];
  return entry?.faultCode || '';
}

export function getFaultDesc(
  key: FaultCodeKey,
  locale: LocaleType = 'en',
): string {
  if (!key) {
    throw new Error('getFaultDesc: 故障代码 key 不能为空');
  }

  const entry = (mergedFaultCodeMap as any)?.[key];
  if (!entry) return '--';

  if (locale === 'de') {
    return entry?.descDe || '--';
  }
  if (locale === 'zh') {
    return entry?.descZh || '--';
  }
  return entry?.descEn || '--';
}

export function getFaultSolution(
  key: FaultCodeKey,
  locale: LocaleType = 'en',
): string {
  if (!key) {
    throw new Error('getFaultSolution: 故障代码 key 不能为空');
  }

  const entry = (mergedFaultCodeMap as any)?.[key];
  if (!entry) return 'Please contact after-sales support.';

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

export { inverterFaultCodeMap, pumpFaultCodeMap, wallboxFaultCodeMap };
export { DeviceType };
export type { FaultDetails, LocaleType };
