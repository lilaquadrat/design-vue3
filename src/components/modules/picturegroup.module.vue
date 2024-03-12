<script setup lang="ts">
import type Link from '@interfaces/link.interface';
import type Textblock from '@interfaces/textblock.interface';
import type PictureGroupElement from '@interfaces/PictureGroupElement.interface';
import { computed, ref } from 'vue';
import { useInview } from '@/plugins/inview';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  elements: PictureGroupElement[];
  textblock: Textblock;
}>();
const element = ref<HTMLElement>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});

function componentType (link?: Link): 'lila-link-partial' | 'section' {

  return link?.link?.length
    ? 'lila-link-partial'
    : 'section';

}

const linkVariant = computed(() => {

  if (props.variant?.includes('product')) return ['actions', 'center'];

  return ['noStyle'];

});
const fitVariant = computed(() => props.variant?.includes('fit'));
const brightText = computed(() => props.variant?.includes('color1') || props.variant?.includes('color3') ? ['bright'] : []);

</script>
<template>
  <section ref="element" :id="id" :class="[variant, inviewState]" class="lila-picture-group-module lila-module">

    <section class="content-container">
      <lila-textblock-partial :variant="brightText" v-if="textblock" v-bind="textblock" />

      <section class="elements-container"> 

        <component v-for="(element, index) in elements" :key="`picturegroup-element-${index}`" class="element" :is="componentType(element.link)" v-bind="element.link" v-memo="element">
          <lila-picture-partial v-if="element.picture" center :fit="fitVariant" v-bind="element.picture" />
          <lila-textblock-partial :variant="brightText" v-if="element.textblock" v-bind="element.textblock" />
          <lila-list-partial :variant="['noStyle']" v-bind="element.list"></lila-list-partial>
          <lila-list-partial :variant="linkVariant" v-bind="element.links"></lila-list-partial>
        </component>

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

          h1, h2, h3 {
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

          .lila-list-links, .lila-textblock {
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

}
</style>
