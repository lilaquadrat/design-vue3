import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { BasicData, Content, Customers } from '@lilaquadrat/interfaces';

export const useContentStore = defineStore('content', () => {

  const content = ref<BasicData<Content>[]>([]);
  const recipient = ref<Customers>();
  const context = ref<Record<string, string | undefined | Record<string, string>>>();

  function add (contentToAdd: Content) {

    content.value.push(contentToAdd)

  }

  function addMulti (contentToAdd: Content[]) {

    content.value.push(...contentToAdd);

  }

  function findById (id: string) {

    return content.value.find((single) => single.id === id);

  }

  function findByinternalId (internalId: string) {

    return content.value.find((single) => single._id?.toString() === internalId);

  }

  function findByFilename (filename: string) {

    return content.value.find((single) => single.settings.filename?.includes(filename));

  }

  function setContext (data: {sitetile?: string, description?: string, [key: string]: string | undefined}) {

    context.value = data;

    if(typeof document === 'undefined') return;

    if(data.sitetitle) {
      
      document.title = data.sitetitle;

    }
    
    if(data.description) {

      const metaDescription = document.querySelector('meta[name="description"]');

      if (metaDescription) {

        metaDescription.setAttribute('content', data.description);

      }

    }

  }

  return {
    add,
    addMulti,
    findById,
    findByinternalId,
    findByFilename,
    content,
    recipient,
    context,
    setContext
  }

})

export default useContentStore;