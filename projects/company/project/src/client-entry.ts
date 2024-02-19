import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import {routes, editorRoutes} from './routes';
import createRouter from '@/mixins/createRouter';
import {loadViaDeclaration} from '@/mixins/loadComponents';
import translations from '@/plugins/translations';
import resizePlugin from '@/plugins/resize';
import de from '@/translations/de';
import HelpersPlugin from '@/plugins/filters';
import youtubePlugin from '@/plugins/youtube';
import traceablePlugin from '@/plugins/traceable';
import authPlugin from '@/plugins/auth';
import './models';
import modules from './modules.browser';
import partials from './partials.browser';
import hooks from '@/mixins/hooks';

// const localComponents: Record<string, Record<'default', Component>> = import.meta.glob('./components/modules/*', {eager: true});
const app = createApp(App);

loadViaDeclaration(modules.modules, 'lila', 'module', app);
loadViaDeclaration(partials, 'lila', 'partial', app);

const currentUrl = new URL(window.location.toString());
const ISLOCAL = currentUrl.port === '5173' && window !== window.top;

app.use(createPinia());

const router = createRouter(ISLOCAL ? editorRoutes : routes);

app.use(router);

app.use(translations);
app.use(HelpersPlugin);
app.use(resizePlugin);
app.use(youtubePlugin);
app.use(traceablePlugin);
app.use(authPlugin);

app.config.globalProperties.$translations.add(de, 'de');
app.config.globalProperties.$translations.select('de');

app.mount('#app');

hooks(router);