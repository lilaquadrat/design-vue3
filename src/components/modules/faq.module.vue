<template>
  <section :id="id" ref="element" :class="[variant, view, inviewState]" class="lila-faq-module lila-module">

    <lila-textblock-partial v-if="props.textblock" v-bind="props.textblock" />
    <lila-accordion-partial v-if="props.accordion" v-bind="props.accordion" />

  </section>
</template>
<script setup lang="ts">
import type Textblock from '@interfaces/textblock.interface';
import type Accordion from '@interfaces/Accordion.interface';
import { useInview } from '@/plugins/inview';
import { ref } from 'vue';

let element = ref<HTMLElement>();
const inviewState = useInview(element);
const props = defineProps<{
  textblock: Textblock;

  accordion: Accordion;
  variant?: string[];
  id?: string;
  view?:string;

}>();


</script>
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
