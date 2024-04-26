import { ref } from 'vue'
import { defineStore } from 'pinia'
import StudioSDK from '@lilaquadrat/sdk';
import useMainStore from './main.store';
import { auth } from '@/plugins/auth';
import logger from '@/mixins/logger';
import { type CustomerPerson } from '@lilaquadrat/interfaces';

export const useUserStore = defineStore('user', () => {

  const locked = ref<string>();
  const customer = ref<{_id: string, id?: string}>();
  const emailConfirmationCode = ref<string>();
  const userData = ref<CustomerPerson>();
  const isUser = ref<boolean>(false);

  function setCustomer (customerData: {_id: string, id?: string}) {

    customer.value = customerData;
    localStorage.setItem('lila-customer', JSON.stringify(customerData));

  }

  async function initCustomer () {

    const customerData = localStorage.getItem('lila-customer');

    logger.userstore('init');

    if(customerData) {

      customer.value = JSON.parse(customerData);

    }

    if(auth.isAuth.value) {
      
      await updateLock();
      isUser.value = true;

    }

    logger.userstore('done');

  }

  async function updateLock () {

    if(auth.isAuth.value) {
      
      await getUser();

      if(!userData.value) {

        console.error('LOCK THE USE FOR MISSING CONNECTION');
        locked.value = 'user-connect';

        return;
        
      }
      
      /**
      * check if a customerId is given and user is not connected
      */
      if (!userData.value?.emailConfirmed) {
        
        console.error('LOCK THE USE FOR EMAIL VERIFICATION');
        locked.value = 'email-verified';
        
        return;
        
      }

      locked.value = undefined;

    }
    
  }

  async function getUser () {
    
    console.log('get user');

    const mainStore = useMainStore();
    const sdk = new StudioSDK(mainStore.apiConfig);

    try {
      
      StudioSDK.flushCache('me');

      const me = await sdk.members.me.get();

      userData.value = me.data;

    } catch (error) {

      console.error(error);
      
    }

  }

  return {
    locked,
    setCustomer,
    initCustomer,
    updateLock,
    customer,
    userData,
    isUser,
    getUser,
    emailConfirmationCode
  }

})

export default useUserStore;