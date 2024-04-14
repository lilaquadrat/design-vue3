<script setup lang="ts">
import { defineProps, defineOptions, ref, computed, onBeforeMount } from 'vue';
import { useInview } from '../../plugins/inview';
import type EventsElement from '../../interfaces/EventsElement.interface';
import dayjs from 'dayjs';
import type Link from '../../interfaces/link.interface';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  elements: EventsElement[];
  variant?: string[];
  date: string;

}>();
const elementsContainer = ref<HTMLElement>();
const parentElement = ref<HTMLElement>();
const imageContainer = ref<HTMLElement>();
const eventsElements = ref<EventsElement[]>([]);
const { inviewState } = useInview(parentElement, { align: props.variant ? props.variant?.includes('align') : false });

function componentType (link?: Link): 'lila-link-partial' | 'section' {
  return link?.link?.length ? 'lila-link-partial' : 'section';
}

onBeforeMount(() => {
  setElements(props.elements);

});

/**
 * groups all events by starting of events date
 */
function setElements (elements: EventsElement[]) {
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
      picture : item.picture
      //video   : item.video,
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
        ...event });
    });
  });
 
  eventsElements.value = groupedContent;
 
}

const dateItem = computed(() => {
  const date = props.date ? dayjs(props.date) : null;

  return {
    day    : date ? date.format('DD') : '',
    weekDay: date ? date.format('dd').toUpperCase() : '',
  };
});

</script>

<template v-if="!hasImage">
  <section ref="parentElement" class="lila-events-partial" :class="[inviewState]">
    <!-- event container mit datum -->
    
    <section class="time-container">
      <section class="time">
        <time v-if="date">{{ dateItem.day }}</time>
        <time v-if="date">{{ dateItem.weekDay }}</time>
      </section>
    </section>

    <!-- Einfügen von einzelnen Events -->
    <section ref="elementsContainer" class="elements-container" v-for="(single, index) in eventsElements"  :key="`events-${index}`">
        <section class="content-wrapper">
          <component :is="componentType(single.link)" v-bind="single.link">
            <section class="img-container" ref="imageContainer">
              <lila-picture-partial v-if="single.picture" v-bind="single.picture" class="picture-container" />
            </section>
          </component>
          <section class="informations-container">
            <!-- oberes Feld mit den Zeitangaben und den links -->
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

    <!-- Separator -->
    <section class="seperator">
      <hr />
    </section>
  </section>
</template>

