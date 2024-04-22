<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import type ModuleBaseProps from '../../interfaces/ModuleBaseProps.interface';
import { useInview } from '../../plugins/inview';
// import content from '@/views/viewData';
import type Textblock from '../../interfaces/textblock.interface';
import type Video from '../../interfaces/video.interface';
import type Link from '../../interfaces/link.interface';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
    headline?: string
  subline?: string
  intro?: string
  text?: string[]
    // /textblock: Textblock;
    details: Textblock;
    video: Video;
    link: Link
}>();

onBeforeMount(() => {

 
})

const element = ref<HTMLElement>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});
const hasLink = computed(() => !!props.link?.link);
const bottomDetails = computed(() => ({
  intro: props.details?.intro, 
  text : props.details?.text
}));
const topDetails = computed(() => ({
  headline: props.details?.headline
}));
const linkedEvent = computed (() => ({
  subline: props.details?.subline
}));


</script>
<template>
   <section :id="id" ref="element" class="lila-singleevent-module lila-module" :class="[inviewState, variant]">
    <section class="elements-container">  
            <section class="video-container">
            <lila-video-partial v-if="video" v-bind="video" />
            <div class=" infoBox">
                <lila-textblock-partial class="top" v-if="props.details" v-bind="topDetails"/>
                <lila-link-partial class="link" v-bind="link" v-if="hasLink" >
                    <lila-textblock-partial v-bind="linkedEvent" />
                </lila-link-partial>
                <lila-textblock-partial class="bottom" v-bind="bottomDetails" />
            </div>
            </section>
        
           <section class="text-container">
            <lila-textblock-partial  v-bind="props" :variant="variant" /> 
           </section>

        </section>  
   </section> 
</template>

<style lang="less" scoped>
.lila-singleevent-module {
    max-width: @moduleWidth_XS;
    // -webkit-font-smoothing: antialiased;
    // font-synthesis: none;
    //  text-rendering: optimizeLegibility;
    
    @media @desktop{
        max-width: @desktopWidthWide;
        display: block;
        margin: 0 auto; 
    }
    .elements-container {
        display: grid;
        padding: 20px 24px 20px 29px; 
        gap: 15px; 

        @media @desktop {
            gap: 44px;
            grid-template-columns: 556px 520px;
            padding: 100px 181px 159px 131px;
            width:fit-content;
        }
        .video-container {           
            display: grid; 
            grid-column-start: 1;
            grid-row-start: 2;
            gap: 15px; 
            padding-bottom: 55px; 
                :deep(.lila-video-partial) {
                    min-height:190px;
                }

            @media @desktop {
            grid-row-start: 1;

                padding-left: 40px;
                :deep(.lila-video-partial) {
                    width: 100%;
                    min-height:450px;
                    } 
                }
      
                :deep(.lila-textblock) {
                   
                    gap: 10px; ;
                    h1,h2,h3,p {
                        font-size: @headline_XS;
                        line-height: @headlineLineHeight_XS;
                        .font-bold; 
                    } 
                    h1 {    
                        text-transform:none; 
 
                    }
                    h2 {
                        padding-top: 10px;
                        color: @link; 
                    }
                    h3 {
                        padding-top: 10px;
                    }
                    h1,h3,p  {
                        color: @textColor; 
                    }
                }
                @media @desktop {
                    padding-bottom: 0; 
                    height: fit-content;
                    :deep(.lila-textblock) {
                   h1 {
                    padding-top: 20px; 
                   }
               }
                }
           
        }

        .text-container {
            grid-column-start: 1;
            grid-row-start: 1;
      

            :deep(.lila-textblock) {
        
                   h1 {
                    font-size: @headline_XS;
                    line-height: @headlineLineHeight_XS;
                    text-transform: none;
                    padding-bottom: 10px; 
                    color:@color4;
               
                   } 
                    h2 {
                    color: @success;
                    font-size: @headline_XS;
                    line-height: @headlineLineHeight_XS; 
                   }
                   h3 {
                    padding-top: 30px; 
                    font-size: 25px;
                     line-height: 27px;
                    color:@color1;  
                    .font-bold; 
                   }
                }
                @media @desktop {
                width: 520px; 
                grid-row-start: 1;
                grid-column-start: 2;
                grid-template-columns: 1fr 1fr;
                padding-right: 40px;

                :deep(.lila-textblock) {
                   h1 {
                    .font-bold; 
                    padding-bottom: 15px; 
                   } 
                   h1, h2 {
                    font-size: 25px; // keine Variable vorhanden
                    line-height: 27px;// keine Variable vorhanden
                   }
                   h3 {
                    padding-top: 30px; 
                    font-size: @headline_XL;
                    line-height: @headlineLineHeight_XL;
                    color:@color1;
                    grid-column-start: 1;
                   }
                }
            }
        }
    }

}
</style>
