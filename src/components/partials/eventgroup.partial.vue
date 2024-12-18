<script setup lang="ts">
import { ref, onBeforeMount, watch, onServerPrefetch } from 'vue';
import dayjs from 'dayjs';
import type Event from '../../interfaces/Event.interface';
import { hardCopy } from '@lilaquadrat/studio/lib/esm/frontend';
import { useTranslations } from '@/plugins/translations';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  elements: Event[];
  variant?: string[];
  date: string;
}>();
const useElements = ref<(Event & { dateString?: string })[]>([]);
const { translate } = useTranslations();

onBeforeMount(() => setElements());
onServerPrefetch(() => setElements());
watch(() => props.elements, () => setElements(), {deep: true});

function setElements () {

  const safeElements = hardCopy(props.elements);

  useElements.value = [];
  safeElements.forEach((single: Event & {dateString?: string}) => {

    if(single.start && single.end) {

      if (dayjs(single.end).diff(single.start, 'hours') > 24) {

        single.dateString = translate.translate('event-until', [dayjs(single.start).locale('de').format('HH:mm').toString(), dayjs(single.end).locale('de').format('DD.MM.YYYY HH:mm').toString()]);

      }

      if (dayjs(single.end).diff(single.start, 'hours') < 24) {

        single.dateString = translate.translate('event-short', [dayjs(single.start).locale('de').format('HH:mm').toString(), dayjs(single.end).locale('de').format('HH:mm').toString()]);

      }

    }

    useElements.value.push(single);

  });

}

</script>

<template>
  <section class="lila-eventgroup-partial" :class="[variant]">

      <time class="time-container">
        <div class="date">
          {{ $helpers.date(date, 'DD') }}
        </div>
        <div class="month">
          {{ $helpers.date(date, 'MM') }}
        </div>
        <div class="year">
          {{ $helpers.date(date, 'YY') }}
        </div>
      </time>

    <section class="events-container">

        <section class="single-event" v-for="(single, index) in useElements" :class="{hasPicture: single.picture?.src.length}" :key="`events-${index}`">
  
          <lila-picture-partial v-if="single.picture?.src.length" v-bind="single.picture" fit class="picture-container" />
  
          <section class="event-info">

            <section class="date-location">
              <section class="date">
                <div class="day">
                  <template v-if="!single.dateString">
                    <template v-if="single.start">{{ $helpers.date(single.start) }}</template> 
                    <template v-if="single.end">- {{ $helpers.date(single.end) }}</template> 
                  </template>
                  {{ single.dateString }}
                </div>
              </section>
              <div v-if="single.location" class="location"><lila-icons-partial type="location" size="large" class="icon green" /> {{ single.location }}</div>
            </section>

            <section class="title">
              
              <lila-action-partial v-bind="single.link">
                <h2 v-if="single.artist && single.name" class="artist">{{ single.artist }}</h2>
                <h1 class="name">
                  <template v-if="single.name && single.artist || single.name && !single.artist">
                    {{ single.name }}
                  </template>
                  <template v-if="!single.name && single.artist">
                    {{ single.artist }}
                  </template>
                </h1>
              </lila-action-partial>

              <p v-if="single.description || single.textblock?.intro">{{ single.description || single.textblock?.intro }}</p>
            </section>

            <section class="callToAction" v-if="single.callToAction">
              <lila-action-partial callToAction v-bind="single.callToAction" />
            </section>

        </section>

      </section>

    </section>

  </section>
</template>
<style lang="less" scoped>
.lila-eventgroup-partial {
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 50px 30px;
    break-inside: avoid;
    
    @media @desktopSreenOnly {
      gap: 50px 0;
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

    // font-variant-numeric: tabular-nums;

    text-align: right;

    text-transform: uppercase;
    
    align-self: start;
    justify-self: center;

    position: sticky;
    top: 20px;

    color: @color1;
    
    .year {
      color: @grey;
    }
    
  }

  .lila-link, .lila-button {
    &:hover {
      h1, h2, h3, h4, h5 {
        color: @color2;
      }
    }
  }

  .events-container {

      display: grid;
      gap: 120px 0;
      justify-items: start;
      justify-content: start;
      grid-template-columns: 1fr;
      break-inside: avoid;

      .single-event {
        display: grid;
        grid-column-start: 1;
        width: 100%;
  
        &.hasPicture {
          gap: 20px 40px;
          justify-items: start;
          align-items: start;

          @media @desktopSreenOnly {
            grid-template-columns: 180px 1fr;

            .lila-figure {
              aspect-ratio: 2/3;
            }
          }
        }
  
        .event-info {
          display: grid;
          gap: 15px;
  
          .date-location {
            display: grid;
            align-items: start;
            
            @media @desktopSreenOnly {
              gap: 0 25px;
              display: flex;
              flex-wrap: wrap;
            }
    
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
                font-size: @headline_S;
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

            :deep(.lila-button), :deep(.lila-link) {
              max-width: fit-content;
              display: grid;
              gap: 15px;
            }

            h1, h2, h3, h4, h5 {
              .trans(color);
            }

            h1 {
              font-size: @headline_S;
              line-height: @headlineLineHeight_S;

              @media @desktopSreenOnly {
                font-size: @headline_M;
                line-height: @headlineLineHeight_M;
              }
            }

            h2 {
              font-size: @headline_XS;
              line-height: @headlineLineHeight_XS;

              @media @desktopSreenOnly {
                font-size: @headline_S;
                line-height: @headlineLineHeight_S;
              }
            }
    
            p {
              .font-bold;
            }
          }
        }
  
      }
    }

    &.tour {
      .events-container {
        .single-event {
          .event-info {
            gap: 10px;
          }
        }
  
      }
    }

}
</style>
