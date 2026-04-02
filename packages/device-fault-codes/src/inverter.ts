import type { InverterFaultCodeMap } from './types';

const inverterFaultCodeMap: InverterFaultCodeMap = {
  1: {
    alarmWord: '逆变器故障码1\n(适用于PV侧)',
    alarmBit: 'bit0',
    faultType: 'Error',
    faultCode: 'DE0100',
    faultTitle: 'PV HW OC',
    descZh: '硬件检测到PV输入电流过大',
    descDe: 'Hardware hat einen zu hohen PV-Eingangsstrom erkannt',
    descEn: 'Hardware detected PV input overcurrent',
    solutionZh:
      '1.检查光伏组串是否存在短路或接地故障。\n2.确保光伏组串电流在设计范围内。\n3.关机，等待5分钟后开机，系统60秒自检后确认故障排除。',
    solutionDe:
      '1. Überprüfen Sie, ob der PV-String einen Kurzschluss oder Erdschluss hat.\n2. Stellen Sie sicher, dass der PV-String-Strom im Auslegungsbereich liegt.\n3. Gerät ausschalten, 5 Minuten warten und neu starten. Das System führt einen 60-Sekunden-Selbsttest durch, um die Störungsbeseitigung zu bestätigen.',
    solutionEn:
      '1. Check whether the PV string has a short circuit or ground fault.\n2. Make sure the PV string current is within the design range.\n3. Shut down the system, wait 5 minutes, then restart. The system will run a 60-second self-check to confirm fault clearance.',
  },
  2: {
    alarmWord: '',
    alarmBit: 'bit1',
    faultType: 'Error',
    faultCode: 'DE0101',
    faultTitle: 'PV SW OC',
    descZh: '软件检测到PV输入电流过大',
    descDe: 'Software hat einen zu hohen PV-Eingangsstrom erkannt',
    descEn: 'Software detected PV input overcurrent',
    solutionZh:
      '1.使用万用表测量实际光伏输入电流。\n2.确保光伏组串电流在设计范围内。\n3.关机，等待5分钟后开机，系统60秒自检后确认故障排除。',
    solutionDe:
      '1. Messen Sie den tatsächlichen PV-Eingangsstrom mit einem Multimeter.\n2. Stellen Sie sicher, dass der PV-String-Strom im Auslegungsbereich liegt.\n3. Gerät ausschalten, 5 Minuten warten und neu starten. Das System führt einen 60-Sekunden-Selbsttest durch, um die Störungsbeseitigung zu bestätigen.',
    solutionEn:
      '1. Use a multimeter to measure the actual PV input current.\n2. Make sure the PV string current is within the design range.\n3. Shut down the system, wait 5 minutes, then restart. The system will run a 60-second self-check to confirm fault clearance.',
  },
  3: {
    alarmWord: '',
    alarmBit: 'bit2',
    faultType: 'Error',
    faultCode: 'DE0102',
    faultTitle: 'PV REVERSE',
    descZh: 'PV组串反接',
    descDe: 'PV-String ist verpolt',
    descEn: 'PV string reverse connection',
    solutionZh:
      '1.检查光伏组串是否正确连接至逆变器。\n2.检查光伏组串极性是否正确。\n3.关机，等待5分钟后开机，系统60秒自检后确认故障排除。',
    solutionDe:
      '1. Überprüfen Sie, ob der PV-String korrekt mit dem Wechselrichter verbunden ist.\n2. Überprüfen Sie, ob die Polarität des PV-Strings korrekt ist.\n3. Gerät ausschalten, 5 Minuten warten und neu starten. Das System führt einen 60-Sekunden-Selbsttest durch, um die Störungsbeseitigung zu bestätigen.',
    solutionEn:
      '1. Check whether the PV string is correctly connected to the inverter.\n2. Check whether the PV string polarity is correct.\n3. Shut down the system, wait 5 minutes, then restart. The system will run a 60-second self-check to confirm fault clearance.',
  },
  4: {
    alarmWord: '',
    alarmBit: 'bit3',
    faultType: 'Error',
    faultCode: 'DE0103',
    faultTitle: 'PV STR ERR',
    descZh: 'PV组串故障',
    descDe: 'PV-String-Störung',
    descEn: 'PV string fault',
    solutionZh:
      '1.检查光伏组件是否连接牢固，排除短路或开路情况。\n2.检查光伏组件是否损坏，如损坏需更换。\n3.关机，等待5分钟后开机，系统60秒自检后确认故障排除。',
    solutionDe:
      '1. Überprüfen Sie, ob die PV-Module fest angeschlossen sind, und schließen Sie Kurz- oder Unterbrechungen aus.\n2. Prüfen Sie, ob die PV-Module beschädigt sind; bei Bedarf austauschen.\n3. Gerät ausschalten, 5 Minuten warten und neu starten. Das System führt einen 60-Sekunden-Selbsttest durch, um die Störungsbeseitigung zu bestätigen.',
    solutionEn:
      '1. Check whether the PV modules are firmly connected and rule out short or open circuits.\n2. Check whether the PV modules are damaged; replace them if necessary.\n3. Shut down the system, wait 5 minutes, then restart. The system will run a 60-second self-check to confirm fault clearance.',
  },
  5: {
    alarmWord: '',
    alarmBit: 'bit4',
    faultType: 'Error',
    faultCode: 'DE0104',
    faultTitle: 'PV SW OV',
    descZh: '软件检测到PV输入电压过大',
    descDe: 'Software hat eine zu hohe PV-Eingangsspannung erkannt',
    descEn: 'Software detected PV input overvoltage',
    solutionZh:
      '1.使用万用表测量实际光伏输入电压。\n2.确保光伏组串电压在设计范围内。\n3.关机，等待5分钟后开机，系统60秒自检后确认故障排除。',
    solutionDe:
      '1. Messen Sie die tatsächliche PV-Eingangsspannung mit einem Multimeter.\n2. Stellen Sie sicher, dass die PV-String-Spannung im Auslegungsbereich liegt.\n3. Gerät ausschalten, 5 Minuten warten und neu starten. Das System führt einen 60-Sekunden-Selbsttest durch, um die Störungsbeseitigung zu bestätigen.',
    solutionEn:
      '1. Use a multimeter to measure the actual PV input voltage.\n2. Make sure the PV string voltage is within the design range.\n3. Shut down the system, wait 5 minutes, then restart. The system will run a 60-second self-check to confirm fault clearance.',
  },
};

export default inverterFaultCodeMap;
