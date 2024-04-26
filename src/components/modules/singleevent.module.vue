<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import type ModuleBaseProps from '../../interfaces/ModuleBaseProps.interface';
import { useInview } from '../../plugins/inview';
// import content from '@/views/viewData';
import type Textblock from '../../interfaces/textblock.interface';
import type Video from '../../interfaces/video.interface';
import type Link from '../../interfaces/link.interface';
import type ListWithTitle from '@/interfaces/ListWithTitle.interface';
import type Picture from '@/interfaces/picture.interface';
import type LinkListWithTitle from '@/interfaces/LinkListWithTitle.interface';

defineOptions({ inheritAttrs: false });

const props = defineProps<
  ModuleBaseProps & {
    artist?: string;
    name?: string;

    start?: Date;
    end?: Date;

    description?: string;
    location?: string;

    textblock?: Textblock;

    list?: ListWithTitle;
    links?: LinkListWithTitle;

    video?: Video;
    picture?: Picture;

    link?: Link;
  }
>();

onBeforeMount(() => {});

const element = ref<HTMLElement>();
const { inviewState } = useInview(element, { align: props.variant?.includes('align') });
const hasLink = computed(() => !!props.link?.link);
const noMedia = computed(() => !props.video && !props.picture);

</script>
<template>
  <section :id="id" ref="element" class="lila-singleevent-module lila-module" :class="[inviewState, variant, {noMedia}]">
    <section class="media-container">
      <lila-video-partial v-if="video" v-bind="video" />
      <lila-picture-partial v-if="picture" v-bind="picture" fit />
      <div class="details-container">
        <h3 class="location">{{ location }}</h3>
        <lila-list-partial v-bind="list" mode="list" :variant="['noStyle', 'bold']" />
        <lila-list-partial v-bind="links" mode="links" :variant="['noStyle', 'bold']" />
      </div>
    </section>

    <section class="intro-container">
      <div class="date-artist">
          <h2 class="artist">{{ artist }}</h2>
          <h4 v-if="start || end" class="date">
            <template v-if="start">{{ $helpers.date(start) }}</template>
            <template v-if="end"> - {{ $helpers.date(end) }}</template>
          </h4>
      </div>
      <h1 class="name">{{ name }}</h1>

      <p>{{ description }}</p>
      <lila-textblock-partial v-if="textblock" v-bind="textblock" :variant="variant" />
    </section>
  </section>
</template>

<style lang="less" scoped>
.lila-singleevent-module {
  .module;
  .headlines;

  @media @desktop {
    max-width: @moduleWidth_L;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    
    &.noMedia {
        max-width: @moduleWidth_S;
        grid-template-rows: max-content max-content;
        grid-template-columns: 1fr;
    }
  }

  grid-template-rows: max-content max-content;

  gap: 40px;

  .date-artist {

    display: grid;
    @media @desktop {
        gap: 15px;
    }

  }

  .artist,
      .date {
        font-size: @headline_XS;
        @media @desktop {
            font-size: @headline_S;
        }
      }

  .artist {
    color: @color3;
  }

  .date {
    color: @success;
  }

  .location {
    font-size: @headline_XS;
    .font-bold;
  }

  .name {
    .multi(padding-top, 3);

    @media @desktop {
        font-size: @headline_XL;
        line-height: @headlineLineHeight_XL;
    }
  }

  .intro-container {
    display: grid;
    gap: 15px;
    align-content: start;
  }

  .media-container {
    display: grid;
    gap: 20px;

    grid-row-start: 2;
    @media @desktop {
        grid-row-start: 1;

    }
  }
  &.noMedia {
    .media-container {
      @media @desktop {
        grid-row-start: 2;

      }
    }
  }

  .details-container {
    display: grid;
    gap: 10px;
    align-content: start;
  }
}
</style>
