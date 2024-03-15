import type { RouteRecordRaw } from 'vue-router';
import PreviewView from '@/views/preview.view.vue';
import ContentView from '@/views/content.view.vue';
import EditorView from '@/views/editor.view.vue';
import MainViewStatic from '@/views/main-static.view.vue';
import MainViewDynamic from '@/views/main-dynamic.view.vue';
import LoginView from '@/views/login.view.vue';

const dynamicRoutes: readonly RouteRecordRaw[] = [
  {
    path     : '/',
    component: MainViewDynamic,
    children : [
      {
        path     : '/m/:pathMatch(.*)?',
        name     : 'members',
        component: ContentView,
        meta     : {
          contentType: 'members'
        }
      },
      {
        path     : '',
        name     : 'public-home',
        component: ContentView,
        meta     : {
          contentType: 'public'
        }
      },
      {
        path     : '/:pathMatch(.*)*',
        name     : 'public-content',
        component: ContentView,
        meta     : {
          contentType: 'public'
        }
      },
    ]
  },
  {
    path     : '/login-callback',
    name     : 'login-callback',
    component: LoginView
  },
];
const previewRoutes: readonly RouteRecordRaw[] = [
  {
    path     : '/',
    component: MainViewStatic,
    children : [
      {
        path     : '/:pathMatch(.*)*',
        name     : 'preview',
        component: PreviewView
      },
      {
        path     : '',
        name     : 'preview-home',
        component: PreviewView
      },
    ]
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
  dynamicRoutes,
  editorRoutes,
  previewRoutes
};
