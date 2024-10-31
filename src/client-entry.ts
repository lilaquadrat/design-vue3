import './models';
import hooks from '@/mixins/hooks';
import getRoutes from './mixins/getRoutes';
import './plugins/inview';
import { getAppInstance } from './main';

const { app, router } = getAppInstance({data: {target: 'browser'}}, getRoutes(), !!window.__INITIAL_STATE__);

hooks(router);

router.isReady().then(() => {

  app.mount('#app');

});
