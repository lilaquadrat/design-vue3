<script setup lang="ts">
import type Textblock from '@interfaces/textblock.interface';
import { type ContentWithPositions, type Content, type GenericData } from '@lilaquadrat/interfaces';
import { prepareContent } from '@lilaquadrat/studio/lib/esm/frontend';
import { inject, onBeforeMount, onMounted, onServerPrefetch, ref, watch, computed } from 'vue';
import { useInview } from '@/plugins/inview';
import { useResize } from '@/plugins/resize';
import { useTranslations } from '@/plugins/translations';
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & {
  textblock?: Textblock;
  genericData: GenericData & {data: Record<string, Content>};
}>();
const { resized } = useResize();
const linkMode: 'event' | 'link' | undefined = inject('linkMode');
const linkBase = inject<string>('linkBase');
const currentContentContainer = ref<HTMLElement>();
const mainGridContainer = ref<HTMLElement>();
const currentIndex = ref<number>(0);
const headIndexOpen = ref<boolean>(false);
const forceMobileIndex = ref<boolean>(false);
const element = ref<HTMLElement>();
const currentContent = ref<ContentWithPositions>();
const indexTeaser = ref<Partial<Content>[]>([{settings: {title: 'sdasdas'}}]);
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});

watch(resized, () => checkRealWidth());
onMounted(() => checkRealWidth());
onBeforeMount(() => {

  updateIndexTeaser();
  updateCurrentContent();

});
onServerPrefetch(() => {

  updateIndexTeaser();
  updateCurrentContent();

});

const contentCount = computed(() => props.genericData?.editor.length);

function updateCurrentContent () {

  if (!props.genericData?.data) return;

  const newContent = props.genericData.data[props.genericData.editor[currentIndex.value]] ?? null;

  if(currentContent.value?.id === newContent.id) return;

  currentContent.value = newContent 
    ? prepareContent(newContent)
    : undefined;
}

function updateIndexTeaser () {

  const {translate} = useTranslations();

  if (!props.genericData?.data) return [];

  let mapped = props.genericData?.editor.map((index) => {
    const singleData: Partial<Content> = props.genericData?.data[index] ?? {};

    if (!singleData.settings?.title) {

      singleData.settings = {
        title      : translate.translate('training-module-no-title'),
        description: '',
      };

    }

    return singleData;

  });

  mapped = mapped.filter((single) => single) ?? [];
  indexTeaser.value = mapped;
}

function checkRealWidth () {
  const element = mainGridContainer.value as HTMLElement;

  forceMobileIndex.value = element.clientWidth < 700;
}

function setIndex (index: number) {

  currentIndex.value = index;
  toggleIndex(null, false);
  updateCurrentContent();

}

function toggleIndex (event: MouseEvent | null, hint?: boolean) {

  if (hint !== undefined) {
    headIndexOpen.value = hint;
  } else {
    headIndexOpen.value = !headIndexOpen.value;
  }

}
</script>
<template>
  <section :id="props.index?.anchor || props.id" ref="element" :class="[inviewState, variant, { mobileIndex: forceMobileIndex }]" class="lila-training-module lila-module fullscreen">
    <section v-if="textblock" class="module generic-module">
      <lila-textblock-partial v-bind="textblock" />
    </section>

    <article ref="mainGridContainer" class="main-grid-container">
      <section v-if="currentContent" ref="currentContentContainer" :class="{ open: headIndexOpen }" class="current-content-container">
        <section class="content-head">
          <div class="grid-container">
            <lila-button-partial class="base transparent titleButton" @click="toggleIndex">
              {{ currentContent.settings.title }} 11
            </lila-button-partial>
            <div class="current-indicator">
              {{ currentIndex + 1 }} von {{ contentCount }}
            </div>
          </div>

          <div :class="{ open: headIndexOpen }" class="headIndex">
            <ul>
              <li v-for="(teaser, index) in indexTeaser" :key="`teaser-head-index-${index}`" v-memo="[teaser.id]">
                <lila-button-partial :class="{ active: index === currentIndex }" class="base transparent titleButton" @click="setIndex(index)">
                  {{ teaser.settings?.title }}
                </lila-button-partial>
              </li>
            </ul>
          </div>
        </section>
        <lila-content-module ref="currentContentContainer" :key="currentContent.id" class="currentContent" :route-base="linkBase" :link-events="linkMode === 'event' ? true : false" :content="currentContent" />
      </section>
      <section v-if="!currentContent" class="current-content-container">
        <section class="content-module" />
      </section>

      <section class="index-container">
        <div v-for="(teaser, index) in indexTeaser" :key="`teaser-index-${index}`" class="index-element" :class="{ active: index === currentIndex }">
          <div class="index-indicator">
            {{ index + 1 }}.
          </div>

          <button @click="setIndex(index)">
            <h2>{{ teaser.settings?.title }}</h2>
            <p>{{ teaser.settings?.description }}</p>
          </button>
        </div>
      </section>
    </article>
  </section>
