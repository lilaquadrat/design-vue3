<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useInview } from '../../plugins/inview';
import dayjs from 'dayjs';
import type ModuleBaseProps from '../../interfaces/ModuleBaseProps.interface';
import type { TimelineElement } from '../../interfaces/TimelineElement.interface';

defineOptions({ inheritAttrs: false }); 

const props = defineProps<ModuleBaseProps & {
    elements: TimelineElement[];
    date: string;
  }>();
const active = ref<boolean>(false);
const element = ref<HTMLElement>();
const elementsExtended = ref<(TimelineElement & { position: 'left' | 'right' })[]>([]);
const { inviewState } = useInview(element, { align: props.variant?.includes('align') });
const date = computed(() => ({
  year    : props.date ? dayjs(props.date).year() : '',
  dayMonth: props.date ? dayjs(props.date).locale('de').format('DD, MMMM').toUpperCase() : ''
}));
const emit = defineEmits<{(e: string, event?: Event): void}>();

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

      if (lastElementPosition === 'left') position = 'right';

    }

    if (!item.media?.length) {
      lastElementPosition = 'noMedia';

    }

    positionedItem.push({
      ...item,
      position,
    });
    lastElementPosition = position;
  });

  elementsExtended.value = positionedItem;
}

function activated (): void {
  active.value = true;

  emit('click');

}

function activeMedia () {

  active.value = false;
  
  emit('click');
}

</script>

<template>
  <section ref="element" :id="props.index?.anchor || props.id" class="lila-timeline-module lila-module" :class="[inviewState, variant, { active: active }]">
    <section class="elements-container">  
      <section class="singleelement-container" v-for="(element, index) in elementsExtended"
        :class="[element.position, { noMedia: !element.media }]" :key="`timeline-withpositions${index}`">
        <section ref="timeContainer" class="time-container" @click="activeMedia">
          <time v-if="date" class="year">{{ date.year }}</time>
          <time v-if="date" class="dayMonth">{{ date.dayMonth }}</time>
        </section>

        <section class="timeline-container"></section>

        <section ref="mediaContainer" v-if="element.media" class="media-container" @click="activated()">
          <template v-for="(item, mediaIndex) in element.media" :key="`media-element-${mediaIndex}`">
            <lila-picture-partial v-if="item.type === 'picture'" v-bind="item" />
            <lila-video-partial v-if="item.type === 'video'" v-bind="item" />
          </template>
        </section>

        <section ref="textContainer" v-if="element" class="text-container" @click="activeMedia">
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
    .module;
    padding-right: 20px;
    transform: translate(-70%);
    .trans(transform);
    
    @media @desktop {
      transform: translate(0%);
      max-width: @desktopWidthWide;
    }
    
    .elements-container {
      display: grid;

      .singleelement-container {
        display: grid;
        grid-template-columns: 90% 5px 90%;
        grid-template-rows: 60px auto auto;

        @media @desktop {
          display: grid;
          grid-template-columns: 2fr 8px 4fr;
          grid-template-rows: 140px auto auto;
        }

        .timeline-container {
          background-color: @color4;
          grid-column-start: 2;
          grid-row: 1/5;
          width: 5px;

          @media @desktop {
            width: 8px;
          }
        }
       
        .time-container {
          display: grid; 
          grid-column-start: 3;
          grid-row-start: 2;
          padding-left: 20px; 
          text-align: left;
          padding-bottom: 25px;
        
          .year {
            .font-head; 
            color: @color4;
            font-size: 44px;
            line-height: 46px;
          }

          .dayMonth {
            .font-bold; 
            color: @color5;
            font-size: 25px;
            line-height: 27px;
          }

          @media @desktop {
            grid-column-start: 1;
            grid-row-start: 2;
            padding-right: 40px;
            text-align: right;
             
            .year,
            .dayMonth {
              .font-head; 
            }

            .year { 
              font-size: 60px;
              line-height: 62px;
            }

            .dayMonth { 
              font-size: @headline_L;
              line-height: @headlineLineHeight_L;
            }
          }
        }

        .media-container {
          grid-column-start: 1;
          grid-row: 3/3;
          padding: 0 20px;
          position: sticky;
          top: 20px;
          padding-left: 0;

          :deep(.lila-figure) {
            justify-content: left;
          }
          
          @media @desktop {
            padding: 0 40px;
            grid-row: 3/5;

            :deep(.lila-figure) {
              padding-bottom: 27px;
            }
          }
        }

        .text-container {
          grid-column-start: 3;
          grid-row-start: 3;
          grid-row-end: 5;
          padding:0 20px;

          :deep(.lila-textblock) {
            h1 {
              font-size: 25px;
              line-height: 27px;
              .font-bold;   
            }

            h2 {
              font-size: @headline_S;
              line-height: @headlineLineHeight_S;
            }

            h3, p {
              line-height: @headline_S;
            }
          }

          @media @desktop {
            padding: 0 40px;

            :deep(.lila-textblock) {
              h1 {
                .font-head;
                font-size: @headline_L;
                line-height: @headlineLineHeight_L;
              }

              h2 {
                font-size: 25px;
                line-height: 27px;
              }

              h3, p {
                font-size: @headline_XS;
                line-height: @headline_S;
              }
            }
          }
        }

        &.right {
          .time-container {
            text-align: left;
          }

          @media @desktop {
            .media-container,
            .time-container {
              grid-column-start: 3;
              text-align: left;
              padding: 0 40px;
              padding-bottom: 50px; 
              padding-right: 40px;
            }

            .text-container {
              grid-column-start: 1;
            }
          }
        }

        &.noMedia {
          .time-container {
            grid-column-start: 3;
            text-align: left;
            padding-left: 20px; 
          }

          @media @desktop {
            .time-container {
              grid-column-start: 1;
              grid-row-start: 2;
              text-align: right;
              padding-right: 40px;
            }

            .text-container {
              grid-row-start: 2;
            }
          }
        }
      }
      .singleelement-container:first-child {
        .timeline-container {
          border-top-left-radius: 99px;
          border-top-right-radius: 99px;
        }
      }
      .singleelement-container:last-child {
        .timeline-container {
          border-bottom-left-radius: 99px;
          border-bottom-right-radius: 99px;
        }
      }
    }
  }

  &.active {
    transform: translate(0%);
  }
</style>
