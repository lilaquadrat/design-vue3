<template>
  <section ref="element" :class="[variant, inviewState]" class="lila-module lila-quote-module">
    <lila-quote-partial v-bind="props" />
  </section>
</template>

<script setup lang="ts">
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import { useInview } from '@/plugins/inview';
import type Link from '@interfaces/link.interface';
import { ref } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  quote: string;
  link: Link;
  citation: string;
}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});

</script>

<style lang="less" scoped>

.lila-quote-module {
  .module;

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_M;

  &.small {
    max-width: @moduleWidth_S;
  }
}
</style>
