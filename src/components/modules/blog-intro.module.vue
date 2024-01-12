<script setup lang="ts">

import type Link from '@interfaces/link.interface';
import type Picture from '@interfaces/picture.interface';
import type Textblock from '@interfaces/textblock.interface';
import { computed, ref } from 'vue';
import { useInview } from '@/plugins/inview';

const props = defineProps<{

  textblock: Textblock;

  picture: Picture;

  link?: Link;

  author: string;

  date: string;
  id?: string;
}>();
let element = ref<HTMLElement>();
const inviewState = useInview(element);
const textTop = computed(() => {

  return {
    headline: props.textblock?.headline,
    subline : props.textblock?.subline,
  };

});
const textBottom = computed(() => {

  return {
    intro: props.textblock?.intro,
    text : props.textblock?.text,
  };

});
const linkExists = computed(() => {

  return !!props.link?.link;

});


</script>
<template>
  <article ref="element" :id="id" :class="[inviewState, { hasImage: picture }]" class="lila-blog-intro-module lila-module">

    <header>
      <template v-if="!linkExists">
        <time v-if="date">{{ date }}</time>
        <lila-textblock-partial class="top" v-bind="textTop" />
      </template>

      <lila-link-partial v-if="linkExists" v-bind="link">
        <time v-if="date">{{ date }}</time>
        <lila-textblock-partial class="top" v-bind="textTop" />
      </lila-link-partial>
    </header>

    <lila-link-partial v-bind="link" v-if="linkExists">
      <lila-picture-partial v-if="picture" v-bind="picture" />
    </lila-link-partial>
    <lila-picture-partial v-else-if="picture" v-bind="picture" />

    <lila-textblock-partial class="bottom" v-bind="textBottom" />

    <address v-if="author">Von {{ author }}</address>

    <slot></slot>

  </article>
</template>
<style lang="less" scoped>


.lila-blog-intro-module {
  .module;

  display: grid;
  gap: 20px;
  justify-items: center;

  max-width: @moduleWidth_M;

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

  picture {

    justify-self: center;

    max-width: 100%;

    img {
      max-width: 100%;
    }

  }

  .lila-link {
    display: grid;
    justify-items: center;
    width: 100%;

    h1 {
      .trans(color);
    }

    &:hover {

      h1 {
        color: @color2;
      }

    }

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
