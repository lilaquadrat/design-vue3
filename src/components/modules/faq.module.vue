<script setup lang="ts">
import type Textblock from '@interfaces/textblock.interface';
import type Accordion from '@interfaces/Accordion.interface';
import { useInview } from '@/plugins/inview';
import { ref } from 'vue';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  textblock: Textblock;

  accordion: Accordion;
}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});

</script>
<template>
  <section :id="props.index?.anchor || props.id" ref="element" :class="[variant, inviewState]" class="lila-faq-module lila-module">
    <lila-textblock-partial v-if="props.textblock" v-bind="props.textblock" />
    <lila-accordion-partial v-if="props.accordion" v-bind="props.accordion" />
  </section>
</template>
<style lang="less" scoped>

.lila-faq-module {
  .module;

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_S;

  &.medium {
    max-width: @moduleWidth_M;
  }

}
</style>
