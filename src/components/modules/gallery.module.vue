<script setup lang="ts">
import type { GalleryElement } from '@interfaces/galleryElement.interface';
import type Textblock from '@interfaces/textblock.interface';
import dom from '@/functions/lila-dom';

import { ref, watch, type Ref, nextTick, computed, onMounted } from 'vue';
import useMainStore from '@/stores/main.store';
import { useInview } from '@/plugins/inview';

defineOptions({ inheritAttrs: false });

const store = useMainStore();
const props = defineProps<{
  textblock?: Textblock;
  elements: GalleryElement[];
  variant?: string[];
  id?: string;
}>();
const currentOptionIndex: Ref<number> = ref(0);
const swipeX = ref<number>(0);
const tempSwipe = ref<number>(0);
const dragging = ref<boolean>(false);
const elementsWidth = ref<number>(0);
const imageIndex = ref<number>(0);
const currentHeadline = ref<string>('');
const controlsOffset = ref<number>(0);
/**
 * defines how far the image needs to be swiped to change
 * higher means more distant needs to be swiped
 */
const swipeThreshold = ref<number>(0.2);
const firstLoad = ref<boolean>(false);
const fullscreenOverlay = ref<boolean>(false);
const emit = defineEmits<{ (e: string, element: any): void }>();
const element = ref<HTMLElement>();
const elementsContainer = ref<HTMLElement>();
const scrollContainer = ref<HTMLElement>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});

watch(currentOptionIndex, indexChange);

function indexChange (): void {
  setControlsTop();
  updateText();
}

const cssElementsLength = computed((): { [key: string]: string | number } => ({
  '--n' : props.elements.length,
  '--i' : currentOptionIndex.value,
  '--ts': `${tempSwipe.value}px`,
}));
const cssWidth = computed((): { [key: string]: string } => ({
  '--width': `${100 / props.elements.length}%`,
}));
const controlsTop = computed((): { [key: string]: string } => ({
  '--top': `${controlsOffset.value / 2}px`,
}));
const indicatorsTop = computed((): { [key: string]: string } => ({
  '--top': `${controlsOffset.value}px`,
}));
/** checks if any elements has a description */
const elementDescription = computed(() => !!props.elements.find((single) => single.textblock?.headline?.length || single.textblock?.subline?.length || single.textblock?.intro || single.textblock?.text?.length));
const variant2 = computed((): boolean => !!props.variant?.includes('variant2'));
const simpleIndicator = computed((): boolean => !!props.variant?.includes('simpleIndicator'));
const disableControls = computed((): boolean => !!props.variant?.includes('disableControls'));
const fullscreenOverlayEnabled = computed(() => !props.variant?.includes('disableOverlay'));

function toggleFullscreenOverlay () {
  fullscreenOverlay.value = !fullscreenOverlay.value;
  store.setFullscreen(fullscreenOverlay.value);

  nextTick().then(() => setControlsTop());
}

function pictureLoaded (): void {
  firstLoad.value = true;
  setControlsTop();
}

function setControlsTop (this: any): void {
  const elements = scrollContainer.value?.querySelectorAll('.element');
  const single = elements?.item(currentOptionIndex.value).querySelector('.picture-container');

  if (single?.scrollHeight) controlsOffset.value = single?.scrollHeight;
}

/** gets the correct event type */
function getEvent (event: MouseEvent | TouchEvent): Touch | MouseEvent {
  return 'changedTouches' in event ? event.changedTouches[0] : event;
}

function touchstart (event: TouchEvent): void {
  const unifiedEvent = getEvent(event);
  const target = unifiedEvent.target as HTMLElement;

  if (target.tagName === 'A' || target.closest('button')) return;

  swipeX.value = unifiedEvent.clientX;
  dragging.value = true;
}

