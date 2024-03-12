<script setup lang="ts">
import { defineProps, defineOptions, ref, computed, onBeforeMount, watch} from 'vue';
import { useInview } from '../../plugins/inview';
import type EventsElement  from '../../interfaces/EventsElement.interface';
import type ModuleBaseProps from '../../interfaces/ModuleBaseProps.interface';
import type Textblock from '../../interfaces/textblock.interface';
import dayjs from 'dayjs';
import { hardCopy } from '@lilaquadrat/studio/lib/esm/frontend';
import type { EventsElementWithSettings } from '../../interfaces/EventsElement.interface';


defineOptions({ inheritAttrs: false }); 
const props = defineProps<ModuleBaseProps & {
   elements: EventsElement[];
   textblock: Textblock;
   date: string;
   variant?: string[];
}>();
const parentElement = ref<HTMLElement>();
const { inviewState } = useInview(parentElement, { align: props.variant ? props.variant?.includes('align') : false});
const eventsElements = ref<EventsElementWithSettings[]>([]);
const header = computed(() => ({
  headline: props.textblock?.headline,
}));
const date = computed(()=> ({
   day: dayjs(props.date).format('DD'),
   weekday: dayjs(props.date).locale('de').format('dddd').slice(0,2).toUpperCase()
}));
const variants = [];
if(props.variant?.includes('moreText')) variants.push('moreText');
watch(() => props.elements, () => {
    if (props.elements) {
        setElements(props.elements);
    }
});
onBeforeMount(() => {
   
    removeSpacing();
  
})

function removeSpacing() {
    const articleContent = <HTMLElement>document.querySelector('.lila-content-module .container.presentation');
    if (articleContent) {
          articleContent.style.gap = '40'+'px'; 
}
}

// über alle Elemente drüber gehen und baue dann auf datum string um
//1.leeres Objekt für jedes eindeutige datum
//elements nach datum sortieren
// hier muss die gesamte Logik rein, wie die Elemente gesettet weerden
// die Logik von funktion removeSpacing muss auch hier mit rein
function setElements (elements: EventsElement[], getVisible =  false) {
  const newElements: any[] = [];
  let elementsCopy = hardCopy(elements);


  elementsCopy.map((item, index: number) => {

    let visible = eventsElements.value[index]?.visible
    if(getVisible) {
        visible = false
    }
   

    newElements.push({
      ...item,
      visible
    });
    
  });

  eventsElements.value = newElements
}





</script>
<template>
    <section ref="parentElement" :id="id" class="lila-events-partial" :class="[inviewState, variant]" >
       
        <section class="elementsContainer">
            <lila-textblock-partial  v-if="header" v-bind="header" class="header" /> 
        <!--  -->
        <section class="singleElementContainer" v-for="(element, index) in props.elements" :key="`daySchedule-${index}`"> 
            <!-- getting horizontal line -->
            
                <section class="timeContainer ">  
                    <time v-if="date">{{ date.day }}</time>  
                    <time v-if="date">{{ date.weekday }}</time>  
                </section>
                <!--  -->
                
                <lila-picture-partial v-if="element.picture" v-bind="element.picture" class="pictureContainer"/> 
                <!--  -->
                <section class="eventContainer">
                    <section class="eventInfo">
                        <template v-for="(item, index) in element" :key="`daySchedule-${index}`"> 
                            <lila-textblock-partial v-bind="item" /> 
                        </template>
                    </section> 
                    <section class="linkContainer">
                            <lila-icons-partial type="location" size="small" class="icon green"/>
                            <!-- <lila-link-partial v-if="element.links" v-bind="element.links?.[0]"/>  -->
                            <lila-link-partial v-if="element.link" v-bind="element.link[0]" class="locationLink" /> 
                        </section>
                    <section class="eventContent">
                    <lila-textblock-partial  v-if="element.textblock" v-bind="element.textblock" />
                    <lila-link-partial v-if="element.moreText" class="moreText" :variant="['moreText']"
                    v-bind="element.moreText[0]"
                    /> 
                    </section>

                </section>
                <section class="seperator"> <span></span></section>
        </section>
        </section>
       </section>
</template>

<style  lang="less" scoped>
.lila-events-module {
    .module;
    max-width: @moduleWidth_S;
    gap: 0 14px;
   .elementsContainer {
    display: grid;
    .header {
        padding:40px 60px;
    }
    
      .singleElementContainer {
        display:grid;
        grid-template-columns:min-content 1fr;
        grid-template-rows: 2 
        span;
        gap:0 40px;

        .timeContainer {
            .font-head;
            display: grid;
            grid-template-rows: auto auto;
            width: 64px;
            height: 87px;
            grid-column-start:1;
            justify-self: end;
            justify-items: end;
            font-size: @headline_L;
            line-height:@headlineLineHeight_L ;   
        }
         .sameDay {
                .timeContainer {
                    display: none
                }
            }
        .pictureContainer {
            grid-column-start: 2;
            
        }
        .eventContainer {
            display:grid;
            grid-column-start: 2;
            // gap: 0 40px;

            .eventInfo{
                :deep(.lila-textblock){
                    padding-top: 15px;
                    padding-bottom: 13px;
                    grid-template-rows: min-content;
                    gap: 0;
                    margin: 0;

                    h1,p {
                        display: none;
                        color:red
                    }
                    h2,
                    h3{
                        font-size: @headline_S;
                        line-height: @headlineLineHeight_S;
                        color: @textColor;
                        .font-head;
                    }
                    h3{
                        margin-top: 13px;
                    }
                }
            }
            .eventContent {
                :deep(.lila-textblock){
                    gap:0;

                    h1 {
                        height: 100px;
                        font-size: @headline_S;
                        line-height: @headlineLineHeight_S;
                    } 
                    p {
                        .font-bold;
                    }
                    h2,h3{
                        display: none;
                    } 
                } 
            }
            
        }
        .seperator {
            grid-column: 1/-1;
            border:0;
            border-bottom: @grey 1px solid;
            padding-top: 40px;
        }
        .linkContainer {
            display:grid;
            grid-template-columns: min-content  min-content;
            font-size: @headline_XS;
            padding-bottom: 15px;
            .locationLink {
                padding: 0 5px;
                .font-bold;
            }
        }
       }
   }
}
</style>


