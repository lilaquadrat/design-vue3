import { createApp, type Component } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import {routes, editorRoutes} from './routes';
import createRouter from '@/mixins/createRouter';
import {loadViaGlob, loadViaDeclaration, getAvailableModules} from '@/mixins/loadComponents';
import translations from '@/plugins/translations';
import resizePlugin, {resize} from '@/plugins/resize';
import de from '@/translations/de';
import HelpersPlugin from '@/plugins/filters';
import youtubePlugin from '@/plugins/youtube';
import './models';
import modules from './modules';
import partials from './partials';
import useEditorStore from '@/stores/editor.store';

const globalModules: Record<string, Record<'default', Component>> = import.meta.glob('../../../../src/components/modules/*', {eager: true});
const globalPartials: Record<string, Record<'default', Component>> = import.meta.glob('../../../../src/components/partials/*', {eager: true});
const localComponents: Record<string, Record<'default', Component>> = import.meta.glob('./components/modules/*', {eager: true});
const app = createApp(App);

console.log(modules);

// loadViaGlob(localComponents, 'lila', app);
// loadViaGlob(globalModules, 'lila', app);
// loadViaGlob(globalPartials, 'lila', app);

loadViaDeclaration(modules.modules, 'lila', 'module', app);
loadViaDeclaration(partials, 'lila', 'partial', app);

const currentUrl = new URL(window.location.toString());
const ISLOCAL = currentUrl.port === '5173';

app.use(createPinia());
app.use(createRouter(ISLOCAL ? editorRoutes : routes));

app.use(translations);
app.use(HelpersPlugin);
app.use(resizePlugin);
app.use(youtubePlugin);

app.config.globalProperties.$translations.add(de, 'de');
app.config.globalProperties.$translations.select('de');

app.mount('#app');
