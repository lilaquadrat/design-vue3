<template>
  <section v-if="props.picture" :id="props.index?.anchor || props.id" ref="element" :class="[variant, inviewState, { fullscreenOverlay, fullscreenOverlayEnabled }]" class="lila-picture-module lila-module">
    <lila-picture-partial v-bind="picture" />

    <div v-if="showText" class="position-container">
      <lila-textblock-partial v-bind="textblock" />
    </div>

    <section v-if="fullscreenOverlayEnabled" class="controls-container">
      <lila-button-partial color-scheme="colorScheme2" :icon="fullscreenOverlay ? 'zoom-out' : 'zoom-in'" @click="toggleFullscreenOverlay" />
    </section>
  </section>
</template>
<script setup lang="ts">
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import { useInview } from '@/plugins/inview';
import useMainStore from '@/stores/main.store';
import type Picture from '@interfaces/picture.interface';
import type Textblock from '@interfaces/textblock.interface';
import { computed, ref } from 'vue';

defineOptions({ inheritAttrs: false });

type pictureModuleProps = ModuleBaseProps & {
  picture: Picture
  textblock?: Textblock
};

const props = withDefaults(defineProps<pictureModuleProps>(), {variant: () => []})
const store = useMainStore();
const fullscreenOverlay = ref(false);
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});
const showText = computed((): boolean => {
  if (!props.textblock) return false;

  return Object.keys(props.textblock).some((single) => {
    
    if (!props.textblock) return false;
    
    const singleTyped = single as keyof Textblock;

    return props.textblock[singleTyped]?.length;
  });
});
const fullscreenOverlayEnabled = computed(() => props.variant?.includes('fullscreenOverlayEnabled'));

function toggleFullscreenOverlay () {
  fullscreenOverlay.value = !fullscreenOverlay.value;
  store.setFullscreen(fullscreenOverlay.value);
}
</script>
<style lang="less" scoped>
.lila-picture-module {
  .module;
  .modulePadding('none');
  max-width: @moduleWidth_L;

  picture {
    img {
      display: block;
      min-width: 100%;
      max-width: 100%;
    }
  }

  &.small {
    max-width: @moduleWidth_S;
  }

  &.middle {
    max-width: @moduleWidth_M;
  }

  .controls-container {
    position: absolute;
    display: grid;
    .multi(margin, 4);
    align-self: start;
    justify-self: end;
  }

  .position-container {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);

    :deep(.lila-textblock) {
      .multi(padding, 4, 8);

      h3 {
        color: @textColor;
      }
    }
  }

  &.fullscreen {
    width: 100%;
    max-width: 100%;
    grid-template-columns: 1fr;

    .position-container {
      position: absolute;
      align-self: end;
    }
  }

  &.textOverlay {
    position: relative;

    .position-container {
      @media @tablet, @desktop {
        position: absolute;
        top: 0;
        right: 0;
        max-width: 50%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.9);
      }

      @media @desktop {
        max-width: 30%;
      }
    }
  }

  &.textPictureVertical {
    grid-template-rows: min-content 1fr;

    .position-container {
      grid-row-start: 1;
    }

    figure {
      grid-row-start: 2;
    }
  }

  &.textPictureVertical,
  &.pictureTextVertical {
    gap: 60px;
    text-align: center;

    .position-container {
      justify-self: center;
      max-width: @desktopWidthExt;
      background: transparent;
    }

    :deep(.lila-textblock) {
      .multi(padding, 0, 8);
    }
  }

  &.fullscreenOverlay.fullscreenOverlayEnabled {
    .multi(padding, 8);

    .index(9);

    position: fixed;
    top: 0;
    left: 0;

    display: grid;
    align-content: center;
    justify-content: center;
    overflow: hidden;
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    max-height: 100vh;

    background-color: @white;

    &:first-child {
      margin: 0;
    }

    :deep(.lila-figure) {
      overflow: hidden;

      picture {
        object-fit: contain;
        overflow: hidden;
        width: 100%;
        height: 100%;

        img {
          align-self: center;
          justify-self: center;
          border: solid 1px @grey;
          box-shadow: 0 0 7px @grey;
        }
      }
    }

    .position-container {
      position: relative;

      :deep(.lila-textblock) {
        .multi(padding, 4);
        text-align: center;
      }
    }
  }

  &.pictureTextVertical {
    grid-template-rows: 1fr min-content;
  }
}
</style>
