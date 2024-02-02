<script setup lang="ts">
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import { useInview } from '@/plugins/inview';
import type Picture from '@interfaces/picture.interface';
import type Textblock from '@interfaces/textblock.interface';
import type Video from '@interfaces/video.interface';
import { computed, ref } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  poster?: Picture;
  textblock?: Textblock;
  video: Video;
  js?: boolean;
}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, { align: props.variant?.includes('align') });
const playing = ref<boolean>(false);
const trigger = ref<boolean>(false);
const started = ref<boolean>(false);
const loading = ref<boolean>(false);

// if the video is not already playing activate the trigger for the video partial
function start () {

  if (!playing.value) {
    trigger.value = !trigger.value;
  }

}

function toggle (isPlaying: boolean) {

  if (isPlaying) started.value = true;
  playing.value = isPlaying;

}

function ended () {

  started.value = false;
  playing.value = false;
  
}

function updateLoading (loadingState: boolean) {

  loading.value = loadingState;

}

const hasPoster = computed(() => !!props.poster?.src);
const controls = computed(() => props.video?.attributes?.includes('controls'));

</script>
<template>
  <section ref="element" :id="id" @click="start" @keypress="start" :class="[variant, inviewState, { started, controls }]" class="lila-video-module lila-module">
    <section class="video-container">
      <lila-video-partial :trigger="trigger" v-bind="video" @playing="toggle" @loading="updateLoading" @ended="ended" />

      <section class="position-container" :class="{ visible: !playing }">
        <lila-textblock-partial v-if="textblock" v-bind="textblock" :variant="variant" />
        <lila-indicator-partial  v-if="loading" :variant="variant" />
      </section>

      <lila-picture-partial class="posterExt" v-if="hasPoster" :class="{ visible: !playing }" v-bind="poster" />
    </section>
  </section>
</template>
<style lang="less" scoped>
.lila-video-module {
  .module;
  max-width: @moduleWidth_M;
  margin: auto;

  .modulePadding('none');

  .video-container {
    position: relative;

    display: grid;

    video {
      width: 100%;
      max-width: 100%;
    }

    .posterExt {
      position: absolute;
      z-index: 3;
    }

    .position-container {
      position: absolute;
      z-index: 4;
      align-self: center;
      justify-self: center;
      text-align: center;

      display: grid;
      grid-template-rows: max-content 20px;
      justify-items: center;

      &.visible {
        .basicHover();
      }
    }

    h1,
    h2 {
      cursor: pointer;
    }

    h2 {
      .font-normal;
      text-align: center;
      text-transform: uppercase;
    }

    .posterExt,
    .position-container {
      opacity: 0;

      cursor: pointer;
      pointer-events: none;

      &.visible {
        opacity: 1;
        pointer-events: all;
      }

      .trans(opacity);
    }

    :deep(.lila-figure) {
      align-self: auto;
      justify-self: auto;
      width: 100%;
      height: 100%;

      .picture-container {
        width: 100%;
        height: 100%;
        grid-template-columns: 100%;
        grid-template-rows: 100%;
        position: absolute;

        img {
          object-fit: cover;

          width: 100%;
          height: 100%;
        }
      }
    }
  }

  &.bright {
    .video-container {
      h1,
      h2 {
        color: @white;
      }
    }
  }

  &.controls {
    &.started {
      .posterExt,
      .position-container {
        display: none;
      }
    }
  }

  &.small {
    max-width: @moduleWidth_S;
  }

  .lila-textblock {
      .modulePadding('full');
    }

  &.fullscreen {
    width: 100%;
    max-width: 100%;
    height: 100vh;

    padding: 0;

    .video-container {
      position: relative;

      grid-area: unset;
      overflow: hidden;
      width: 100%;
      height: 100vh;

      :deep(video),
      iframe {
        position: absolute;
        top: 0;
        left: 0;

        z-index: 0;
        object-fit: cover;
        overflow: hidden;
        min-width: 100%;
        min-height: 100%;
      }
    }
  }
}
</style>
