import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// Process command line arguments
const args = process.argv.slice(2);
const target = args[2] as 'local' | 'next' | 'live' || 'local';

import configObject from './config';

const config = configObject[target];

export default defineConfig({
  plugins: [
    vue(),
  ],
  base : config.base || '/',
  build: {
    cssCodeSplit: false,
    cssMinify   : true,
  },
  css: {
    devSourcemap       : true,
    preprocessorOptions: {
      less: {
        globalVars: {
          globalVariables: 'true; @import (reference) "./projects/company/project/src/assets/less/variables.less";',
          globalMixins   : 'true; @import (reference) "./projects/company/project/src/assets/less/mixins.less";',
          globalFonts    : 'true; @import (reference) "./projects/company/project/src/assets/less/fonts.less";',
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
    '__FRONTEND_CONFIG__': JSON.stringify(config)
  }
});