<style lang="less" scoped>
.lila-events-partial {

  display: grid;
  gap: 15px 40px;
  max-width: @moduleWidth_XS;

  @media @desktop {
    padding: 0 40px;
    gap: 0 80px;
  }

  .time-container {
    display: grid;
    height: min-content;
    width: 64px;
    align-self: start;
    justify-items: center;

    @media @desktop {
      align-self: center;
    }

    .time {
      display: grid;
      gap: 15px;
      font-size: @headline_L;
      line-height: @headlineLineHeight_L;
      .font-head;

      @media @desktop {
        width: 83px;
        text-align: center;
        font-size: @headline_XL;
        line-height: @headlineLineHeight_XL;
      }
    }
  }

  .elements-container {
    grid-column-start: 2;
    display: grid;

    @media @desktop {
      padding-bottom: 40px;
      overflow-wrap: break-word;
      grid-template-columns: max-content;
    }

  .content-wrapper {

    @media @desktop {
      display: grid;
      grid-template: auto / auto 2fr;
    }
  }

  .img-container {
    grid-column-start: 1;
    width: 300px;
    height: 200px;
    overflow: hidden;

    .picture-container {
      max-width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &:empty {
      display: none;
    }

    @media @desktop {
      width: 100%;
      height: 100%;
      overflow: visible;

      .picture-container {
        object-fit: none;
        padding-right: 44px;
      }
    }
  }
  .informations-container {
    .event-info {
      display: grid;
      grid-column-start: 1;
      padding: 15px 0;

      :deep(.lila-textblock) {
        gap: 0;
        
        h1, p {
          display: none;
        }
        
        h2, h3 {
          .font-bold;
          font-size: @headline_S;
          color: @textColor;
        }
      }

      @media @desktop {
        grid-column-start: 2;
      }
      .event-link-info{
        @media @desktop {
          display: flex;
       
        gap:55px; 
        width: fit-content;
        }

        .link-container {
          padding-top: 12px; 
          .font-bold; 
          display: flex;
          gap: 5px; 
          @media @desktop {
          
          gap:10px;
          grid-column-start: 2;
         
          }
          
        }
      }
    }

    .event-content {
      :deep(.lila-textblock) {
        h2, h3 {
          display: none;
        }

        h1 {
          font-size: @headline_S;
          line-height: @headlineLineHeight_S;
          height: 102px;
          text-transform: capitalize;
          .font-bold;
        }

        p {
          .font-bold;
          padding-bottom: 5px;
          line-height: 20px;
        }
      }

      @media @desktop {
       
        :deep(.lila-textblock) {
          h2, h3 {
            display: none;
          }

          h1 {
            font-size: 25px;
            line-height: 26px;
            height: inherit;
            text-transform: capitalize;
          }

          p {
            .font-bold;
          }
        }
      }

      .more-text {
        padding-bottom: 50px;

        .moreText-link {
          .font-bold;
          color: @color4;
          font-size: @headline_XS;
          line-height: 24px;
        }
      }
    }
  }
}

  .seperator {
    grid-row-start: 3;
    grid-column: 1/3;
    padding-bottom: 40px;

    hr {
      border-top: 1px @textColor;
      padding: 0 40px;
    }
  }
}

</style>
<style lang="less" scoped>
.lila-events-partial {

  display: grid;
  gap: 15px 40px;

  @media @desktop {
    max-width: @moduleWidth_M;
    padding: 0 40px;
    gap: 0 80px;
  }

  .time-container {
    display: grid;
    height: min-content;
    width: 64px;
    align-self: start;
    justify-items: center;

    @media @desktop {
      align-self: center;
    }

    .time {
      display: grid;
      gap: 15px;
      font-size: @headline_L;
      line-height: @headlineLineHeight_L;
      .font-head;

      @media @desktop {
        width: 83px;
        text-align: center;
        font-size: @headline_XL;
        line-height: @headlineLineHeight_XL;
      }
    }
  }

  .elements-container {
    grid-column-start: 2;
    display: grid;

    @media @desktop {
      padding-bottom: 40px;
      overflow-wrap: break-word;
      grid-template-columns: max-content;
    }

  .img-container {
    grid-column-start: 1;
    width: 300px;
    height: 200px;
    overflow: hidden;

    .picture-container {
      max-width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &:empty {
      display: none;
    }

    @media @desktop {
      width: 100%;
      height: 100%;
      overflow: visible;

      .picture-container {
        object-fit: none;
        padding-right: 44px;
      }
    }
  }
  .informations-container {
    .event-info {
      display: grid;
      grid-column-start: 1;
      padding: 15px 0;

      :deep(.lila-textblock) {
        gap: 0;
        
        h1, p {
          display: none;
        }
        
        h2, h3 {
          .font-bold;
          font-size: @headline_S;
          color: @textColor;
        }
      }

      @media @desktop {
        grid-column-start: 2;
      }
      .event-link-info{
        @media @desktop {
          display: flex;
       
        gap:55px; 
        width: fit-content;
        }

        .link-container {
          padding-top: 12px; 
          // .font-bold; 
          display: flex;
          gap: 5px; 
          @media @desktop {
          
          gap:10px;
          grid-column-start: 2;
         
          }
          
        }
      }
    }

    .event-content {
      :deep(.lila-textblock) {
        h2, h3 {
          display: none;
        }

        h1 {
          font-size: @headline_S;
          line-height: @headlineLineHeight_S;
          height: 102px;
          text-transform: capitalize;
          .font-bold;
        }

        p {
          .font-bold;
          padding-bottom: 5px;
          line-height: 20px;
        }
      }

      @media @desktop {
       
        :deep(.lila-textblock) {
          h2, h3 {
            display: none;
          }

          h1 {
            font-size: 25px;
            line-height: 26px;
            height: inherit;
            text-transform: capitalize;
          }

          p {
            .font-bold;
          }
        }
      }

      .more-text {
        padding-bottom: 50px;

        .moreText-link {
          .font-bold;
          color: @color4;
          font-size: @headline_XS;
          line-height: 24px;
        }
      }
    }
  }
}

  .seperator {
    grid-row-start: 3;
    grid-column: 1/3;
    padding-bottom: 40px;

    hr {
      border-top: 1px @textColor;
      padding: 0 40px;
    }
  }
}

</style>
