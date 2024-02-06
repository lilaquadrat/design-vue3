import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTranslationsStore = defineStore('translations', () => {

  const translations = ref<Record<string, Record<string, string>>>({});

  function add (key: string, value: Record<string, string>) {

    const convertedObject: Record<string, string> = {};

    Object.keys(value).forEach((key) => {

      convertedObject[key.toLocaleLowerCase()] = value[key];

    });

    translations.value[key] = {...translations.value[key], ...convertedObject};

  }

  return { 
    add,
    translations
  }

})

export default useTranslationsStore;