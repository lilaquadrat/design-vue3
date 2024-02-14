import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

import config from './config';

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    cssCodeSplit: true
  },
  css: {
    devSourcemap       : true,
    preprocessorOptions: {
      less: {
        globalVars: {
          globalVariables: 'true; @import "./projects/company/project/src/assets/less/variables.less";',
          globalMixins   : 'true; @import "./projects/company/project/src/assets/less/mixins.less";',
          globalFonts    : 'true; @import "./projects/company/project/src/assets/less/fonts.less";',
        },
      }
    }
  },
  resolve: {
    alias: {
      '~fonts': fileURLToPath(new URL('src/assets/fonts', import.meta.url)),
      '@'     : path.resolve(__dirname, '../../../src/'),
    }
  },
  define: {
    'process.env.company': JSON.stringify('company'),
    'process.env.project': JSON.stringify('project'),
    '__FRONTEND_CONFIG__': JSON.stringify(config)
    // 'process.env.apiMode': JSON.stringify('https://api.example.com')
  }
});