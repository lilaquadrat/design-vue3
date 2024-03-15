<script setup lang="ts">
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import { useInview } from '@/plugins/inview';
import type Link from '@interfaces/link.interface';
import type Picture from '@interfaces/picture.interface';
import type Textblock from '../../interfaces/textblock.interface';
import { computed, ref } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  picture: Picture;

  textblock: Textblock;

  legend?: string[];

  links?: Link[];

  list?: string[];
}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});
const fitVariant = computed(() => props.variant?.includes('fit'));

</script>
<template>
  <section ref="element" :id="id" :class="[inviewState, { hasImage: picture }, variant]" class="lila-pictureandtext-module lila-module">
    <lila-picture-partial :fit="fitVariant" v-bind="picture" />

    <section class="grid-container">

      <lila-textblock-partial v-bind="textblock" />

      <lila-list-partial v-if="list" v-bind="list" />
      <lila-list-partial v-if="links" v-bind="links" />

      <lila-legend-partial v-if="legend" :text="legend" />

    </section>

  </section>
</template>
<style lang="less" scoped>

.lila-pictureandtext-module {
  .module;
  .modulePadding('none');

  display: grid;
  gap: 40px;

  max-width: @moduleWidth_S;

  @media print {
    margin: 20mm 0;
  }

  @media @desktop {

    .modulePadding();
    max-width: @moduleWidth_M;

  }

  @media @desktop {
    display: grid;
    grid-template-columns: minmax(min-content, 40%) 1fr;

    &.focusImage {
      grid-template-columns: minmax(min-content, 60%) 1fr;
    }
  }

  .grid-container {
    display: grid;
    gap: 40px;

    .modulePadding();

    align-content: center;

    @media @desktop {
      .modulePadding('none');
    }

  }

  &.fit {

    img {

      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  &.switchContent {

    @media @desktop {
      grid-template-columns: 1fr minmax(min-content, 40%);

      &.focusImage {
        grid-template-columns: 1fr minmax(min-content, 60%);
      }

      .textblock {
        grid-row: 1;
        grid-column: 1;
      }

      figure {
        grid-row: 1;
        grid-column: 2;
      }
    }
  }
}
</style>
