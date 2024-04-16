<script setup lang="ts">
import { defineProps, defineOptions, ref, computed, onBeforeMount } from 'vue';
import { useInview } from '../../plugins/inview';
import dayjs from 'dayjs';
import type Link from '../../interfaces/link.interface';
import type SingleEventElement from '../../interfaces/SingleEventElement';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  elements: SingleEventElement[];
  variant?: string[];
  date: string;

}>();
const elementsContainer = ref<HTMLElement>();
const parentElement = ref<HTMLElement>();
const imageContainer = ref<HTMLElement>();
const eventsElements = ref<SingleEventElement[]>([]);
const { inviewState } = useInview(parentElement, { align: props.variant ? props.variant?.includes('align') : false });

function componentType(link?: Link): 'lila-link-partial' | 'section' {
  return link?.link?.length ? 'lila-link-partial' : 'section';
}

onBeforeMount(() => {
  setElements(props.elements);

});

/**
 * organizes an array of SingleEventElement objects into groups by their start date
 * each SingleEventElement is then mapped to a new object structure that includes its given content
 */
function setElements(elements: SingleEventElement[]) {
  const groupedEvents: any[] = [];
  const groupedContent: any[] = [];

  elements.forEach((item) => {
    const eventContent = {
      textblock: {
        headline: item.textblock.headline,
        subline: item.textblock.subline,
        intro: item.textblock.intro,
        text: item.textblock.text
      },
      link: item.link,
      moreText: item.moreText,
      icon: item.icon,
      picture: item.picture,
      video: item.video,
    };

    if (item.startDate) {
      let group = groupedEvents.find(group => group.date === item.startDate);

      if (!group) {
        group = {
          date: item.startDate,
          events: []
        };
        groupedEvents.push(group);
      }

      group.events.push(eventContent);
    }
  });

  groupedEvents.forEach((group) => {
    group.events.forEach((event: any) => {

      groupedContent.push({
        startDate: group.date,
        ...event
      });
    });
  });

  eventsElements.value = groupedContent;

}

const dateItem = computed(() => {
  const date = props.date ? dayjs(props.date) : null;

  return {
    day: date ? date.format('DD') : '',
    weekDay: date ? date.format('dd').toUpperCase() : '',
  };
});

</script>

<template v-if="!hasImage">
  <section ref="parentElement" class="lila-single-event-partial" :class="[inviewState]">
    <section class="elements-container">

      <section class="time-container">
        <section class="time">
          <time v-if="date">{{ dateItem.day }}</time>
          <time v-if="date">{{ dateItem.weekDay }}</time>
        </section>
      </section>

      <section ref="elementsContainer" class="events-container" v-for="(single, index) in eventsElements"
        :key="`events-${index}`">

        <component :is="componentType(single.link)" v-if="single.picture" v-bind="single.link">
          <section class="img-container" ref="imageContainer">
            <lila-picture-partial v-if="single.picture" v-bind="single.picture" class="picture-container" />
          </section>
        </component>

        <section class="informations-container">
          <section class="event-info">
            <section class="event-link-info">
              <lila-textblock-partial v-if="single.textblock" v-bind="single.textblock" />

              <component :is="componentType(single.link)" v-bind="single.link">
                <section class="link-container">
                  <section class="icon-container">
                    <lila-icons-partial type="location" size="large" class="icon green" v-if="single" v-bind="single" />
                  </section>
                  <section class="location-link">
                    <lila-link-partial v-if="single.link?.text" v-bind:link="single.link?.text" />
                    {{ single.link?.link }}
                  </section>
                </section>
              </component>
            </section>
          </section>

          <section class="event-content">
            <lila-textblock-partial v-if="single.textblock" v-bind="single.textblock" />

            <section class="more-text">
              <lila-link-partial v-if="single.moreText" class="moreText-link" v-bind="single.moreText" />
            </section>

          </section>
        </section>
      </section>

    </section>
    <section class="seperator">
      <hr />
    </section>
  </section>
</template>

<style lang="less" scoped>
.lila-single-event-partial {

  max-width: @moduleWidth_XS;

  @media @desktop {
    max-width: @moduleWidth_L;
  }

  .elements-container {
    display: grid;
    gap: 0 40px;

    @media @desktop {
      gap: 0 80px;
      max-width: @moduleWidth_L;
    }

    .time-container {
      display: grid;

      @media @desktop {
        align-content: center;
      }

      .time {
        display: grid;
        gap: 15px;
        text-align: center;
        font-size: @headline_L;
        line-height: @headlineLineHeight_L;
        .font-head;
        height: fit-content;
        width: 64px;

        @media @desktop {
          width: 83px;
          text-align: center;

          font-size: @headline_XL;
          line-height: @headlineLineHeight_XL;
        }
      }
    }

    .events-container {
      display: grid;
      grid-column-start: 2;

      @media @desktop {
        gap: 44px;
        grid-template-columns: max-content 1fr;
        padding-bottom: 40px;
        grid-column-end: 4;
        height: auto;
      }

      .img-container {

        width: 260px;
        height: 220px;
        overflow: hidden;

        .picture-container {
          max-width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media @desktop {
          width: 100%;
          height: 100%;
          overflow: visible;

          .picture-container {
            object-fit: none;
          }
        }
      }

      .informations-container {

        //grid-column-end: 4;
        @media @desktop {
          width: fit-content;
        }

        .event-info {
          display: grid;

          :deep(.lila-textblock) {
            gap: 0;
            width: fit-content;

            h1,
            p {
              display: none;
            }

            h2,
            h3 {

              .font-bold;
              font-size: 25px; //es gibt für die 25px font-size und 27px line-height keine Variable
              line-height: 27px;
              color: @textColor;
            }

            h2 {
              padding: 15px 0 13px 0;
            }

            h3 {
              margin: 0;
              padding-bottom: 13px;
            }
          }

          .event-link-info {
            padding-bottom: 15px;
            display: grid;

            align-items: start;

            @media @desktop {
              width: 70%;
              grid-column-start: 1;
              grid-template-columns: auto 1fr;
              gap: 55px;
            }

            .link-container {
              padding-top: 15px;
              font-weight: 700; // k.V.
              font-size: @headline_XS;
              line-height: @headlineLineHeight_S;
              grid-column-start: 2;
              display: flex;
              gap: 5px;

            }
          }

        }

        .event-content {
          :deep(.lila-textblock) {

            h2,
            h3 {
              display: none;
            }

            h1 {
              .font-bold;
              //font-weight: 700;
              height: 102px;
              font-size: @headline_S;
              line-height: @headlineLineHeight_S;
              text-transform: capitalize;
            }

            p {
              font-weight: 700; // auch hier keine Variablen
              padding-bottom: 5px;
              line-height: 20px;
            }
          }

          @media @desktop {

            :deep(.lila-textblock) {

              h2,
              h3 {
                display: none;
              }

              h1 {
                font-size: 25px; //es gibt für die 25px  und 27px line-height keine Variable
                line-height: 27px;
                font-weight: 700;
                height: inherit;
                text-transform: capitalize;
              }
            }
          }
        }
      }

      .more-text {
        padding-bottom: 50px;

        .moreText-link {
          .font-bold;
          color: @color4;
          font-size: @headline_XS;
          line-height: @headlineLineHeight_S;
        }
      }
    }
  }

  .seperator {
    grid-column-start: 1;
    grid-row-start: 3;
    padding-bottom: 40px;

    hr {
      border-top: 1px @textColor;

    }
  }

}
</style>