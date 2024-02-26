<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useInview } from '@/plugins/inview';
import dayjs from 'dayjs';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import type { TimelineElement } from '@/interfaces/TimelineElement.interface';

defineOptions({ inheritAttrs: false });

const props = defineProps<
  ModuleBaseProps & {
    elements: TimelineElement[];
    date: string;
  }
>();
const element = ref<HTMLElement>();
const elementsExtended = ref<(TimelineElement & { position: 'left' | 'right' })[]>([]);
const active = ref<boolean>(false);
const emit = defineEmits<{ (e: string, event?: Event): void }>();

onBeforeMount(() => {

  if (props.elements) {

    setElements(props.elements);

  }
});

function setElements (elements: TimelineElement[]) {
  const positionedItem: any[] = [];
  let lastElementPosition: string;

  elements.map((item, index: number) => {
    let position: string = 'left';

    if (index > 0 && item.media?.length) {
      if (lastElementPosition === 'left') {
        position = 'right';
      } else if (index > 0 && !item.media?.length && lastElementPosition === 'left') {
        position = 'noMedia';
      }
    }

    if (!item.media?.length) {
      lastElementPosition = 'noMedia';
    } else {
      lastElementPosition = position;
    }

    positionedItem.push({
      ...item,
      position,
    });

    lastElementPosition = position;
  });

  elementsExtended.value = positionedItem;
}

const { inviewState } = useInview(element, { align: props.variant?.includes('align') });
const formattedDate = computed(() => {
  // null als spezielle Art
  const date = props.date ? dayjs(props.date) : null;

  return {
    year    : date ? date.year() : '',
    dayMonth: date ? date.locale('de').format('DD, MMMM').toUpperCase() : '',
  };
});

function activeMedia (event: Event) {

  const mediaContainer = document.querySelector('.lila-figure') as HTMLElement;
  const parentContainer = document.querySelector('.lila-timeline-module') as HTMLElement;
  const mediaActive: boolean = false;

  if (mediaActive) active.value = true;

  if(mediaContainer) {    

    mediaContainer.classList.add('.active');
    parentContainer.style.transform = 'translateX(0%)';

  }

  emit('click', event);
}

function activeNonMedia (event: Event) {

  const mediaContainer = document.querySelector('.lila-figure') as HTMLElement;
  const parentContainer = document.querySelector('.lila-timeline-module') as HTMLElement;
  const timeContainer = document.querySelector('.time-container') as HTMLElement;
  const textContainer = document.querySelector('.text-container') as HTMLElement;
  const medianonActive: boolean = true;

  if (medianonActive) active.value = false;

  if (timeContainer || textContainer) {
    mediaContainer.classList.remove('.active');
    timeContainer.classList.add('.active');
    textContainer.classList.add('.active');
    parentContainer.style.transform = 'translateX(-70%)';
  }

  emit('click', event);
}
</script>
<template>
  <section ref="element" :id="id" class="lila-timeline-module lila-module" :class="[inviewState, variant]">
    <section class="elements-container">
      <section class="singleElement-container" v-for="(element, index) in elementsExtended" :class="[element.position, { noMedia: !element.media }]" :key="`timeline-withpositions${index}`">
        <section class="time-container" @click="activeNonMedia">
          <time v-if="date" class="year">{{ formattedDate.year }}</time>
          <time v-if="date" class="dayMonth">{{ formattedDate.dayMonth }}</time>
        </section>
        <section class="timeline-container"></section>
        <section v-if="element.media" class="media-container" @click="activeMedia">
          <template v-for="(item, mediaIndex) in element.media" :key="`media-element-${mediaIndex}`">
            <lila-picture-partial v-if="item.type === 'picture'" v-bind="item" />
            <lila-video-partial v-if="item.type === 'video'" v-bind="item" />
            <!-- <lila-quote-partial v-if="item.type === 'quote'" v-bind="item" /> -->
          </template>
        </section>
        <section v-if="element" class="text-container" @click="activeNonMedia">
          <lila-textblock-partial v-if="element.textblock" v-bind="element.textblock" />
          <lila-quote-partial v-if="element.quote" v-bind="element.quote" />
          <lila-list-partial v-if="element.list" v-bind="element.list" />
          <lila-list-partial v-if="element.links" v-bind="element.links" />
        </section>
      </section>
    </section>
  </section>
