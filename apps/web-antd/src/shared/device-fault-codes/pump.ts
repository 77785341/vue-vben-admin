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
  'AL_W1.3': {
    faultType: 'Error',
    faultCode: 'E04',
    faultTitle: '1_Al_Prb_CW_OutTemp_Active',
    descZh: '出水温度探头故障或离线',
    descDe: 'Auslasswassertemperatur-Sensor fehlerhaft oder offline',
    descEn: 'Outlet water temperature sensor fault or offline',
    solutionZh: '1、检查传感器是否松脱或者损坏\n2、更换相同的型号的传感器',
    solutionDe:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
    solutionEn:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
  },
  'AL_W1.4': {
    faultType: 'Error',
    faultCode: 'E05',
    faultTitle: '1_Al_Prb_AmbTemp_Active',
    descZh: '环境温度探头故障或离线',
    descDe: 'Umgebungstemperatur-Sensor fehlerhaft oder offline',
    descEn: 'Ambient temperature sensor fault or offline',
    solutionZh: '1、检查传感器是否松脱或者损坏\n2、更换相同的型号的传感器',
    solutionDe:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
    solutionEn:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
  },
  'AL_W1.5': {
    faultType: 'Error',
    faultCode: 'E06',
    faultTitle: '1_Al_Prb_CondTemp_Active',
    descZh: '冷凝温度探头故障或离线',
    descDe: 'Kondensationstemperatur-Sensor fehlerhaft oder offline',
    descEn: 'Condensing temperature sensor fault or offline',
    solutionZh: '1、检查传感器是否松脱或者损坏\n2、更换相同的型号的传感器',
    solutionDe:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
    solutionEn:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
  },
  'AL_W1.6': {
    faultType: 'Error',
    faultCode: 'E07',
    faultTitle: '1_Al_FlwSw_Active',
    descZh: '水流开关报警',
    descDe: 'Wasserdurchflussschalter-Alarm',
    descEn: 'Water flow switch alarm',
    solutionZh:
      '1、检查水路系统，是否缺水，缺水请进行补水\n2、联系专业人员检查水流开关是否损坏，开关损坏请更换新的水流开关',
    solutionDe:
      '1. Prüfen Sie das Wassersystem auf Wassermangel und füllen Sie bei Bedarf Wasser nach\n2. Kontaktieren Sie einen Fachmann, um den Wasserdurchflussschalter zu überprüfen und bei Beschädigung auszutauschen',
    solutionEn:
      '1. Check the water system for insufficient water and refill if necessary\n2. Contact a professional to inspect the water flow switch and replace it if damaged',
  },
  'AL_W1.7': {
    faultType: 'Error',
    faultCode: 'E08',
    faultTitle: '1_Al_ProtSeqPh_Active',
    descZh: '相序保护报警',
    descDe: 'Phasenfolgeschutz-Alarm',
    descEn: 'Phase sequence protection alarm',
    solutionZh: '请专业的电工检查供电的线序',
    solutionDe:
      'Kontaktieren Sie einen qualifizierten Elektriker, um die Phasenfolge der Stromversorgung zu überprüfen',
    solutionEn:
      'Contact a qualified electrician to check the power supply phase sequence',
  },
  'AL_W1.8': {
    faultType: 'Error',
    faultCode: 'E09',
    faultTitle: '1_Warn_UnitWorkHrs_Active',
    descZh: '机组工作超时警告',
    descDe: 'Betriebszeitüberschreitung-Warnung der Einheit',
    descEn: 'Unit operation timeout warning',
    solutionZh: '1、停机后，断电复位，再次启动\n2、如还有问题，请联系专业人员',
    solutionDe:
      '1. Stoppen Sie die Einheit, trennen Sie die Stromversorgung, führen Sie einen Reset durch und starten Sie neu\n2. Wenn das Problem weiterhin besteht, kontaktieren Sie einen professionellen Techniker',
    solutionEn:
      '1. Stop the unit, disconnect power, perform a reset, and restart\n2. If the issue persists, contact a professional technician',
  },
  'AL_W1.9': {
    faultType: 'Error',
    faultCode: 'E10',
    faultTitle: '1_Warn_PmpWorkHrs_Active',
    descZh: '水泵工作超时警告',
    descDe: 'Betriebszeitüberschreitung-Warnung der Wasserpumpe',
    descEn: 'Water pump operation timeout warning',
    solutionZh: '1、停机后，断电复位，再次启动\n2、如还有问题，请联系专业人员',
    solutionDe:
      '1. Stoppen Sie die Einheit, trennen Sie die Stromversorgung, führen Sie einen Reset durch und starten Sie neu\n2. Wenn das Problem weiterhin besteht, kontaktieren Sie einen professionellen Techniker',
    solutionEn:
      '1. Stop the unit, disconnect power, perform a reset, and restart\n2. If the issue persists, contact a professional technician',
  },
  'AL_W1.10': {
    faultType: 'Error',
    faultCode: 'E11',
    faultTitle: '1_Warn_CompWorkHrs_Active',
    descZh: '压缩机工作超时警告',
    descDe: 'Betriebszeitüberschreitung-Warnung des Kompressors',
    descEn: 'Compressor operation timeout warning',
    solutionZh: '1、停机后，断电复位，再次启动\n2、如还有问题，请联系专业人员',
    solutionDe:
      '1. Stoppen Sie die Einheit, trennen Sie die Stromversorgung, führen Sie einen Reset durch und starten Sie neu\n2. Wenn das Problem weiterhin besteht, kontaktieren Sie einen professionellen Techniker',
    solutionEn:
      '1. Stop the unit, disconnect power, perform a reset, and restart\n2. If the issue persists, contact a professional technician',
  },
  'AL_W1.11': {
    faultType: 'Error',
    faultCode: 'E12',
    faultTitle: '1_Warn_FanWorkHrs_Active',
    descZh: '冷凝风机工作超时警告',
    descDe: 'Betriebszeitüberschreitung-Warnung des Verflüssigergebläses',
    descEn: 'Condenser fan operation timeout warning',
    solutionZh: '1、停机后，断电复位，再次启动\n2、如还有问题，请联系专业人员',
    solutionDe:
      '1. Stoppen Sie die Einheit, trennen Sie die Stromversorgung, führen Sie einen Reset durch und starten Sie neu\n2. Wenn das Problem weiterhin besteht, kontaktieren Sie einen professionellen Techniker',
    solutionEn:
      '1. Stop the unit, disconnect power, perform a reset, and restart\n2. If the issue persists, contact a professional technician',
  },
  'AL_W1.12': {
    faultType: 'Error',
    faultCode: 'E13',
    faultTitle: '1_AL_DisStartDpState_BLDC1_Active',
    descZh: 'BLDC压缩机启动压差过高',
    descDe: 'BLDC-Kompressor Anlaufdifferenzdruck zu hoch',
    descEn: 'BLDC compressor start-up differential pressure too high',
    solutionZh: '压缩机工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Kompressor arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Compressor operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W1.13': {
    faultType: 'Error',
    faultCode: 'E14',
    faultTitle: '1_Al_ComprOff_BLDC1_Active',
    descZh: 'BLDC压缩机故障',
    descDe: 'BLDC-Kompressor Fehler',
    descEn: 'BLDC compressor fault',
    solutionZh: '压缩机工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Kompressor arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Compressor operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W1.14': {
    faultType: 'Error',
    faultCode: 'E15',
    faultTitle: '1_Al_OutEnv_BLDC1_Active',
    descZh: 'BLDC压缩机工作在异常区域',
    descDe: 'BLDC-Kompressor Betrieb in abnormalem Bereich',
    descEn: 'BLDC compressor operating in abnormal region',
    solutionZh: '压缩机工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Kompressor arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Compressor operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W1.15': {
    faultType: 'Error',
    faultCode: 'E16',
    faultTitle: '1_Al_StartFailRetry_BLDC1_Active',
    descZh: 'BLDC压缩机启动失败（尝试）',
    descDe: 'BLDC-Kompressor Startfehler (Wiederholung)',
    descEn: 'BLDC compressor start failure (retry)',
    solutionZh: '压缩机工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Kompressor arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Compressor operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W2.0': {
    faultType: 'Error',
    faultCode: 'E17',
    faultTitle: '1_Al_StartFailLock_BLDC1_Active',
    descZh: 'BLDC压缩机启动失败（锁定）',
    descDe: 'BLDC-Kompressor Startfehler (Sperre)',
    descEn: 'BLDC compressor start failure (lockout)',
    solutionZh: '压缩机工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Kompressor arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Compressor operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W2.1': {
    faultType: 'Error',
    faultCode: 'E18',
    faultTitle: '1_Al_LowDeltaP_BLDC1_Active',
    descZh: 'BLDC压缩机压差过低',
    descDe: 'BLDC-Kompressor Differenzdruck zu niedrig',
    descEn: 'BLDC compressor differential pressure too low',
    solutionZh: '压缩机工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Kompressor arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Compressor operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W2.2': {
    faultType: 'Error',
    faultCode: 'E19',
    faultTitle: '1_Al_HighDscgT_BLDC1_Active',
    descZh: 'BLDC压缩机排气温度过高',
    descDe: 'BLDC-Kompressor Druckrohrtemperatur zu hoch',
    descEn: 'BLDC compressor discharge temperature too high',
    solutionZh: '压缩机工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Kompressor arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Compressor operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W2.3': {
    faultType: 'Error',
    faultCode: 'E20',
    faultTitle: '1_AlEnv02_HighRatio_BLDC_1_Active',
    descZh: '工作区域报警2：高压缩比',
    descDe: 'Betriebsbereich-Alarm 2: Hohes Verdichtungsverhältnis',
    descEn: 'Operating region alarm 2: High compression ratio',
    solutionZh: '压缩机工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Kompressor arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Compressor operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W2.4': {
    faultType: 'Error',
    faultCode: 'E21',
    faultTitle: '1_AlEnv03_HighDscg_BLDC_1_Active',
    descZh: '工作区域报警3: 高排气压力',
    descDe: 'Betriebsbereich-Alarm 3: Hoher Hochdruck',
    descEn: 'Operating region alarm 3: High discharge pressure',
    solutionZh: '压缩机工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Kompressor arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Compressor operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W2.5': {
    faultType: 'Error',
    faultCode: 'E22',
    faultTitle: '1_AlEnv04_HighCurr_BLDC_1_Active',
    descZh: '工作区域报警4：高电流',
    descDe: 'Betriebsbereich-Alarm 4: Hoher Strom',
    descEn: 'Operating region alarm 4: High current',
    solutionZh: '压缩机工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Kompressor arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Compressor operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W2.6': {
    faultType: 'Error',
    faultCode: 'E23',
    faultTitle: '1_AlEnv05_HighSuct_BLDC_1_Active',
    descZh: '工作区域报警5：吸气压力低',
    descDe: 'Betriebsbereich-Alarm 5: Niedriger Saugdruck',
    descEn: 'Operating region alarm 5: Low suction pressure',
    solutionZh: '压缩机工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Kompressor arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Compressor operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W2.7': {
    faultType: 'Error',
    faultCode: 'E24',
    faultTitle: '1_AlEnv06_LowRatio_BLDC_1_Active',
    descZh: '工作区域报警6：低压缩机比率',
    descDe: 'Betriebsbereich-Alarm 6: Niedriges Kompressorverhältnis',
    descEn: 'Operating region alarm 6: Low compressor ratio',
    solutionZh: '压缩机工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Kompressor arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Compressor operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W2.8': {
    faultType: 'Error',
    faultCode: 'E25',
    faultTitle: '1_ALEnv07_LowDP_BLDC_1_Active',
    descZh: '工作区域报警7：低压差',
    descDe: 'Betriebsbereich-Alarm 7: Niedriger Differenzdruck',
    descEn: 'Operating region alarm 7: Low differential pressure',
    solutionZh: '压缩机工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Kompressor arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Compressor operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W2.9': {
    faultType: 'Error',
    faultCode: 'E26',
    faultTitle: '1_AlEnv08_LowDscg_BLDC_1_Active',
    descZh: '工作区域报警8：排气压力低',
    descDe: 'Betriebsbereich-Alarm 8: Niedriger Hochdruck',
    descEn: 'Operating region alarm 8: Low discharge pressure',
    solutionZh: '压缩机工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Kompressor arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Compressor operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W2.10': {
    faultType: 'Error',
    faultCode: 'E27',
    faultTitle: '1_AlEnv09_LowSuct_BLDC_1_Active',
    descZh: '工作区域报警9：吸气压力低',
    descDe: 'Betriebsbereich-Alarm 9: Niedriger Saugdruck',
    descEn: 'Operating region alarm 9: Low suction pressure',
    solutionZh: '压缩机工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Kompressor arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Compressor operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W2.11': {
    faultType: 'Error',
    faultCode: 'E28',
    faultTitle: '1_AlEnv10_HDT_BLDC_1_Active',
    descZh: '工作区域报警10：排气温度高',
    descDe: 'Betriebsbereich-Alarm 10: Hohe Druckrohrtemperatur',
    descEn: 'Operating region alarm 10: High discharge temperature',
    solutionZh: '压缩机工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Kompressor arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Compressor operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W2.12': {
    faultType: 'Error',
    faultCode: 'E29',
    faultTitle: '1_Al01_PWRP_1_Active',
    descZh: '01: 变频器过电流',
    descDe: '01: Inverter Überstrom',
    descEn: '01: Inverter overcurrent',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W2.13': {
    faultType: 'Error',
    faultCode: 'E30',
    faultTitle: '1_Al02_PWRP_1_Active',
    descZh: '02: 变频电机过载',
    descDe: '02: Inverter Motorüberlastung',
    descEn: '02: Inverter motor overload',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W2.14': {
    faultType: 'Error',
    faultCode: 'E31',
    faultTitle: '1_Al03_PWRP_1_Active',
    descZh: '03: 变频器直流母线过电压',
    descDe: '03: Inverter DC-Bus Überspannung',
    descEn: '03: Inverter DC bus overvoltage',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W2.15': {
    faultType: 'Error',
    faultCode: 'E32',
    faultTitle: '1_Al04_PWRP_1_Active',
    descZh: '04: 变频直流母线欠压',
    descDe: '04: Inverter DC-Bus Unterspannung',
    descEn: '04: Inverter DC bus undervoltage',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W3.0': {
    faultType: 'Error',
    faultCode: 'E33',
    faultTitle: '1_Al05_PWRP_1_Active',
    descZh: '05: 变频器驱动温度过高',
    descDe: '05: Inverter Treibertemperatur zu hoch',
    descEn: '05: Inverter drive temperature too high',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W3.1': {
    faultType: 'Error',
    faultCode: 'E34',
    faultTitle: '1_Al06_PWRP_1_Active',
    descZh: '06: 变频器低于工作温度',
    descDe: '06: Inverter unter Betriebstemperatur',
    descEn: '06: Inverter below operating temperature',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W3.2': {
    faultType: 'Error',
    faultCode: 'E35',
    faultTitle: '1_Al07_PWRP_1_Active',
    descZh: '07: 变频器硬件过电流',
    descDe: '07: Inverter Hardware-Überstrom',
    descEn: '07: Inverter hardware overcurrent',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W3.3': {
    faultType: 'Error',
    faultCode: 'E36',
    faultTitle: '1_Al08_PWRP_1_Active',
    descZh: '08: 变频器电机超温',
    descDe: '08: Inverter Motorübertemperatur',
    descEn: '08: Inverter motor overtemperature',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W3.4': {
    faultType: 'Error',
    faultCode: 'E37',
    faultTitle: '1_Al09_PWRP_1_Active',
    descZh: '09: 变频器IGBT模块错误',
    descDe: '09: Inverter IGBT-Modulfehler',
    descEn: '09: Inverter IGBT module error',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W3.5': {
    faultType: 'Error',
    faultCode: 'E38',
    faultTitle: '1_Al10_PWRP_1_Active',
    descZh: '10: 变频器CPU错误',
    descDe: '10: Inverter CPU-Fehler',
    descEn: '10: Inverter CPU error',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W3.6': {
    faultType: 'Error',
    faultCode: 'E39',
    faultTitle: '1_Al11_PWRP_1_Active',
    descZh: '11: 变频器默认参数加载错误',
    descDe: '11: Inverter Standardparameter-Ladefehler',
    descEn: '11: Inverter default parameter load error',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W3.7': {
    faultType: 'Error',
    faultCode: 'E40',
    faultTitle: '1_Al12_PWRP_1_Active',
    descZh: '12: 变频器母线电压纹波过大',
    descDe: '12: Inverter Busspannungswelligkeit zu hoch',
    descEn: '12: Inverter bus voltage ripple too high',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W3.8': {
    faultType: 'Error',
    faultCode: 'E41',
    faultTitle: '1_Al13_PWRP_1_Active',
    descZh: '13: 变频器通讯错误',
    descDe: '13: Inverter Kommunikationsfehler',
    descEn: '13: Inverter communication error',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W3.9': {
    faultType: 'Error',
    faultCode: 'E42',
    faultTitle: '1_Al14_PWRP_1_Active',
    descZh: '14: 变频器NTC故障',
    descDe: '14: Inverter NTC-Fehler',
    descEn: '14: Inverter NTC fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W3.10': {
    faultType: 'Error',
    faultCode: 'E43',
    faultTitle: '1_Al15_PWRP_1_Active',
    descZh: '15: 变频器自动调节失败',
    descDe: '15: Inverter Auto-Tuning fehlgeschlagen',
    descEn: '15: Inverter auto-tuning failed',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W3.11': {
    faultType: 'Error',
    faultCode: 'E44',
    faultTitle: '1_Al16_PWRP_1_Active',
    descZh: '16: 变频器 无法运行',
    descDe: '16: Inverter betriebsunfähig',
    descEn: '16: Inverter unable to run',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W3.12': {
    faultType: 'Error',
    faultCode: 'E45',
    faultTitle: '1_Al17_PWRP_1_Active',
    descZh: '17: 变频器 输出缺相',
    descDe: '17: Inverter Phasenausfall am Ausgang',
    descEn: '17: Inverter output phase loss',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W3.13': {
    faultType: 'Error',
    faultCode: 'E46',
    faultTitle: '1_Al18_PWRP_1_Active',
    descZh: '18: 变频器内部风扇故障',
    descDe: '18: Inverter interner Lüfterfehler',
    descEn: '18: Inverter internal fan fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W3.14': {
    faultType: 'Error',
    faultCode: 'E47',
    faultTitle: '1_Al19_PWRP_1_Active',
    descZh: '19: 变频器 速度故障',
    descDe: '19: Inverter Drehzahlfehler',
    descEn: '19: Inverter speed fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W3.15': {
    faultType: 'Error',
    faultCode: 'E48',
    faultTitle: '1_Al20_PWRP_1_Active',
    descZh: '20: 变频器 PFC模块故障',
    descDe: '20: Inverter PFC-Modulfehler',
    descEn: '20: Inverter PFC module fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W4.0': {
    faultType: 'Error',
    faultCode: 'E49',
    faultTitle: '1_Al21_PWRP_1_Active',
    descZh: '21: 变频器 PFC过压',
    descDe: '21: Inverter PFC-Überspannung',
    descEn: '21: Inverter PFC overvoltage',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W4.1': {
    faultType: 'Error',
    faultCode: 'E50',
    faultTitle: '1_Al22_PWRP_1_Active',
    descZh: '22: 变频器 PFC 欠压',
    descDe: '22: Inverter PFC-Unterspannung',
    descEn: '22: Inverter PFC undervoltage',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W4.2': {
    faultType: 'Error',
    faultCode: 'E51',
    faultTitle: '1_Al23_PWRP_1_Active',
    descZh: '23: 变频器 STO 检测故障',
    descDe: '23: Inverter STO-Erkennungsfehler',
    descEn: '23: Inverter STO detection fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W4.3': {
    faultType: 'Error',
    faultCode: 'E52',
    faultTitle: '1_Al24_PWRP_1_Active',
    descZh: '24: 变频器 STO 检测故障',
    descDe: '24: Inverter STO-Erkennungsfehler',
    descEn: '24: Inverter STO detection fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W4.4': {
    faultType: 'Error',
    faultCode: 'E53',
    faultTitle: '1_Al25_PWRP_1_Active',
    descZh: '25: 变频器 接地故障',
    descDe: '25: Inverter Erdungsfehler',
    descEn: '25: Inverter ground fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W4.5': {
    faultType: 'Error',
    faultCode: 'E54',
    faultTitle: '1_Al26_PWRP_1_Active',
    descZh: '26: 变频器 内部故障1',
    descDe: '26: Inverter interner Fehler 1',
    descEn: '26: Inverter internal fault 1',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W4.6': {
    faultType: 'Error',
    faultCode: 'E55',
    faultTitle: '1_Al27_PWRP_1_Active',
    descZh: '27: 变频器 内部故障2',
    descDe: '27: Inverter interner Fehler 2',
    descEn: '27: Inverter internal fault 2',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W4.7': {
    faultType: 'Error',
    faultCode: 'E56',
    faultTitle: '1_Al28_PWRP_1_Active',
    descZh: '28: 变频器 驱动过载',
    descDe: '28: Inverter Treiberüberlastung',
    descEn: '28: Inverter drive overload',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W4.8': {
    faultType: 'Error',
    faultCode: 'E57',
    faultTitle: '1_Al29_PWRP_1_Active',
    descZh: '29: 变频器safety故障',
    descDe: '29: Inverter Sicherheitsfehler',
    descEn: '29: Inverter safety fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W4.9': {
    faultType: 'Error',
    faultCode: 'E58',
    faultTitle: '1_Al98_PWRP_1_Active',
    descZh: '98: 变频器 无故重启',
    descDe: '98: Inverter unerwarteter Neustart',
    descEn: '98: Inverter unexpected restart',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W4.10': {
    faultType: 'Error',
    faultCode: 'E59',
    faultTitle: '1_Al99_PWRP_1_Active',
    descZh: '99: 变频器 无故停机',
    descDe: '99: Inverter unerwartete Abschaltung',
    descEn: '99: Inverter unexpected shutdown',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W4.11': {
    faultType: 'Error',
    faultCode: 'E60',
    faultTitle: '1_AlSafe101_PWRP_1_Active',
    descZh: '01: 保护变频器-电流检测故障',
    descDe: '01: Inverterschutz - Stromerkennungsfehler',
    descEn: '01: Inverter protection - current detection fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W4.12': {
    faultType: 'Error',
    faultCode: 'E61',
    faultTitle: '1_AlSafe102_PWRP_1_Active',
    descZh: '02: 保护变频器-电流不平衡',
    descDe: '02: Inverterschutz - Stromasymmetrie',
    descEn: '02: Inverter protection - current imbalance',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W4.13': {
    faultType: 'Error',
    faultCode: 'E62',
    faultTitle: '1_AlSafe103_PWRP_1_Active',
    descZh: '03: 保护变频器 -过电流',
    descDe: '03: Inverterschutz - Überstrom',
    descEn: '03: Inverter protection - overcurrent',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W4.14': {
    faultType: 'Error',
    faultCode: 'E63',
    faultTitle: '1_AlSafe104_PWRP_1_Active',
    descZh: '04: 保护变频器 -STO故障',
    descDe: '04: Inverterschutz - STO-Fehler',
    descEn: '04: Inverter protection - STO fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W4.15': {
    faultType: 'Error',
    faultCode: 'E64',
    faultTitle: '1_AlSafe105_PWRP_1_Active',
    descZh: '05: 保护变频器 -STO硬件故障',
    descDe: '05: Inverterschutz - STO-Hardwarefehler',
    descEn: '05: Inverter protection - STO hardware fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W5.0': {
    faultType: 'Error',
    faultCode: 'E65',
    faultTitle: '1_AlSafe106_PWRP_1_Active',
    descZh: '06: 保护变频器 -电源缺失',
    descDe: '06: Inverterschutz - Stromversorgung fehlt',
    descEn: '06: Inverter protection - power supply missing',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W5.1': {
    faultType: 'Error',
    faultCode: 'E66',
    faultTitle: '1_AlSafe107_PWRP_1_Active',
    descZh: '07: 保护变频器 -硬件缓存报警',
    descDe: '07: Inverterschutz - Hardware-Puffer-Alarm',
    descEn: '07: Inverter protection - hardware buffer alarm',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W5.2': {
    faultType: 'Error',
    faultCode: 'E67',
    faultTitle: '1_AlSafe108_PWRP_1_Active',
    descZh: '08: 保护变频器 -加热器控制故障',
    descDe: '08: Inverterschutz - Heizungssteuerungsfehler',
    descEn: '08: Inverter protection - heater control fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W5.3': {
    faultType: 'Error',
    faultCode: 'E68',
    faultTitle: '1_AlSafe109_PWRP_1_Active',
    descZh: '09: 保护变频器 -通讯故障',
    descDe: '09: Inverterschutz - Kommunikationsfehler',
    descEn: '09: Inverter protection - communication fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W5.4': {
    faultType: 'Error',
    faultCode: 'E69',
    faultTitle: '1_AlSafe110_PWRP_1_Active',
    descZh: '10: 保护变频器 -压缩机堵转报警',
    descDe: '10: Inverterschutz - Kompressor Blockierschutz-Alarm',
    descEn: '10: Inverter protection - compressor locked-rotor alarm',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W5.5': {
    faultType: 'Error',
    faultCode: 'E70',
    faultTitle: '1_AlSafe111_PWRP_1_Active',
    descZh: '11: 保护变频器 -母线过电流故障',
    descDe: '11: Inverterschutz - Bus-Überstromfehler',
    descEn: '11: Inverter protection - bus overcurrent fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W5.6': {
    faultType: 'Error',
    faultCode: 'E71',
    faultTitle: '1_AlSafe112_PWRP_1_Active',
    descZh: '12: 保护变频器 -母线电流硬件报警',
    descDe: '12: Inverterschutz - Busstrom-Hardwarealarm',
    descEn: '12: Inverter protection - bus current hardware alarm',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W5.7': {
    faultType: 'Error',
    faultCode: 'E72',
    faultTitle: '1_AlSafe113_PWRP_1_Active',
    descZh: '13: 保护变频器 -母线电压报警',
    descDe: '13: Inverterschutz - Busspannungsalarm',
    descEn: '13: Inverter protection - bus voltage alarm',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W5.8': {
    faultType: 'Error',
    faultCode: 'E73',
    faultTitle: '1_AlSafe114_PWRP_1_Active',
    descZh: '14: 保护变频器 -母线电压硬件报警',
    descDe: '14: Inverterschutz - Busspannungs-Hardwarealarm',
    descEn: '14: Inverter protection - bus voltage hardware alarm',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W5.9': {
    faultType: 'Error',
    faultCode: 'E74',
    faultTitle: '1_AlSafe115_PWRP_1_Active',
    descZh: '15: 保护变频器 -输入电压报警',
    descDe: '15: Inverterschutz - Eingangsspannungsalarm',
    descEn: '15: Inverter protection - input voltage alarm',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W5.10': {
    faultType: 'Error',
    faultCode: 'E75',
    faultTitle: '1_AlSafe116_PWRP_1_Active',
    descZh: '16: 保护变频器 -输入电压硬件报警',
    descDe: '16: Inverterschutz - Eingangsspannungs-Hardwarealarm',
    descEn: '16: Inverter protection - input voltage hardware alarm',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W5.11': {
    faultType: 'Error',
    faultCode: 'E76',
    faultTitle: '1_AlSafe201_PWRP_1_Active',
    descZh: '17: 保护变频器 -母线功率报警',
    descDe: '17: Inverterschutz - Busleistungsalarm',
    descEn: '17: Inverter protection - bus power alarm',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W5.12': {
    faultType: 'Error',
    faultCode: 'E77',
    faultTitle: '1_AlSafe202_PWRP_1_Active',
    descZh: '18: 保护变频器 -功率不匹配故障',
    descDe: '18: Inverterschutz - Leistungsfehlanpassung',
    descEn: '18: Inverter protection - power mismatch fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W5.13': {
    faultType: 'Error',
    faultCode: 'E78',
    faultTitle: '1_AlSafe203_PWRP_1_Active',
    descZh: '19: 保护变频器 -NTC超温',
    descDe: '19: Inverterschutz - NTC-Übertemperatur',
    descEn: '19: Inverter protection - NTC overtemperature',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W5.14': {
    faultType: 'Error',
    faultCode: 'E79',
    faultTitle: '1_AlSafe204_PWRP_1_Active',
    descZh: '20: 保护变频器 -低于工作温度',
    descDe: '20: Inverterschutz - unter Betriebstemperatur',
    descEn: '20: Inverter protection - below operating temperature',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W5.15': {
    faultType: 'Error',
    faultCode: 'E80',
    faultTitle: '1_AlSafe205_PWRP_1_Active',
    descZh: '21: 保护变频器 -NTC 故障',
    descDe: '21: Inverterschutz - NTC-Fehler',
    descEn: '21: Inverter protection - NTC fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W6.0': {
    faultType: 'Error',
    faultCode: 'E81',
    faultTitle: '1_AlSafe206_PWRP_1_Active',
    descZh: '22: 保护变频器 -硬件同步故障',
    descDe: '22: Inverterschutz - Hardware-Synchronisierungsfehler',
    descEn: '22: Inverter protection - hardware sync fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W6.1': {
    faultType: 'Error',
    faultCode: 'E82',
    faultTitle: '1_AlSafe207_PWRP_1_Active',
    descZh: '23: 保护变频器 -无效参数',
    descDe: '23: Inverterschutz - ungültiger Parameter',
    descEn: '23: Inverter protection - invalid parameter',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W6.2': {
    faultType: 'Error',
    faultCode: 'E83',
    faultTitle: '1_AlSafe208_PWRP_1_Active',
    descZh: '24: 保护变频器 -固件故障',
    descDe: '24: Inverterschutz - Firmware-Fehler',
    descEn: '24: Inverter protection - firmware fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W6.3': {
    faultType: 'Error',
    faultCode: 'E84',
    faultTitle: '1_AlSafe209_PWRP_1_Active',
    descZh: '25: 保护变频器 -硬件故障',
    descDe: '25: Inverterschutz - Hardware-Fehler',
    descEn: '25: Inverter protection - hardware fault',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W6.4': {
    faultType: 'Error',
    faultCode: 'E85',
    faultTitle: '1_AlSafe210_PWRP_1_Active',
    descZh: '26: 保护变频器 -预留',
    descDe: '26: Inverterschutz - reserviert',
    descEn: '26: Inverter protection - reserved',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W6.5': {
    faultType: 'Error',
    faultCode: 'E86',
    faultTitle: '1_AlSafe211_PWRP_1_Active',
    descZh: '27: 保护变频器 -预留',
    descDe: '27: Inverterschutz - reserviert',
    descEn: '27: Inverter protection - reserved',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W6.6': {
    faultType: 'Error',
    faultCode: 'E87',
    faultTitle: '1_AlSafe212_PWRP_1_Active',
    descZh: '28: 保护变频器 -预留',
    descDe: '28: Inverterschutz - reserviert',
    descEn: '28: Inverter protection - reserved',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W6.7': {
    faultType: 'Error',
    faultCode: 'E88',
    faultTitle: '1_AlSafe213_PWRP_1_Active',
    descZh: '29: 保护变频器 -预留',
    descDe: '29: Inverterschutz - reserviert',
    descEn: '29: Inverter protection - reserved',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W6.8': {
    faultType: 'Error',
    faultCode: 'E89',
    faultTitle: '1_AlSafe214_PWRP_1_Active',
    descZh: '30: 保护变频器 -预留',
    descDe: '30: Inverterschutz - reserviert',
    descEn: '30: Inverter protection - reserved',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W6.9': {
    faultType: 'Error',
    faultCode: 'E90',
    faultTitle: '1_AlSafe215_PWRP_1_Active',
    descZh: '31: 保护变频器 -预留',
    descDe: '31: Inverterschutz - reserviert',
    descEn: '31: Inverter protection - reserved',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W6.10': {
    faultType: 'Error',
    faultCode: 'E91',
    faultTitle: '1_AlSafe216_PWRP_1_Active',
    descZh: '32: 保护变频器 -预留',
    descDe: '32: Inverterschutz - reserviert',
    descEn: '32: Inverter protection - reserved',
    solutionZh: '变频器工作异常，请联系专业维修人员进行检查',
    solutionDe:
      'Inverter arbeitet abnormal. Bitte kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion',
    solutionEn:
      'Inverter operating abnormally. Please contact a qualified service technician for inspection',
  },
  'AL_W6.11': {
    faultType: 'Error',
    faultCode: 'E92',
    faultTitle: '1_Al_InvOffline_PWRP_1_Active',
    descZh: '变频器离线',
    descDe: 'Inverter offline',
    descEn: 'Inverter offline',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查主控与变频器之间的通讯线是否松脱\n3、检查变频器的通讯波特率与地址位是否设置正确',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob das Kommunikationskabel zwischen der Hauptsteuerung und dem Inverter locker ist\n3. Prüfen Sie, ob die Kommunikationsbaudrate und die Adresse des Inverters korrekt eingestellt sind',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the communication cable between the main controller and the inverter is loose\n3. Check whether the inverter communication baud rate and address are set correctly',
  },
  'AL_W6.12': {
    faultType: 'Error',
    faultCode: 'E93',
    faultTitle: '1_Al_LowSH_1_Active',
    descZh: 'EEV  报警 - 低过热度警告',
    descDe: 'EEV-Alarm - Warnung niedrige Überhitzung',
    descEn: 'EEV alarm - Low superheat warning',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查主控板上，膨胀阀连接线是否松脱\n3、检查膨胀阀线圈是否松脱\n4、更换新的膨胀阀线圈',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob das Anschlusskabel des Expansionsventils auf der Hauptsteuerplatine locker ist\n3. Prüfen Sie, ob die Spule des Expansionsventils locker ist\n4. Ersetzen Sie diese durch eine neue Spule für das Expansionsventil',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the expansion valve connection cable on the main control board is loose\n3. Check whether the expansion valve coil is loose\n4. Replace with a new expansion valve coil',
  },
  'AL_W6.13': {
    faultType: 'Error',
    faultCode: 'E94',
    faultTitle: '1_Al_LOP_1_Active',
    descZh: 'EEV  报警 - 低吸气压力报警',
    descDe: 'EEV-Alarm - Niedriger Saugdruck',
    descEn: 'EEV alarm - Low suction pressure',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查主控板上，膨胀阀连接线是否松脱\n3、检查膨胀阀线圈是否松脱\n4、更换新的膨胀阀线圈',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob das Anschlusskabel des Expansionsventils auf der Hauptsteuerplatine locker ist\n3. Prüfen Sie, ob die Spule des Expansionsventils locker ist\n4. Ersetzen Sie diese durch eine neue Spule für das Expansionsventil',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the expansion valve connection cable on the main control board is loose\n3. Check whether the expansion valve coil is loose\n4. Replace with a new expansion valve coil',
  },
  'AL_W6.14': {
    faultType: 'Error',
    faultCode: 'E95',
    faultTitle: '1_Al_MOP_1_Active',
    descZh: 'EEV  报警 - 高吸气压力报警',
    descDe: 'EEV-Alarm - Hoher Saugdruck',
    descEn: 'EEV alarm - High suction pressure',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查主控板上，膨胀阀连接线是否松脱\n3、检查膨胀阀线圈是否松脱\n4、更换新的膨胀阀线圈',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob das Anschlusskabel des Expansionsventils auf der Hauptsteuerplatine locker ist\n3. Prüfen Sie, ob die Spule des Expansionsventils locker ist\n4. Ersetzen Sie diese durch eine neue Spule für das Expansionsventil',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the expansion valve connection cable on the main control board is loose\n3. Check whether the expansion valve coil is loose\n4. Replace with a new expansion valve coil',
  },
  'AL_W6.15': {
    faultType: 'Error',
    faultCode: 'E96',
    faultTitle: '1_Al_HiTempCond_1_Active',
    descZh: 'EEV  报警 - 高冷凝温度',
    descDe: 'EEV-Alarm - Hohe Kondensationstemperatur',
    descEn: 'EEV alarm - High condensing temperature',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查主控板上，膨胀阀连接线是否松脱\n3、检查膨胀阀线圈是否松脱\n4、更换新的膨胀阀线圈',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob das Anschlusskabel des Expansionsventils auf der Hauptsteuerplatine locker ist\n3. Prüfen Sie, ob die Spule des Expansionsventils locker ist\n4. Ersetzen Sie diese durch eine neue Spule für das Expansionsventil',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the expansion valve connection cable on the main control board is loose\n3. Check whether the expansion valve coil is loose\n4. Replace with a new expansion valve coil',
  },
  'AL_W7.0': {
    faultType: 'Error',
    faultCode: 'E97',
    faultTitle: '1_Al_LowSuct_1_Active',
    descZh: 'EEV  报警 - 低吸气温度',
    descDe: 'EEV-Alarm - Niedrige Saugtemperatur',
    descEn: 'EEV alarm - Low suction temperature',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查主控板上，膨胀阀连接线是否松脱\n3、检查膨胀阀线圈是否松脱\n4、更换新的膨胀阀线圈',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob das Anschlusskabel des Expansionsventils auf der Hauptsteuerplatine locker ist\n3. Prüfen Sie, ob die Spule des Expansionsventils locker ist\n4. Ersetzen Sie diese durch eine neue Spule für das Expansionsventil',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the expansion valve connection cable on the main control board is loose\n3. Check whether the expansion valve coil is loose\n4. Replace with a new expansion valve coil',
  },
  'AL_W7.1': {
    faultType: 'Error',
    faultCode: 'E98',
    faultTitle: '1_Al_EEV_1_Active',
    descZh: 'EEV  报警 - 电机故障',
    descDe: 'EEV-Alarm - Motorfehler',
    descEn: 'EEV alarm - Motor fault',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查主控板上，膨胀阀连接线是否松脱\n3、检查膨胀阀线圈是否松脱\n4、更换新的膨胀阀线圈',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob das Anschlusskabel des Expansionsventils auf der Hauptsteuerplatine locker ist\n3. Prüfen Sie, ob die Spule des Expansionsventils locker ist\n4. Ersetzen Sie diese durch eine neue Spule für das Expansionsventil',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the expansion valve connection cable on the main control board is loose\n3. Check whether the expansion valve coil is loose\n4. Replace with a new expansion valve coil',
  },
  'AL_W7.2': {
    faultType: 'Error',
    faultCode: 'E99',
    faultTitle: '1_Al_SelfTuning_1_Active',
    descZh: 'EEV  报警 - 自适应失败',
    descDe: 'EEV-Alarm - Adaptive Steuerung fehlgeschlagen',
    descEn: 'EEV alarm - Adaptive control failed',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查主控板上，膨胀阀连接线是否松脱\n3、检查膨胀阀线圈是否松脱\n4、更换新的膨胀阀线圈',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob das Anschlusskabel des Expansionsventils auf der Hauptsteuerplatine locker ist\n3. Prüfen Sie, ob die Spule des Expansionsventils locker ist\n4. Ersetzen Sie diese durch eine neue Spule für das Expansionsventil',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the expansion valve connection cable on the main control board is loose\n3. Check whether the expansion valve coil is loose\n4. Replace with a new expansion valve coil',
  },
  'AL_W7.3': {
    faultType: 'Error',
    faultCode: 'E100',
    faultTitle: '1_Al_EmergClos_1_Active',
    descZh: 'EEV  报警 - 紧急关阀',
    descDe: 'EEV-Alarm - Notfall-Ventilschließung',
    descEn: 'EEV alarm - Emergency valve close',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查主控板上，膨胀阀连接线是否松脱\n3、检查膨胀阀线圈是否松脱\n4、更换新的膨胀阀线圈',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob das Anschlusskabel des Expansionsventils auf der Hauptsteuerplatine locker ist\n3. Prüfen Sie, ob die Spule des Expansionsventils locker ist\n4. Ersetzen Sie diese durch eine neue Spule für das Expansionsventil',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the expansion valve connection cable on the main control board is loose\n3. Check whether the expansion valve coil is loose\n4. Replace with a new expansion valve coil',
  },
  'AL_W7.4': {
    faultType: 'Error',
    faultCode: 'E101',
    faultTitle: '1_Al_TempDelta_1_Active',
    descZh: '',
    descDe: 'EEV-Alarm - Konfigurationsfehler Strukturparameter',
    descEn: '',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查主控板上，膨胀阀连接线是否松脱\n3、检查膨胀阀线圈是否松脱\n4、更换新的膨胀阀线圈',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob das Anschlusskabel des Expansionsventils auf der Hauptsteuerplatine locker ist\n3. Prüfen Sie, ob die Spule des Expansionsventils locker ist\n4. Ersetzen Sie diese durch eine neue Spule für das Expansionsventil',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the expansion valve connection cable on the main control board is loose\n3. Check whether the expansion valve coil is loose\n4. Replace with a new expansion valve coil',
  },
  'AL_W7.5': {
    faultType: 'Error',
    faultCode: 'E102',
    faultTitle: '1_Al_P_Delta_1_Active',
    descZh: '',
    descDe: 'EEV-Alarm - Erzwungener Positionswert außerhalb des Bereichs',
    descEn: '',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查主控板上，膨胀阀连接线是否松脱\n3、检查膨胀阀线圈是否松脱\n4、更换新的膨胀阀线圈',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob das Anschlusskabel des Expansionsventils auf der Hauptsteuerplatine locker ist\n3. Prüfen Sie, ob die Spule des Expansionsventils locker ist\n4. Ersetzen Sie diese durch eine neue Spule für das Expansionsventil',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the expansion valve connection cable on the main control board is loose\n3. Check whether the expansion valve coil is loose\n4. Replace with a new expansion valve coil',
  },
  'AL_W7.6': {
    faultType: 'Error',
    faultCode: 'E103',
    faultTitle: '1_Al_RangeError_1_Active',
    descZh: 'EEV  报警 - 结构体参数配置错误',
    descDe: 'EEV-Alarm - Ventil-ID außerhalb des Bereichs',
    descEn: 'EEV alarm - Structure parameter configuration error',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查主控板上，膨胀阀连接线是否松脱\n3、检查膨胀阀线圈是否松脱\n4、更换新的膨胀阀线圈',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob das Anschlusskabel des Expansionsventils auf der Hauptsteuerplatine locker ist\n3. Prüfen Sie, ob die Spule des Expansionsventils locker ist\n4. Ersetzen Sie diese durch eine neue Spule für das Expansionsventil',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the expansion valve connection cable on the main control board is loose\n3. Check whether the expansion valve coil is loose\n4. Replace with a new expansion valve coil',
  },
  'AL_W7.7': {
    faultType: 'Error',
    faultCode: 'E104',
    faultTitle: '1_Al_ServicePosit_perc_1_Active',
    descZh: 'EEV  报警 - 强制定位值超范围',
    descDe: 'EEV-Alarm - Erzwungener Positionswert außerhalb des Bereichs',
    descEn: 'EEV alarm - Forced position value out of range',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查主控板上，膨胀阀连接线是否松脱\n3、检查膨胀阀线圈是否松脱\n4、更换新的膨胀阀线圈',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob das Anschlusskabel des Expansionsventils auf der Hauptsteuerplatine locker ist\n3. Prüfen Sie, ob die Spule des Expansionsventils locker ist\n4. Ersetzen Sie diese durch eine neue Spule für das Expansionsventil',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the expansion valve connection cable on the main control board is loose\n3. Check whether the expansion valve coil is loose\n4. Replace with a new expansion valve coil',
  },
  'AL_W7.8': {
    faultType: 'Error',
    faultCode: 'E105',
    faultTitle: '1_Al_ValveID_1_Active',
    descZh: 'EEV  报警 -  阀ID号超范围',
    descDe: 'EEV-Alarm - Ventil-ID außerhalb des Bereichs',
    descEn: 'EEV alarm - Valve ID out of range',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查主控板上，膨胀阀连接线是否松脱\n3、检查膨胀阀线圈是否松脱\n4、更换新的膨胀阀线圈',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob das Anschlusskabel des Expansionsventils auf der Hauptsteuerplatine locker ist\n3. Prüfen Sie, ob die Spule des Expansionsventils locker ist\n4. Ersetzen Sie diese durch eine neue Spule für das Expansionsventil',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the expansion valve connection cable on the main control board is loose\n3. Check whether the expansion valve coil is loose\n4. Replace with a new expansion valve coil',
  },
  'AL_W7.9': {
    faultType: 'Error',
    faultCode: 'E106',
    faultTitle: '1_Al_Low_Press_Active',
    descZh: '低吸气压力告警',
    descDe: 'Niedriger Saugdruck-Alarm',
    descEn: 'Low suction pressure alarm',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查传感器是否损坏\n3、检查膨胀阀是否损坏\n4、检查水泵、风机是否正常\n5、检查室外机进风侧是否脏堵\n6、检查系统制冷是否泄漏',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob der Sensor beschädigt ist\n3. Prüfen Sie, ob das Expansionsventil beschädigt ist\n4. Prüfen Sie, ob die Wasserpumpe und der Lüfter normal arbeiten\n5. Prüfen Sie, ob der Lufteinlass der Außeneinheit blockiert ist\n6. Prüfen Sie, ob das Kühlsystem ein Kältemittelleck aufweist',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the sensor is damaged\n3. Check whether the expansion valve is damaged\n4. Check whether the water pump and fan are operating normally\n5. Check whether the outdoor unit air inlet is blocked\n6. Check whether the refrigeration system has a refrigerant leak',
  },
  'AL_W7.10': {
    faultType: 'Error',
    faultCode: 'E107',
    faultTitle: '1_Al_High_Press_Active',
    descZh: '高排气压力告警',
    descDe: 'Hoher Hochdruck-Alarm',
    descEn: 'High discharge pressure alarm',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查传感器是否损坏\n3、检查膨胀阀是否损坏\n4、检查水泵、风机是否正常\n5、检查室外机进风侧是否脏堵\n6、检查系统制冷是否泄漏',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob der Sensor beschädigt ist\n3. Prüfen Sie, ob das Expansionsventil beschädigt ist\n4. Prüfen Sie, ob die Wasserpumpe und der Lüfter normal arbeiten\n5. Prüfen Sie, ob der Lufteinlass der Außeneinheit blockiert ist\n6. Prüfen Sie, ob das Kühlsystem ein Kältemittelleck aufweist',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the sensor is damaged\n3. Check whether the expansion valve is damaged\n4. Check whether the water pump and fan are operating normally\n5. Check whether the outdoor unit air inlet is blocked\n6. Check whether the refrigeration system has a refrigerant leak',
  },
  'AL_W7.11': {
    faultType: 'Error',
    faultCode: 'E108',
    faultTitle: '1_Al_Prb_DscgTemp_Active',
    descZh: '排气温度探头故障或离线',
    descDe: 'Druckrohrtemperatur-Sensor fehlerhaft oder offline',
    descEn: 'Discharge temperature sensor fault or offline',
    solutionZh: '1、检查传感器是否松脱或者损坏\n2、更换相同的型号的传感器',
    solutionDe:
      '\n1. Prüfen Sie, ob der Sensor locker oder beschädigt ist\n2. Ersetzen Sie ihn durch einen Sensor des gleichen Modells',
    solutionEn:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
  },
  'AL_W7.12': {
    faultType: 'Error',
    faultCode: 'E109',
    faultTitle: '1_Al_Prb_SuctTemp_Active',
    descZh: '吸气温度探头故障或离线',
    descDe: 'Saugtemperatur-Sensor fehlerhaft oder offline',
    descEn: 'Suction temperature sensor fault or offline',
    solutionZh: '1、检查传感器是否松脱或者损坏\n2、更换相同的型号的传感器',
    solutionDe:
      '\n1. Prüfen Sie, ob der Sensor locker oder beschädigt ist\n2. Ersetzen Sie ihn durch einen Sensor des gleichen Modells',
    solutionEn:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
  },
  'AL_W7.13': {
    faultType: 'Error',
    faultCode: 'E110',
    faultTitle: '1_Al_Prb_DscgP_Active',
    descZh: '高压探头故障或离线',
    descDe: 'Hochdruck-Sensor fehlerhaft oder offline',
    descEn: 'High pressure sensor fault or offline',
    solutionZh: '1、检查传感器是否松脱或者损坏\n2、更换相同的型号的传感器',
    solutionDe:
      '\n1. Prüfen Sie, ob der Sensor locker oder beschädigt ist\n2. Ersetzen Sie ihn durch einen Sensor des gleichen Modells',
    solutionEn:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
  },
  'AL_W7.14': {
    faultType: 'Error',
    faultCode: 'E111',
    faultTitle: '1_Al_Prb_SuctP_Active',
    descZh: '低压探头故障或离线',
    descDe: 'Niederdruck-Sensor fehlerhaft oder offline',
    descEn: 'Low pressure sensor fault or offline',
    solutionZh: '1、检查传感器是否松脱或者损坏\n2、更换相同的型号的传感器',
    solutionDe:
      '\n1. Prüfen Sie, ob der Sensor locker oder beschädigt ist\n2. Ersetzen Sie ihn durch einen Sensor des gleichen Modells',
    solutionEn:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
  },
  'AL_W7.15': {
    faultType: 'Error',
    faultCode: 'E112',
    faultTitle: 'Al_Prb_CW_SolarTemp.Active',
    descZh: '太阳能温度探头故障或离线',
    descDe: 'Solartemperatur-Sensor fehlerhaft oder offline',
    descEn: 'Solar temperature sensor fault or offline',
    solutionZh: '1、检查传感器是否松脱或者损坏\n2、更换相同的型号的传感器',
    solutionDe:
      '\n1. Prüfen Sie, ob der Sensor locker oder beschädigt ist\n2. Ersetzen Sie ihn durch einen Sensor des gleichen Modells',
    solutionEn:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
  },
  'AL_W8.0': {
    faultType: 'Error',
    faultCode: 'E113',
    faultTitle: '1_Al_Prb_SuctTemp_EVI_Active',
    descZh: '预留',
    descDe: 'Reserviert',
    descEn: 'Reserved',
    solutionZh: '',
    solutionDe: '',
    solutionEn: '',
  },
  'AL_W8.1': {
    faultType: 'Error',
    faultCode: 'E114',
    faultTitle: '1_Al_Prb_SuctP_EVI_Active',
    descZh: '预留',
    descDe: 'Reserviert',
    descEn: 'Reserved',
    solutionZh: '',
    solutionDe: '',
    solutionEn: '',
  },
  'AL_W8.2': {
    faultType: 'Error',
    faultCode: 'E115',
    faultTitle: '1_Al_Pmp_Active',
    descZh: '水泵流量报警',
    descDe: 'Pumpendurchfluss-Alarm',
    descEn: 'Pump flow rate alarm',
    solutionZh:
      '1、检查水路系统是否缺水\n2、检查进出水阀门是否关闭或者未全开\n3、检查管道过滤器是否脏堵',
    solutionDe:
      '1. Prüfen Sie, ob das Wassersystem einen Wassermangel aufweist\n2. Prüfen Sie, ob die Einlass- und Auslassventile geschlossen oder nicht vollständig geöffnet sind\n3. Prüfen Sie, ob der Rohrleitungsfilter verstopft ist',
    solutionEn:
      '1. Check whether the water system is short of water\n2. Check whether the inlet and outlet valves are closed or not fully open\n3. Check whether the pipeline filter is clogged',
  },
  'AL_W8.3': {
    faultType: 'Error',
    faultCode: 'E116',
    faultTitle: '1_Al_OutHiTemp_Active',
    descZh: '高出水温度报警',
    descDe: 'Hoher Auslasswassertemperatur-Alarm',
    descEn: 'High outlet water temperature alarm',
    solutionZh:
      '1、检查水路系统是否缺水\n2、检查进出水阀门是否关闭或者未全开\n3、检查管道过滤器是否脏堵',
    solutionDe:
      '1. Prüfen Sie, ob das Wassersystem einen Wassermangel aufweist\n2. Prüfen Sie, ob die Einlass- und Auslassventile geschlossen oder nicht vollständig geöffnet sind\n3. Prüfen Sie, ob der Rohrleitungsfilter verstopft ist',
    solutionEn:
      '1. Check whether the water system is short of water\n2. Check whether the inlet and outlet valves are closed or not fully open\n3. Check whether the pipeline filter is clogged',
  },
  'AL_W8.4': {
    faultType: 'Error',
    faultCode: 'E117',
    faultTitle: '1_Al_OutLowTemp_Active',
    descZh: '低出水温度报警',
    descDe: 'Niedriger Auslasswassertemperatur-Alarm',
    descEn: 'Low outlet water temperature alarm',
    solutionZh:
      '1、检查水路系统是否缺水\n2、检查进出水阀门是否关闭或者未全开\n3、检查管道过滤器是否脏堵',
    solutionDe:
      '1. Prüfen Sie, ob das Wassersystem einen Wassermangel aufweist\n2. Prüfen Sie, ob die Einlass- und Auslassventile geschlossen oder nicht vollständig geöffnet sind\n3. Prüfen Sie, ob der Rohrleitungsfilter verstopft ist',
    solutionEn:
      '1. Check whether the water system is short of water\n2. Check whether the inlet and outlet valves are closed or not fully open\n3. Check whether the pipeline filter is clogged',
  },
  'AL_W8.5': {
    faultType: 'Error',
    faultCode: 'E118',
    faultTitle: '1_Al_DeltaTemp_Active',
    descZh: '进出水温差过大报警',
    descDe: 'Übermäßige Einlass-Auslass-Wassertemperaturdifferenz-Alarm',
    descEn: 'Excessive inlet-outlet water temperature difference alarm',
    solutionZh:
      '1、检查水路系统是否缺水\n2、检查进出水阀门是否关闭或者未全开\n3、检查管道过滤器是否脏堵',
    solutionDe:
      '1. Prüfen Sie, ob das Wassersystem einen Wassermangel aufweist\n2. Prüfen Sie, ob die Einlass- und Auslassventile geschlossen oder nicht vollständig geöffnet sind\n3. Prüfen Sie, ob der Rohrleitungsfilter verstopft ist',
    solutionEn:
      '1. Check whether the water system is short of water\n2. Check whether the inlet and outlet valves are closed or not fully open\n3. Check whether the pipeline filter is clogged',
  },
  'AL_W8.6': {
    faultType: 'Error',
    faultCode: 'E119',
    faultTitle: '1_Al_RangeError_2_Active',
    descZh: '预留',
    descDe: 'Reserviert',
    descEn: 'Reserved',
    solutionZh: '',
    solutionDe: '',
    solutionEn: '',
  },
  'AL_W8.7': {
    faultType: 'Error',
    faultCode: 'E120',
    faultTitle: '1_Al_LowSH_2_Active',
    descZh: '预留',
    descDe: 'Reserviert',
    descEn: 'Reserved',
    solutionZh: '',
    solutionDe: '',
    solutionEn: '',
  },
  'AL_W8.8': {
    faultType: 'Error',
    faultCode: 'E121',
    faultTitle: '1_Al_LOP_2_Active',
    descZh: '预留',
    descDe: 'Reserviert',
    descEn: 'Reserved',
    solutionZh: '',
    solutionDe: '',
    solutionEn: '',
  },
  'AL_W8.9': {
    faultType: 'Error',
    faultCode: 'E122',
    faultTitle: '1_Al_MOP_2_Active',
    descZh: '预留',
    descDe: 'Reserviert',
    descEn: 'Reserved',
    solutionZh: '',
    solutionDe: '',
    solutionEn: '',
  },
  'AL_W8.10': {
    faultType: 'Error',
    faultCode: 'E123',
    faultTitle: '1_Al_HiTempCond_2_Active',
    descZh: '预留',
    descDe: 'Reserviert',
    descEn: 'Reserved',
    solutionZh: '',
    solutionDe: '',
    solutionEn: '',
  },
  'AL_W8.11': {
    faultType: 'Error',
    faultCode: 'E124',
    faultTitle: '1_Al_LowSuct_2_Active',
    descZh: '预留',
    descDe: 'Reserviert',
    descEn: 'Reserved',
    solutionZh: '',
    solutionDe: '',
    solutionEn: '',
  },
  'AL_W8.12': {
    faultType: 'Error',
    faultCode: 'E125',
    faultTitle: '1_Al_EEV_2_Active',
    descZh: '预留',
    descDe: 'Reserviert',
    descEn: 'Reserved',
    solutionZh: '',
    solutionDe: '',
    solutionEn: '',
  },
  'AL_W8.13': {
    faultType: 'Error',
    faultCode: 'E126',
    faultTitle: '1_Al_SelfTuning_2_Active',
    descZh: '预留',
    descDe: 'Reserviert',
    descEn: 'Reserved',
    solutionZh: '',
    solutionDe: '',
    solutionEn: '',
  },
  'AL_W8.14': {
    faultType: 'Error',
    faultCode: 'E127',
    faultTitle: '1_Al_EmergClos_2_Active',
    descZh: '预留',
    descDe: 'Reserviert',
    descEn: 'Reserved',
    solutionZh: '',
    solutionDe: '',
    solutionEn: '',
  },
  'AL_W8.15': {
    faultType: 'Error',
    faultCode: 'E128',
    faultTitle: '1_Al_ServicePosit_perc_2_Active',
    descZh: '预留',
    descDe: 'Reserviert',
    descEn: 'Reserved',
    solutionZh: '',
    solutionDe: '',
    solutionEn: '',
  },
  'AL_W9.0': {
    faultType: 'Error',
    faultCode: 'E129',
    faultTitle: '1_Al_ValveID_2_Active',
    descZh: '预留',
    descDe: 'Reserviert',
    descEn: 'Reserved',
    solutionZh: '',
    solutionDe: '',
    solutionEn: '',
  },
  'AL_W9.1': {
    faultType: 'Error',
    faultCode: 'E130',
    faultTitle: '1_Al_OvldHeater_Active',
    descZh: '电加热过载报警',
    descDe: 'Elektroheizung Überlastalarm',
    descEn: 'Electric heater overload alarm',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查传感器是否损坏\n3、检查水泵是否正常\n4、检查进出水阀门是否关闭或者未全开\n5、检查管道过滤器是否脏堵',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob der Sensor beschädigt ist\n3. Prüfen Sie, ob die Wasserpumpe normal arbeitet\n4. Prüfen Sie, ob die Einlass- und Auslassventile geschlossen oder nicht vollständig geöffnet sind\n5. Prüfen Sie, ob der Rohrleitungsfilter verstopft ist',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the sensor is damaged\n3. Check whether the water pump is operating normally\n4. Check whether the inlet and outlet valves are closed or not fully open\n5. Check whether the pipeline filter is clogged',
  },
  'AL_W9.2': {
    faultType: 'Error',
    faultCode: 'E131',
    faultTitle: '1_Al_HiP_Pstat_Active',
    descZh: '高压开关报警',
    descDe: 'Hochdruckschalter-Alarm',
    descEn: 'High pressure switch alarm',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查传感器是否损坏\n3、检查膨胀阀是否损坏\n4、检查水泵、风机是否正常\n5、检查室外机进风侧是否脏堵\n6、检查系统制冷是否泄漏',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob der Sensor beschädigt ist\n3. Prüfen Sie, ob das Expansionsventil beschädigt ist\n4. Prüfen Sie, ob die Wasserpumpe und der Lüfter normal arbeiten\n5. Prüfen Sie, ob der Lufteinlass der Außeneinheit blockiert ist\n6. Prüfen Sie, ob das Kühlsystem ein Kältemittelleck aufweist',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the sensor is damaged\n3. Check whether the expansion valve is damaged\n4. Check whether the water pump and fan are operating normally\n5. Check whether the outdoor unit air inlet is blocked\n6. Check whether the refrigeration system has a refrigerant leak',
  },
  'AL_W9.3': {
    faultType: 'Error',
    faultCode: 'E132',
    faultTitle: '1_Al_LowP_Pstat_Active',
    descZh: '低压开关报警',
    descDe: 'Niederdruckschalter-Alarm',
    descEn: 'Low pressure switch alarm',
    solutionZh:
      '1、请联系专业维修人员检查\n2、检查传感器是否损坏\n3、检查膨胀阀是否损坏\n4、检查水泵、风机是否正常\n5、检查室外机进风侧是否脏堵\n6、检查系统制冷是否泄漏',
    solutionDe:
      '1. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n2. Prüfen Sie, ob der Sensor beschädigt ist\n3. Prüfen Sie, ob das Expansionsventil beschädigt ist\n4. Prüfen Sie, ob die Wasserpumpe und der Lüfter normal arbeiten\n5. Prüfen Sie, ob der Lufteinlass der Außeneinheit blockiert ist\n6. Prüfen Sie, ob das Kühlsystem ein Kältemittelleck aufweist',
    solutionEn:
      '1. Contact a qualified service technician for inspection\n2. Check whether the sensor is damaged\n3. Check whether the expansion valve is damaged\n4. Check whether the water pump and fan are operating normally\n5. Check whether the outdoor unit air inlet is blocked\n6. Check whether the refrigeration system has a refrigerant leak',
  },
  'AL_W9.4': {
    faultType: 'Error',
    faultCode: 'E133',
    faultTitle: '1_Al_Prb_EvapTemp_EVI_Active',
    descZh: '预留',
    descDe: 'Reserviert',
    descEn: 'Reserved',
    solutionZh: '',
    solutionDe: '',
    solutionEn: '',
  },
  'AL_W9.5': {
    faultType: 'Error',
    faultCode: 'E134',
    faultTitle: '1_Al_Prb_ConderCoilTemp_Active',
    descZh: '冷凝盘管温度探头故障或离线',
    descDe: 'Verflüssigerschlangen-Temperatursensor fehlerhaft oder offline',
    descEn: 'Condenser coil temperature sensor fault or offline',
    solutionZh: '1、检查传感器是否松脱或者损坏\n2、更换相同的型号的传感器',
    solutionDe:
      '1. Prüfen Sie, ob der Sensor locker oder beschädigt ist\n2. Ersetzen Sie ihn durch einen Sensor des gleichen Modells',
    solutionEn:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
  },
  'AL_W9.6': {
    faultType: 'Error',
    faultCode: 'E135',
    faultTitle: 'Al_Prb_AuxHeatTemp.Active',
    descZh: '辅助电加热反馈温度探头故障或离线',
    descDe:
      'Zusatzelektroheizung-Rückmeldetemperatursensor fehlerhaft oder offline',
    descEn:
      'Auxiliary electric heater feedback temperature sensor fault or offline',
    solutionZh: '1、检查传感器是否松脱或者损坏\n2、更换相同的型号的传感器',
    solutionDe:
      '1. Prüfen Sie, ob der Sensor locker oder beschädigt ist\n2. Ersetzen Sie ihn durch einen Sensor des gleichen Modells',
    solutionEn:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
  },
  'AL_W9.7': {
    faultType: 'Error',
    faultCode: 'E136',
    faultTitle: 'Al_HighPPM_R290.Active',
    descZh: 'R290冷媒超限报警',
    descDe: 'R290 Kältemittelgrenzwert überschritten Alarm',
    descEn: 'R290 refrigerant limit exceeded alarm',
    solutionZh:
      '1、请立即停机并切断电源\n2、请联系专业维修人员检查\n3、检查制冷制是否泄漏\n4、检查传感器是否损坏',
    solutionDe:
      '1. Stoppen Sie die Einheit sofort und trennen Sie die Stromversorgung\n2. Kontaktieren Sie einen qualifizierten Servicetechniker zur Inspektion\n3. Prüfen Sie, ob das Kühlsystem ein Kältemittelleck aufweist\n4. Prüfen Sie, ob der Sensor beschädigt ist',
    solutionEn:
      '1. Stop the unit immediately and disconnect the power supply\n2. Contact a qualified service technician for inspection\n3. Check whether the refrigeration system has a refrigerant leak\n4. Check whether the sensor is damaged',
  },
  'AL_W9.8': {
    faultType: 'Error',
    faultCode: 'E137',
    faultTitle: '1_Al_Fan_CarelOffline_Active',
    descZh: '通讯风机驱动离线报警',
    descDe: 'Lüfterantrieb Kommunikationsfehler-Alarm (Offline)',
    descEn: 'Fan drive communication offline alarm',
    solutionZh:
      '1、检查风机连接线是否松脱\n2、检查风机驱动板是否损坏\n3、检查风机驱动的通讯波特率与地址位是否设置正确',
    solutionDe:
      '1. Prüfen Sie, ob das Anschlusskabel des Lüfters locker ist\n2. Prüfen Sie, ob die Lüfter-Treiberplatine beschädigt ist\n3. Prüfen Sie, ob die Kommunikationsbaudrate und die Adresse des Lüftertreibers korrekt eingestellt sind',
    solutionEn:
      '1. Check whether the fan connection cable is loose\n2. Check whether the fan driver board is damaged\n3. Check whether the fan driver communication baud rate and address are set correctly',
  },
  'AL_W9.9': {
    faultType: 'Error',
    faultCode: 'E138',
    faultTitle: '1_Al_Prb_CW_InletP_Active',
    descZh: '进水压力探头故障或离线',
    descDe: 'Einlasswasserdruck-Sensor fehlerhaft oder offline',
    descEn: 'Inlet water pressure sensor fault or offline',
    solutionZh: '1、检查传感器是否松脱或者损坏\n2、更换相同的型号的传感器',
    solutionDe:
      '1. Prüfen Sie, ob der Sensor locker oder beschädigt ist\n2. Ersetzen Sie ihn durch einen Sensor des gleichen Modells',
    solutionEn:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
  },
  'AL_W9.10': {
    faultType: 'Error',
    faultCode: 'E139',
    faultTitle: '1_Al_Prb_CW_OutletP_Active',
    descZh: '出水压力探头故障或离线',
    descDe: 'Auslasswasserdruck-Sensor fehlerhaft oder offline',
    descEn: 'Outlet water pressure sensor fault or offline',
    solutionZh: '1、检查传感器是否松脱或者损坏\n2、更换相同的型号的传感器',
    solutionDe:
      '1. Prüfen Sie, ob der Sensor locker oder beschädigt ist\n2. Ersetzen Sie ihn durch einen Sensor des gleichen Modells',
    solutionEn:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
  },
  'AL_W9.11': {
    faultType: 'Error',
    faultCode: 'E140',
    faultTitle: '1_Al_Prb_TankTemp_Active',
    descZh: '水箱温度探头故障或离线',
    descDe: 'Speichertemperatur-Sensor fehlerhaft oder offline',
    descEn: 'Tank temperature sensor fault or offline',
    solutionZh: '1、检查传感器是否松脱或者损坏\n2、更换相同的型号的传感器',
    solutionDe:
      '1. Prüfen Sie, ob der Sensor locker oder beschädigt ist\n2. Ersetzen Sie ihn durch einen Sensor des gleichen Modells',
    solutionEn:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
  },
  'AL_W9.12': {
    faultType: 'Error',
    faultCode: 'E141',
    faultTitle: '1_Al_Prb_FlowMeter_Active',
    descZh: '流量计探头故障或离线',
    descDe: 'Durchflussmesser-Sensor fehlerhaft oder offline',
    descEn: 'Flow meter sensor fault or offline',
    solutionZh: '1、检查传感器是否松脱或者损坏\n2、更换相同的型号的传感器',
    solutionDe:
      '1. Prüfen Sie, ob der Sensor locker oder beschädigt ist\n2. Ersetzen Sie ihn durch einen Sensor des gleichen Modells',
    solutionEn:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
  },
  'AL_W9.13': {
    faultType: 'Error',
    faultCode: 'E142',
    faultTitle: '1_Al_Offline_ElecMeter.Active',
    descZh: '电表离线报警',
    descDe: 'Stromzähler Offline-Alarm',
    descEn: 'Electric meter offline alarm',
    solutionZh:
      '1、检查电能表连接线是否松脱\n2、检查电能表是否损坏\n3、检查电能表的通讯波特率与地址位是否设置正确',
    solutionDe:
      '1. Prüfen Sie, ob das Anschlusskabel des Energiezählers locker ist\n2. Prüfen Sie, ob der Energiezähler beschädigt ist\n3. Prüfen Sie, ob die Kommunikationsbaudrate und die Adresse des Energiezählers korrekt eingestellt sind',
    solutionEn:
      '1. Check whether the energy meter connection cable is loose\n2. Check whether the energy meter is damaged\n3. Check whether the energy meter communication baud rate and address are set correctly',
  },
  'AL_W9.14': {
    faultType: 'Error',
    faultCode: 'E143',
    faultTitle: 'Al_MaxTime_ANTILEG.Active',
    descZh: '最大除菌时间到提醒',
    descDe: 'Maximale Sterilisationszeit erreicht Erinnerung',
    descEn: 'Maximum sterilization time reached reminder',
    solutionZh: '请进行手动开启水箱除菌功能',
    solutionDe: 'Aktivieren Sie die Tank-Sterilisationsfunktion manuell',
    solutionEn: 'Manually activate the tank sterilization function',
  },
  'AL_W9.15': {
    faultType: 'Error',
    faultCode: 'E144',
    faultTitle: 'Al_Offline_R290PrbErr.Active',
    descZh: 'R290传感器离线报警',
    descDe: 'R290-Sensor Offline-Alarm',
    descEn: 'R290 sensor offline alarm',
    solutionZh: '1、检查传感器是否松脱或者损坏\n2、更换相同的型号的传感器',
    solutionDe:
      '1. Prüfen Sie, ob der Sensor locker oder beschädigt ist\n2. Ersetzen Sie ihn durch einen Sensor des gleichen Modells',
    solutionEn:
      '1. Check whether the sensor is loose or damaged\n2. Replace with the same model sensor',
  },
  E145: {
    faultType: 'Error',
    faultCode: 'E145',
    faultTitle: 'WCU Communication Error',
    descZh: '线控器通讯故障',
    descDe: 'Kabelcontroller Kommunikationsfehler',
    descEn: 'Wired controller communication fault',
    solutionZh:
      '1、检查线控器的通讯线是否连接\n2、检查线控器的通讯线序是否正确\n3、检查线控器是否损坏',
    solutionDe:
      '1. Prüfen Sie, ob das Kommunikationskabel des kabelgebundenen Controllers ordnungsgemäß angeschlossen ist\n2. Prüfen Sie, ob die Verdrahtungsfolge der Kommunikation des kabelgebundenen Controllers korrekt ist\n3. Prüfen Sie, ob der kabelgebundene Controller beschädigt ist',
    solutionEn:
      '1. Check whether the wired controller communication cable is properly connected\n2. Check whether the wired controller communication wiring sequence is correct\n3. Check whether the wired controller is damaged',
  },
};

export default pumpFaultCodeMap;
