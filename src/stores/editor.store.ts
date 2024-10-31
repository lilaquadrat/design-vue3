import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import type { EditorActiveModule } from '@lilaquadrat/interfaces';

export const useEditorStore = defineStore('editor', () => {

  const active = ref<EditorActiveModule>({});
  const availableModulesWithRevision = ref<{ revision: number, modules: any[]}>();
  const availableModulesWithRevisionMail = ref<{ revision: number, modules: any[]}>();
  const modulesBrowser = shallowRef<any>();
  const modulesMail = shallowRef<any>();
  const partialsBrowser = shallowRef<any>();
  const partialsMail = shallowRef<any>();

  return { 
    active, 
    availableModulesWithRevision,
    availableModulesWithRevisionMail,
    modulesBrowser,
    modulesMail,
    partialsBrowser,
    partialsMail,
  }

})

export default useEditorStore;