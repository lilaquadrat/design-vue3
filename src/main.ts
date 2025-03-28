import { createApp, createSSRApp } from 'vue';
import { createPinia, type StateTree } from 'pinia';
import App from './App.vue';
import createRouter from '@/mixins/createRouter';
import { loadViaDeclarationSync } from '@/mixins/loadComponents';
import translations from '@/plugins/translations';
import resizePlugin from '@/plugins/resize';
import de from '@/translations/de';
import HelpersPlugin from '@/plugins/filters';
import youtubePlugin from '@/plugins/youtube';
import traceablePlugin from '@/plugins/traceable';
import authPlugin from '@/plugins/auth';
import replacerPlugin from '@/plugins/replacer';
import currencyPlugin from '@/plugins/currency';
import './models';
import modules from './modules.browser';
import partials from './partials.browser';
import modulesMail from './modules.mail';
import partialsMail from './partials.mail';
import type { RouteRecordRaw } from 'vue-router';
import logger from './mixins/logger';
import useMainStore from './stores/main.store';

export function getAppInstance (context: any, routes: readonly RouteRecordRaw[], isSSR: boolean) {

  const app = isSSR
    ? createSSRApp(App)
    : createApp(App);
  const pinia = createPinia();

  app.use(pinia);

  if (isSSR) {

    logger.ssr('set initial state');
    pinia.state.value = window.__INITIAL_STATE__ as Record<string, StateTree>;
    
  } else {

    const mainStore = useMainStore();
  
    mainStore.data = context.data;
    mainStore.layout = context.layout;
    mainStore.target = context.data?.target || 'browser';
    mainStore.configuration = context.settings;

  }

  if(context.data?.target === 'mail') {

    loadViaDeclarationSync(modulesMail.modules, 'lila', 'module', app);
    loadViaDeclarationSync(partialsMail, 'lila', 'partial', app);

  } else {

    loadViaDeclarationSync(modules.modules, 'lila', 'module', app);
    loadViaDeclarationSync(partials, 'lila', 'partial', app);

  }

  const router = createRouter(routes);

  app.use(translations);
  app.use(HelpersPlugin);
  app.use(resizePlugin);
  app.use(youtubePlugin);
  app.use(traceablePlugin);
  app.use(authPlugin);
  app.use(replacerPlugin);
  app.use(currencyPlugin);

  app.config.globalProperties.$translations.add(de, 'de');
  app.config.globalProperties.$translations.select('de');

  app.use(router);

  return { app, router, pinia };
}
