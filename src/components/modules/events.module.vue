<script setup lang="ts">
import { onBeforeMount, ref, defineProps, withDefaults } from "vue";
import type EventsElement from "../../interfaces/EventsElement.interface";
import type ModuleBaseProps from "../../interfaces/ModuleBaseProps.interface";
import type Textblock from "../../interfaces/textblock.interface";
import { useInview } from "../../plugins/inview";

defineOptions({ inheritAttrs: false });
// const props = defineProps<ModuleBaseProps & {
//   elements: EventsElement[];
//   textblock: Textblock;
// }>();
type eventProps = ModuleBaseProps & {
  header: Textblock;
  event: EventsElement[];
  date: string;
};

const props = withDefaults(defineProps<eventProps>(), {variant: () => []})
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, { align: props.variant?.includes('align') });
onBeforeMount(() => {
  console.log(props.event);
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
  <section ref="element" :id="id" :class="[variant, inviewState]" class="lila-events-module lila-module">
    <lila-textblock-partial v-if="props.header" v-bind="props.header"></lila-textblock-partial> {{ props.}}
    <template v-for="(event, index) in props.elements" :key="`event-${index}`"> {{ props.element }}
      <lila-events-partial class="event" v-if="event" v-bind="event" /> 
      <!-- {{ event }} -->
    </template>
  </section>
</template>
<style  lang="less" scoped>
.lila-events-module {
    .module;
    background-color: red;
    display:grid

}
</style>