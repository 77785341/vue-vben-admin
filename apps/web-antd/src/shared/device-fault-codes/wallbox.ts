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
  '0503': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '0503',
    faultTitleZh: '输出电流过流',
    faultTitleDe: '0503 Überstrom',
    faultTitleEn: '0503 OUT OC',
    descZh:
      '充电期间，检测到输出电流大于等于当前 PWM 对应的电流值 In 所对应的过流阈值，当 In 小于等于 20A 时， \n阈值为 In+2A，否则阈值为 1.1 倍的 In',
    descDe:
      'Während des Ladevorgangs wurde ein Ausgangsstrom erkannt, der größer oder gleich dem Überstromschwellenwert des aktuellen PWM-Werts In ist; bei In ≤ 20 A liegt der Schwellenwert bei In + 2 A, ansonsten bei 1,1 × In',
    descEn:
      'During charging, output current detected greater than or equal to the overcurrent threshold corresponding to the current PWM value In; when In ≤ 20A, threshold is In + 2A, otherwise threshold is 1.1 × In',
    solutionZh:
      '1、查看充电器上报的电流值是否正常 \n2、请检查车辆的电流调节能否在 5 秒内完成，若无法服从充电器的调节请联系车辆售后 \n3、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Prüfen Sie, ob der vom Ladegerät gemeldete Strom normal ist. 2. Prüfen Sie, ob das Fahrzeug den Ladestrom innerhalb von 5 Sekunden anpassen kann; entspricht dies nicht der Regelung des Ladegeräts, kontaktieren Sie den Fahrzeughersteller. 3. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      "1. Check whether the current reported by the charger is normal\n2. Verify whether the vehicle can adjust the charging current within 5 seconds; if it does not comply with the charger's regulation, contact the vehicle manufacturer\n3. If the issue persists, please contact after-sales technical support",
  },
  '0504': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '0504',
    faultTitleZh: '进线电压欠压',
    faultTitleDe: '0504 Unterspann',
    faultTitleEn: '0504 IN UV',
    descZh: '检测到进线电压小于 165V（三相设备为 L1/L2/L3 中的最小值）',
    descDe:
      'Eingangsspannung unter 165 V erkannt (bei dreiphasigen Geräten der Minimalwert von L1/L2/L3)',
    descEn:
      'Input voltage detected below 165V (for three-phase devices, the minimum of L1/L2/L3)',
    solutionZh:
      '1、查看充电器上报的电压值是否正常 \n2、使用仪表的 AC 档位，测量供电插座的 L-N 的幅值，如果异常请检查供电电源（电网或光伏逆变器） \n3、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Prüfen Sie, ob die vom Ladegerät gemeldete Spannung normal ist. 2. Messen Sie mit einem Multimeter (AC-Modus) die L-N-Spannung an der Versorgungssteckdose; bei Abnormalität prüfen Sie die Stromversorgung (Netz oder PV-Wechselrichter). 3. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      '1. Check whether the voltage reported by the charger is normal\n2. Use a multimeter in AC mode to measure the L-N voltage at the supply socket; if abnormal, check the power supply (grid or PV inverter)\n3. If the issue persists, please contact after-sales technical support',
  },
  '0505': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '0505',
    faultTitleZh: '输出电流欠流',
    faultTitleDe: '0505 Unterstrom',
    faultTitleEn: '0505 OUT UC',
    descZh: '充电期间，检测到输出电流小于等于 0.5A',
    descDe:
      'Während des Ladevorgangs wurde ein Ausgangsstrom von weniger als oder gleich 0,5 A erkannt',
    descEn:
      'During charging, output current detected less than or equal to 0.5A',
    solutionZh:
      '1、查看充电器上报的电流值是否正常 \n2、请检查车辆充电机是否正常工作，若无法加载输出功率且不通知充电器停止充电请联系车辆售后 \n3、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Prüfen Sie, ob der vom Ladegerät gemeldete Strom normal ist. 2. Prüfen Sie, ob das Fahrzeugladegerät ordnungsgemäß funktioniert; wenn keine Ausgangsleistung geladen und der Ladestopp nicht gemeldet wird, kontaktieren Sie den Fahrzeughersteller. 3. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      '1. Check whether the current reported by the charger is normal\n2. Verify whether the vehicle charger is functioning properly; if it fails to load output power and does not notify the charger to stop charging, contact the vehicle manufacturer\n3. If the issue persists, please contact after-sales technical support',
  },
  '0506': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '0506',
    faultTitleZh: '输出接触器故障',
    faultTitleDe: '0506 Schütz',
    faultTitleEn: '0506 Contactor',
    descZh:
      'K1/K2 接触器发生粘连（启动充电时接触器不吸合，停止充电时接触器不断开）',
    descDe:
      'Schütz K1/K2 verschweißt (schließt nicht bei Ladebeginn oder öffnet nicht bei Ladestopp)',
    descEn:
      'K1/K2 contactor welded (does not close when charging starts or does not open when charging stops)',
    solutionZh:
      '1、请尝试重启充电器进行自检 \n2、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Starten Sie das Ladegerät neu, um einen Selbsttest durchzuführen. 2. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      '1. Try restarting the charger to perform a self-test\n2. If the issue persists, please contact after-sales technical support',
  },
  '0507': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '0507',
    faultTitleZh: '充电器内部过温',
    faultTitleDe: '0507 Übertemp',
    faultTitleEn: '0507 OverTemp',
    descZh: '充电器内部温度超过 86℃',
    descDe: 'Innentemperatur des Ladegeräts übersteigt 86 °C',
    descEn: 'Internal temperature of the charger exceeds 86°C',
    solutionZh:
      '1、请检查充电器的散热条件（通风）是否正常 \n2、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Prüfen Sie, ob Belüftung und Wärmeableitung des Ladegeräts ausreichend sind. 2. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      "1. Check whether the charger's ventilation and heat dissipation conditions are adequate\n2. If the issue persists, please contact after-sales technical support",
  },
  '0508': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '0508',
    faultTitleZh: '漏电故障',
    faultTitleDe: '0508 FI Fehler',
    faultTitleEn: '0508 Leakage',
    descZh: '检测到输出线路发生电流泄露，RCD 产生了漏电信号',
    descDe:
      'Leckstrom an der Ausgangsleitung erkannt, RCD hat ein Fehlersignal ausgelöst',
    descEn:
      'Leakage current detected on the output line, RCD has triggered a leakage signal',
    solutionZh:
      '1、请检查充电线缆是否破损 \n2、请重启充电器进行自检 \n3、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Prüfen Sie das Ladekabel auf Beschädigungen. 2. Starten Sie das Ladegerät neu für einen Selbsttest. 3. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      '1. Check whether the charging cable is damaged\n2. Restart the charger to perform a self-test\n3. If the issue persists, please contact after-sales technical support',
  },
  '0509': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '0509',
    faultTitleZh: '地线缺失故障',
    faultTitleDe: '0509 PE Fehler',
    faultTitleEn: '0509 PE Fault',
    descZh: '检测到充电器进线 PE 线缆断开',
    descDe: 'Schutzleiter (PE) am Eingang des Ladegeräts unterbrochen',
    descEn: 'Protective Earth (PE) line disconnected at the charger input',
    solutionZh:
      '1、请检查 PE 线是否有效接入充电器 \n2、请重启充电器进行自检 \n3、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Prüfen Sie, ob die PE-Leitung korrekt am Ladegerät angeschlossen ist. 2. Starten Sie das Ladegerät neu für einen Selbsttest. 3. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      '1. Check whether the PE line is properly connected to the charger\n2. Restart the charger to perform a self-test\n3. If the issue persists, please contact after-sales technical support',
  },
  '050A': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '050A',
    faultTitleZh: 'RCD 自检故障',
    faultTitleDe: '050A FI Test',
    faultTitleEn: '050A RCD Test',
    descZh: 'RCD 自检（上电或按下测试按钮）时，未检测到 RCD 输出漏电信号',
    descDe:
      'RCD-Selbsttest (beim Einschalten oder Drücken der Testtaste) hat kein Leckstrom-Ausgangssignal erkannt',
    descEn:
      'RCD self-test (on power-up or test button press) failed to detect leakage output signal',
    solutionZh:
      '1、在未连接充电线缆的情况下，请重启充电器或者按下测试按钮尝试重新自检 \n2、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Starten Sie das Ladegerät bei abgezogenem Ladekabel neu oder drücken Sie die Testtaste für einen Selbsttest. 2. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      '1. With the charging cable disconnected, restart the charger or press the test button to perform a self-test\n2. If the issue persists, please contact after-sales technical support',
  },
  '050B': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '050B',
    faultTitleZh: '计量芯片工作异常',
    faultTitleDe: '050B Messchip',
    faultTitleEn: '050B MeterChip',
    descZh: '与计量芯片通信失败时',
    descDe: 'Kommunikationsfehler mit dem Messchip',
    descEn: 'Communication failure with metering chip',
    solutionZh:
      '1、请重启充电器进行自检 \n2、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Starten Sie das Ladegerät neu für einen Selbsttest. 2. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      '1. Restart the charger to perform a self-test\n2. If the issue persists, please contact after-sales technical support',
  },
  '050F': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '050F',
    faultTitleZh: '读卡器工作异常',
    faultTitleDe: '050F Kartenles',
    faultTitleEn: '050F CardReader',
    descZh: '与读卡器芯片通信失败时',
    descDe: 'Kommunikationsfehler mit dem Kartenleser-Chip',
    descEn: 'Communication failure with card reader chip',
    solutionZh:
      '1、请重启充电器进行自检 \n2、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Starten Sie das Ladegerät neu für einen Selbsttest. 2. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      '1. Restart the charger to perform a self-test\n2. If the issue persists, please contact after-sales technical support',
  },
  '0511': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '0511',
    faultTitleZh: '温度传感器检测异常',
    faultTitleDe: '0511 TempSensor',
    faultTitleEn: '0511 TempSensor',
    descZh: '当采样到异常的温度值（-30℃或 115℃）时',
    descDe: 'Abnormaler Temperaturwert erkannt (-30 °C oder 115 °C)',
    descEn: 'Abnormal temperature value detected (-30°C or 115°C)',
    solutionZh:
      '1、请检查充电器的工作环境温度是否正常 \n2、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Prüfen Sie, ob die Umgebungstemperatur des Ladegeräts im normalen Bereich liegt. 2. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      '1. Check whether the ambient operating temperature of the charger is within the normal range\n2. If the issue persists, please contact after-sales technical support',
  },
  '0512': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '0512',
    faultTitleZh: '辅助接触器故障（三相设备支持）',
    faultTitleDe: '0512 Hilfschütz',
    faultTitleEn: '0512 AuxCont',
    descZh:
      '三相 TN 输出模式时，辅助接触器发生粘连（K4/K5/K6 闭合时检测到断开、K4K5K6 断开时检测到闭合、K7K8 \n断开时检测到闭合）',
    descDe:
      'Im dreiphasigen TN-Ausgangsmodus ist das Hilfsschütz verschweißt (K4/K5/K6 als offen erkannt, obwohl geschlossen, oder umgekehrt; K7/K8 als geschlossen erkannt, obwohl offen)',
    descEn:
      'In three-phase TN output mode, auxiliary contactor welded (K4/K5/K6 detected open when closed, detected closed when open; K7/K8 detected closed when open)',
    solutionZh:
      '1、请尝试重启充电器进行自检 \n2、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Starten Sie das Ladegerät neu für einen Selbsttest. 2. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      '1. Try restarting the charger to perform a self-test\n2. If the issue persists, please contact after-sales technical support',
  },
  '0513': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '0513',
    faultTitleZh: '充电器供电类型异常',
    faultTitleDe: '0513 Netztyp',
    faultTitleEn: '0513 SupplyType',
    descZh:
      '1、供电类型配置为非法值； \n2、地线检测拨码使能时供电类型配置为 IT 系统类型； \n3、单相主板供电类型配置为非单相类型； \n4、配置为 IT 系统时但 L3 相电压检测超过 280V \n5、配置为三相时、单相 NL2 或 L1L3 时、单相 NL3 或 L2L3 时电压检测低于 120V',
    descDe:
      '1.Ungültige Konfiguration des Stromversorgungstyps  2. Stromversorgungstyp als IT-System konfiguriert, während der DIP-Schalter für die Erdungserkennung aktiviert ist  3. Einphasige Hauptplatine mit nicht-einphasigem Versorgungstyp konfiguriert  4. Als IT-System konfiguriert, aber Spannung der L3-Phase übersteigt 280 V  5. Als dreiphasig, einphasig NL2 oder L1L3, oder einphasig NL3 oder L2L3 konfiguriert, aber Spannung unter 120 V erkannt',
    descEn:
      '1. Invalid power supply type configuration\n2. Power supply type configured as IT system while ground detection DIP switch is enabled\n3. Single-phase mainboard configured with non-single-phase supply type\n4. Configured as IT system but L3 phase voltage exceeds 280V\n5. Configured as three-phase, single-phase NL2 or L1L3, or single-phase NL3 or L2L3 with voltage detected below 120V',
    solutionZh:
      '1、请检查充电器配置的供电类型与实际的接入的供电类型和供电电压是否匹配 \n2、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Prüfen Sie, ob der konfigurierte Stromversorgungstyp mit dem tatsächlichen Anschluss und der Spannung übereinstimmt. 2. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      '1. Verify whether the configured power supply type matches the actual connected power supply type and voltage\n2. If the issue persists, please contact after-sales technical support',
  },
  '0514': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '0514',
    faultTitleZh: '充电器电源断电',
    faultTitleDe: '0514 Stromausf',
    faultTitleEn: '0514 PowerLoss',
    descZh: '充电器检测到工作电源（230VAC 转 12VDC）低于 8.95V 时',
    descDe:
      'Betriebsspannung des Ladegeräts (230 VAC auf 12 VDC) unter 8,95 V erkannt',
    descEn:
      'Charger operating power supply (230VAC to 12VDC) detected below 8.95V',
    solutionZh:
      '1、请检查 L1-N 供电电压是否正常 \n2、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Prüfen Sie, ob die L1-N Versorgungsspannung normal ist. 2. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      '1. Check whether the L1-N supply voltage is normal\n2. If the issue persists, please contact after-sales technical support',
  },
  '0515': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '0515',
    faultTitleZh: '供电插座舵机故障',
    faultTitleDe: '0515 Aktuator',
    faultTitleEn: '0515 Actuator',
    descZh:
      '执行充电线缆上锁或解锁时，舵机未正确执行到位（反馈信号与校准信号偏差较大）',
    descDe:
      'Während der Verriegelung oder Entriegelung des Ladekabels hat der Aktuator die korrekte Position nicht erreicht (große Abweichung zwischen Rückmelde- und Kalibrierungssignal)',
    descEn:
      'During charging cable lock or unlock operation, actuator failed to reach the correct position (large deviation between feedback and calibration signal)',
    solutionZh:
      '1、请尝试重启充电器进行自检 \n2、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Starten Sie das Ladegerät neu für einen Selbsttest. 2. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      '1. Try restarting the charger to perform a self-test\n2. If the issue persists, please contact after-sales technical support',
  },
  '0519': {
    alarmWord: '',
    alarmBit: '',
    faultType: 'Error',
    faultCode: '0519',
    faultTitleZh: 'PP 信号幅值异常',
    faultTitleDe: '0519 PP Signal',
    faultTitleEn: '0519 PP Signal',
    descZh:
      '在 CP 信号幅值为 9V 或者 6V 的情况下，检测到 PP 信号幅值不在允许范围内',
    descDe:
      'Wenn die CP-Spannung 9 V oder 6 V beträgt, wurde die PP-Spannung außerhalb des zulässigen Bereichs erkannt',
    descEn:
      'When CP voltage is 9V or 6V, PP voltage detected outside the allowed range',
    solutionZh:
      '1、检查充电器供电插座 PP 信号针孔是否异物堵塞 \n2、请检查充电线缆的供电插头 PP-PE 电阻值是否正常（100Ω、220Ω、680Ω或 1500Ω） \n3、若仍旧无法解决，请联系售后技术工程师',
    solutionDe:
      '1. Prüfen Sie, ob die PP-Signal-Pin-Öffnung der Ladesteckdose durch Fremdkörper blockiert ist. 2. Prüfen Sie den PP-PE Widerstandswert des Ladesteckers (100Ω, 220Ω, 680Ω oder 1500Ω). 3. Besteht das Problem weiterhin, kontaktieren Sie den technischen Kundendienst.',
    solutionEn:
      '1. Check whether the PP signal pin hole of the charger socket is blocked by foreign objects\n2. Check whether the PP-PE resistance value of the charging plug is normal (100Ω, 220Ω, 680Ω, or 1500Ω)\n3. If the issue persists, please contact after-sales technical support',
  },
};

export default wallboxFaultCodeMap;