</template>

<style lang="less" scoped>
.lila-timeline-module {
  .module; // zentriert alles
  max-width: @moduleWidth_L;

  @media @smartphone {
    // padding: 0;
    // transition: 0.95s ease 0.2s;
    // transition-delay: 0.15s;
    .trans(transform)
  }

  .elements-container {
    display: grid;

    @media @smartphone {
      width: 170dvw;
    }

    .singleElement-container {
      display: grid;
      grid-template-columns: 2fr 8px 4fr;
      // grid-template-rows: 75px max-content max-content 75px;
      grid-template-rows: 25px max-content max-content 25px;
      // 424px minmax(auto, 1fr) minmax(auto, 1fr);
      gap: 50px 0;

      @media @smartphone {
        grid-template-columns: 1fr 5px 1fr;
        grid-template-rows: max-content max-content;
        gap: 25px 0;
      }
      .time-container {
        .font-head;
        display: grid;
        grid-template-rows: max-content max-content;
        justify-self: end;
        justify-items: end;
        padding: 0 40px;
        gap: 5px;
        grid-row-start: 2;
        grid-row-end: 3;
        .year {
          font-size: 60px;
          line-height: 62px;
          color: @color4;
        }
        .dayMonth {
          font-size: @headline_L;
          color: @color1;
          grid-row-start: 2;
        }

        @media @smartphone {
          grid-column-start: 3;
          justify-self: start;
          justify-items: start;
          padding: 0 20px;
          gap: 0;
          height: 100%;
          .year {
            font-size: @headline_XL;
          }
          .dayMonth {
            .font-bold;
            font-size: 25px;
          }
        }
      }
      .media-container {
        display: grid;
        gap: 27px 0;
        padding: 0 40px;
        grid-column-start: 1;
        grid-row-start: 3;
        grid-row-end: 4;
        grid-auto-rows: max-content;

        :deep(.lila-figure) {
          grid-template-columns: auto;
          justify-content: left;

          @media @smartphone {
            justify-content: right;
          }
        }

        @media @smartphone {
          padding: 0 20px;
          position: sticky;
          top: 1rem;
        }
      }

      .text-container {
        grid-row-start: 3;
        grid-row-end: 5;
        padding: 0 40px;
        align-items: start;

        @media @smartphone {
          padding: 0 25px;

          :deep(.lila-textblock) {
            h1 {
              font-size: 25px;
              line-height: 27px;
              .font-bold;
            }

            h2 {
              font-size: 22px;
            }

            h3 {
              .font-bold;
              font-size: @fontText;
              color: @textColor;
            }
            h2 + h3 {
              .multi(margin-top, 0);
            }
          }
        }
      }

      .timeline-container {
        grid-column-start: 2;
        grid-row: 1/5;
        position: relative;
        background-color: @color4;

        // &::after,
        // &::before {
        //   content: '';
        //   position: absolute;
        //   width: 8px;
        //   border-radius: 99px;

        //   @media @smartphone {
        //     width: 5px;
        //   }
        // }
        // &::after {
        //   top: 0;
        //   bottom: -5px;
        // }
        // &::before {
        //   top: -5px;
        //   bottom: 0;
        // }
      }

      &.right {
        .text-container {
          grid-column-start: 1;
        }

        .media-container,
        .time-container {
          grid-column-start: 3;
        }
        .time-container {
          justify-self: start;
          justify-items: start;
        }
        @media @smartphone {
          .text-container {
            grid-column-start: 3;
          }
          .media-container {
            grid-column-start: 1;
          }
        }
      }
      &.noMedia {
        // grid-template-rows: 50px 1fr 50px;
        .text-container {
          grid-column-start: 3;
          grid-row-start: 2;
        }

        // .timeline-container {
        //     // grid-column-start: 2;
        //     // grid-row-start: 1;
        // }
        @media @smartphone {
          .text-container {
            grid-column-start: 3;
            grid-row-start: 3;
          }
          .timeline-container {
            grid-column-start: 3;
            grid-row-start: 1;
            width: 5px;
          }
          .time-container {
            padding: 0 25px;
          }
        }
      }
    }
  }
}
</style>
