<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useInview } from '../../plugins/inview';
import type Link from '../../interfaces/link.interface';
import type Textblock from '../../interfaces/textblock.interface';
import type Video from '../../interfaces/video.interface'; 
import type Picture from '../../interfaces/picture.interface'; 
import dayjs from 'dayjs';
import type PicturegroupElement from '../../interfaces/PictureGroupElement.interface';
import type ModuleBaseProps from '../../interfaces/ModuleBaseProps.interface';
import type { TimelineElement } from '../../interfaces/TimelineElement.interface';


const props = defineProps<ModuleBaseProps &{
    elements?: TimelineElement[];
    // elements?: (PicturegroupElement | Video )[];
    // size?: string[];
    date?: string;
    textblock? : Textblock
}>();

const element = ref<HTMLElement>();
const elementsExtended = ref<(TimelineElement & {position: 'left' | 'right'})>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});
const mediaVariant = computed(() => {

    const variants = [];
    if (props.variant.includes('mediaLeft')) {
        variants.push('mediaLeft')
    }
    if (props.variant?.includes('mediaRightImage')) {
        // const size = props.size?.includes('medium') ? 'medium' : props.size?.includes('large') ? 'large' : '';
       
        // return ['mediaRight', size];
        variants.push('mediaRightImage')
    }
    if (props.variant?.includes('mediaRightVideo')) {
        
        variants.push('mediaRightVideo')
    }
    variants.push('noMedia');
}); console.log(mediaVariant)
// const mediaSize = computed(() => mediaVariant.value.includes('medium') ? 'medium' : mediaVariant.value.includes('large')? 'large' : '' );
// const mediaSize = computed(() => {
//     if(props.size?.includes('medium')) {
//         return 'medium'
//     } else if (props.variant?.includes('large')) {
//         return 'large'
//     } else {
//         return '' // this is my default value
//     }
// });
// const hasMedia = computed(() => props.variant !== undefined && props.variant.length > 0);
// const formattedDate = computed(() =>  {
//     if(props.date) {
//          const formattedYear =   dayjs(props.date).year();
//          const formattedDayMont = dayjs(props.date).locale('de').format('DD, MMMM').toUpperCase();
//          return {
//         year: formattedYear,
//         dayMonth: formattedDayMont
//         }
//     } else {
//         return {
//             year: '',
//             dayMonth: ''
//         };
//     }
   
// });
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

onBeforeMount(() =>  {

})

</script>
<template>
    <section  
    ref="element" 
    id="id"
    class="lila-timeline-parent-container lila-module"
    :class="[inviewState, variant]">
    
        <section class="content-container">
            <span class="date-container">
            <span v-if="date" class="year"> {{ formattedDate.year }}   </span>
            <br /> 
            <time v-if="date" class="dayMonth" > {{ formattedDate.dayMonth }}</time> 
            </span>
            
            <section class="media-container" >
            <!-- hier wird eine Liste von Elementen wie unter anderem Bilder, Videos oder Textblock übergeben, damit man mehrere Elemente untereinander gleichzeitig generieren kann  -->
                <template v-for="(element, index) in elements" :key="`timeline-element-${index}`">
                        <lila-picture-partial v-if="element.picture" :variant="mediaVariant" v-bind="element.picture"/>
                        <lila-video-partial v-if="element.video" :variant="mediaVariant" v-bind="element.video" class="video-container" />
                </template>
            </section>
            <div class="timeline-container"></div>
            <span class="text-container">
                <lila-textblock-partial :variant="mediaVariant" v-if="textblock" v-bind="textblock" />
            </span>
        </section>
    </section>
</template>
<style lang="less" scoped>

.lila-timeline-parent-container {
    .module; // zentriert alles 
    max-width: @moduleWidth_L;
    border: 2px solid red;

    .timeline-container {
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
    }
// falsch: 
    .date-container {
        display: grid;
        grid-template-rows: 80px auto;
        justify-self: end;
        padding: 0 40px;

        .font-head;
        line-height: @headline_XS;

        .year {
            font-size: 60px;
            line-height: 62px;
            justify-self: end;
            color: @color4;
        }
        .dayMonth {
            font-size: @headline_L;
            color: @color1;
            grid-row-start: 2;
        }
    }

    .content-container {
        display: grid;
        grid-template-columns: 424px auto 696px;
        gap: 50px 0;
    }

    &.mediaLeft {
        .content-container {
            .media-container {
                display: grid;
                gap: 20px;
                grid-column-start: 1;
                padding: 0 40px;
            }
            .text-container {
                grid-column-start: 3;
                padding: 0 40px;
            }
        }
    }

    &.mediaRightImage {
        .content-container {
            .date-container {
                grid-column-start: 3;
                justify-self: start;
                .year {
                    justify-self: start;
                }
            }
            .media-container {
                grid-row-start: 2;
                grid-column-start: 3;
                padding: 0 40px;
                gap: 50px 0;
                display: flex;
                flex-wrap: wrap;
            }
            .text-container {
                grid-row-start: 2;
                grid-column-start: 1;
                padding: 0 40px;
            }
        }
    }

    // &.mediaRightVideo {
    //     .content-container {
    //         .date-container {
    //             grid-column-start: 3;
    //             justify-self: start;
    //             .year {
    //                 justify-self: start;
    //             }
    //         }
    //         .media-container {
    //             grid-row-start: 2;
    //             grid-column-start: 3;
    //             padding: 0 40px;
    //             gap: 50px 0;
    //         }
    //         .text-container {
    //             grid-row-start: 2;
    //             grid-column-start: 1;
    //             padding: 0 40px;
    //         }
    //     }
    // }

    &.noMedia {
        .content-container {
            .media-container {
                grid-column-start: 4;
                grid-row-start: 1;
            }
            .text-container {
                padding: 0 40px;
            }
        }
    }
}

</style>


