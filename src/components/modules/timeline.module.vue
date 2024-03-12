<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useInview } from '../../plugins/inview';
import dayjs from 'dayjs';
import type ModuleBaseProps from '../../interfaces/ModuleBaseProps.interface';
import type { TimelineElement } from '../../interfaces/TimelineElement.interface';

defineOptions({ inheritAttrs: false }); // atri

const props = defineProps<ModuleBaseProps & {
    elements: TimelineElement[];
    date: string;
    disabled?: boolean;

  }>();
const active = ref<boolean>(false)
const element = ref<HTMLElement>();
const elementsExtended = ref<(TimelineElement & { position: 'left' | 'right' })[]>([]);
const mediaContainer = ref<HTMLElement>();
const textContainer = ref<HTMLElement>();
const timeContainer = ref<HTMLElement>();
const { inviewState } = useInview(element, { align: props.variant?.includes('align') });
// const emit = defineEmits<{(e: string, event?: Event): void}>();
const emit = defineEmits(['click']);
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
      active: false
    });
    lastElementPosition = position;
  });

  elementsExtended.value = positionedItem;
}


function activeText(event:Event): void {
  active.value = true
 
  emit('click', event.target)
}

function activeMedia (event:Event, element: TimelineElement) {
  const target = element.media

  if(!target){
    active.value = false
  } else if(target) {
    console.log(target)
    active.value = false
  }
  
  emit('click', event.target)
}

const formattedDate = computed(() => {
  const date = props.date ? dayjs(props.date) : null;

  return {
    year    : date ? date.year() : '',
    dayMonth: date ? date.locale('de').format('DD, MMMM').toUpperCase() : '',
  };
});

</script>
<template>
  <section ref="element" :id="id" class="lila-timeline-module lila-module" :class="[inviewState, variant, { active: active }]">
    <section   class="elements-container">
      <section  class="singleElement-container" v-for="(element, index) in elementsExtended" :class="[element.position, {noMedia: !element.media} ]" :key="`timeline-withpositions${index}`"> 
        <section ref="timeContainer" class="time-container" @click="activeMedia($event, element)">
          <time v-if="date" class="year">{{ formattedDate.year }}</time>
          <time v-if="date" class="dayMonth">{{ formattedDate.dayMonth }}</time>
        </section>

        <section class="timeline-container"></section>

        <section ref="mediaContainer" v-if="element.media" class="media-container" @click="activeText($event, element)" :active="active"> 
            <template v-for="(item, mediaIndex) in element.media" :key="`media-element-${mediaIndex}`">
              <lila-picture-partial v-if="item.type === 'picture'" v-bind="item" />
              <lila-video-partial v-if="item.type === 'video'" v-bind="item" />
            </template>
        </section>

        <section ref="textContainer" v-if="element" class="text-container" @click="activeMedia($event, element)">
            <lila-textblock-partial v-if="element.textblock" v-bind="element.textblock" />
            <lila-quote-partial v-if="element.quote" v-bind="element.quote" />
            <lila-list-partial  v-if="element.list" v-bind="element.list"/>
            <lila-list-partial v-if="element.links" v-bind="element.links" />
        </section>
      </section>
    </section>
  </section>
</template>

<style lang="less" scoped>

.lila-timeline-module {
  .module;
  display: grid;

  transition: @aType @aTimeMedium;
  transform: translate(-70%);// default, so dass man zuerst den Text sieht und nicht das Bild
   
  @media @desktop {
      transform: translate(0%);
    }
  .elements-container {
    display: grid;
    .singleElement-container {
        display: grid;
        grid-template-columns: 90% 5px 90%;
        grid-template-rows:35px min-content min-content 35px;
        
        gap: 25px 0;
        
        @media @desktop {
        display: grid;
        grid-template-columns: 2fr 8px 4fr;
        grid-template-rows:20px min-content min-content 20px;
        gap: 50px 0;
        }

        .time-container {
            display: grid;
            grid-template-rows: max-content max-content;
            padding: 0 20px;
            
            justify-self: start;
            justify-items: start;
            grid-column-start: 3;
            grid-row-start: 2;
            grid-row-end: 3;

            .year {
                .font-head;
                font-size: 44px;
                line-height: 46px;
                color: @color4;
            }
            .dayMonth {
                .font-bold;
                font-size: 25px;
                line-height: 27px;
                color: @color1;
                grid-row-start: 2;
            }
            @media @desktop {
              justify-self: end;
              justify-items: end;
              grid-column-start: 1;;
              grid-row-start: 2;
              grid-row-end: 3;
              padding: 0 40px;
              .year {
                font-size: 60px;
                line-height: 62px;
                
            }
              .dayMonth {
                .font-head;
                  font-size: @headline_L;
                  line-height: @headlineLineHeight_L;
              }
            }
        }

        .media-container {
            gap:25px 0;
            padding: 0 20px;
            display: grid;
            grid-column-start: 1;
            grid-row-start: 3;
            grid-row-end: 4;
            height: auto;
            grid-auto-rows: min-content;
            position: sticky;
            top: 20px;
            border: red 2px solid;
            @media @desktop {
              gap: 40px 0;
              padding: 0 40px;
              position: inherit;
              :deep(.lila-figure) {
                justify-content: left;
            }
            }

        }
        
        .text-container {
            grid-row-start: 3;
            grid-row-end: 6;
            grid-column-start: 3;
            padding: 0 20px;

            :deep(.lila-textblock){
                
                h1 {
                  font-size: 25px;
                  line-height: 27px;
                  .font-bold;
                }
                h2 {
                  font-size: @headline_S;
                  line-height: @headlineLineHeight_S;
                }
                h3 {
                  color: @textColor;
                  .font-bold;
                }
                h3,p {
                  line-height:20px;
                }
            }
            @media @desktop {
              padding: 0 40px;
              grid-row-start: 3;
              grid-row-end: 4;
              .font-head;
              :deep(.lila-textblock){
                
                h1 {
                  font-size: @headline_L;
                  line-height: @headlineLineHeight_L;
                  .font-head;
                }
                h2 {
                  font-size: 25px;
                  line-height: 27px
                }
                h3 {
                  .font-bold;
                  line-height: @headlineLineHeight_S;
                }
  
                p, h3 {
                  font-size: 16px;
                  color: @textColor;
                }
              }
            }
        }

        .timeline-container {
          grid-row-start: 1;
          grid-row-end: 6;
          grid-column-start: 2;
          position: relative;
          background-color: @color4;
          }

        &.noMedia {
          gap: 0;
          //grid-template-rows:auto;
          .time-container,
          .text-container {
            grid-column-start: 3;
           
          }
          .time-container {
            justify-items: start;
            justify-self: start;
          }
            @media @desktop {
            grid-template-rows: 70px auto 70px;
            
              .time-container {
                grid-column-start: 1;
                justify-items: end;
                justify-self: end;
               
                padding: 0 40px
              }

              .text-container {
                  grid-column-start: 3;
                  grid-row-start: 2;
                  grid-row-end: 3;
                  padding: 0 40px
              }

              .timeline-container {
                  grid-column-start: 2;
                  grid-row-start: 1;
              }
           }
        }

        &.right {
          
            @media @desktop {
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
       }
    }
 
   }
  
    &.active {
      transform: translate(0%)
    }
   
}

</style>
