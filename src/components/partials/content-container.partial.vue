<script setup lang="ts">
import { ref, watch, onBeforeMount, computed } from 'vue';
import { prepareContent } from '@lilaquadrat/studio/lib/esm/frontend';
import { useTranslations } from '@/plugins/translations';
import type { BasicData, Content, ContentWithPositions } from '@lilaquadrat/interfaces';
import type { SDKResponse } from '@lilaquadrat/sdk';
import useMainStore from '@/stores/main.store';

const mainStore = useMainStore();
const { translate } = useTranslations();
const props = defineProps<{
  overlay?: boolean
  id?: string
  internalId?: string
  categories?: string[]
  latest?: boolean
  predefined?: boolean
  autoVisible?: boolean
  full?: boolean
}>();
const emits = defineEmits(['open', 'closed']);
const content = ref<ContentWithPositions>();
const error = ref<boolean>(true);
const visible = ref<boolean>(false);
const loading = ref<number>(0);
const errorContent: ContentWithPositions = {
  settings: {},
  top     : [],
  content : [
    {
      type    : 'lila-text-module',
      variant : ['center'],
      headline: translate.translate('Something went wrong'),
      intro   : translate.translate('The content is missing'),
    },
  ],
  bottom    : [],
  additional: {}
};

watch(visible, (newVisible) => {

  if (newVisible) getContent();

});

const getContent = async () => {

  if (loading.value) return false;

  error.value = false;
  content.value = undefined;
  loading.value = 100;

  let data: SDKResponse<BasicData<Content> | undefined>;
  const params: { predefined?: boolean, filename?: string, latest?: boolean, id?: string, internalId?: string, categories?: string[]} = {
    latest    : props.latest, 
    categories: props.categories as string[], 
  };

  if(props.predefined) params.predefined = true;
  if(props.id) params.id = props.id;
  if(props.internalId) params.internalId = props.internalId;

  try {

    data = await mainStore.getContent(params, 'public');

  } catch (e) {

    console.error(error);
    content.value = undefined;
    error.value = true;
    loading.value = 404;
    return false;

  }

  if(data?.status === 200 && data.data) {

    content.value = prepareContent(data.data);
    loading.value = 200;
    error.value = false;

  } else {

    content.value = undefined;
    error.value = true;
    loading.value = 404;

  }

  return true;

};
const open = () => {

  emits('open');
  visible.value = true;

};
const close = () => {

  emits('closed');
  visible.value = false;

};
const contentOrError = computed(() => (loading.value === 200 || content.value) || error.value);

onBeforeMount(async () => {

  if (props.id || props.latest || props.autoVisible) {
    await getContent();
    if(props.autoVisible) visible.value = true;
  }

});
</script>
<template>
  <section class="content-container-full" :class="{ overlay, inline: !overlay, full, visible }">
    <button v-if="overlay && !autoVisible" class="preview-text" type="button" @click="open"><slot /></button>

    <lila-client-only-partial>
      <Teleport :disabled="!overlay" to="body">
        <transition>
          <lila-overlay-background-partial v-if="visible || !overlay" background="desktop" @close="close">
            <section class="content-container" ref="container">
              <section class="content-position-container">
                <lila-content-head-partial @close="close" :hideButton="!overlay">
                  <template v-if="content && loading > 100">{{ content.settings.title }}</template>
                  <template v-if="loading > 400">{{$translate('CONTENT_NOT_FOUND')}}</template>
                  <template v-if="loading === 100">{{$translate('CONTENT_LOADING')}}</template>
                </lila-content-head-partial>
  
                <section class="scroll-container">
                  <lila-indicator-partial v-if="loading === 100">{{$translate('LOADING')}}</lila-indicator-partial>
                  <lila-content-module v-if="contentOrError" :content="error ? errorContent : content" :inline="!overlay" />
                </section>
              </section>
            </section>
          </lila-overlay-background-partial>
        </transition>
      </Teleport>
    </lila-client-only-partial>
  </section>
</template>
<style lang="less" scoped>
.content-container-full {
  display: inline;

  &.inline {
    width: 100%;
  }

  .preview-text {
    margin: 0;
    padding: 0;
    border: none;

    background: none;
    color: inherit;
    outline: none;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    text-align: inherit;
    text-decoration: underline;
    cursor: pointer;
  }
}

.lila-overlay-background {
  transition: opacity @aTime @aType, transform @aTime @aType;
  .content-container {
    display: grid;
    grid-template-columns: 1fr;
    width: calc(100% - 80px);
    height: 80vh;
    opacity: 1;
    transition: opacity @aTime @aType, transform @aTime @aType;
    overflow: hidden;

    @media @wide {
      max-width: @moduleWidth_M;
      height: 80vh;
    }

    .content-position-container {
      display: grid;
      grid-template-rows: min-content 1fr;
      background-color: @white;
      height: 80vh;

      .scroll-container {
        display: grid;
        overflow-y: scroll;

        .lila-loading-indicator {
          position: absolute;
          display: grid;
          align-self: center;
          justify-self: center;
        }
      }
    }

    &.overlay {
      opacity: 1;
      transition: opacity 0.2s @aType;

    }
  }
  &.v-leave-active, &.v-enter-active {
    
    .content-container {
      opacity: 0;
      transform: scale(0.95);
    }
  }

}
</style>
