import type { PumpFaultCodeMap } from './types';

const pumpFaultCodeMap: PumpFaultCodeMap = {
  'AL_W1.0': {
    faultType: 'Error',
    faultCode: 'E01',
    faultTitle: '1_Al_Retain_Active',
    descZh: '存贮类型变量频繁写',
    descDe: 'Häufige Schreibvorgänge auf Speichervariable',
    descEn: 'Frequent writes to storage type variable',
    solutionZh:
      '1、尝试断开电源后重新上电，进行复位\n2、联系厂家专业人员检查（软件清除，重新烧录）',
    solutionDe:
      '1. Trennen Sie die Stromversorgung und schalten Sie das Gerät erneut ein, um einen Reset durchzuführen.\n2. Kontaktieren Sie den Hersteller für eine fachmännische Inspektion (Software-Reset und Neuprogrammierung).',
    solutionEn:
      '1. Try disconnecting the power supply and powering on again to perform a reset\n2. Contact the manufacturer for professional inspection (software reset and reprogramming)',
  },
  'AL_W1.1': {
    faultType: 'Error',
    faultCode: 'E02',
    faultTitle: '1_Al_Err_Retain_Write_Active',
    descZh: '存贮变量写错误报警',
    descDe: 'Schreibfehler-Alarm der Speichervariable',
    descEn: 'Storage variable write error alarm',
    solutionZh:
      '1、尝试断开电源后重新上电，进行复位\n2、联系厂家专业人员检查（软件清除，重新烧录）',
    solutionDe:
      '1. Trennen Sie die Stromversorgung und schalten Sie das Gerät erneut ein, um einen Reset durchzuführen.\n2. Kontaktieren Sie den Hersteller für eine fachmännische Inspektion (Software-Reset und Neuprogrammierung).',
    solutionEn:
      '1. Try disconnecting the power supply and powering on again to perform a reset\n2. Contact the manufacturer for professional inspection (software reset and reprogramming)',
  },
  'AL_W1.2': {
    faultType: 'Error',
    faultCode: 'E03',
    faultTitle: '1_Al_Prb_CW_InTemp_Active',
    descZh: '进水温度探头故障或离线',
    descDe: 'Einlasswassertemperatur-Sensor fehlerhaft oder offline',
    descEn: 'Inlet water temperature sensor fault or offline',
    solutionZh: '1、检查传感器是否松脱或者损坏\n2、更换相同的型号的传感器',
    solutionDe:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
    solutionEn:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
  },
};

export default pumpFaultCodeMap;
