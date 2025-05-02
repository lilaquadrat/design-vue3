<script setup lang="ts">
import type ModuleBaseProps from '@/interfaces/ModuleBaseProps.interface';
import { useInview } from '@/plugins/inview';
import useMainStore from '@/stores/main.store';
import type { BasicData, Content, GenericData, GenericDataDistributed, List, ListContent, ListParticipants } from '@lilaquadrat/interfaces';
import StudioSDK from '@lilaquadrat/sdk';
import { distributeGenericData, generateDataWithContent, hardCopy, prepareContent } from '@lilaquadrat/studio/lib/esm/frontend';
import { computed, onBeforeMount, ref } from 'vue';
import type Event from '@interfaces/Event.interface';
import useDate from '@/mixins/date';
import { useTranslations } from '@/plugins/translations';

defineOptions({ inheritAttrs: false });

const props = defineProps<ModuleBaseProps & Event & {
  genericData: GenericDataDistributed;
  media: any
}>();
const list = ref<BasicData<List>>();
const state = ref<ListParticipants>();
const contentState = ref<keyof ListContent>('pre');
const contentMerged = ref();

onBeforeMount(init);

const element = ref<HTMLElement>();
const { inviewState } = useInview(element, {align: props.variant?.includes('align')});
const noMedia = computed(() => !props.media?.src);
const noContent = computed(() => props.variant?.includes('noContent'));
const onlyContent = computed(() => props.variant?.includes('onlyContent'));
const translate = useTranslations().translate;

async function init () {

  if(!noContent.value) return;

  const mainStore = useMainStore();
  const sdk = new StudioSDK(mainStore.apiConfig);
  const genericList = props.genericData.lists[0];

  if(!genericList) return;

  list.value = props.genericData.data[genericList.toString()] as BasicData<List>;

  const stateReponse = await sdk.members.lists.state(list.value._id?.toString() as string);

  state.value = stateReponse.data;

  if(list.value?.state === 'open') {

    contentState.value = 'open';

    if(state.value) {

      if(state.value.state === 'reserved') {

        contentState.value = 'waiting';

      }

      if(state.value.state === 'confirmed') {

        contentState.value = 'active';

      }

    }

  }

  if(list.value?.state === 'closed') {

    contentState.value = 'post';

  }

  if(list.value?.content[contentState.value]) {

    const contentResponse = await sdk.members.content.getByInternalId(list.value?.content[contentState.value]);

    contentMerged.value = mergeContent(contentResponse.data);

  }

}

function mergeContent (baseContent: BasicData<Content>) {

  if(baseContent) {
  
    const safeData = hardCopy(baseContent);

    if(safeData.modules) {

      distributeGenericData(safeData.modules, generateDataWithContent(safeData.genericData as GenericData));

    }

    return prepareContent(safeData);

  }

  return prepareContent({})

} 

function handleChildEvent (event: string) {

  if(event === 'reset') {

    contentMerged.value = undefined;

    init();

  }

}

const date = computed(() => {

  let dateString: string = '';

  if(props.start && props.end) {

    if (useDate(props.end).diff(props.start, 'hours') > 24) {

      dateString = translate.translate('event-until', [useDate(props.start).locale('de').format('DD.MM.YYYY HH:mm').toString(), useDate(props.end).locale('de').format('DD.MM.YYYY HH:mm').toString()]);

    }

    if (useDate(props.end).diff(props.start, 'hours') < 24) {

      dateString = translate.translate('event-short', [useDate(props.start).locale('de').format('DD.MM.YYYY HH:mm').toString(), useDate(props.end).locale('de').format('HH:mm').toString()]);

    }

  } else if(props.start) {

    dateString = translate.translate('event-single', [useDate(props.start).locale('de').format('DD.MM.YYYY HH:mm').toString()]);
  
  } else if(props.end) {
  
    dateString = translate.translate('event-single', [useDate(props.end).locale('de').format('DD.MM.YYYY HH:mm').toString()]);

  }

  return dateString

})

