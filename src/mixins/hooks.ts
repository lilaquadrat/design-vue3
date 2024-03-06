import { useMainStore } from '@/stores/main.store'
import type { Router } from 'vue-router';
import logger from './logger';
import { auth } from '@/plugins/auth';
import useUserStore from '@/stores/user.store';

export default (router: Router) => {

  router.beforeEach(async (to, from, next) => {

    const mainStore = useMainStore();
    const userStore = useUserStore();

    if (!mainStore.startupDone) {

      logger.startup('start');

      mainStore.config = __FRONTEND_CONFIG__;

      if (mainStore.config?.auth0Options) {

        await auth.init(mainStore.config.auth0Options);

      }

      await userStore.initCustomer();

      mainStore.startupDone = true;

      logger.startup('done');
    }

    next();

  });

};