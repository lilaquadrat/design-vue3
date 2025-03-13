<script setup lang="ts">
import { onBeforeMount, ref, watch, onServerPrefetch } from 'vue';
import { useInview } from '../../plugins/inview';
import type ModuleBaseProps from '../../interfaces/ModuleBaseProps.interface';
import type Textblock from '../../interfaces/textblock.interface';
import { hardCopy } from '@lilaquadrat/studio/lib/esm/frontend';
import type Event from '@/interfaces/Event.interface';
import useDate from '@/mixins/date';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  textblock: Textblock;
  elements: Event[];
}>();
const element = ref<HTMLElement>();
const groupedEvents = ref();
const { inviewState } = useInview(element, { align: props.variant?.includes('align') });

onBeforeMount(() => setElements(props.elements));
onServerPrefetch(() => setElements(props.elements));
watch(() => props.elements, () => setElements(props.elements), {deep: true, immediate: true});

// /**
//  * sorts all events by the same day and sorts its 
//  * containing SingleEventElement by their starting time 
//  */
function setElements (elements: any[]) {

  const safeElements = hardCopy(elements);
  const target: Record<string, any> = {};

  safeElements.sort((a, b) => a.start.localeCompare(b.start));

  safeElements.forEach((single) => {

    if(!useDate(single.start).isValid()) return;

    const dateString = useDate(single.start).format('YYYY-MM-DD');

    if(!target[dateString]) {
      target[dateString] = {
        date    : dateString,
        elements: []
      }
    }

    target[dateString].elements.push(single);

  });

  groupedEvents.value = target;
}

</script>
<template>
  <section ref="element" :id="props.index?.anchor || props.id" :class="[inviewState, variant]" class="lila-events-list-module lila-module">

    <section class="elements-container">
      <header v-if="textblock" class="title-container">
        <lila-textblock-partial v-bind="textblock" />
      </header>
      <section class="single-day-container" v-for="(day, index) in groupedEvents" :key="`event-${index}`">
        <lila-eventgroup-partial v-bind="day" :variant="variant" />
        <hr class="separator" />
      </section>
    </section>

  </section>
</template>

<style lang="less" scoped>
.lila-events-list-module {
  .module;

  @media print {
    margin: 20mm 0;
  }

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

