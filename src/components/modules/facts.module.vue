<script setup lang="ts">
import type Textblock from '@interfaces/textblock.interface';
import type Fact from '@interfaces/Fact.interface';
import { useInview } from '@/plugins/inview';
import { computed, ref } from 'vue';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  textblock?: Textblock;
  elements?: Fact[];
  variant?: string[];
}>();
const active = ref<number>(0);
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});
const topics = computed(() => props.variant?.includes('topics'));

function setActive (index: number) {

  active.value = index;

}

</script>
<template>
  <section :id="props.index?.anchor || props.id" ref="element" :class="[inviewState, variant]" class="lila-facts-module lila-module">
    <lila-textblock-partial class="intro-textblock" v-bind="textblock" />

    <section class="complete-container">
      <section v-if="topics" class="list-links">
        <ul>
          <li v-for="(element, index) in elements" :key="`elements-${index}`">
            <lila-icons-partial size="small" type="arrow-right" />
            <h2 :class="{ active: index === active }" @keypress="setActive(index)" @click="setActive(index)">
              {{ element.textblock.subline }}
            </h2>
          </li>
        </ul>
      </section>

      <div v-if="topics" class="facts-container">
        <lila-fact-partial :variant="variant" v-bind="elements[active]" />
      </div>

      <div v-if="!topics" class="facts-container">
        <lila-fact-partial v-for="(element, index) in elements" :key="`fact-index-${index}`" :variant="variant" v-bind="element" />
      </div>

      <slot />
    </section>
  </section>
</template>
<style lang="less" scoped>

.lila-facts-module {
  .module;
  .modulePadding();

  gap: 80px;
  max-width: @moduleWidth_S;

  @media print {
    margin: 20mm 0;
  }

  figure {
    display: none;
  }

  @media @desktop {

    figure {
      display: grid;
    }
  }

  .facts-container {
    display: grid;
    justify-content: center;
    gap: 40px;
  }

  .complete-container {
    display: grid;
    gap: 40px 0;
  }

  max-width: @moduleWidth_M;

  @media @desktop {

    .facts-container {
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
  }

  .lila-textblock {
    justify-self: center;
    max-width: @moduleWidth_S;
  }

  &.topics {
    max-width: @moduleWidth_M;
    .headlines;

    .complete-container {
      gap: 60px;

      @media @desktop {
        grid-template-columns: 1fr 2fr;
        gap: 80px;
      }

      h2 {
        color: @grey;
        font-size: @headline_S;
        line-height: @headlineLineHeight_S;
        cursor: pointer;
        .trans(color);

        &:hover {
          color: @color1;
        }

        &.active {
          color: @color1;
        }
      }

      ul {
        display: grid;
        gap: 10px;

        li {
          display: grid;
          grid-template-columns: min-content 1fr;
          gap: 10px;

          .lila-icons-partial {
            align-self: start;
            .multi(margin-top, 1);
          }
        }
      }

      :deep(.lila-fact-partial) {

        grid-template-rows: min-content;
        max-width: 100%;

        h2 {
          display: none;
        }
      }

      .facts-container {
        grid-template-columns: 1fr;
      }

    }
  }

  &.threeRow {

    @media @desktop {

      .facts-container {
        grid-template-columns: 1fr 1fr 1fr;
        gap: 40px;
      }
    }
  }

}
</style>
