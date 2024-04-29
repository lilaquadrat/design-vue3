<script setup lang="ts">
import { defineProps, defineOptions, ref, computed, onBeforeMount } from 'vue';
import { useInview } from '../../plugins/inview';
import dayjs from 'dayjs';
import type Link from '../../interfaces/link.interface';
import type Event from '../../interfaces/Event.interface';
import { hardCopy } from '@lilaquadrat/studio/lib/esm/frontend';
import { useTranslations } from '@/plugins/translations';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  elements: Event[];
  variant?: string[];
  date: string;
}>();
const useElements = ref<(Event & {dateString?: string})[]>([]);
const {translate} = useTranslations();

function componentType (link?: Link): 'lila-link-partial' | 'section' {
  return link?.link?.length ? 'lila-link-partial' : 'section';
}

onBeforeMount(() => {

  setElements();

});

function setElements() {

  const safeElements = hardCopy(props.elements);

  safeElements.forEach((single: Event & {dateString?: string}) => {

    console.log(single);
    if(single.start && single.end) {

      if(dayjs(single.end).diff(single.start, 'hours') > 24) {

        console.log(`until ${dayjs(single.end)}`);
        single.dateString = translate.translate('event-until', [dayjs(single.start).format('hh:mm').toString(), dayjs(single.end).format('DD.MM.YYYY hh:mm').toString()]);

      }

      if(dayjs(single.end).diff(single.start, 'hours') < 24) {

        console.log(`until ${dayjs(single.end)}`);
        single.dateString = translate.translate('event-short', [dayjs(single.start).format('hh:mm').toString(), dayjs(single.end).format('hh:mm').toString()]);

      }

    }

    useElements.value.push(single);

  });

}


</script>

<template>
  <section class="lila-eventgroup-partial">

      <time class="time-container">
        <div>
          {{ $helpers.date(date, 'DD') }}
        </div>
        <div>
          {{ $helpers.date(date, 'dd') }}
        </div>
      </time>

      <section class="events-container">

        <section class="single-event" v-for="(single, index) in useElements" :class="{hasPicture: single.picture}" :key="`events-${index}`">
  
          <lila-picture-partial v-if="single.picture" v-bind="single.picture" fit class="picture-container" />
  
          <section class="event-info">

            <section class="date-location">
              <section class="date">
                <div class="day">
                  <template v-if="!single.dateString">{{ $helpers.date(single.start) }} - {{ $helpers.date(single.end) }} </template>
                  {{ single.dateString }}
                </div>
              </section>
              <div class="location"><lila-icons-partial type="location" size="large" class="icon green" /> {{ single.location }}</div>
            </section>

            <section class="title">
              <h2 class="artist">{{ single.artist }}</h2>
              <h1 class="name">{{ single.name }}</h1>
              <p>{{ single.description || single.textblock.intro }}</p>
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
      grid-template-columns: 180px 5fr;
    }

    align-items: start;
    align-content: start;

    .headlines;

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
        .multi(margin-top, 6);
        justify-self: center;
        font-size: @headline_XL;
        line-height: @headlineLineHeight_XL;
      }

    }

    .events-container {

      display: grid;
      gap: 120px 0;
      justify-items: start;
      justify-content: start;

      .single-event {
        display: grid;
        grid-column-start: 2;
  
        &.hasPicture {
          grid-template-columns: 200px 1fr;
          gap: 40px;
        }
  
        .event-info {
          display: grid;
          gap: 15px;
  
          .date-location {
            display: grid;
            grid-template-columns: max-content max-content;
            align-items: start;
            gap: 40px;
    
            .location {
              display: grid;
              grid-template-columns: max-content 1fr;
              line-height: @headlineLineHeight_M;
              align-items: center;
              gap: 5px;
              color: @success;
              .font-bold;
            }
    
            .date {
              .font-bold;
              color: @textColor;
              display: grid;
              gap: 15px;
    
              .day {
                font-size: @headline_M;
                line-height: @headlineLineHeight_M;
              }
    
              .time {
                font-size: @headline_XS;
              }
            }
            
          }
    
          .title {
            display: grid;
            gap: 15px;
    
            p {
              .font-bold;
            }
          }
        }
  
      }
    }


}
</style>
