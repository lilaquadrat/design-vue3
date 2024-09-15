import { type StateTree } from 'pinia';
import './models';
import hooks from '@/mixins/hooks';
import logger from '@/mixins/logger';
import getRoutes from './mixins/getRoutes';
import './plugins/inview';
import { getAppInstance } from './main';

const isSSR = !!window.__INITIAL_STATE__;
const { app, router, pinia } = getAppInstance({data: {target: 'browser'}}, getRoutes(), isSSR);

if (isSSR) {

  logger.ssr('set initial state');
  pinia.state.value = window.__INITIAL_STATE__ as Record<string, StateTree>;
  
}

hooks(router);

router.isReady().then(() => {

  app.mount('#app');

});
