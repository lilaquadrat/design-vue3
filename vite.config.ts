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
    base  : './',
    server: {
      host: '0.0.0.0', // This allows access from other devices on the network
    },
    optimizeDeps: {
    // Exclude the package from pre-bundling so it stays in source form
      exclude: ['@lilaquadrat/studio']
    },
    build: {
      cssCodeSplit : false,
      cssMinify    : isProduction,
      sourcemap    : !isProduction,
      minify       : isProduction,
      rollupOptions: {
        output: {
          dir         : 'dist/app',
          manualChunks: {
            'qrcode': ['qrcode'],
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('woff') || assetInfo.name?.endsWith('png')) {
              return '[name][extname]';
            }

            return '[name]-[hash][extname]';
          },
          chunkFileNames: '[name]-[hash].js',
          entryFileNames: '[name]-[hash].js',
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
      '__TARGET__'                           : JSON.stringify(target),
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
          manualChunks        : null,
          inlineDynamicImports: true,
          dir                 : 'dist/server',
          entryFileNames      : '[name].js',
        }
      },
      ssrManifest: true,
    }
    viteConfig.ssr = {
      target    : 'webworker',
      noExternal: true,
      external  : ['node:stream', 'axios', 'http', 'https', 'crypto', 'path', 'highlight.js'],
    }
  
  }

  return viteConfig;

});