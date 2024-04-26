<script setup lang="ts">
import { onBeforeMount, ref, defineProps, computed } from 'vue';
import { useInview } from '../../plugins/inview';
import type ModuleBaseProps from '../../interfaces/ModuleBaseProps.interface';
import type Textblock from '../../interfaces/textblock.interface';
import type EventGroupElement from '../../interfaces/EventGroupElement';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  textblock: Textblock;
  events: EventGroupElement[];
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
//  * sorts all events by the same day and sorts its 
//  * containing SingleEventElement by theirstarting time 
//  */
function setElements (elements: EventGroupElement[]) {
  elements.sort((a: any, b: any) => a.date.localeCompare(b.date));

  elements.forEach((single: any) => {
    single.elements.sort((a: any, b: any) => {
      const startTimeA = a.textblock.intro;
      const startTimeB = b.textblock.intro;

      if (startTimeA !== startTimeB) {
        return startTimeA.localeCompare(startTimeB);
      }

      return a.startDate.localeCompare(b.startDate);
    });
  });
}

</script>
<template>
  <section ref="element" :id="id" :class="[inviewState]" class="lila-event-group-module lila-module">

    <section class="elements-container">
      <header class="title-container">
        <lila-textblock-partial v-bind="title" />
      </header>
      <section class="single-day-container" v-for="(event, index) in events" :key="`event-${index}`">
        <lila-eventgroup-partial class="event" v-bind="event" />
        <hr class="separator" />
      </section>
    </section>

  </section>
</template>

<style lang="less" scoped>
.lila-event-group-module {
  .module;

  @media @desktop {
    max-width: @moduleWidth_L;
  }

  .single-day-container {
    display: grid;
    gap: 40px;
    .separator {
      border: 0;
      border-top: solid 1px @grey;
    }
  }

  .elements-container {
    display: grid;
    gap: 40px;

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
</style>

