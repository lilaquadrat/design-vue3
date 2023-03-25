<script setup lang="ts">

const props = defineProps<{
  headline?: string
  subline?: string
  intro?: string
  text?: string
  links?: string
  list?: string
}>();

</script>
<script lang="ts">
  export default {
    inheritAttrs: false,
  };
</script>

<template>
  <article class="lila-text-module lila-module">

    <lila-textblock-partial v-bind="props" />
    
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

    .modulePadding('none');
    justify-content: center;
    max-width: 100%;

    background-color: @color1;

    .lila-textblock {
      .modulePadding('full');

      max-width: @moduleWidth_S;
      color: @white;

      h1, h2, h3, p {

        color: @white;
      }
    }

  }
}
</style>