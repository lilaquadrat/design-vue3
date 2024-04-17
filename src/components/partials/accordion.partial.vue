<script setup lang="ts">
import { ref, onMounted, type Ref, nextTick, onServerPrefetch, onBeforeMount } from 'vue';
import type AccordionElement from '@interfaces/AccordionElement.interface';
import type { AccordionElementWithSettings } from '@interfaces/AccordionElement.interface';
import { useResize } from '@/plugins/resize';
import { watch } from 'vue';
import { hardCopy } from '@lilaquadrat/studio/lib/esm/frontend';

const { resized } = useResize();
const props = defineProps<{
  multiOpen?: boolean;
  disableControls?: boolean;
  openOnStart?: 'first' | 'all';
  elements: AccordionElement[];
  renderTarget?: 'pdf' | 'web';
  variant?: string[]
}>();
const items: Ref<HTMLElement[]> = ref([]);
const useElements = ref<AccordionElementWithSettings[]>([]);

watch(() => props.elements, () => setElements(props.elements));
watch(() => props.openOnStart, () => setElements(props.elements, true));
watch(resized, () => setElements(props.elements));

onServerPrefetch(() => setElements(props.elements, true));
onBeforeMount(() => setElements(props.elements, true));

/**
 * get the real size of the hidden placeholder to create a correct open animation
 */
function toggle (element: AccordionElementWithSettings, index: number) {

  let newVisible: boolean = false;

  if (props.disableControls) return;

  if (!props.multiOpen) {

    if (element.visible) {

      element.visible = false;

    } else {

      useElements.value.forEach((single) => {
        single.visible = false;
      });

      newVisible = true;
    }
  } else {

    newVisible = !element.visible;

  }

  const refElement = items.value[index] as HTMLElement;
  const placeholder = refElement.querySelector('.accordion-content-placeholder');

  useElements.value[index].height = `${placeholder?.clientHeight}px`;

  useElements.value[index].visible = newVisible;
}

/**
 * adds the settings (e.g. headline, visible) to the elements
 *
 * when resetVisible is true the visible state for the elements will be reset
 */
function setElements (elements: AccordionElement[], resetVisible = false) {

  const newElements: any[] = [];
  const safeElements = hardCopy(elements);

  safeElements.forEach((single, index: number) => {

    let visible = useElements.value[index]?.visible;

    if (resetVisible) {

      visible = false;
      if (props.openOnStart === 'first' && index === 0) visible = true;
      if (props.openOnStart === 'all' && props.multiOpen) visible = true;

    }

    if (props.renderTarget === 'pdf') visible = true;

    const headline = single.textblock?.headline;

    delete single.textblock?.headline;

    if (!headline) return;

    newElements.push({
      ...single,
      headline,
      visible,
      // everything needs to be visible in a pdf
      height: props.renderTarget === 'pdf' ? 'auto' : '0px',
    });
  });

  useElements.value = newElements;

  nextTick(() => {

    Object.values(items.value).forEach((single: HTMLElement, index: number) => {

      const placeholder = single?.querySelector('.accordion-content-placeholder');
      const useElement = useElements.value[index];

      if (!useElement) return;

      useElement.height = `${placeholder?.clientHeight}px`;

    });

  });

}

function getListVariant (type: string): string[] {
  const base = props.variant || [];

  if (props.variant?.includes('center')) {
    base.push('noStyle');
    base.push('center');
  }

  if (props.variant?.includes('actions') && type !== 'list') {
    base.push('actions');
  }

  return base;
}
</script>
<template>
  <section class="lila-accordion" :class="{ noControls: disableControls || renderTarget === 'pdf' }">
    <slot></slot>

    <section v-for="(single, index) in useElements" ref="items" class="single-accordion" :class="{ visible: single.visible }" :key="`accordion-${index}`">
      <component class="headline" :is="disableControls || renderTarget === 'pdf' ? 'h3' : 'button'" @click="toggle(single, index)">
        <span>{{ single.headline }}</span>
        <lila-icons-partial v-if="!disableControls && renderTarget !== 'pdf'" animate :rotate="single.visible ? 90 : 0" type="arrow-right" />
      </component>

      <section :style="`height: ${single.visible ? single.height : '0px'}`" class="accordion-content-container">
        <section class="accordion-content">
          <lila-textblock-partial v-if="single.textblock" v-bind="single.textblock" />
          <lila-list-partial v-bind="single.list" mode="list" :variant="getListVariant('list')"></lila-list-partial>
          <lila-list-partial v-bind="single.links" mode="links" :variant="getListVariant('links')"></lila-list-partial>
        </section>
      </section>

      <div class="accordion-content-placeholder">
        <section class="accordion-content">
          <lila-textblock-partial v-if="single.textblock" v-bind="single.textblock" />
          <lila-list-partial v-bind="single.list" mode="list" :variant="getListVariant('list')"></lila-list-partial>
          <lila-list-partial v-bind="single.links" mode="links" :variant="getListVariant('links')"></lila-list-partial>
        </section>
      </div>
    </section>
  </section>
</template>
<style lang="less" scoped>
.lila-accordion {
  display: grid;

  .single-accordion {
    position: relative;
    display: grid;

    .headline {
      .font-bold;
      .multi(padding, 4, 0);

      .trans(color);

      display: grid;
      grid-template-columns: 1fr 40px;
      gap: 10px;
      border: 0;
      border-bottom: solid 1px @color2;
      background: transparent;
      color: @color1;

      font-size: @headline_XS;
      line-height: @headlineLineHeight_XS;
      text-align: left;
      cursor: pointer;

      @media @tablet, @desktop {
        font-size: @headline_S;
        line-height: @headlineLineHeight_S;
      }

      &:hover {
        color: @color3;
      }
    }

    .accordion-content-container {
      overflow: hidden;
      .trans(height);
    }

    .accordion-content-placeholder {
      .multi(padding-bottom, 8);
      position: absolute;
      visibility: hidden;
    }

    .accordion-content-container,
    .accordion-content-placeholder {
      .accordion-content {
        .multi(padding-top, 4);
        .multi(padding-bottom, 8);

        display: grid;
        gap: 40px;
      }
    }

    .lila-icons-partial {
      align-self: start;
      justify-self: center;
      margin-top: 3px;
    }
  }

  &.noControls {
    .single-accordion {
      button {
        grid-template-columns: 1fr;
        cursor: auto;
      }
    }
  }
}
</style>
