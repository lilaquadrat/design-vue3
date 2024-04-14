<script setup lang="ts">
import { onBeforeMount, ref, defineProps, computed} from 'vue';
import type ModuleBaseProps from '../../interfaces/ModuleBaseProps.interface';
import type Textblock from '../../interfaces/textblock.interface';
import { useInview } from '../../plugins/inview';
import type Event from '../../interfaces/Event.interface';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  textblock: Textblock;
  events: Event[]; 
 
}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, { align: props.variant?.includes('align') });
const title = computed(() => ({
  headline: props.textblock?.headline,
}));

onBeforeMount(() => {
   
  setElements(props.events);
 
});

// /**
//  * sorts all events by the same day
//  * 
//  */
function setElements (elements: Event[]) {

  elements.sort((a: any, b: any) => a.date.localeCompare(b.date));

  elements.forEach((single: any) => {
    single.elements.sort((a: any, b: any) => a.startDate.localeCompare(b.startDate));

  });
  
}

</script>
<template>
  <section ref="element" :id="id" :class="[variant, inviewState]" class="lila-events-module lila-module"> 

   <section class="elements-container">
    <header class="title-container">
      <lila-textblock-partial v-bind="title"/> 
    </header>
    
    <section class="event-container"  v-for="(event, index) in events" :key="`event-${index}`"> 
          <lila-events-partial class="event" v-bind="event"/> 
      
    </section>
   </section>
 
  </section>
</template>

<style lang="less" scoped>
.lila-events-module {
  .module;

  display: grid;

  .elements-container {
    display: grid;

    @media @desktop {
      padding: 40px 0; 
        max-width: @moduleWidth_M;
    }

    .title-container {
      padding-bottom: 60px; 

      :deep(.lila-textblock) {
        h1 {
          font-size: @headline_L;
          line-height: @headlineLineHeight_XL;
        }
      }

      @media @desktop {
        :deep(.lila-textblock) {
          h1 {
            font-size: @headline_XL;
            line-height: @headlineLineHeight_L;
          }
        }
      }
    }
   
  }
}
</style>

