<script setup lang="ts">
import type Link from '@/interfaces/link.interface';
import type LinkListWithTitle from '@/interfaces/LinkListWithTitle.interface';
import type ListWithTitle from '@/interfaces/ListWithTitle.interface';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import type Textblock from '@/interfaces/textblock.interface';
import { computed, ref } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  textblock?: Textblock
  links?: LinkListWithTitle
  list?: ListWithTitle
  link?: Link
}>();
const element = ref<HTMLElement>();
const listVariant = computed(() => {

  const base = [];

  base.push('noStyle');
  base.push('center');

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
const hasText = computed(() => !!props.textblock);

</script>
<template>
  <table :id="id" class="callToAction-module" ref="element" border="0" cellspacing="0" cellpadding="0" style="table-layout: fixed; width: 100%;">
    <tbody>
      <tr v-if="hasText">
        <td>
          <lila-textblock-partial v-bind="textblock" :variant="['center']" />
        </td>
      </tr>
      <tr>
        <td style="text-align: center; width: 100%; padding: 40px;">
          <lila-link-partial v-bind="link" />
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
    </tbody>
  </table>
</template>