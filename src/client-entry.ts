import { createApp, createSSRApp } from 'vue';
import { createPinia, type StateTree } from 'pinia';

import App from './App.vue';
import createRouter from '@/mixins/createRouter';
import { loadViaDeclaration } from '@/mixins/loadComponents';
import translations from '@/plugins/translations';
import resizePlugin from '@/plugins/resize';
import de from '@/translations/de';
import HelpersPlugin from '@/plugins/filters';
import youtubePlugin from '@/plugins/youtube';
import traceablePlugin from '@/plugins/traceable';
import authPlugin from '@/plugins/auth';
import replacerPlugin from '@/plugins/replacer';
import './models';
import modules from './modules.browser';
import partials from './partials.browser';
import hooks from '@/mixins/hooks';
import logger from '@/mixins/logger';
import getRoutes from './mixins/getRoutes';

const isSSR = !!window.__INITIAL_STATE__;
const app = isSSR
  ? createSSRApp(App)
  : createApp(App);

loadViaDeclaration(modules.modules, 'lila', 'module', app);
loadViaDeclaration(partials, 'lila', 'partial', app);

const pinia = createPinia();

if (isSSR) {

  logger.ssr('set initial state');
  pinia.state.value = window.__INITIAL_STATE__ as Record<string, StateTree>;
  
}

console.log(import.meta.env);

app.use(pinia);

const router = createRouter(getRoutes());

app.use(router);

app.use(translations);
app.use(HelpersPlugin);
app.use(resizePlugin);
app.use(youtubePlugin);
app.use(traceablePlugin);
app.use(authPlugin);
app.use(replacerPlugin);

app.config.globalProperties.$translations.add(de, 'de');
app.config.globalProperties.$translations.select('de');

hooks(router);

router.isReady().then(() => {

  app.mount('#app')

});
