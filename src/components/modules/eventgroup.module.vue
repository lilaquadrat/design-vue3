<script setup lang="ts">
import { onBeforeMount, ref, defineProps, computed } from 'vue';
import { useInview } from '../../plugins/inview';
import type ModuleBaseProps from '../../interfaces/ModuleBaseProps.interface';
import type Textblock from '../../interfaces/textblock.interface';
import type EventGroupElement from '../../interfaces/EventGroupElement';
import { hardCopy } from '@lilaquadrat/studio/lib/esm/frontend';
import dayjs from 'dayjs';
import type Event from '@/interfaces/Event.interface';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  textblock: Textblock;
  elements: Event[];
}>();
const element = ref<HTMLElement>();
const groupedEvents = ref();
const { inviewState } = useInview(element, { align: props.variant?.includes('align') });
const title = computed(() => ({
  headline: props.textblock?.headline,
}));

onBeforeMount(() => {

  setElements(props.elements);

});

// /**
//  * sorts all events by the same day and sorts its 
//  * containing SingleEventElement by theirstarting time 
//  */
function setElements(elements: any[]) {

  const safeElements = hardCopy(elements);
  const target: Record<string, any> = {};

  safeElements.sort((a, b) => a.start.localeCompare(b.date));

  safeElements.forEach((single) => {

    const dateString = dayjs(single.start).format('YYYY-MM-DD');

    if (!target[dateString]) target[dateString] = {
      date: dateString,
      elements: []
    }

    target[dateString].elements.push(single);


  });

  groupedEvents.value = target;
}

</script>
<template>
  <section ref="element" :id="id" :class="[inviewState]" class="lila-event-group-module lila-module">

    <section class="elements-container">
      <header class="title-container">
        <lila-textblock-partial v-bind="title" />
      </header>
      <section class="single-day-container" v-for="(day, index) in groupedEvents" :key="`event-${index}`">
        <lila-eventgroup-partial class="event" v-bind="day" />
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
    gap: 80px;

    .separator {
      border: 0;
      border-top: solid 1px @grey;
    }
  }

  .elements-container {
    display: grid;
    gap: 80px;

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

