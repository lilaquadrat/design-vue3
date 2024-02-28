<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useInview } from '../../plugins/inview';
import dayjs from 'dayjs';
import type ModuleBaseProps from '../../interfaces/ModuleBaseProps.interface';
import type { TimelineElement } from '../../interfaces/TimelineElement.interface';

defineOptions({ inheritAttrs: false });

const props = defineProps<
  ModuleBaseProps & {
    elements: TimelineElement[];
    date: string;
  }
>();

const element = ref<HTMLElement>();
const elementsExtended = ref<(TimelineElement & { position: 'left' | 'right' })[]>([]);
const active = ref<number>(0);
const mediaContainer = ref<HTMLElement>();
const textContainer = ref<HTMLElement>();
const timeContainer = ref<HTMLElement>();
const isVisible =ref<Boolean>()
const { inviewState } = useInview(element, { align: props.variant?.includes('align') });
const emit = defineEmits<{(e: string, event?: Event): void}>();
onBeforeMount(() => {
  if (props.elements) {
    setElements(props.elements);
  }
});
onBeforeMount(():void =>  disableScroll())

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

  });

  elementsExtended.value = positionedItem;
}

// function disableScroll() {
//   if(!isVisible) return;
//   if(isVisible && window.innerWidth < 650) {
//     let hiddenBody = document.body.style.overflowX = 'hidden';
//     hiddenBody = document.body.style.overflowX = 'clip'
//     document.body.classList.add("disableScroll");
//   }
  
// }
function disableScroll() {
  if(!isVisible) return;
  if(isVisible) {
    document.documentElement.style.overflowX = 'hidden'
    return 
  }
  document.documentElement.style.overflowX = 'visible'
}

function activeText(event: Event,  index: number) {
  active.value = index

  if(!element.value || !textContainer.value || !timeContainer.value) return
  if(textContainer.value || timeContainer.value) {
      textContainer.value.className = 'active';
      timeContainer.value.className = 'active';
      element.value.style.transform = 'translateX(-60%)'
  } 
  console.log('was clicked')
  emit('click')
}

function activeMedia(event: Event,  index: number) {
  active.value = index
  if(!element.value || !mediaContainer.value) return
  if(mediaContainer.value) {
      mediaContainer.value.className = 'active';
      element.value.style.transform = 'translateX(0%)'
  } 
  console.log('was clicked')
  emit('click')
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
  <section ref="element" :id="id" class="lila-timeline-module lila-module" :class="[inviewState, variant]">
    <section class="elements-container">
      <section class="singleElement-container" v-for="(element, index) in elementsExtended" :class="[element.position, {noMedia: !element.media}]" :key="`timeline-withpositions${index}`">
        <section ref="timeContainer" class="time-container" @click="activeText($event, index)">
          <time v-if="date" class="year">{{ formattedDate.year }}</time>
          <time v-if="date" class="dayMonth">{{ formattedDate.dayMonth }}</time>
        </section>

        <section class="timeline-container"></section>

        <section ref="mediaContainer" v-if="element.media" class="media-container" @click="activeMedia($event, index)">
            <template v-for="(item, mediaIndex) in element.media" :key="`media-element-${mediaIndex}`">
              <lila-picture-partial v-if="item.type === 'picture'" v-bind="item" />
              <lila-video-partial v-if="item.type === 'video'" v-bind="item" />
            </template>
        </section>

        <section ref="textContainer" v-if="element" class="text-container" @click="activeText($event, index)">
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
  .module; // zentriert alles
  // max-width: @moduleWidth_L;
  transition: @aType @aTimeMedium;

  .elements-container {
    display: grid;

    .singleElement-container {

        display: grid;
        grid-template-columns: 80% 5px 90%;
        grid-template-rows:35px max-content max-content 35px;
        // 424px minmax(auto, 1fr) minmax(auto, 1fr);
        gap: 25px 0;
        width: 100%;
        
        
        @media @desktop {
        
        max-width:@desktopWidthWide;
        grid-template-columns: 2fr 8px 4fr;
         grid-template-rows: 20px max-content max-content 20px;
        // 424px minmax(auto, 1fr) minmax(auto, 1fr);
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
            padding: 0 20px;
            gap:25px 0;
            display: grid;
            grid-column-start: 1;
            grid-row-start: 3;
            grid-row-end: 4;
            grid-auto-rows: min-content;
            height: min-content;
            position: sticky;
            top: 10px;
           
    

            :deep(.lila-figure) {
              grid-template-columns: auto;
                // justify-content: right;
            }
            @media @desktop {
              gap: 40px 0;
              padding: 0 40px;
              :deep(.lila-figure) {
                
                justify-content: left;
            }
            }

        }
        .text-container {
            padding: 0 20px;
            grid-row-start: 3;
            grid-row-end: 5;

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
            grid-row-end: 5;
            grid-column-start: 2;

            position: relative;

            background-color: @color4;

        }

        &.noMedia {
          .time-container,
          .text-container {
            grid-column-start: 3;
          }
          .time-container {
            justify-items: start;
            justify-self: start;
          }
            @media @desktop {
              .time-container {
                grid-column-start: 1;
                justify-items: end;
                justify-self: end;
                padding: 0 40px
              }

              .text-container {
                  grid-column-start: 3;
                  grid-row-start: 2;
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
}
</style>
