<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useInview } from '../../plugins/inview';
import dayjs from 'dayjs';
import type ModuleBaseProps from '../../interfaces/ModuleBaseProps.interface';
import type { TimelineElement } from '../../interfaces/TimelineElement.interface';

defineOptions({ inheritAttrs: false }); //

const props = defineProps<
  ModuleBaseProps & {
    elements: TimelineElement[];
    date: string;
  }
>();
const element = ref<HTMLElement>();
const elementsExtended = ref<(TimelineElement & { position: 'left' | 'right' })[]>([]);
onBeforeMount(() => {
  console.log('onBeforeMount:', props.elements);

  if (props.elements) {
    setElements(props.elements);
    // console.log('onBeforeMount:', elementsExtended)
  }
});
function setElements (elements: TimelineElement[]) {
  const positionedItem: any[] = [];
  let lastElementPosition: string;

  elements.map((item, index: number) => {

    let position: string = 'left';

    if (index > 0 && item.media?.length) {

      console.log(lastElementPosition);
      if(lastElementPosition === 'left') position = 'right';

    }

    if(!item.media?.length) {

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

</script>
<template>
  <section ref="element" :id="id" class="lila-timeline-module lila-module" :class="[inviewState, variant]">
    <section class="elements-container">
      <!-- Hier wird eine Liste von Elementen wie Bilder, Videos oder Textblöcke übergeben, damit mehrere Elemente untereinander gleichzeitig generiert werden können -->
      <!-- Jedes Element erhält seine Position aus setElements -->

      <section class="singleElement-container" v-for="(element, index) in elementsExtended" :class="[element.position, {noMedia: !element.media}]" :key="`timeline-withpositions${index}`">
        <section class="time-container">
          <time v-if="date" class="year">{{ formattedDate.year }}</time>
          <time v-if="date" class="dayMonth">{{ formattedDate.dayMonth }}</time>
        </section>
        <section class="timeline-container"></section>
        <section v-if="element.media" class="media-container">
            <template v-for="(item, mediaIndex) in element.media" :key="`media-element-${mediaIndex}`">
              <lila-picture-partial v-if="item.type === 'picture'" v-bind="item" />
              <lila-video-partial v-if="item.type === 'video'" v-bind="item" />
              <!-- <lila-quote-partial v-if="item.type === 'quote'" v-bind="item" /> -->
            </template>
        </section>
        <section v-if="element" class="text-container">
            <lila-textblock-partial v-if="element.textblock" v-bind="element.textblock" />
            <lila-quote-partial v-if="element.quote" v-bind="element.quote" />
        </section>
      </section>
    </section>
  </section>
</template>

<style lang="less" scoped>
.lila-timeline-module {
  .module; // zentriert alles
  max-width: @moduleWidth_L;

  .elements-container {
    display: grid;

    .singleElement-container {

        display: grid;
        grid-template-columns: 2fr 8px 4fr;
        grid-template-rows: max-content max-content;
        // 424px minmax(auto, 1fr) minmax(auto, 1fr);
        gap: 50px 0;

        .time-container {
            display: grid;
            justify-self: end;
            justify-items: end;
            .font-head;
            padding:0 40px;

            grid-template-rows: max-content max-content;
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
        }

        .media-container {
            display: grid;
          
            gap: 27px 0 ;
            padding:0 40px;

            grid-column-start: 1;

            grid-row-start: 3;
            grid-row-end: 4;

            grid-auto-rows: max-content;

            :deep(.lila-figure) {
                grid-template-columns: auto;
                justify-content: left;
                
            }

        }
        .text-container {
            grid-row-start: 3;
            grid-row-end: 4;
            padding:0 40px;
        }

        .timeline-container {

            grid-row: 1/5;
            grid-column-start: 2;
            
            position: relative;
            background-color: @color4;

            &::after,
            &::before {
                content: '';
                position: absolute;
                width: 8px;
                background: @color4;
                border-radius: 99px;
                
            }
            &::after {
                top: 0;
                bottom: -1px;
            }
            &::before {
                top: -1px;
                bottom: 0;
            }
        }

        &.right {
            .text-container {
                grid-column-start: 1;
               
            }

            .media-container, .time-container  {
                grid-column-start: 3;
                
            }
            .time-container {
                justify-self: start;
                justify-items: start;
               
            }
        }
        &.noMedia {

          grid-template-rows: 50px 1fr 50px;

          .text-container {
              grid-column-start: 3;
              grid-row-start: 2;
          }

          .timeline-container {
              grid-column-start: 2;
              grid-row-start: 1;
          }

          .media-container {
            border: red 2px solid;
          }

        }

    }

  }

}
</style>
