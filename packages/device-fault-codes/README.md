# Device Fault Codes

设备故障代码数据库 - 包含逆变器、充电桩和热泵的故障代码、描述和解决方案。

Device fault code database containing fault codes, descriptions, and solutions for inverter, wallbox, and heat pump devices.

## Features

- **多设备支持** (Multi-device support): 逆变器 (Inverter), 充电桩 (Wallbox), 热泵 (Heat Pump)
- **多语言支持** (Multi-language): 中文 (Chinese), 德文 (German), 英文 (English)
- **独立i18n** (Independence from i18n): 不依赖全局i18n配置，通过参数传递语言偏好
- **类型安全** (Type-safe): 完整的TypeScript类型定义
- **灵活的API**: 支持获取单个故障详情或完整信息

## Installation

```bash
pnpm add @borochi/device-fault-codes
```

## Usage

### 基本用法 (Basic Usage)

```typescript
import {
  getFaultType,
  getFaultTitle,
  getFaultCode,
  getFaultDesc,
  getFaultSolution,
  getFaultDetails,
} from '@borochi/device-fault-codes';

// 获取故障类型
const type = getFaultType('0501'); // 'Error'

// 获取故障代码
const code = getFaultCode('0501'); // '0501'

// 获取故障标题 (需要指定设备类型和语言)
const title = getFaultTitle('0501', 'wallbox', 'en'); // '0501 CP Signal'

// 获取故障描述 (中文)
const desc = getFaultDesc('0501', 'zh'); // '1、CP 信号不在允许的范围内...'

// 获取故障解决方案 (英文)
const solution = getFaultSolution('0501', 'en'); // '1. Please confirm whether the charging cable...'

// 获取完整的故障详情
const details = getFaultDetails('0501', 'wallbox', 'en');
// 返回:
// {
//   type: 'Error',
//   code: '0501',
//   title: '0501 CP Signal',
//   description: '1. CP voltage not within the allowed range...',
//   solution: '1. Please confirm whether the charging cable...'
// }
```

### 支持的设备类型 (Supported Device Types)

```typescript
import { DeviceType } from '@borochi/device-fault-codes';

DeviceType.INVERTER; // '逆变器'
DeviceType.WALLBOX; // '充电桩'
DeviceType.PUMP; // '热泵'
```

### 支持的语言 (Supported Locales)

```typescript
type LocaleType = 'zh' | 'de' | 'en';

// 默认语言为 'en' (Default locale is 'en')
```

## API Reference

### getFaultType(key)

获取故障类型。

**Parameters:**

- `key` (string | number): 故障代码

**Returns:**

- 故障类型 ('Error' | 'Warning')

### getFaultTitle(key, deviceType?, locale?)

获取故障标题。

**Parameters:**

- `key` (string | number): 故障代码
- `deviceType?` (string): 设备类型 - 'inverter' | 'wallbox' | 'pump'
- `locale?` (LocaleType): 语言 - 'zh' | 'de' | 'en', default: 'en'

**Returns:**

- 故障标题 (string)

### getFaultCode(key)

获取故障代码。

**Parameters:**

- `key` (string | number): 故障代码

**Returns:**

- 故障代码 (string)

### getFaultDesc(key, locale?)

获取故障描述。

**Parameters:**

- `key` (string | number): 故障代码
- `locale?` (LocaleType): 语言 - 'zh' | 'de' | 'en', default: 'en'

**Returns:**

- 故障描述 (string)

### getFaultSolution(key, locale?)

获取故障解决方案。

**Parameters:**

- `key` (string | number): 故障代码
- `locale?` (LocaleType): 语言 - 'zh' | 'de' | 'en', default: 'en'

**Returns:**

- 故障解决方案 (string)

### getFaultDetails(key, deviceType?, locale?)

获取完整的故障详情。

**Parameters:**

- `key` (string | number): 故障代码
- `deviceType?` (string): 设备类型 - 'inverter' | 'wallbox' | 'pump'
- `locale?` (LocaleType): 语言 - 'zh' | 'de' | 'en', default: 'en'

**Returns:**

```typescript
interface FaultDetails {
  type?: string;
  code?: string;
  title?: string;
  description?: string;
  solution?: string;
}
```

## 数据结构 (Data Structures)

### 逆变器故障代码 (Inverter Fault Codes)

数字键 (numeric keys): 1, 2, 3, ...

字段:

- `faultCode`: 故障代码 (e.g., 'DE0100')
- `faultTitle`: 故障标题
- `descZh/De/En`: 多语言描述
- `solutionZh/De/En`: 多语言解决方案

### 充电桩故障代码 (Wallbox Fault Codes)

字符串键 (string keys): '0501', '0502', ...

字段:

- `faultCode`: 故障代码
- `faultTitleZh/De/En`: 多语言标题
- `descZh/De/En`: 多语言描述
- `solutionZh/De/En`: 多语言解决方案

### 热泵故障代码 (Heat Pump Fault Codes)

特殊格式键 (special format keys): 'AL_W1.0', 'AL_W1.1', ...

字段:

- `faultCode`: 故障代码 (e.g., 'E01', 'E02', ...)
- `faultTitle`: 故障标题
- `descZh/De/En`: 多语言描述
- `solutionZh/De/En`: 多语言解决方案

## 迁移指南 (Migration Guide)

### 从旧版本迁移 (From Legacy faultCode.js)

**旧版本** (Legacy):

```typescript
import { getFaultDesc } from '@/api/pv-storage/faultCode.js';
const desc = getFaultDesc('0501'); // 依赖全局i18n
```

**新版本** (New):

```typescript
import { getFaultDesc } from '@borochi/device-fault-codes';
const desc = getFaultDesc('0501', 'en'); // 显式传递语言
```

**主要变化** (Key Changes):

1. 不再依赖全局i18n配置
2. 语言通过参数显式传递
3. 增加了`getFaultDetails()`便捷方法
4. 完整的TypeScript类型定义

## License

MIT
