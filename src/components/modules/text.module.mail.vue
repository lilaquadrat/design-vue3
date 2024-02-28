<script setup lang="ts">
import type LinkListWithTitle from '@/interfaces/LinkListWithTitle.interface';
import type ListWithTitle from '@/interfaces/ListWithTitle.interface';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import { ref } from 'vue';

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
const listVariant = (type: 'list' | 'links') => {

  const base = [];

  if (props.variant?.includes('center')) {

    base.push('noStyle');
    base.push('center');

  }

  if (props.variant?.includes('actions') && type !== 'list') {

    base.push('actions');

  }

  return base;

}; 

</script>
<template>
  <table :id="id" ref="element">
    <tr>
      <td>
        <lila-textblock-partial v-bind="props" />
      </td>
    </tr>

    <lila-list-partial v-bind="list" mode="list" :variant="listVariant('list')"></lila-list-partial>
    <lila-list-partial v-bind="links" mode="links" :variant="listVariant('links')"></lila-list-partial>
    
  </table>
</template>

<!-- <style lang="less" scoped>
.lila-text-module {
  .module;

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_S;

  @media print {
    margin: 20mm 0;
  }

  &.center {
    text-align: center;
  }

  &.notice {
    .modulePadding('none');
    
    max-width: 100%;
    grid-template-columns: 1fr;
    justify-items: center;

    background-color: @color1;

    :deep(.lila-textblock) {
      padding: @modulePadding;

      @media @tablet, @desktop {
        padding: @modulePaddingExt;
      }

      max-width: @moduleWidth_S;
      color: @white;

      h1, h2, h3, p {

        color: @white;
      }
    }

  }
}
</style> -->