import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { BasicData, Content } from '@lilaquadrat/interfaces';
import type EditorConfiguration from '@/interfaces/EditorConfiguration.interface';
import type ApiConfig from '@/interfaces/ApiConfig';
import StudioSDK, { type SDKResponse } from '@lilaquadrat/sdk';

export const useMainStore = defineStore('main', () => {

  const data = ref<Partial<Content>>({});
  const layout = ref<Partial<Content>>({});
  const configuration = ref<EditorConfiguration>({});
  const fullscreen = ref<boolean>(false);
  const apiConfig = ref<ApiConfig>({
    mode           : 'custom',
    customEndpoints: {
      api  : 'http://localhost:9090',
      media: 'http://localhost:9091',
    },
    company: 'company',
    project: 'project',
  })

  function setData (value: Partial<Content>) {

    data.value = value;

  }

  function setFullscreen (value: boolean) {

    fullscreen.value = value;

    if (!document) return;

    const { body } = document;

    if (value) {

      body.classList.add('fullscreen');

    } else {

      body.classList.remove('fullscreen');

    }

  }

  function checkFullscreen () {

    const elements = document.querySelectorAll('.overlay-background:not(.inactive)');

    if(!elements.length) setFullscreen(false);

    console.log(elements.length);
    
  }

  function setConfiguration (value: EditorConfiguration) {

    configuration.value = value;

  }

  async function getContent (params: { id: string }): Promise<SDKResponse<BasicData<Content>>>
  async function getContent (params: { internalId: string }): Promise<SDKResponse<BasicData<Content>>>
  async function getContent (params: { latest: true, predefined: true, categories: string[] }): Promise<SDKResponse<BasicData<Content>>>
  async function getContent (params: { predefined?: boolean, latest?: boolean, id?: string, internalId?: string, categories?: string[] }): Promise<SDKResponse<BasicData<Content>>> {

    const data = ref<SDKResponse<BasicData<Content>>>();
    const sdk = new StudioSDK('design', apiConfig.value);

    try {

      if (params.predefined && !params.latest && params.id) {

        data.value = await sdk.public.content.predefined(params.id);
  
      } else if (params.predefined && params.latest && params.categories) {
  
        data.value = await sdk.public.content.predefinedLatest(params.categories);
  
      } else if(params.internalId) {
  
        data.value = await sdk.public.content.getByInternalId(params.internalId);
  
      } else if(params.id) {
  
        data.value = await sdk.public.content.getById(params.id);
  
      }

    } catch (error) {

      data.value = {status: error.response.status};
      
    }

    return data.value;

  }

  return { 
    setData, 
    data, 
    layout, 
    fullscreen, 
    setFullscreen,
    checkFullscreen,
    setConfiguration,
    configuration,
    apiConfig,
    getContent
  }

});

export default useMainStore;