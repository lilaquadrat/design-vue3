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
        text    : item.textblock.text
      },
      link    : item.link,
      moreText: item.moreText,
      icon    : item.icon,
      picture : item.picture,

    };

    if (item.startDate) {
      let group = groupedEvents.find(group => group.date === item.startDate);

      if (!group) {
        group = {
          date  : item.startDate,
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

//const date = computed(() => ({day: props.date ? dayjs(props.date).format('DD') : '', weekDay: props.date ? dayjs(props.date).format('DD').toUpperCase() : ''}));
const time = computed(() => ({
  firstDigit : props.date ? dayjs(props.date).format('DD')[0] : '', 
  secondDigit: props.date ? dayjs(props.date).format('DD')[1] : '',
  firstChar  : props.date ? dayjs(props.date).format('dd')[0] : '',
  secondChar : props.date ? ((dayjs(props.date).format('dd')).toUpperCase()[1]) : '',
}))

</script>

<template>
  <section ref="parentElement" class="lila-eventgroup-partial" :class="[inviewState]">
    <section class="elements-container">
      <!-- <section class="time-container">
        <section class="time">
          <time v-if="date">
            {{ date.day }}
          </time>
          <time v-if="date">
            {{ date.weekDay }}
          </time>
        </section>
      </section> -->

      <section class="time-container">
        <section class="time">
          <time v-bind="time">
            <div>
              <span>{{ time.firstDigit }}</span>
              <span>{{ time.secondDigit }}</span>
            </div>
            <div>
              <span>{{ time.firstChar }}</span>
              <span>{{ time.secondChar }}</span>
            </div>
          </time>
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
    <section class="seperator"> <hr /> </section>
  </section>
</template>
<style lang="less" scoped>
.lila-eventgroup-partial {
  // -webkit-font-smoothing: antialiased;
  // font-synthesis: style;
  // text-rendering: optimizeLegibility;
  .elements-container {
    display: grid;
    gap: 0 40px;
   
    @media @desktop {
      gap: 0 80px;
    }
  //  .time-container {
  //     display: grid;
  //     .font-head;
  //     font-variant-caps:small-caps ;
  //     font-variant-numeric: tabular-nums;

  //     @media @desktop {
  //       align-content: center;
    
  //     }

  //     .time {
  //       gap: 15px;
  //       display: grid;
  //       border: .5px red solid; 
  //       text-align: center;
  //       font-size: @headline_L;
  //       line-height: @headlineLineHeight_L;
  //       width: 64px;

  //       @media @desktop {
  //         width: 83px;
  //         font-size: @headline_XL;
  //         line-height: @headlineLineHeight_XL;
         
  //       }
  //     }
  //   }
    .time-container {
       display: grid; 
       .font-head;
       font-size: @headline_L;
        line-height: @headlineLineHeight_L;
        padding: 40px 0;
        width: 64px;
        
        @media @desktop {
          align-self: center;
          width: 83px;
          font-size: @headline_XL;
          line-height: @headlineLineHeight_XL;
        }
      .time {
        display: grid;
        
        justify-content: stretch;
        text-align: center;
        justify-self: center;
      }
      div {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        display: grid;
        min-width: 100%;

        }
        div:first-child {
          padding-bottom:15px;
       }
    }

    .events-container {
      display: grid;
      grid-column-start: 2;
      padding: 40px 0;
      @media @desktop {
        gap: 44px;
        grid-template-columns: max-content 100%;
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
        @media @desktop {
           width:100%;
           overflow: hidden;
        }

        .event-info {
          display: grid;

          :deep(.lila-textblock) {
            gap: 0;
            //width: fit-content;
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
              .font-bold;
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
              //.font-bold;
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
          .more-text {
            padding-bottom: 50px;

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
  .seperator {
    grid-column-start: 1;
    grid-row-start: 3;

    hr {
      border-top: 1px @textColor;
    }
  }
}
</style>