import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { BasicData, Content } from '@lilaquadrat/interfaces';
import type EditorConfiguration from '@/interfaces/EditorConfiguration.interface';
import StudioSDK, { type SDKResponse } from '@lilaquadrat/sdk';
import { useAuth } from '@/plugins/auth';
import type FrontendConfig from '@/interfaces/FrontendConfig.interface';
import type { AxiosError } from 'node_modules/axios/index.cjs';
import { computed } from 'vue';
import { hardCopy } from '@lilaquadrat/studio';

export const useMainStore = defineStore('main', () => {

  const startupDone = ref<boolean>(false);
  const data = ref<BasicData<Content>>();
  const layout = ref<BasicData<Content>>();
  const editorConfiguration = ref<EditorConfiguration>({});
  const fullscreen = ref<boolean>(false);
  const config = ref<FrontendConfig>();
  const staticData = ref<Record<string, Partial<BasicData<Content>>>>();
  const customModules = ref<any>();

  function setData (value: BasicData<Content>) {

    data.value = value;

  }

  function setFullscreen (value: boolean) {

    fullscreen.value = value;

    if (!document) return;

    const { body } = document;

    if (value) {

      body.classList.add('fullscreen');

    } else {

      if (body.classList.contains('fullscreen')) {
        body.classList.remove('fullscreen');
      }

    }

  }

  function checkFullscreen () {

    const elements = document.querySelectorAll('.overlay-background:not(.inactive)');

    if (!elements.length) setFullscreen(false);

  }

  function setConfiguration (value: EditorConfiguration) {

    editorConfiguration.value = value;

  }

  const apiConfig = computed(() => {

    const { authToken } = useAuth();

    return {
      authToken,
      ...config.value?.api,
      company: config.value?.company,
      project: config.value?.project,
      app    : config.value?.name as string
    }

  });

  async function getContent(params: { id: string }, type: 'public' | 'members'): Promise<SDKResponse<BasicData<Content>|undefined>>
  async function getContent(params: { internalId: string }, type: 'public' | 'members'): Promise<SDKResponse<BasicData<Content>|undefined>>
  async function getContent(params: { latest: true, predefined: true, categories: string[] }, type: 'public' | 'members'): Promise<SDKResponse<BasicData<Content>|undefined>>
  async function getContent (params: { predefined?: boolean, latest?: boolean, id?: string, internalId?: string, categories?: string[] }, type: 'public' | 'members'): Promise<SDKResponse<BasicData<Content>|undefined>> {

    let returnData: SDKResponse<BasicData<Content>|undefined>;
    const sdk = new StudioSDK(apiConfig.value);
    const targetWithType = sdk[type === 'members' ? 'members' : 'public'];

    if (params.id && data.value?.id === params.id) {

      returnData = hardCopy<SDKResponse<BasicData<Content>>>({ data: data.value, status: 200 });

    }

    if (params.internalId && data.value?._id?.toString() === params.internalId) {

      returnData = hardCopy<SDKResponse<BasicData<Content>>>({ data: data.value, status: 200 });

    }

    if (returnData) return returnData;

    try {

      if (params.predefined && !params.latest && params.id && type === 'public') {

        returnData = await sdk.public.content.predefined(params.id);

      } else if (params.predefined && params.latest && params.categories && type === 'public') {

        returnData = await sdk.public.content.predefinedLatest(params.categories);

      } else if (params.internalId) {

        returnData = await targetWithType.content.getByInternalId(params.internalId);

      } else if (params.id) {

        returnData = await targetWithType.content.getById(params.id);

      }

    } catch (e) {

      const error = e as AxiosError;

      console.log(error);

      if (!error.response?.status) {

        returnData = { status: 400 } 

      } else {

        returnData = { status: error?.response?.status };

      }

    }

    return returnData;

  }

  return {
    setData,
    data,
    layout,
    fullscreen,
    setFullscreen,
    checkFullscreen,
    setConfiguration,
    configuration: editorConfiguration,
    getContent,
    startupDone,
    config,
    staticData,
    apiConfig,
    customModules
  }

});

export default useMainStore;