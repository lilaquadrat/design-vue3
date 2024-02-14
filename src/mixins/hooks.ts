import {useMainStore} from '@/stores/main.store'
import type { Router } from 'vue-router';
import logger from './logger';
import { auth } from '@/plugins/auth';

export default (router: Router) => {

  router.beforeEach(async (to, from, next) => {

    const mainStore = useMainStore();

    if(!mainStore.startupDone) {

      logger.startup('start');

      mainStore.config = __FRONTEND_CONFIG__;

      if(mainStore.config?.auth0Options) {

        await auth.init(mainStore.config.auth0Options);
        
      }
      
      mainStore.startupDone = true;
      
      logger.startup('done');
    }

    console.log(to, mainStore.fullscreen);
      
    next();
      
  });

};