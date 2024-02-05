import { ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid';

export const useCallStore = defineStore('calls', () => {

  const calls = ref<Record<string, 'pending' | 'resolved' | 'rejected'>>({});

  function addCall () {

    const id = uuid();

    calls.value[id] = 'pending';

    return id;

  }

  function updateCall (id: string, state: 'pending' | 'resolved' | 'rejected') {

    calls.value[id] = state;

  }

  return { 
    calls, 
    addCall,
    updateCall
  }

})


export default useCallStore;