<script setup lang="ts">
import type LinkListWithTitle from '@/interfaces/LinkListWithTitle.interface';
import type ListWithTitle from '@/interfaces/ListWithTitle.interface';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import { useInview } from '@/plugins/inview';
import { computed, onBeforeMount, ref, watch } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  headline?: string
  subline?: string
  intro?: string
  text?: string[]
  links?: LinkListWithTitle
  list?: ListWithTitle
  media?: any
  elements: any[]
  timer: number
  repeat: boolean
}>();
const element = ref<HTMLElement>();
const activeElement = ref();
const activeIndex = ref<number>(0);
const percentStyle = ref<{'--timerPercent': string}>({'--timerPercent': '0%'});
const timerId = ref<number>(0);
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});
const isLast = computed(() => activeIndex.value === props.elements.length - 1);
let timerStart: number = 0;
let elapsedTime: number = 0;

onBeforeMount(() => start());
watch(activeIndex, () => {

  console.log('active element', activeIndex.value);
  setActiveElement();
  startTimer();

});

function start () {

  setActiveElement();
  startTimer();

}

function control (direction: 'prev' | 'next') {

  stopTimer();
  elapsedTime = 0;

  console.log('control', direction, activeIndex.value);

  const lengthIndexCorrected = props.elements.length - 1;
  let tempIndex = activeIndex.value;

  if(direction === 'next') {

    tempIndex++;
    
  } else {
    
    tempIndex--;

  }

  if(tempIndex > lengthIndexCorrected && props.repeat) {

    activeIndex.value = 0;
    return;

  }

  if(tempIndex > lengthIndexCorrected) {

    return;

  }

  if(tempIndex < 0) {

    tempIndex = 0;

    // if prev is hit when already on the first element, reset all and start the time
    elapsedTime = 0;
    percentStyle.value = {'--timerPercent': '0%'};

    if(activeIndex.value === 0) {
      startTimer();
    }

    return;

  }

  activeIndex.value = tempIndex;

}

function playPause () {

  if(timerId.value > 0) {

    console.log(elapsedTime);
    stopTimer();

  } else {

    startTimer(elapsedTime);

  }

}

function setActiveElement () {

  activeElement.value = props.elements[activeIndex.value];

}

function startTimer (startTime?: number) {

  timerStart = performance.now();

  if(startTime) {
    timerStart = timerStart - startTime;
  }

  timerId.value = requestAnimationFrame(tickTimer);

}

function stopTimer () {

  cancelAnimationFrame(timerId.value);
  timerId.value = 0;

}

function tickTimer () {

  const currenTime = performance.now() - timerStart;
  const timerMilliseconds = props.timer * 1000;

  elapsedTime = currenTime;

  percentStyle.value = {'--timerPercent': `${Math.floor(currenTime / timerMilliseconds * 100)}%`};

  if(timerMilliseconds >= currenTime) {

    timerId.value = requestAnimationFrame(tickTimer);

  } else {

    control('next');

  }

}

</script>
<template>
  <article :id="id" ref="element" class="lila-story-module lila-module fullscreen" :class="[inviewState, variant, {sub}]">
    <lila-picture-partial v-if="activeElement?.media && activeElement?.media.type === 'image'" v-bind="activeElement.media" class="background" fit />

    <section class="position-container">

        <div class="mobile-navigation left" @click="control('prev')" role="button"></div>
        <lila-button-partial @click="control('prev')" class="control" color-scheme="white"><lila-icons-partial color-scheme="colorScheme1" size="large" type="chevron-left"/></lila-button-partial>
        
        <section class="stories-container">
          <section class="indicator-container" :style="percentStyle">
            <section class="indicator" v-for="(story, index) in props.elements" :key="`story-${index}`" :class="{active: index === activeIndex, played: index < activeIndex, unplayed: index > activeIndex}">
              <div class="progress"></div>
            </section>
          </section>
          <section class="pause-container">
            <lila-button-partial class="pause" color-scheme="transparent" @click="playPause"><lila-icons-partial color-scheme="white" size="large" :type="timerId> 0 ? 'pause' : 'play'"/></lila-button-partial>
          </section>
          <lila-story-partial v-for="(story, index) in props.elements" :key="`story-${index}`" :active="index === activeIndex" v-bind="story" />
        </section>

        <div class="mobile-navigation right" @click="control('next')" role="button"></div>
        <lila-button-partial @click="control('next')" :disabled="isLast" class="control" color-scheme="white"><lila-icons-partial color-scheme="colorScheme1" size="large" type="chevron-right"/></lila-button-partial>

    </section>

  </article>
</template>

<style lang="less" scoped>
.lila-story-module {
  .module;
  .modulePadding('none');

  width: 100%;
  height: 100vh;

  @media print {
    margin: 20mm 0;
  }

  .position-container {
   
    display: grid;
    
    align-self: center;
    justify-self: center;

    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    @media @desktop {
      width: auto;
      height: auto;
      grid-template-columns: max-content @moduleWidth_S max-content;
    }

    gap: 50px;

    .mobile-navigation {
      position: absolute;
      height: 100vh;
      width: 45%;

      @media @desktop {
        display: none;
      }

      z-index: 2;
      &.right {
        justify-self: end;
      }

    }
    
    :deep(.lila-button.control) {
      display: none;

      @media @desktop {
        display: grid;
      }
      
      align-self: center;
      width: 50px;
      height: 50px;
      padding: 0;
      justify-content: center;
    }

    .stories-container {
      display: grid;
      position: relative;

      @media @desktop {
        aspect-ratio: 9 / 16;
        max-height: 100vh;
        width: 100%;
      }

      .lila-story {
        position: absolute;
        width: 100%;
        height: 100%;
  
        z-index: 0;
  
        &.active {
          z-index: 1;
        }
      }

      .pause-container, .indicator-container {
        z-index: 3;
        width: 95%;
        justify-self: center;
      }

      .pause-container {
        display: grid;
        position: absolute;
        top: 20px;

        justify-content: end;

      }

      .indicator-container {

        position: absolute;
        display: flex;
        flex-wrap: nowrap; /* Prevents the flex items from wrapping onto multiple lines */
        align-items: center; /* This will vertically center the items in the container (optional) */
        justify-content: space-around; 
        
        z-index: 2;
        height: 25px;
        gap: 5px;

        .indicator {
          flex: 1;
          width: 50px;
          height: 3px;
          background-color: @grey;
          opacity: .8;

          .progress {
            display: grid;
            height: 3px;
            background-color: @white;
          }
          
          &.active {
            .progress {
              width: var(--timerPercent);
            }
          }

          &.unplayed {
            .progress {
              display: none;
            }
          }

          &.played {
            .progress {
              width: 100%;
            }
          }
        }

      }

    }

  }

  .background {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    filter: blur(40px) saturate(80%);
    opacity: .8;

    display: none;
    @media @desktop {
      display: grid;
    }
  }
}
</style>