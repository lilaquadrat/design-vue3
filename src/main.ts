import { createApp, createSSRApp } from 'vue';
import { createPinia } from 'pinia';
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
import './models';
import modules from './modules.browser';
import partials from './partials.browser';
import modulesMail from './modules.mail';
import partialsMail from './partials.mail';
import type { RouteRecordRaw } from 'vue-router';
import useMainStore from './stores/main.store';

export function getAppInstance (context: any, routes: readonly RouteRecordRaw[], isSSR: boolean) {

  const app = isSSR
    ? createSSRApp(App)
    : createApp(App);
  const pinia = createPinia();

  app.use(pinia);

  const mainStore = useMainStore();

  if(context.data.target === 'mail') {

    loadViaDeclarationSync(modulesMail.modules, 'lila', 'module', app);
    loadViaDeclarationSync(partialsMail, 'lila', 'partial', app);

  } else {

    loadViaDeclarationSync(modules.modules, 'lila', 'module', app);
    loadViaDeclarationSync(partials, 'lila', 'partial', app);

  }

  mainStore.target = context.data.target || 'browser';

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
