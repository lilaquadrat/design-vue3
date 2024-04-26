<script setup lang="ts">
import { defineProps, defineOptions, ref, computed, onBeforeMount } from 'vue';
import { useInview } from '../../plugins/inview';
import dayjs from 'dayjs';
import type Link from '../../interfaces/link.interface';
import type EventGroupElement from '../../interfaces/EventGroupElement';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  elements: EventGroupElement[];
  variant?: string[];
  date: string;
}>();
const elementsContainer = ref<HTMLElement>();
const parentElement = ref<HTMLElement>();
const imageContainer = ref<HTMLElement>();
const eventsElements = ref<EventGroupElement[]>([]);
const { inviewState } = useInview(parentElement, { align: props.variant ? props.variant?.includes('align') : false });

function componentType (link?: Link): 'lila-link-partial' | 'section' {
  return link?.link?.length ? 'lila-link-partial' : 'section';
}

onBeforeMount(() => {
  setElements(props.elements);
});

/**
 * organizes an array of EventGroupElement objects into groups by their start date
 * each EventGroupElement is then mapped to a new object structure that includes its given content
 */
function setElements (elements: EventGroupElement[]) {
  const groupedEvents: any[] = [];
  const groupedContent: any[] = [];

  elements.forEach((item) => {
    const eventContent = {
      textblock: {
        headline: item.textblock.headline,
        subline : item.textblock.subline,
        intro   : item.textblock.intro,
        text    : item.textblock.text,
      },
      link    : item.link,
      moreText: item.moreText,
      icon    : item.icon,
      picture : item.picture,
    };

    if (item.startDate) {
      let group = groupedEvents.find((group) => group.date === item.startDate);

      if (!group) {
        group = {
          date  : item.startDate,
          events: [],
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
        ...event,
      });
    });
  });

  eventsElements.value = groupedContent;
}

//const date = computed(() => ({day: props.date ? dayjs(props.date).format('DD') : '', weekDay: props.date ? dayjs(props.date).format('DD').toUpperCase() : ''}));
// const time = computed(() => ({
//   firstDigit : props.date ? dayjs(props.date).format('DD')[0] : '',
//   secondDigit: props.date ? dayjs(props.date).format('DD')[1] : '',
//   firstChar  : props.date ? dayjs(props.date).format('dd')[0] : '',
//   secondChar : props.date ? dayjs(props.date).format('dd').toUpperCase()[1] : '',
// }));

</script>

<template>
  <section ref="parentElement" class="lila-eventgroup-partial" :class="[inviewState]">

      <time class="time-container">
        <div>
          {{ $helpers.date(date, 'DD') }}
        </div>
        <div>
          {{ $helpers.date(date, 'dd') }}
        </div>
      </time>

      <section ref="elementsContainer" class="single-event-container" v-for="(single, index) in eventsElements" :key="`events-${index}`">
        <component :is="componentType(single.link)" v-if="single.picture" v-bind="single.link">
          <section class="img-container" ref="imageContainer">
            <lila-picture-partial v-if="single.picture" v-bind="single.picture" fit class="picture-container" />
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
                    <lila-link-partial v-if="single.link?.text" v-bind="single.link?.text" />
                    {{ single.link?.link }}
                  </section>
                </section>
              </component>
            </section>
          </section>

          <section class="event-content">
            <lila-textblock-partial v-if="single.textblock" v-bind="single.textblock" />
            <section class="more-text">
              <component :is="componentType(single.moreText)" v-bind="single.moreText">
                {{ single.moreText?.text }}
              </component>
            </section>
          </section>
        </section>

      </section>
    </section>
</template>
<style lang="less" scoped>
.lila-eventgroup-partial {
    display: grid;
    gap: 50px 0;
    grid-template-columns: 80px 1fr;

    @media @desktop {
      grid-template-columns: 1fr 5fr;
    }

    align-items: start;
    align-content: start;

    .time-container {
      display: grid;
      .font-head;
      font-size: @headline_L;
      line-height: @headlineLineHeight_L;
      font-variant-numeric: tabular-nums;
      text-transform: uppercase;
      letter-spacing: 1px;
      align-self: start;
      justify-self: start;
      
      @media @desktop {
        align-self: center;
        justify-self: center;
        font-size: @headline_XL;
        line-height: @headlineLineHeight_XL;
      }

    }

    .single-event-container {
      display: grid;
      gap: 40px;
      width: 100%;
      overflow: hidden;
      grid-column-start: 2;
      
      @media @desktop {
        grid-template-columns: max-content 1fr;
      }

      .informations-container {
        display: grid;
        align-items: start;
        align-content: start;
        gap: 15px;

        .event-info {
          display: grid;
          .multi(margin-top, 4);

          :deep(.lila-textblock) {
            gap: 0;
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
          }
          .event-link-info {
            display: grid;
            align-items: start;
            gap: 15px;

            @media @desktop {
              grid-column-start: 1;
              grid-template-columns: max-content max-content;
              gap: 55px;
            }

            .link-container {
              font-size: @headline_XS;
              line-height: @headlineLineHeight_S;
              grid-column-start: 2;
              display: flex;
              gap: 5px;
              .font-bold;
            }
          }
        }
        
        .event-content {
          display: grid;
          gap: 10px;

          :deep(.lila-textblock) {
            h2,
            h3 {
              display: none;
            }
            h1 {
              font-size: @headline_S;
              line-height: @headlineLineHeight_S;
            }

            p {
              font-weight: 700; // auch hier keine Variablen
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
              }
            }
          }
          .more-text {

            :deep(.lila-link) {
              color: @color1;
              .font-bold;
              font-size: @headline_XS;
              font-style: italic;
              line-height: @headlineLineHeight_S;
            }
          }
        }
      }
    }
}
</style>
