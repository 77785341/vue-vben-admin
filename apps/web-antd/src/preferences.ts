/*
 * @Author: Felix 77785341@qq.com
 * @Date: 2026-03-23 15:15:46
 * @LastEditors: Felix 77785341@qq.com
 * @LastEditTime: 2026-03-25 16:29:34
 * @FilePath: \vue-vben-admin\apps\web-antd\src\preferences.ts
 * @Description:
 *
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved.
 */
import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  app: {
    name: import.meta.env.VITE_APP_TITLE,
  },
  logo: {
    source: '/images/logo/LOGO@2x.png',
    sourceDark: '/images/logo/LOGO@2x.png',
  },
  breadcrumb: {
    enable: false,
  },
  shortcutKeys: {
    enable: false,
    globalLockScreen: false,
    globalLogout: false,
    globalSearch: false,
  },
  sidebar: {
    collapsedButton: false,
    fixedButton: false,
    width: 260,
  },
  theme: {
    builtinType: 'custom',
    colorPrimary: 'hsl(204 69% 44%)',
    mode: 'light',
  },
  widget: {
    fullscreen: false,
    lockScreen: false,
    notification: false,
    themeToggle: false,
  },
});