</script>
<template>
  <article :id="props.index?.anchor || props.id" ref="element" class="lila-event-module lila-module" :class="[inviewState, variant, {sub, noMedia}]">
    <section v-if="!onlyContent" class="main-container">
      <section class="media-container">
        <lila-video-partial v-if="media && media.type === 'video'" v-bind="media" />
        <lila-picture-partial v-if="media && media.type === 'image'" v-bind="media" fit />
        <div class="details-container">
          <h3 v-if="location" class="location">
            <lila-icons-partial type="location" size="large" class="icon green" /> {{ location }}
          </h3>
          <lila-list-partial v-bind="props.list" mode="list" :variant="['noStyle', 'bold']" />
          <lila-list-partial v-bind="links" mode="links" :variant="['noStyle', 'bold']" />
        </div>
      </section>
    
      <section class="intro-container">
        <div class="date-artist">
          <h2 class="artist">
            {{ artist }}
          </h2>
          <h4 v-if="start || end" class="date">
            {{ date }}
          </h4>
        </div>
        <h1 class="name">
          {{ name || list?.name }}
        </h1>
    
        <p v-if="description || list?.description">
          {{ description || list?.description }}
        </p>
        <lila-textblock-partial v-if="textblock" v-bind="textblock" :variant="variant" />
        <section v-if="callToAction" class="callToAction-container">
          <lila-action-partial v-bind="callToAction" />
        </section>
      </section>
    </section>

    <lila-content-module v-if="contentMerged && !noContent" sub :content="contentMerged" @event="handleChildEvent" />
  </article>
</template>

<style lang="less" scoped>
.lila-event-module {
  .module;

  @media print {
    margin: 20mm 0;
  }

  display: grid;
  gap: 120px;

  max-width: @moduleWidth_S;
  @media @desktop {
    max-width: @moduleWidth_M;
  }

  .main-container {
    display: grid;
    gap: 40px;

    .headlines;

    @media @desktop {
      max-width: @moduleWidth_L;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      
    }

    grid-template-rows: max-content max-content;

    .date-artist {

      display: grid;
      @media @desktop {
          gap: 15px;
      }

    }

    .artist,
        .date {
          font-size: @headline_XS;
          @media @desktop {
              font-size: @headline_S;
          }
        }

    .artist {
      color: @color3;
    }

    .date {
      color: @success;
    }

    .location {
      display: grid;
      
      grid-template-columns: max-content 1fr;
      align-items: center;
      
      gap: 5px;

      font-size: @headline_XS;
      
      .font-bold;
      color: @success;
    }

    .name {
      .multi(padding-top, 3);

      @media @desktop {
          font-size: @headline_XL;
          line-height: @headlineLineHeight_XL;
      }
    }

    .intro-container {
      display: grid;
      gap: 15px;
      align-content: start;
    }

    .media-container {
      display: grid;
      gap: 20px;

      grid-template-rows: min-content max-content;

      grid-row-start: 2;

      @media @desktop {
          grid-row-start: 1;
      }
    }
    
    .details-container {
      display: grid;
      gap: 10px;
      align-content: start;
    }

  }
  &.noMedia {

    max-width: @moduleWidth_S;
    grid-template-rows: max-content max-content;
    grid-template-columns: 1fr;

    .main-container {

      grid-template-columns: 1fr;

      .media-container {
        @media @desktop {
          grid-row-start: 2;

        }
      }

    }
    }

  .main-container {
    display: grid;
    gap: 40px;

    .headlines;

    @media @desktop {
      max-width: @moduleWidth_L;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      
    }

    grid-template-rows: max-content max-content;

    .date-artist {

      display: grid;
      @media @desktop {
          gap: 15px;
      }

    }

    .artist,
        .date {
          font-size: @headline_XS;
          @media @desktop {
              font-size: @headline_S;
          }
        }

    .artist {
      color: @color3;
    }

    .date {
      color: @success;
    }

    .location {
      display: grid;
      
      grid-template-columns: max-content 1fr;
      align-items: center;
      
      gap: 5px;

      font-size: @headline_XS;
      
      .font-bold;
      color: @success;
    }

    .name {
      .multi(padding-top, 3);

      @media @desktop {
          font-size: @headline_XL;
          line-height: @headlineLineHeight_XL;
      }
    }

    .intro-container {
      display: grid;
      gap: 15px;
      align-content: start;
    }

    .media-container {
      display: grid;
      gap: 20px;

      grid-template-rows: min-content max-content;

      grid-row-start: 2;

      @media @desktop {
          grid-row-start: 1;
      }
    }
    
    .details-container {
      display: grid;
      gap: 10px;
      align-content: start;
    }

  }
  &.noMedia {

    max-width: @moduleWidth_S;
    grid-template-rows: max-content max-content;
    grid-template-columns: 1fr;

    .main-container {

      grid-template-columns: 1fr;

      .media-container {
        @media @desktop {
          grid-row-start: 2;

        }
      }

    }
    }

}
</style>
