<script setup lang="ts">

import type Link from '@interfaces/link.interface';
import type Picture from '@interfaces/picture.interface';
import type Textblock from '@interfaces/textblock.interface';
import { computed, ref } from 'vue';
import { useInview } from '@/plugins/inview';
import type ModuleBaseProps from '../../interfaces/ModuleBaseProps.interface';

defineOptions({ inheritAttrs: false });

type blogIntroProps = ModuleBaseProps & {
  textblock: Textblock
  picture?: Picture
  link?: Link
  author: string
  date: string
}

const props = withDefaults(defineProps<blogIntroProps>(), { variant: () => [] })
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, { align: props.variant?.includes('align') });
const textTop = computed(() => ({
  headline: props.textblock?.headline,
  subline : props.textblock?.subline,
}));
const textBottom = computed(() => ({
  intro: props.textblock?.intro,
  text : props.textblock?.text,
}));

</script>
<template>
  <article
    :id="props.index?.anchor || props.id"
    ref="element"
    :class="[inviewState, { hasImage: picture, sub }]"
    class="lila-blog-intro-module lila-module"
  >
    <header>
      <lila-action-partial v-bind="link">
        <time v-if="date">{{ date }}</time>
        <lila-textblock-partial class="top" v-bind="textTop" />
      </lila-action-partial>
    </header>

    <lila-action-partial v-if="picture" v-bind="link">
      <lila-picture-partial v-bind="picture" />
    </lila-action-partial>

    <lila-textblock-partial class="bottom" v-bind="textBottom" />

    <address v-if="author">
      {{ $translate('blog-intro-author', [author]) }}
    </address>

    <slot />
  </article>
</template>
<style lang="less" scoped>
.lila-blog-intro-module {
  .module;

  display: grid;
  gap: 20px;
  justify-items: center;

  background: transparent;
  .modulePadding('none');

  header {
    display: grid;
    gap: 10px;
    width: 100%;
    max-width: @moduleWidth_S;

    a {
      display: grid;
      gap: 10px;
    }

  }

  h1,
  h2 {
    margin-left: -2px;
  }

  .lila-textblock {

    gap: 10px;

    width: 100%;

    max-width: @moduleWidth_S;

    .modulePadding();

    &.top {
      display: grid;

      h2 {
        grid-row-start: 1;
      }

    }

  }

  :deep(.lila-figure) {
    justify-self: center;
    background-color: @color1;
    max-width: 100%;

    img {
      max-width: 100%;
    }

  }

  :deep(.lila-link) {
    display: grid;
    justify-items: center;
    width: 100%;

    h1 {
      .trans(color);
    }

    // &:hover {

    //   h1 {
    //     color: @color3;
    //   }

    //   picture {
    //     opacity: .5;
    //   }

    // }

  }

  time,
  address {

    display: grid;

    width: 100%;
    max-width: @moduleWidth_S;
    color: @textColor;
    .modulePadding();
  }

  time {
    .font-bold;
  }

}
</style>
