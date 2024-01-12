import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Content } from '@lilaquadrat/studio/lib/interfaces';
import type EditorConfiguration from '@/interfaces/EditorConfiguration.interface';

export const useMainStore = defineStore('main', () => {

  const data = ref<Partial<Content>>({});
  const layout = ref<Partial<Content>>({});
  const configuration = ref<EditorConfiguration>({});
  const fullscreen = ref<boolean>(false);

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

  function setConfiguration (value: EditorConfiguration) {

    configuration.value = value;

  }

  return { 
    setData, 
    data, 
    layout, 
    fullscreen, 
    setFullscreen,
    setConfiguration,
    configuration
  }

})


export default useMainStore;