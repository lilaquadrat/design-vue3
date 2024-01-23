import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTranslationsStore = defineStore('translations', () => {

  const translations = ref<Record<string, Record<string, string>>>({});

  function add (key: string, value: Record<string, string>) {

    translations.value[key] = {...translations.value[key], ...value};

  }

  return { 
    add,
    translations
  }

})


export default useTranslationsStore;