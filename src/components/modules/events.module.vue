<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import type EventsElement from "../../interfaces/EventsElement.interface";
import type ModuleBaseProps from "../../interfaces/ModuleBaseProps.interface";
import type Textblock from "../../interfaces/textblock.interface";
import { useInview } from "../../plugins/inview";

defineOptions({ inheritAttrs: false });
const props = defineProps<ModuleBaseProps & {
  elements: EventsElement[];
  textblock: Textblock;
}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, { align: props.variant?.includes('align') });
onBeforeMount(() => {
  console.log(props.elements);
});
/**
 * 
import dayjs from 'dayjs';
import 'dayjs/locale/de';

export default {
  id: 'home',
  company: 'company',
  project: 'project',
  settings: {
    mode: 'presentation'
  },
  state: 'publish',
  modules: [
    {
      type: 'events-module',
      variant: [],
      textblock: {
        headline: 'EVENT SCHEDULE'
      },
      elements: [
        {
          textblock: {
            headline: 'EVENT SCHEDULE'
          },
          picture: {
            source: [],
            alt: 'IMAGE ALT',
            src: 'https://cdn2.lilaquadrat.de/lilaquadrat/homepage/smalltrompet.png',
          },
        },
      ],
    },
  ].map((dayItem, index) => ({
    ...dayItem,
    date: dayjs().add(index, 'day').format('YYYY-MM-DD'), // Formatieren Sie das Datum für den einfacheren Zugriff
  })),
};


 */
</script>
<template>
  <section ref="element" :id="id" :class="[variant, inviewState]" class="lila-events-module">
    <lila-textblock-partial v-if="props.textblock" v-bind="props.textblock"></lila-textblock-partial>
    <template v-for="(event, index) in props.elements" :key="`event-${index}`">
      <lila-events-partial class="event" v-bind="event"/> 
      <!-- {{ event }} -->
    </template>
  </section>
</template>
<style scoped lang="less">
.lila-events-module {
    .module;
    display:grid

}
</style>