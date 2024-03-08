<script setup lang="ts">
import type LinkListWithTitle from '@/interfaces/LinkListWithTitle.interface';
import type ListWithTitle from '@/interfaces/ListWithTitle.interface';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import { computed, ref } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  headline?: string
  subline?: string
  intro?: string
  text?: string[]
  links?: LinkListWithTitle
  list?: ListWithTitle
}>();
const element = ref<HTMLElement>();
const listVariant = computed(() => {

  const base = [];

  if (props.variant?.includes('center')) {

    base.push('noStyle');
    base.push('center');

  }

  return base;

});
const linkVariant = computed(() => {

  const base = [];

  if (props.variant?.includes('center')) {

    base.push('noStyle');
    base.push('center');

  }

  if (props.variant?.includes('actions')) {

    base.push('actions');

  }

  return base;

});
const hasList = computed(() => !!props.list?.value.length);
const hasLinks = computed(() => !!props.links?.value?.filter((single) => single.text).length);
const hasText = computed(() => props.headline?.length || props.subline?.length || props.subline?.length || props.text?.length);

</script>
<template>
  <table :id="id" ref="element" border="0" cellspacing="0" cellpadding="0">
    <tr v-if="hasText">
      <td style="padding-bottom: 40px">
        <lila-textblock-partial v-bind="props" />
      </td>
    </tr>
    <tr v-if="hasList">
      <td style="padding-bottom: 40px">
        <lila-list-partial v-bind="list" mode="list" :variant="listVariant"></lila-list-partial>
      </td>
    </tr>
    <tr v-if="hasLinks">
      <td style="padding-bottom: 40px">
        <lila-list-partial v-bind="links" mode="links" :variant="linkVariant"></lila-list-partial>
      </td>
    </tr>
    
  </table>
</template>