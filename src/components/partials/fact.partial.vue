<script setup lang="ts">
import type Picture from '@interfaces/picture.interface';
import type Textblock from '@interfaces/textblock.interface';
import { computed } from 'vue';

const props = defineProps<{
  textblock: Textblock;
  picture?: Picture;
  variant?: string[];
}>();
const hasPicture = computed(() => !!props.picture?.src?.length);
const pictureFit = computed(() => props.variant?.includes('fit'));

</script>
<template>
  <section class="lila-fact-partial" :class="[variant, { hasPicture }]">
    <lila-picture-partial v-if="hasPicture" v-bind="picture" :fit="pictureFit" />
    <lila-textblock-partial v-bind="textblock" />

    <slot />
  </section>
</template>
<style lang="less" scoped>
.lila-fact-partial {
  display: grid;

  @media @desktop {
    &.hasPicture {
      gap: 40px;
    }

    :deep(.lila-figure) {
      display: grid;
    }
  }

  .lila-figure {
    display: none;

    @media @desktop {
      display: grid;
    }
  }

  grid-template-rows: max-content;
  grid-template-columns: 1fr;

  gap: 20px;
  align-content: start;
  justify-content: start;

  max-width: 500px;
  text-align: center;

  :deep(.lila-textblock) {
    width: 100%;
  }

  :deep(.lila-figure) {
    position: relative;
    display: grid;
    justify-self: center;

    .index(2);

    img {
      min-width: 80px;
      max-width: 150px;
      min-height: 80px;
    }
  }

  &.topics {
    text-align: left;
    grid-template-columns: 1fr;

    :deep(.lila-figure) {
      position: relative;
      display: grid;
      justify-self: center;

      .index(2);

      img {
        max-width: 100%;
      }
    }

    @media @desktop {
      &.hasPicture {
        grid-template-rows: max-content 1fr;
        grid-column-gap: 40px;
      }

      :deep(.lila-figure) {
        display: grid;
      }
    }
  }
}
</style>
