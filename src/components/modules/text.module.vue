<script setup lang="ts">
import type LinkListWithTitle from '@/interfaces/LinkListWithTitle.interface';
import type ListWithTitle from '@/interfaces/ListWithTitle.interface';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import { useInview } from '@/plugins/inview';
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
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});
const listVariant = computed(() => {

  const base = [];

  if (props.variant?.includes('center')) {

    base.push('noStyle');
    base.push('center');

  }

  if (props.variant?.includes('notice')) {

    base.push('white');

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

  if (props.variant?.includes('notice')) {

    base.push('white');

  }

  return base;

});

</script>
<template>
  <article :id="props.index?.anchor || props.id" ref="element" class="lila-text-module lila-module" :class="[inviewState, variant, {sub}]">
   
    <lila-textblock-partial v-bind="props" />
    <lila-list-partial v-bind="list" mode="list" :variant="listVariant" />
    <lila-list-partial v-bind="links" mode="links" :variant="linkVariant" />
    
  </article>
</template>

<style lang="less" scoped>
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
    // .modulePadding('none');
    
    max-width: 100%;
    grid-template-columns: 1fr;
    justify-items: center;

    background-color: @color1;
    padding: @modulePadding;

    @media @tablet, @desktop {
      padding: @modulePaddingExt;
    }

    .lila-list-links {
      max-width: @moduleWidth_S;
    }

    :deep(.lila-textblock) {

      max-width: @moduleWidth_S;
      color: @white;

      h1, h2, h3, p {

        color: @white;
      }
    }
  }
}
</style>