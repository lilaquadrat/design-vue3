import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Content, EditorActiveModule } from '@lilaquadrat/studio/lib/interfaces';
import type EditorConfiguration from '@/interfaces/EditorConfiguration.interface';

export const useEditorStore = defineStore('editor', () => {

  const active = ref<EditorActiveModule>({});
  const availableModulesWithRevision = ref<{ revision: number, modules: any[]}>();

  return { 
    active, 
    availableModulesWithRevision
  }

})


export default useEditorStore;