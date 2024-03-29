<script setup lang="ts">

import { useInview } from '@/plugins/inview';
import useMainStore from '@/stores/main.store';
import type Picture from '@interfaces/picture.interface';
import type { PictureMedia } from '@interfaces/picture.interface';
import { onBeforeMount, onServerPrefetch } from 'vue';
import { computed, ref, watch, type Ref } from 'vue';

const store = useMainStore();
const props = defineProps<{
  alt: string;

  src: string;

  copyright?: string;
  source?: Picture['source'];

  noLoadAnimation?: boolean;

  fit?: boolean;

  center?: boolean;

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
  if(store.configuration.preloadImages) loading.value = true;
})
onBeforeMount(() => {

  if(store.configuration.preloadImages) loading.value = true;

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
  <figure :class="[loading,{ notLoaded: !loading, noLoadAnimation: noLoadAnimation, fit, center }]" class="lila-figure" ref="element">
    <section class="picture-container">
      <picture>
        <template v-if="loading">
          <source v-for="(source, i) in sourceMedia" :key="`p-${i}`" :media="`${source.media}`" :srcset="source.src" />
          <img ref="image" :src="src" :alt="alt" />
        </template>
  
        <template v-if="!loading">
          <img :alt="alt" />
        </template>
      </picture>
  
      <figcaption v-if="copyright">{{ copyright }}</figcaption>
    </section>
  </figure>
</template>
<style lang="less" scoped>

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

}

</style>
