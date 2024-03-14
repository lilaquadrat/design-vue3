import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { BasicData, Content } from '@lilaquadrat/interfaces';

export const useContentStore = defineStore('content', () => {

  const content = ref<BasicData<Content>[]>([]);

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

  }

  return {
    add,
    addMulti,
    findById,
    findByinternalId,
    content
  }

})

export default useContentStore;