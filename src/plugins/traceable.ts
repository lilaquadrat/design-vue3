import useCallStore from '@/stores/calls.store';
import type { Ref } from 'vue';

const plugin = {
  install: (): void => {
    console.log('traceable plugin installed');
  },
};
const useTraceable = () => {

  const { addCall, updateCall } = useCallStore();

  async function traceable<T> (promise: Promise<T>, traceId?: Ref<string|undefined>, options: {time: number} = {time: 3000}) {

    // add the new call to vuex and fetch the id
    const id = addCall();

    if(traceId) traceId.value = id;

    const minimum = new Promise<void>((resolve) => {
    
      setTimeout(() => resolve(), options.time);
    
    });
    // the minimum promise will hold the execution of allsettled
    const results = await Promise.allSettled([minimum, promise]);
    
    // no error will be thrown, we need to check the result of the given promise
    if (results[1].status === 'rejected') {
    
      updateCall(id, 'rejected');
      throw results[1].reason;
    
    } else {
    
      updateCall(id, 'resolved');
      return results[1].value;
    
    }
    
  }
  
  return {
    traceable
  }
  
};

export default plugin;
export {
  useTraceable
}