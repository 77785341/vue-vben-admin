import type { WallboxFaultCodeMap } from './types';

const wallboxFaultCodeMap: WallboxFaultCodeMap = {
  '0501': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '0501',
    faultTitleZh: 'CP 信号幅值异常',
    faultTitleDe: '0501 CP Signal',
    faultTitleEn: '0501 CP Signal',
    descZh:
      '1、CP 信号不在允许的范围内 6±1.0V、9±1.0V 或 12±1.0V\n2、车辆插座，CP 线路上的二极管短路\n3、充电期间，CP 线缆被强制断开',
    descDe:
      'CP-Signal nicht im zulässigen Bereich von 6 ± 1,0 V, 9 ± 1,0 V oder 12 ± 1,0 V\nFahrzeugsteckdose: Kurzschluss der Diode in der CP-Leitung\nWährend des Ladevorgangs wurde das CP-Kabel gewaltsam getrennt',
    descEn:
      '1. CP voltage not within the allowed range (6±1.0V, 9±1.0V, or 12±1.0V)\n2. Short circuit of the diode on the CP line at the vehicle socket \n3. CP cable forcibly disconnected during charging',
    solutionZh:
      '1、请确认是否在充电期间人为拔出充电线缆\n2、尝试更换充电线缆，检查充电线缆是否正常\n3、尝试更换电动汽车，检查车辆插座是否正常\n4、使用仪表的 DC 档位，测量供电插座的 CP-PE 的幅值，如果异常请尝试重启充电器\n5、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Prüfen Sie, ob das Ladekabel während des Ladevorgangs manuell abgezogen wurde. 2. Versuchen Sie, das Ladekabel auszutauschen und prüfen Sie dessen Funktion. 3. Testen Sie ein anderes Elektrofahrzeug, um die Steckdose des Fahrzeugs zu prüfen. 4. Messen Sie mit einem Multimeter (DC-Modus) die CP-PE-Spannung an der Versorgungssteckdose; bei Abnormalität starten Sie das Ladegerät neu. 5. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      '1. Please confirm whether the charging cable was manually unplugged during charging\n2. Try replacing the charging cable and check whether it is functioning properly\n3. Try using a different electric vehicle to check whether the vehicle socket is functioning properly\n4. Use a multimeter in DC mode to measure the CP-PE voltage at the supply socket; if abnormal, try restarting the charger\n5. If the issue persists, please contact after-sales technical support',
  },
  '0502': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '0502',
    faultTitleZh: '进线电压过压',
    faultTitleDe: '0502 Überspann',
    faultTitleEn: '0502 IN OV',
    descZh: '检测到进线电压大于 265V（三相设备为 L1/L2/L3 中的最大值）',
    descDe:
      'Eingangsspannung über 265 V erkannt (bei dreiphasigen Geräten der Maximalwert von L1/L2/L3)',
    descEn:
      'Input voltage detected above 265V (for three-phase devices, the maximum of L1/L2/L3)',
    solutionZh:
      '1、查看充电器上报的电压值是否正常 \n2、使用仪表的 AC 档位，测量供电插座的 L-N 的幅值，如果异常请检查供电电源（电网或光伏逆变器） \n3、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Prüfen Sie, ob die vom Ladegerät gemeldete Spannung normal ist. 2. Messen Sie mit einem Multimeter (AC-Modus) die L-N-Spannung an der Versorgungssteckdose; bei Abnormalität prüfen Sie die Stromversorgung (Netz oder PV-Wechselrichter). 3. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      '1. Check whether the voltage reported by the charger is normal\n2. Use a multimeter in AC mode to measure the L-N voltage at the supply socket; if abnormal, check the power supply (grid or PV inverter)\n3. If the issue persists, please contact after-sales technical support',
  },
};

export default wallboxFaultCodeMap;
