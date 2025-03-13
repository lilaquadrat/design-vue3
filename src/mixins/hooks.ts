import { useMainStore } from '@/stores/main.store'
import type { Router } from 'vue-router';
import logger from './logger';
import { auth } from '@/plugins/auth';
import useUserStore from '@/stores/user.store';

export default (router: Router, options?: {initAuth?: boolean}, target: 'server' | 'client' = 'server') => {

  router.beforeEach(async (to, from, next) => {

    const mainStore = useMainStore();
    const userStore = useUserStore();

    if (!mainStore.startupDone) {

      logger.startup('start');

      if(!mainStore.config) {
        mainStore.config = __FRONTEND_CONFIG__;
      }

      if(options?.initAuth !== false){
        if (mainStore.config?.auth0Options) {
  
          await auth.init(mainStore.config.auth0Options);
  
        }
  
        await userStore.initCustomer();
      }

      mainStore.startupDone = true;

      logger.startup('done');

    } else {

      if(target === 'client') {

        if(!mainStore.clientOnlyStartupDone) {

          if(options?.initAuth !== false) {
            
            if (mainStore.config?.auth0Options) {
      
              await auth.init(mainStore.config.auth0Options);
      
            }
      
            await userStore.initCustomer();
          }
    
          mainStore.clientOnlyStartupDone = true;

        }

      }

    }

    if(mainStore.disabledLockUpdate) mainStore.disabledLockUpdate = false;

    next();

  });

};