function swipe (event: TouchEvent): void {
  const length = props.elements.length - 1;
  // Calculate the horizontal distance of the swipe
  const currentSwipeX = getEvent(event).clientX - swipeX.value;
  // Get the unified touch or mouse event
  const unifiedEvent = getEvent(event);
  const target = unifiedEvent.target as HTMLElement;

  // If the target is a link ('A' tag), exit the function to allow normal link behavior
  if (target.tagName === 'A' || target.closest('button')) return;
  event.preventDefault();

  // Set dragging flag to false indicating the swipe action is complete
  dragging.value = false;

  // Reset temporary swipe distance value
  tempSwipe.value = 0;

  // If the swipe distance is less than 20% of the element's width, don't change the image
  if ((Math.sign(currentSwipeX) * currentSwipeX) / elementsWidth.value < swipeThreshold.value) return;

  // Update the index of the current image based on the swipe direction
  currentOptionIndex.value -= Math.sign(currentSwipeX);

  // Ensure the current index is not less than 0 or more than the total number of elements
  if (currentOptionIndex.value < 0) currentOptionIndex.value = 0;
  if (currentOptionIndex.value > length) currentOptionIndex.value = length;

  emit('change', props.elements[currentOptionIndex.value]);
}

function change (direction: string): void {
  const length = props.elements.length - 1;

  if (direction === 'more') {
    currentOptionIndex.value += 1;
  } else {
    currentOptionIndex.value -= 1;
  }

  if (currentOptionIndex.value < 0) currentOptionIndex.value = 0;
  if (currentOptionIndex.value > length) currentOptionIndex.value = length;

  emit('change', props.elements[currentOptionIndex.value]);
}

function drag (event: TouchEvent): void {
  if (!dragging.value) return;

  const unifiedEvent = getEvent(event);
  const target = unifiedEvent.target as HTMLElement;

  if (target.tagName === 'A' || target.closest('button')) return;

  tempSwipe.value = Math.round(unifiedEvent.clientX - swipeX.value);
}

onMounted(() => {
  init();
  updateText();
  setControlsTop();
});

function init (): void {
  window.addEventListener('resized', () => {

    elementsWidth.value = elementsContainer.value?.getBoundingClientRect().width || 0;
    setControlsTop();

  });

  elementsWidth.value = elementsContainer.value?.getBoundingClientRect().width || 0;

  if (element.value) {
    dom.onElement('touchstart mousedown', element.value, touchstart as EventListener);
    dom.onElement('touchend mouseup', element.value, swipe as EventListener);
    dom.onElement('touchmove mousemove', element.value, drag as EventListener);
  }

  // if(mainElement.value) dom.onElement('touchmove', mainElement.value, touchmove as EventListener);
}

/** updates the current headline for variant2 */
function updateText (): void {
  currentHeadline.value = props.elements[currentOptionIndex.value].textblock?.headline || '';
}

