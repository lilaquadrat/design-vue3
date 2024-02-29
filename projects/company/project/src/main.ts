import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import {routes} from './routes';
import createRouter from '@/mixins/createRouter';
import {loadViaDeclaration} from '@/mixins/loadComponents';
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

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp () {

  const app = createSSRApp(App);
  const pinia = createPinia();

  app.use(pinia);
  
  loadViaDeclaration(modules.modules, 'lila', 'module', app);
  loadViaDeclaration(partials, 'lila', 'partial', app);

  const router = createRouter(routes);

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

  app.use(router);

  return { app, router, pinia };
}
