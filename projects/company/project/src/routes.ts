import type { RouteRecordRaw } from 'vue-router';
import ContentView from '@/views/content.view.vue';
import EditorView from '@/views/editor.view.vue';

const routes: readonly RouteRecordRaw[] = [
  {
    path     : '/:pathMatch(.*)*',
    name     : 'preview',
    component: ContentView
  },
];
const editorRoutes: readonly RouteRecordRaw[] = [
  {
    path     : '/:pathMatch(.*)*',
    name     : 'editor',
    component: EditorView
  },
];

export {
  routes,
  editorRoutes
};
