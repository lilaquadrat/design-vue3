import { fileURLToPath, URL } from 'node:url';

import { defineConfig, type UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

import { visualizer } from 'rollup-plugin-visualizer';

// Process command line arguments
const args = process.argv.slice(2);
const target = args[2] as 'local' | 'next' | 'live' || 'local';
const isSSR = args[3] == '--ssr';

import configObject from './config';

const config = configObject[target];
const viteConfig: UserConfig = {
  plugins: [
    vue(),
    visualizer()
  ],
  base : config.base || '/',
  build: {
    cssCodeSplit : false,
    cssMinify    : true,
    sourcemap    : true,
    rollupOptions: {
      output: {
        dir           : 'dist/app',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('woff')) {
            return 'assets/[name][extname]';
          }

          return 'assets/[name]-[hash][extname]';
        },
      }
    }
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
};

if(isSSR) {

  viteConfig.build = {
    ...viteConfig.build, 
    rollupOptions: {
      input : '/src/server-entry.ts', 
      output: {
        ...viteConfig.build?.rollupOptions?.output,
        inlineDynamicImports: true,
        dir                 : 'dist/server',
      }
    },
    ssrManifest: true,
  }
  viteConfig.ssr = {
    target    : 'webworker',
    noExternal: true,
    external  : ['node:stream', 'axios', 'http', 'https', 'crypto', 'path'],
  }

}

export default defineConfig(viteConfig);