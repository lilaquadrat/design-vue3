import type contentModuleVue from 'src/components/modules/content.module.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'content-module': typeof contentModuleVue
  }
}