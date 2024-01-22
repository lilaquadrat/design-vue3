<script setup lang="ts">
import {useInview} from '@/plugins/inview';
import type Link from '@interfaces/link.interface';
import type Picture from '@interfaces/picture.interface';
import type Textblock from '@interfaces/textblock.interface';
import type Video from '@interfaces/video.interface';
import { computed, ref } from 'vue';

const props = defineProps<{
  textblock?: Textblock;

  video?: Video;

  background?: Picture;

  picture?: Picture;

  links?: Link[];
  variant: string[];
}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});

function scrollToNext (): void {

  const next = element.value?.nextSibling as Element;

  next.scrollIntoView({
    behavior: 'smooth',
  });

}

const scrollNotice = computed((): boolean => props.variant?.includes('scrollNotice')); 
const filteredLinks = computed(() => {

  let filteredLinks: Link[] | undefined = props.links?.filter((link) => !!link.text);

  if (!Array.isArray(filteredLinks)) filteredLinks = undefined;
  if (!filteredLinks?.length) filteredLinks = undefined;

  return filteredLinks;

});


</script>
<template>
  <section ref="element" :class="[inviewState, props.variant, { hasImage: background }]"
    class="lila-module emotion-module fullscreen">


    <lila-picture-partial class="background" v-if="background" v-bind="background" />
    <lila-video-partial class="background" v-if="video" v-bind="video" />

    <div class="position-container">

      <lila-picture-partial class="picture" v-if="picture" v-bind="picture" />
      <lila-textblock-partial v-if="textblock" v-bind="textblock" :variant="variant" />

      <ul v-if="filteredLinks" class="list-links">
        <li v-for="(single, index) in filteredLinks" :key="`emotion-link-${index}`">

          <lila-button-partial class="more" @click="scrollToNext" v-if="single.link === '#more'">{{ single.text }}</lila-button-partial>
          <lila-link-partial v-if="single.link !== '#more'" v-bind="single"></lila-link-partial>

        </li>
      </ul>

      <slot />

    </div>

    <lila-button-partial @click="scrollToNext" icon v-if="scrollNotice" class="scrollButton">
      <lila-icons-partial colorScheme="white" size="large" type="mouse" />
    </lila-button-partial>

  </section>
</template>
<style lang="less" scoped>


.lila-module.emotion-module {
  .module;

  position: relative;

  display: grid;
  overflow: hidden;
  width: 100%;

  height: 100vh;

  .modulePadding('full');

  ul {

    display: flex;
    flex-wrap: wrap;
    gap: 10px 20px;
    justify-content: start;

  }

  @media @tablet,
  @desktop {
    padding: 40px @modulePaddingExt;
  }

  :deep(figure.background), :deep(video) {
    position: absolute;
    top: 0;
    left: 0;

    z-index: 0;
    width: 100%;
    height: 100%;

    source {
      display: none;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }

  }

  .position-container {
    position: relative;

    display: grid;
    gap: 20px;
    align-self: end;
    justify-self: center;

    width: 100%;

    max-width: @desktopWidthExt;

    picture {
      img {
        max-height: 30vh;
      }
    }

  }

  video {
    object-fit: cover;
  }

  .picture {
    justify-self: center;
  }

  &.height50 {
    height: 50vh;
  }

  &.height80 {
    height: 80vh;
  }

  .scrollButton {

    position: absolute;
    right: 0;
    bottom: 50px;
    left: 0;
    display: grid;

    justify-self: center;

    margin: auto;
    color: @white;
  }

  a,
  .more {
    line-height: @buttonLineHeight;

    &.callToAction {
      border: none;
    }
  }

  .more {
    .font-head;
    font-size: @fontText;
  }

  .lila-textblock {
    max-width: @moduleWidth_S;
  }

  &.bright {

    a:not(.callToAction),
    .more {
      .trans(color);
      color: @white;

      &:hover {
        color: @color2;
      }

    }
  }

  &.dark {

    a:not(.callToAction),
    .more {
        .trans(color);
        color: @color1;

        &:hover {
          color: @color3;
        }
    }

  }

  &.picture-switch {

    .position-container {

      display: grid;

      .lila-figure {

        display: grid;

        grid-row-start: 3;
        justify-content: center;
        text-align: center;
      }

    }

  }

  &.content-inline {

    height: auto;
    .multi(padding, 16, 8);

    .position-container {

      position: relative;
      bottom: auto;
      left: auto;
      width: 100%;

      max-width: @desktopWidthExt;

      @media @desktop {

        h1,
        h2,
        h3,
        p {
          max-width: 60%;
        }
      }

      h1,
      h2,
      h3,
      p {
        max-width: 70%;
      }

    }

  }

  &.variant1 {
    text-align: center;

    .position-container {

      .multi(padding, 8);

      position: absolute;
      display: grid;
      gap: 40px;
      align-self: center;
      justify-self: center;

      .lila-textblock {

        justify-self: center;

        h1,
        h2,
        h3,
        p {
          max-width: 100%;
        }

        h1 {
          font-size: @headline_L;
          line-height: @headlineLineHeight_L;

          @media @desktop {
            font-size: @headline_XL;
            line-height: @headlineLineHeight_XL;
          }

        }

      }

      ul {
        justify-content: center;
      }
    }

    &.content-inline {

      .position-container {

        position: relative;
        .multi(padding, 0);

        .lila-textblock {

          grid-template-columns: 1fr;

          justify-items: center;

          h1,
          h2,
          h3 {
            display: grid;
          }

        }

      }

    }

  }

}
</style>
