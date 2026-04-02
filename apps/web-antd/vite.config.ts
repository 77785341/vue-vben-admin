/*
 * @Author: Felix 77785341@qq.com
 * @Date: 2026-03-23 15:15:46
 * @LastEditors: Felix 77785341@qq.com
 * @LastEditTime: 2026-04-02 17:47:41
 * @FilePath: \vue-vben-admin\apps\web-antd\vite.config.ts
 * @Description:
 *
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved.
 */
import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            // rewrite: (path) => path.replace(/^\/api/, '/install'),
            // target: 'http://192.168.110.42:18085',

            rewrite: (path) => path.replace(/^\/api/, '/install-test'),
            target: 'https://energy.borochi.de',
            ws: true,
          },
        },
      },
    },
  };
});
