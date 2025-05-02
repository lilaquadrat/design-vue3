<script setup lang="ts">
import type Link from '@interfaces/link.interface';
import type Textblock from '@interfaces/textblock.interface';
import type PictureGroupElement from '@interfaces/PictureGroupElement.interface';
import { computed, ref, type ComputedRef } from 'vue';
import { useInview } from '@/plugins/inview';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import { isDeepEmpty } from '@lilaquadrat/studio/lib/esm/frontend';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  elements: PictureGroupElement[];
  textblock: Textblock;
}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, { align: props.variant?.includes('align') });
const linkVariant = computed(() => {

  if (props.variant?.includes('product')) return ['actions', 'center'];

  return ['noStyle'];

});
const fitVariant = computed(() => props.variant?.some(single => ['fit', 'cards'].includes(single)));
const brightText = computed(() => {

  const variantsArray = [];

  if (props.variant?.some(single => ['color1', 'color3'].includes(single))) variantsArray.push('bright');
  if (props.variant?.includes('cards')) variantsArray.push('content');

  return variantsArray;

});
const brightTextIntro = computed(() => {

  const variantsArray = [];

  if (props.variant?.some(single => ['color1', 'color3'].includes(single))) variantsArray.push('bright');

  return variantsArray;

});
const filteredElements: ComputedRef<(PictureGroupElement & { hasContent: boolean })[]> = computed(() => props.elements.map((single) => ({
  ...single,
  hasContent: !isDeepEmpty(single.textblock) || !isDeepEmpty(single.links) || !isDeepEmpty(single.list)
})));

</script>
<template>
  <section :id="props.index?.anchor || props.id" ref="element" :class="[variant, inviewState]" class="lila-picture-group-module lila-module">
    <section class="content-container">
      <lila-textblock-partial v-if="textblock" :variant="brightTextIntro" v-bind="textblock" />

      <section class="elements-container">
        <section v-for="(element, index) in filteredElements" :key="`picturegroup-element-${index}`" v-memo="elements" class="element">
          <lila-action-partial v-bind="element.link">
            <lila-picture-partial v-if="element.picture?.src?.length" center :fit="fitVariant" v-bind="element.picture" />
            <section v-if="element.hasContent" class="text-container">
              <lila-textblock-partial v-if="element.textblock" :variant="brightText" v-bind="element.textblock" />
              <lila-list-partial :variant="['noStyle']" v-bind="element.list" />
              <lila-list-partial :variant="linkVariant" v-bind="element.links" />
            </section>
          </lila-action-partial>
        </section>
      </section>
    </section>
  </section>
</template>
<style lang="less" scoped>
.lila-picture-group-module {

  width: 100%;

  word-break: break-word;

  picture {

    img {
      align-content: center;
      justify-content: center;
    }
  }

  :deep(.lila-textblock) {
    justify-self: center;

    width: 100%;
    max-width: @moduleWidth_S;
    text-align: left;
  }

  .text-container {
    &:empty {
      display: none;
    }
  }

  &.color1 {
    background-color: @color1;
  }

  &.color3 {
    background-color: @color3;
  }

  .content-container {

    .multi(padding, 0, 8);

    display: grid;
    gap: 60px;

    .elements-container {

      display: grid;
      gap: 40px;

      justify-self: center;
      width: 100%;
      max-width: @moduleWidth_M;

      @media @tablet, @desktop {
        grid-template-rows: max-content max-content;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 40px 2%;
      }
    }

    a {
      .basicHover;
    }

    .element {

      display: grid;
      gap: 20px;

      :deep(.lila-link) {
        display: grid;
        gap: 20px;
      }

      .lila-figure {
        width: 100%;
        height: 100%;
      }

      .lila-textblock {
        align-content: start;
        text-align: center;

        h2 {
          font-size: 1.4em;
        }
      }
    }

  }

  &:not(.fit) {

    .element {
      grid-template-rows: max-content;
    }

  }

  &.color1,
  &.color3 {

    .content-container {
      .multi(padding, 12);

      .element {
        .lila-textblock {

          h1,
          h2,
          h3 {
            color: @white;
          }
        }
      }
    }

    color: @white;
  }

  &.small {

    .content-container {

      .elements-container {
        max-width: @desktopWidth;
      }

    }
  }

  &.fourColumns {

    .content-container {

      .element {
        grid-template-columns: 1fr;
      }

      .elements-container {
        display: grid;
        gap: 40px;

        @media @tablet {
          grid-template-rows: max-content;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 40px;
        }

        @media @desktop {
          grid-template-rows: max-content;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 40px;
        }

      }

    }

  }

  &.contact {

    text-align: left;

    .content-container {

      .elements-container {

        .element {

          display: grid;

          grid-template-columns: 100%;
          gap: 20px;
          align-content: start;
          justify-content: start;
          text-align: left;

          .lila-list-links,
          .lila-textblock {
            .multi(padding, 0, 4)
          }

          :deep(.lila-textblock) {
            gap: 5px;
            text-align: left;

            h1 {
              font-size: @headline_S;

              @media @tablet,
              @desktop {
                font-size: @headline_S;
              }
            }

            h2 {
              font-size: @headline_XS;
            }

            .link-list {

              a {
                .font-head;
              }
            }
          }

        }
      }
    }

  }

  &.fivesameSizedInColumn {
    .content-container {
      .elements-container {
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: 1fr;
        gap: 20px;

        @media @desktop {
          grid-template-columns: repeat(5, 1fr);

        }

        .text-container {
          display: none;
        }

      }
    }

  }

  &.cards {

    .content-container {
      .elements-container {
        .element {

          display: grid;
          align-content: end;
          position: relative;
          overflow: hidden;

          border-radius: 20px;
          aspect-ratio: 2 / 3;
          border: solid 3px rgba(204, 204, 204, 0.6);

          box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.13);

          .trans(border);

          .lila-figure {
            position: absolute;
            width: 100%;
            height: 105%;

            picture {
              position: absolute;
              width: 100%;
              height: 105%;
              .index(2);

            }
          }

          .text-container {
            background-image: linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, .8) 50%, rgba(255, 255, 255, 0) 100%);
            .index(3);
            display: grid;
          }

          .lila-textblock,
          .lila-list-links {
            .multi(padding, 0, 4, 4, 4);
          }

          .lila-textblock,
          .lila-figure,
          .lila-list-links {
            .trans(transform);
          }

          .lila-list-links {
            opacity: 0;
            .trans(all);
            pointer-events: none;
          }

          .lila-textblock {

            .multi(padding, 4);
            .multi(padding-top, 16);
            .multi(padding-bottom, 4);

            text-align: left;
            .trans(transform);
          }

          &:hover {

            opacity: 1;

            border-color: @color1;

            .lila-figure {
              transform: translateY(-4.5%);
            }

            .lila-textblock,
            .lila-list-links {
              transform: translateY(-15px);
            }

            .lila-list-links {
              opacity: 1;
              pointer-events: all;
            }

          }

        }
      }
    }

  }

}
</style>
