import { ref } from 'vue'
import { defineStore } from 'pinia'
import StudioSDK from '@lilaquadrat/sdk';
import useMainStore from './main.store';
import { auth } from '@/plugins/auth';
import logger from '@/mixins/logger';

export const useUserStore = defineStore('user', () => {

  const locked = ref<string>();
  const customer = ref<{_id: string, id: string}>();

  function setCustomer (customerData: {_id: string, id: string}) {

    customer.value = customerData;
    localStorage.setItem('lila-customer', JSON.stringify(customerData));

  }

  async function initCustomer () {

    const mainStore = useMainStore();
    const customerData = localStorage.getItem('lila-customer');

    logger.userstore('init');

    if(customerData) {

      customer.value = JSON.parse(customerData);

    }
    
    if(auth.isAuth.value) {
      
      const token = await auth.getTokenContent();

      /**
      * check if a customerId is given and user is not connected
      */
      if(!token?.email_verified) {
  
        console.error('LOCK THE USE FOR EMAIL VERIFICATION');
        locked.value = 'email-verified';
  
      } else {

        const sdk = new StudioSDK(mainStore.apiConfig);
        let isConnected: boolean = false;

        try {
          
          isConnected = (await sdk.apps.me.isConnected()).status === 200;

        } catch (error) {

          console.error(error);
          
        }
  
        if (!isConnected) {
    
          console.error('LOCK THE USE FOR MISSING CONNECTION');
          locked.value = 'user-connect';
    
        }

      }

    }

    logger.userstore('done');

  }

  return {
    locked,
    setCustomer,
    initCustomer,
    customer
  }

})

export default useUserStore;