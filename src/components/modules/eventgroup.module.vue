<script setup lang="ts">
import { onBeforeMount, ref, defineProps, computed } from 'vue';
import { useInview } from '../../plugins/inview';
import type ModuleBaseProps from '../../interfaces/ModuleBaseProps.interface';
import type SingleEventElement from '../../interfaces/SingleEventElement';
import type Textblock from '../../interfaces/textblock.interface';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  textblock: Textblock;
  events: SingleEventElement[];
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
function setElements (elements: SingleEventElement[]) {
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

      <section class="event-container" v-for="(event, index) in events" :key="`event-${index}`">
        <lila-single-event-partial class="event" v-bind="event" />
      </section>
    </section>

  </section>
</template>

<style lang="less" scoped>
.lila-event-group-module {
  .module;

  @media @desktop {
    max-width: fit-content;
  }

  .elements-container {
    display: grid;

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

    .event-container {
      @media @desktop {
        padding: 0 40px;
      }
    }
  }
}
</style>