</template>
<style lang="less" scoped>
.lila-training-module {
  .module;
  .modulePadding('none');
  gap: 40px;

  @media @desktop {
    .modulePadding();
  }

  .main-grid-container {
    display: grid;

    gap: 40px;
    justify-self: center;
    width: 100%;

    @media @desktop {
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 3fr;

      align-items: start;
      justify-items: start;

      max-width: @desktopWidthExt;
    }

    .index-container {
      .modulePadding();

      display: none;
      grid-template-columns: 1fr;
      gap: 20px;

      justify-content: start;

      @media @desktop {
        position: sticky;
        top: 40px;
        display: grid;
        grid-row-start: 1;
        grid-column-start: 1;
        width: 100%;
        .multi(padding, 0);
      }

      .index-element {
        display: grid;
        gap: 15px;
        align-content: start;

        justify-content: start;

        background-color: @grey1;

        .multi(padding, 4);

        .index-indicator {
          display: none;
        }

        button {
          display: grid;
          justify-content: start;

          border: none;
          background: transparent;
          color: @grey;

          outline: none;

          text-align: left;

          white-space: nowrap;

          white-space: pre-wrap;
          cursor: pointer;

          -webkit-tap-highlight-color: transparent;

          h2 {
            color: @grey;
            font-size: @headline_XS;
            text-transform: uppercase;
            .trans(color);
          }

          p {
            .trans(color);
          }

          .trans(color);
        }

        &:hover,
        &.active {
          background-color: @grey2;
          color: @textColor;

          p {
            color: @textColor;
          }

          h2 {
            color: @color1;
          }

          .index-indicator {
            color: @color1;
          }
        }
      }
    }

    .current-content-container {
      min-width: 100%;

      @media @desktop {
        grid-column-start: 2;
      }

      :deep(.lila-content-module) {
        position: relative;
        display: grid;

        .container .lila-module:first-child {
          .multi(margin-top, 8);
        }
      }

      .content-head {
        .index(5);
        position: sticky;
        top: 0;
        display: grid;
        height: @buttonHeight;

        background-color: @grey2;
        line-height: @buttonHeight;

        @media @desktop {
          display: none;
        }

        .grid-container {
          display: grid;
          grid-template-columns: 1fr max-content;
          justify-self: center;
          width: 100%;
          max-width: @desktopWidthExt;
          .modulePadding();
        }

        .current-indicator {
          font-size: @fontTextSmaller;
        }

        .titleButton {
          justify-content: start;
          width: 100%;
          text-align: left;
          white-space: normal;

          .font-bold;

          &.active {
            color: @color1;
          }
        }

        .headIndex {
          background-color: @white;
          box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.13);

          opacity: 0;
          pointer-events: none;
          transition:
            opacity @aTime @aType,
            transform @aTime @aType;
          transform: translateY(-5px);

          &.open {
            opacity: 1;
            pointer-events: all;
            transform: translateY(0);
          }

          .index(5);

          ul {
            li {
              border-bottom: solid 1px @grey2;
              .modulePadding();
              .trans(background);

              &:hover {
                background-color: @grey2;
              }
            }
          }
        }
      }
    }
  }

  &.indexIndicator {
    @media @desktop {
      .index-container {
        .index-element {
          .index-indicator {
            .font-head;
            display: grid;

            justify-self: start;
            height: @headlineLineHeight_XS;

            margin-top: -1px;

            color: @grey;
            font-size: @headline_XS;

            .trans(color);
          }
        }
      }
    }

    .main-grid-container {
      .index-container {
        .index-element {
          grid-template-columns: max-content 1fr;
        }
      }

    }

  }

  &.mobileIndex {
    .modulePadding('none');

    .main-grid-container {
      grid-template-columns: 1fr;

      .index-container {
        display: none;
      }

      .current-content-container {
        grid-column-start: 1;

        .content-head {
          display: grid;
        }
      }
    }
  }
  &.offsetTop {
    .main-grid-container {
      .current-content-container {
        .content-head {
          top: 40px;
        }
      }

      .index-container {
        top: 80px;
      }
    }

  }

  &.indexVariant {

    .main-grid-container {
      @media @desktop {
        grid-template-columns: 230px 1fr;
      }

      .index-container {
        top: 20px;
        gap: 15px;
        .multi(padding, 4, 0);

        .index-element {
          gap: 15px;
          background-color: transparent;
          .multi(padding, 0, 4);

          button {
            h2 {
              .font-normal;
              height: initial;
              color: @textColor;
              font-size: @headline_XS;
              line-height: @headlineLineHeight_XS;
              text-transform: initial;
            }

            p {
              display: none;
            }
          }

          .index-indicator {
            .font-bold;
            display: none;

            justify-self: start;
            height: @headlineLineHeight_XS;

            color: @textColor;
            font-size: @headline_XS;
          }

          &.active {
            button {
              h2 {
                color: @color1;
              }
            }
          }
        }
      }
    }

    &.indexIndicator {
      .main-grid-container {

        @media @desktop {
          .index-container {
            .index-element {
              grid-template-columns: max-content 1fr;

              .index-indicator {
                .font-normal;
                display: grid;

                justify-self: start;
                height: @headlineLineHeight_XS;
                margin-top: -1.5px;

                color: @textColor;
                font-size: @headline_XS;
              }

              button {
                h2 {
                  .font-normal;
                  height: initial;
                  font-size: @headline_XS;
                  line-height: @headlineLineHeight_XS;
                  text-transform: initial;
                }
              }

              &.active {
                button {
                  h2 {
                    color: @color1;
                  }
                }

                .index-indicator {
                  color: @color1;
                }
              }
            }
          }
        }
        
      }
    }

    &.offsetTop {
      &.indexVariant {
      .main-grid-container {
        .index-container {
          top: 60px;
        }
      }
    }
    }
  }

}
</style>
