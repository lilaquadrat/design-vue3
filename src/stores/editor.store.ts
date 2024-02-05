import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { EditorActiveModule } from '@lilaquadrat/interfaces';

export const useEditorStore = defineStore('editor', () => {

  const active = ref<EditorActiveModule>({});
  const availableModulesWithRevision = ref<{ revision: number, modules: any[]}>();

  return { 
    active, 
    availableModulesWithRevision
  }

})


export default useEditorStore;