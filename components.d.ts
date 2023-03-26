import type iconsPartialVue from '@/components/partials/icons.partial.vue';
import type linkGroupPartialVue from '@/components/partials/link-group.partial.vue';
import type listPartialVue from '@/components/partials/list.partial.vue';
import type textblockPartialVue from '@/components/partials/textblock.partial.vue';
import type contentModuleVue from 'src/components/modules/content.module.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'lila-content-module': typeof contentModuleVue
    'lila-textblock-partial': typeof textblockPartialVue
    'lila-list-partial': typeof listPartialVue
    'lila-icons-partial': typeof iconsPartialVue
    'lila-link-group-partial': typeof linkGroupPartialVue
  }
}