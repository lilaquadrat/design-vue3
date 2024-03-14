import { fileURLToPath, URL } from 'node:url';

import { defineConfig, type UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

import { visualizer } from 'rollup-plugin-visualizer';

import configObject from './config';

export default defineConfig((settings) => {

  let target: 'local' | 'next' | 'live' = 'local';

  if(settings.mode === 'production') target = 'live';
  if(settings.mode === 'next') target = 'next';

  const isProduction = target === 'live';
  const config = configObject[target];
  const viteConfig: UserConfig = {
    plugins: [
      vue(),
      visualizer()
    ],
    base : config.base || '/',
    build: {
      cssCodeSplit : false,
      cssMinify    : isProduction,
      sourcemap    : !isProduction,
      rollupOptions: {
        output: {
          dir           : 'dist/app',
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]'
          // assetFileNames: (assetInfo) => {
          //   if (assetInfo.name?.endsWith('woff')) {
          //     return 'assets/[name][extname]';
          //   }
  
          //   return 'assets/[name]-[hash][extname]';
          // },
        }
      }
    },
    css: {
      devSourcemap       : true,
      preprocessorOptions: {
        less: {
          sourceMap : true,
          globalVars: {
            globalVariables: 'true; @import (reference) "./src/assets/less/variables.less";',
            globalMixins   : 'true; @import (reference) "./src/assets/less/mixins.less";',
            globalFonts    : 'true; @import (reference) "./src/assets/less/fonts.less";',
          },
        }
      }
    },
    resolve: {
      alias: {
        '~fonts': fileURLToPath(new URL('src/assets/fonts', import.meta.url)),
        '@'     : path.resolve(__dirname, './src/'),
      }
    },
    define: {
      '__FRONTEND_CONFIG__'                  : JSON.stringify(config),
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: isProduction ? 'false' : 'true',
      __VUE_PROD_DEVTOOLS__                  : isProduction ? 'false' : 'true'
    }
  };
  
  if (settings.isSsrBuild) {

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
      target    : 'node',
      noExternal: true,
      external  : ['node:stream', 'axios', 'http', 'https', 'crypto', 'path', 'highlight.js'],
    }
  
  }

  return viteConfig;

});