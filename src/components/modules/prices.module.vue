<script setup lang="ts">
import type Textblock from '@interfaces/textblock.interface';
import type PricesElementModel from '@interfaces/PricesElement.interface';
import { ref } from 'vue';
import { useInview } from '@/plugins/inview';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  textblock?: Textblock;
  elements: PricesElementModel[];
}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});

function highlight (element: { variant: string | string[] }) {
  return element.variant?.includes('highlight');
}

</script>
<template>
  <section :id="props.index?.anchor || props.id" ref="element" :class="[variant, inviewState]" class="lila-prices-module lila-module">
    <lila-textblock-partial v-bind="textblock" />

    <div class="prices-container">
      <section v-for="(element, elementIndex) in elements" :key="`price-${elementIndex}`" class="single-price" :class="[variant, element.variant]">
        <header v-if="element.textblock">
          <h1 v-if="element.textblock.headline">
            {{ element.textblock.headline }}
          </h1>
          <h2 v-if="element.textblock.subline">
            {{ element.textblock.subline }}
          </h2>
          <h3 v-if="element.textblock.intro">
            {{ element.textblock.intro }}
          </h3>
        </header>

        <section class="content">
          <div class="price-container">
            <h2 v-if="element.price" class="price">
              {{ element.price }}
            </h2>
            <h3 v-if="element.interval" class="interval">
              {{ element.interval }}
            </h3>
          </div>

          <p v-for="(singleText, index) in element.textblock.text" :key="`text-${index}-${elementIndex}`">
            {{ singleText }}
          </p>

          <li v-for="(single, index) in element.facts" :key="`list-element-${elementIndex}-${index}`">
            {{ single }}
          </li>
        </section>

        <footer>
          <lila-action-partial v-if="element.callToAction" button call-to-action :class="{ colorScheme1: highlight(element), colorScheme2: !highlight(element) }" v-bind="element.callToAction" />
          <lila-action-partial v-if="element.more" v-bind="element.more" />
        </footer>
      </section>
    </div>
  </section>
</template>
<style lang="less" scoped>
.lila-prices-module {
  .module;

  display: grid;
  gap: 80px;
  justify-items: center;

  .headlines;

  .lila-textblock,
  .prices-container {
    width: 100%;

    max-width: @moduleWidth_S;

    @media @desktop {
      .modulePadding();
    }
  }

  .prices-container {
    display: grid;
    gap: 80px;
    max-width: @moduleWidth_M;

    @media @tablet, @desktop {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 40px;
    }

    h3 {
      color: @textColor;
    }

    .single-price {
      display: grid;

      grid-template-rows: minmax(60px, max-content) minmax(300px, 1fr) max-content;
      gap: 20px;

      header {
        h1 {
          font-size: @headline_S;
        }
      }

      .content {
        display: grid;
        gap: 20px;
        align-content: start;
        align-items: start;

        .price-container {
          .multi(padding, 4, 0);

          display: grid;

          grid-template-columns: max-content max-content;
          gap: 10px;

          align-items: end;

          border-top: solid 2px @grey;
          border-bottom: solid 2px @grey;

          .price {
            color: @textColor;
            font-size: @headline_XL;
            line-height: @headlineLineHeight_XL;
          }

          .interval {
            .multi(padding-top, 1);
          }
        }
      }

      &.highlight {
        grid-row-start: 2;

        @media @tablet, @desktop {
          grid-row-start: auto;
        }

        .price-container {
          border-top: solid 2px @color1;
          border-bottom: solid 2px @color1;

          .price {
            color: @color1;
          }
        }
      }

      footer {
        display: grid;
        gap: 10px;
        justify-content: center;

        :deep(.lila-link), :deep(.lila-button) {
          display: block;

          line-height: 35px;
          text-align: center;
        }
      }
    }
  }

}
</style>
