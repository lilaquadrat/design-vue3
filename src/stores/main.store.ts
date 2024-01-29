import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Content } from '@lilaquadrat/studio/lib/interfaces';
import type EditorConfiguration from '@/interfaces/EditorConfiguration.interface';
import type ApiConfig from '@/interfaces/ApiConfig';

export const useMainStore = defineStore('main', () => {

  const data = ref<Partial<Content>>({});
  const layout = ref<Partial<Content>>({});
  const configuration = ref<EditorConfiguration>({});
  const fullscreen = ref<boolean>(false);
  const apiConfig = ref<ApiConfig>({
    mode: 'custom',
    customEndpoints: {
      api: 'http://localhost:9090',
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

  return { 
    setData, 
    data, 
    layout, 
    fullscreen, 
    setFullscreen,
    checkFullscreen,
    setConfiguration,
    configuration,
    apiConfig
  }

})


export default useMainStore;