function indicatorchange (index: number): void {
  currentOptionIndex.value = index;
}
</script>
<template>
  <section :id="id" ref="element" class="gallery-module lila-module" :class="[variant, inviewState, { hasDescription: textblock, hasElementDescription: elementDescription, fullscreenOverlay, fullscreenOverlayEnabled }]">
    <section ref="contentContainer" class="content-container">
      <section ref="elementsContainer" class="elements">
        <div ref="scrollContainer" :style="cssElementsLength" :class="{ transition: !dragging }" v-if="elements.length > 0" class="scroll-container">
          <template v-for="(element, elementIndex) in elements" :key="`gallery-element-${elementIndex}`">
            <div class="element" :style="cssWidth" :class="{ hasImage: element.picture || element.pictures, hasDescription: element.textblock }">
             
              <div class="picture-container" v-if="element && element.picture">
                <lila-picture-partial :key="`gallery-placeholder-${elementIndex}`" class="placeholder" fit v-bind="element.picture" />
                <lila-picture-partial :key="`gallery-picture-${elementIndex}`" @loaded="pictureLoaded" fit class="active picture" v-bind="element.picture" />
              </div>

              <div v-if="element.pictures && firstLoad" :style="indicatorsTop" class="picture-indicators">
                <span class="indicator" v-for="(picture, index) in element.pictures" :class="{ active: imageIndex === index }" :key="`picture-indicator-${index}`"></span>
              </div>
              <lila-textblock-partial v-if="element.textblock && !variant2" v-bind="element.textblock" class="picture-description" />
            </div>
          </template>
        </div>
      </section>

      <div v-if="simpleIndicator" class="carousel-indicators carousel-indicators-numbers">
        <lila-button-partial class="indicator" v-for="(element, index) in elements" :key="`indicator-${index}`" colorScheme="transparent" :class="{ active: currentOptionIndex === index }" @click="indicatorchange(index)" />
      </div>

      <div class="indexIndicator">
        <lila-button-partial v-if="fullscreenOverlayEnabled" colorScheme="colorScheme2" :icon="fullscreenOverlay ? 'zoom-out' : 'zoom-in'" @click="toggleFullscreenOverlay" />
        <template v-if="!simpleIndicator">
          <span class="currentIndex">{{ $helpers.leadingZero(currentOptionIndex + 1, 2) }}</span>
          <span class="seperator" />
          <span class="allIndex">{{ $helpers.leadingZero(elements.length, 2) }}</span>
        </template>
      </div>

      <div v-if="firstLoad && !disableControls" :style="controlsTop" class="gallery-controls">
        <lila-button-partial icon="arrow-left" colorScheme="colorScheme1" :class="{ active: currentOptionIndex > 0 }" @click="change('less')" />
        <lila-button-partial icon="arrow-right" colorScheme="colorScheme1" :class="{ active: currentOptionIndex + 1 < elements.length }" @click="change('more')" />
      </div>

    </section>
  </section>
