<script setup lang="ts">
import type Textblock from '@/interfaces/textblock.interface';

const props = defineProps<{
    partial: string,
    partialData: {textblock?: Textblock, props: Record<string, unknown>}[]
}>();

</script>
<template>
  <section class="partials-preview-module">
    <section v-for="(single, index) in partialData" :key="`single-partial-${index}`" class="single-partial">
      <lila-textblock-partial v-if="single.textblock" v-bind="single.textblock" />

      <lila-datepicker-partial v-if="props.partial === 'datepicker'" v-bind="single.props" v-model:from="single.props.form" v-model="single.props.to" />
    </section>
  </section> 
</template>
<style lang="less" scoped>
.partials-preview-module {
    .module;
    .modulePadding('full');

    .multi(margin-top, 8);

    gap: 40px;
    
    max-width: @moduleWidth_M;

    .single-partial {
        display: grid;
        gap: 50px;
    }
}
</style>