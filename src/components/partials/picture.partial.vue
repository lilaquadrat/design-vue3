<script setup lang="ts">

import { useInview } from '@/plugins/inview';
import useMainStore from '@/stores/main.store';
import type Picture from '@interfaces/picture.interface';
import type { PictureMedia } from '@interfaces/picture.interface';
import { onBeforeMount, onServerPrefetch } from 'vue';
import { computed, ref, watch, type Ref } from 'vue';

const store = useMainStore();
const props = defineProps<{
  alt?: string

  src?: string

  copyright?: string
  source?: Picture['source']

  noLoadAnimation?: boolean

  fit?: boolean

  center?: boolean

  animation?: 'leftToRight' | 'scale' | 'rightToLeft' | 'topToBottom' | 'bottomToTop'
  activeAnimation?: boolean

}>();
const emit = defineEmits(['loaded']);
const element = ref<HTMLElement>();
const image = ref<HTMLImageElement>();
const {preload} = useInview(element, {preload: true})
const loading: Ref<boolean> = ref(false);

watch(preload, () => {
  if (!loading.value) loading.value = true;
});
watch(image, () => {

  const imageElement = image.value as HTMLImageElement;

  if(imageElement.complete) {
    emit('loaded');
  }

  imageElement.onload = () => {
    emit('loaded');
  }
});

onServerPrefetch(() => {

  if(store.configuration?.preloadImages) loading.value = true;
  
})

onBeforeMount(() => {

  if(store.configuration?.preloadImages) loading.value = true;

});

const sourceMedia = computed((): PictureMedia[] => {

  const source: { media: string; src: any; }[] = [];
  const settings = store?.configuration;

  props.source?.forEach((single: { media: string; src: any; }, index: number) => {

    let media: string = '';

    if (!single.media) {

      if (settings) {

        if (index === 0 && settings?.breakpointTablet?.length) media = settings.breakpointTablet;
        if (index === 1 && settings?.breakpointDesktop?.length) media = settings.breakpointDesktop;
        if (index === 2 && settings?.breakpointWide?.length) media = settings.breakpointWide;

      }

    } else {

      media = single.media;

    }

    if (media && single.src) {

      source.push({ media, src: single.src });

    }

  });

  return source.reverse();

});

</script>
<template>
  <figure ref="element" :class="[loading, animation, { notLoaded: !loading, noLoadAnimation, fit, center, animation, activeAnimation }]" class="lila-figure">
    <section class="picture-container">
      <picture>
        <template v-if="loading">
          <source v-for="(source, i) in sourceMedia" :key="`p-${i}`" :media="`${source.media}`" :srcset="source.src">
          <img ref="image" :src="src" :alt="alt">
        </template>
  
        <template v-if="!loading">
          <img :alt="alt">
        </template>
      </picture>
  
      <figcaption v-if="copyright">
        {{ copyright }}
      </figcaption>
    </section>
  </figure>
</template>
<style lang="less" scoped>

.lila-link, .lila-button {
  &:hover {
    .lila-figure {
      img {
        opacity: .5;
      }
    }
  }
}

.lila-figure {

  position: relative;
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;

  .picture-container {
    display: grid;
  }

  picture {
    display: grid;
    transition: opacity .5s ease, transform .5s ease;

    img {
      .trans(opacity);
      max-width: 100%;
      max-height: 100%;
      width: 100%;
    }
  }

  figcaption {
    position: absolute;
    align-self: end;

    justify-self: end;

    color: @white;
    font-size: @fontTextSmaller;
    text-shadow: 1px 1px 1px @black;

    .multi(padding, 1);
    .multi(padding-right, 2);
  }

  &.notLoaded {

    picture {
      opacity: 0;
      transform: translateY(5px);
    }
  }

  &.noLoadAnimation {

    picture {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &.fit {

    img {

      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    .element {
      grid-template-columns: 1fr;
    }

  }

  &.center {

    img {
      justify-self: center;
    }

  }

  &.animation.activeAnimation {
    overflow: hidden;
    
    picture {
      img {
        animation-fill-mode: forwards;
        animation-duration: 10s;
        animation-timing-function: linear;
      }
    }

    &.leftToRight {
      picture {

        img {
          transform: scale(120%);
          animation-name: leftToRight;
        }

      }
    }

    &.rightToLeft {
      picture {

        img {
          transform: scale(120%);
          animation-name: rightToLeft;
        }

      }
    }

    &.topToBottom {
      picture {

        img {
          transform: scale(120%);
          animation-name: topToBottom;
        }

      }
      
    }

    &.bottomToTop {
      picture {

        img {
          transform: scale(120%);
          animation-name: bottomToTop;
        }

      }

    }

    &.scaleUp {
      picture {

        img {
          animation-name: scaleUp;
        }

      }

    }

    &.scaleDown {
      picture {

        img {
          animation-name: scaleDown;
        }

      }

    }

  }

  @keyframes leftToRight {

    0% {
      transform: translateX(-10%) scale(120%);
    }

    100% {
      transform: translateX(0) scale(120%);
    }

  }

  @keyframes rightToLeft {

    0% {
      transform: translateX(10%) scale(120%);
    }

    100% {
      transform: translateX(0) scale(120%);
    }

  }

  @keyframes topToBottom {

    0% {
      transform: translateY(-5%) scale(120%);
    }

    100% {
      transform: translateY(0) scale(120%);
    }

  }

  @keyframes bottomToTop {

    0% {
      transform: translateY(5%) scale(120%);
    }

    100% {
      transform: translateY(0) scale(120%);
    }

  }

  @keyframes scaleUp {

    0% {
      transform: scale(100%);
    }

    100% {
      transform: scale(120%);
    }

  }

  @keyframes scaleDown {

    0% {
      transform: scale(120%);
    }

    100% {
      transform: scale(100%);
    }

  }

}

</style>
