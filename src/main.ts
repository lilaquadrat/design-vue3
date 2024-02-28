
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue';
import routes from './routes';
import type { Component } from 'vue';

import createRouter from './mixins/createRouter';
// import loadComponents from './mixins/loadComponents';

const components: Record<string, Record<'default', Component>> = import.meta.glob('./components/modules/*', {eager: true});

console.log(components);

const app = createApp(App);

// loadComponents(components, undefined, app);

app.use(createPinia());
app.use(createRouter(routes));

app.mount('#app');