</template>
<style lang="less" scoped>
.lila-module.gallery-module {
  .module;

  .modulePadding('none');

  position: relative;
  display: grid;

  gap: 20px 0;
  justify-content: center;
  justify-items: center;

  overflow: hidden;

  width: 100%;

  cursor: grabbing;
  -moz-user-select: none;

  user-select: none;

  transition:
    transform 0.75s ease,
    opacity 0.5s ease;
  transition-delay: 0.3s;

  .content-container,
  .elements,
  .element {
    grid-template-columns: 1fr 120px;
    grid-template-rows: 1fr 80px;

    @media @desktop {
      grid-template-columns: 1fr 185px;
      grid-template-rows: 1fr 80px;
    }

    gap: 0 10px;
  }

  .elements,
  .scroll-container {
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 3;
  }

  .content-container {
    display: grid;
    overflow: hidden;
    max-width: @moduleWidth_M;
    position: relative;
  }

  .indexIndicator {
    .font-normal;
    position: absolute;

    display: grid;
    grid-auto-flow: column;

    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 3;

    line-height: 35px;

    width: 100%;
    height: 100%;

    gap: 10px;

    .multi(padding, 4);

    background-color: @white;

    align-content: start;
    justify-content: end;

    span {
      display: grid;
      font-size: @fontText;

      align-content: center;
      align-self: center;

      &.seperator {
        display: grid;
        width: 2px;
        height: 20px;
        background-color: @grey;
      }
    }
  }

  .carousel-indicators {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;

    align-self: end;

    justify-content: end;
    justify-self: center;

    grid-row-start: 1;
    grid-row-end: 2;

    .multi(padding, 4);

    :deep(.lila-button) {
      width: 15px;
      height: 15px;
      border-radius: 100%;

      background-color: @grey;

      &:hover {
        background-color: @color3;
      }

      &.active {
        background-color: @color1;

        &:hover {
          background-color: @color3;
        }
      }
    }
  }
  .elements {
    display: grid;
    position: relative;
    grid-column-start: 1;
    grid-column-end: 3;

    .scroll-container {
      --n: 1;
      width: 100%;
      width: calc(var(--n) * 100%);

      transform: translate(calc(var(--i, 0) / var(--n) * -100% + var(--ts, 0px)));

      &.transition {
        .trans(transform);
      }
    }
    .element {
      :deep(.picture-description) {
        h3 {
          color: @textColor;
        }
      }

      .multi(padding, 0);
      .multi(margin, 0);
      position: relative;

      display: grid;

      float: left;
      width: var(--width);

      height: 100%;

      opacity: 1;

      pointer-events: none;

      &.selected {
        picture {
          .trans(opacity);
        }
      }

      .picture-container {
        grid-column-start: 1;
        grid-column-end: 3;
        position: relative;
      }

      :deep(.lila-textblock) {
        grid-column-start: 1;
        grid-column-end: 2;

        .multi(padding, 4);

        @media @desktop {
          .multi(padding, 4, 8);
        }
      }

      :deep(.lila-figure) {
        overflow: hidden;
        min-height: 100px;

        max-height: 50vh;
        margin: 0;
        padding: 0;

        opacity: 0;

        &.picture {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;

          img {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 0;
            overflow: hidden;
            width: auto;
            min-width: 100%;
            height: auto;
            min-height: 100%;
            max-height: none;
            transform: translateX(-50%) translateY(-50%);
          }
        }

        &.placeholder {
          visibility: hidden;
        }

        &.active {
          opacity: 1;
        }
      }
    }
  }

  .gallery-controls {
    max-width: @moduleWidth_M;

    position: absolute;

    top: var(--top);

    display: grid;
    grid-template-columns: 50% 50%;

    width: 100%;
    transform: translateY(-50%);

    .lila-button {
      .trans(background);

      display: grid;

      width: 35px;
      height: 35px;

      background-color: @color1;
      opacity: 0.5;

      &.active {
        opacity: 1;
      }

      &:hover {
        background-color: @color3;
      }

      &:last-child {
        justify-self: end;
      }
    }
  }

  &.fullscreen {
    max-width: @moduleWidth_Full;
    .content-container, .gallery-controls {
      max-width: @moduleWidth_Full;
      width: @moduleWidth_Full;
    }
  }

  &.simpleIndicator {
    .indexIndicator {
      grid-row-start: 1;
      grid-row-end: 2;

      height: 80px;
      background-color: transparent;

      :deep(.lila-button) {
        background-color: @white;
      }
    }

    &:not(.hasElementDescription) {
      .content-container,
      .elements,
      .element {
        grid-template-columns: 1fr 120px;
        grid-template-rows: 1fr;

        @media @desktop {
          grid-template-columns: 1fr 185px;
          grid-template-rows: 1fr;
        }
      }
    }

    &:not(.fullscreenOverlay) {
      .elements {
        .element {
          .lila-textblock {
            grid-column-end: 3;
          }
        }
      }
    }

    &.fullscreenOverlay {

      &.hasElementDescription {
        .carousel-indicators {
          background-color: @white;
          grid-row-start: 2;
          grid-row-end: 3;
  
          grid-column-start: 2;
          grid-column-end: 3;
  
          width: 100%;
          height: 100%;
  
          align-self: start;
        }

       }

    }
  }


  &.fullscreenOverlay.fullscreenOverlayEnabled {
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

    .indexIndicator {
      @media @desktop {
        .multi(padding, 4, 8);
      }
        span {
          align-self: center;
        }
    }

    .gallery-controls {
      height: 40px;
    }

    .content-container {
      height: 100vh;
      grid-template-rows: calc(100% - 90px) 90px;
    }


    .content-container,
    .gallery-controls {
      max-width: 100%;
    }

    .elements {
      .element {
        grid-template-rows: 1fr;

        height: 100%;

        &.hasDescription {
          grid-template-rows: 1fr 90px;
        }

        .placeholder {
          display: none;
        }

        .picture-container {
          overflow: hidden;

          :deep(.lila-figure) {
            grid-template-rows: 100%;
            overflow: visible;
            min-height: auto;
            max-height: 100%;

            &.picture {
              position: relative;

              img {
                position: relative;
                top: unset;
                left: unset;
                align-self: center;
                justify-self: center;
                min-width: auto;
                max-width: 100%;
                min-height: auto;
                max-height: 100%;
                transform: none;
              }
            }
          }
        }
      }
    }

    .scroll-container {
      @media @desktop {
        height: 100%;
      }
    }
  }
  
}
</style>
