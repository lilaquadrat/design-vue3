import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { EditorActiveModule } from '@lilaquadrat/interfaces';

export const useEditorStore = defineStore('editor', () => {

  const active = ref<EditorActiveModule>({});
  const availableModulesWithRevision = ref<{ revision: number, modules: any[]}>();
  const availableModulesWithRevisionMail = ref<{ revision: number, modules: any[]}>();
  const modulesBrowser = ref<any>();
  const modulesMail = ref<any>();
  const partialsBrowser = ref<any>();
  const partialsMail = ref<any>();

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