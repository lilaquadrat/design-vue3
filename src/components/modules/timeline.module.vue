<script setup lang="ts">
import { ref, computed, onBeforeMount, watch } from 'vue';
import { useInview } from '../../plugins/inview';
import type Link from '../../interfaces/link.interface';
import type Textblock from '../../interfaces/textblock.interface';
import type Video from '../../interfaces/video.interface'; 
import type Picture from '../../interfaces/picture.interface'; 
import dayjs from 'dayjs';
import type PicturegroupElement from '../../interfaces/PictureGroupElement.interface';
import type ModuleBaseProps from '../../interfaces/ModuleBaseProps.interface';
import type  { TimelineElement } from '../../interfaces/TimelineElement.interface';
import { hardCopy } from '@lilaquadrat/studio/lib/esm/frontend';



const props = defineProps<ModuleBaseProps &{
    elements: TimelineElement[];
    date: string;
}>();

const element = ref<HTMLElement>();
const elementsExtended = ref<(TimelineElement & { position: 'left' | 'right'})[]>([]);

// watch(() => props.elements, () => {

//     console.log('watch:',setElements(elementsExtended))
 
// });

onBeforeMount(() => {
    console.log('onBeforeMount:', props.elements)
    if(props.elements){
        setElements(props.elements)
    // console.log('onBeforeMount:', elementsExtended)
    }
})
function setElements(elements: TimelineElement[]) {
    const positionedItem: any[] = []

    elements.map((item, index: number) => {
        let position: string;
       if(index=== 0) {
            position = 'left'
       } else if (item.media.some((content)=> 
            content.type === 'quote')) {
            position = 'noMedia'
       } else {
        position = 'right' 
       }
        positionedItem.push({
            ...item,
            position
        })
    })
    elementsExtended.value= positionedItem
}

const { inviewState } = useInview(element, {align: props.variant?.includes('align')});

// kürzere Schreibweise des oberen Codes
// wenn props.date existiert, dann bitte damit erstellen
const formattedDate = computed(() => {
    // null als spezielle Art
  const date = props.date ? dayjs(props.date) : null; 
  return {
    year: date ? date.year() : '',
    dayMonth: date ? date.locale('de').format('DD, MMMM').toUpperCase() : ''
  };
});

 const picturegroupItems = computed(() => {

 })


</script>
<template>
    <section  
        ref="element" 
        :id="id"
        class="lila-timeline-parent-container lila-module"
        :class="[inviewState, variant]">
            
        <section class="elements-container">
            <!-- Hier wird eine Liste von Elementen wie Bilder, Videos oder Textblöcke übergeben, damit mehrere Elemente untereinander gleichzeitig generiert werden können -->
            <!-- Jedes Element erhält seine Position aus setElements -->
            
        <section class="singleElement-container" v-for="(element, index) in elementsExtended" :key="`timeline-withpositions${index}`" > 
                <section class="time-container">
                    <time v-if="date" class="year"> {{ formattedDate.year }}   </time>
                    <time v-if="date" class="dayMonth" > {{ formattedDate.dayMonth }}</time> 
                </section>
                <section class="timeline-container"></section> 
                <section class="media-container">
                   <template v-if="element.media"> 
                    <template v-for="(item, index) in element.media" :key="`picturepartial${index}`"> 
                        <lila-picture-partial v-if="item.type === 'picture'" v-bind="item" />
                        <lila-video-partial v-if="item.type === 'video'" v-bind="item"/> 
                        <lila-quote-partial v-if="item.type === 'quote'" v-bind="item" /> 
                    </template>
                   </template>
                </section>
                <section class="text-container"> 
                        <template v-if=element>
                            <lila-textblock-partial  v-if="element.textblock" v-bind="element.textblock"/>
                            <!-- <lila-quote-partial v-if="element.quote" v-bind="element.quote" /> {{ element }} -->
                        </template>
                </section>
        </section>
        
    </section>       
    </section>
</template>

<style lang="less" scoped>
.lila-timeline-parent-container {
    .module; // zentriert alles 
    max-width: @moduleWidth_L;

    .time-container {
        display: grid;
        justify-self: end;
        padding: 0 40px;
        .font-head;
        .year {
            font-size: 60px;
            line-height: 62px;
            justify-self: end;
            color: @color4;
        }
        .dayMonth {
            font-size: @headline_L;
            // line-height: @headline_XS;
            color: @color1;
            grid-row-start: 2;
        }
    }
    .timeline-container {
        grid-row-start: 2;
        position: relative;

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
            bottom: -80px;
        }
        &::before {
            top: -250px;
            bottom: 0;
        }
        @media @tablet {
            width: 5px; 
        }
    }
   
    
   .singleElement-container,
   &.noMedia {
  
    display: grid;
    grid-template-columns: 424px auto 696px;
    // 424px minmax(auto, 1fr) minmax(auto, 1fr);
    gap: 50px 0;

        .media-container,
        .picture-container {
         display: flex;
         flex-wrap: wrap; 
         gap: 27px 0;  
        grid-column-start: 1;
        grid-row-start: 2;
        padding: 0 40px
        }
        .text-container {
        grid-row-start: 2;
        padding: 0 40px
        }    
    
    }
    
    &.right {
        .singleElement-container {
            .time-container {
            grid-column-start: 3;
            justify-self: start;
            .year {
                justify-self: start
            }
        }
        
        .media-container,
        .picture-container {
                grid-column-start: 3;
            }
        }
        .text-container {
            grid-row-start: 2;
            grid-column-start: 1;
        } 
        &.noMedia {
            .time-container {
                grid-column-start: 1;
                justify-self:end;
                 .year  {
                    justify-self:end;
                 }
            }
        }  
    }
}
</style>


