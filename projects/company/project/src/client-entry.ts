import { createApp, createSSRApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { routes, editorRoutes } from './routes';
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

// const localComponents: Record<string, Record<'default', Component>> = import.meta.glob('./components/modules/*', {eager: true});
const app = createSSRApp(App);

loadViaDeclaration(modules.modules, 'lila', 'module', app);
loadViaDeclaration(partials, 'lila', 'partial', app);

const pinia = createPinia();

// Check if the server provided initial state and hydrate the stores if so
if (window.__INITIAL_STATE__) {

  console.log('LOAD SSR PINIA STATE', window.__INITIAL_STATE__, window !== window.top);
  pinia.state.value = window.__INITIAL_STATE__;
}

app.use(pinia);

const router = createRouter(window !== window.top ? editorRoutes : routes);

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
