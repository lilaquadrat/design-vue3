import type { RouteRecordRaw } from 'vue-router';
import PreviewView from '@/views/preview.view.vue';
import ContentView from '@/views/content.view.vue';
import EditorView from '@/views/editor.view.vue';
import MainView from '@/views/main.view.vue';
import LoginView from '@/views/login.view.vue';

const routes: readonly RouteRecordRaw[] = [
  {
    path     : '/',
    component: MainView,
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
        name     : 'public-home', // Changed to 'home' for uniqueness
        component: ContentView,
        meta     : {
          contentType: 'public'
        }
      },
      {
        path     : '/:pathMatch(.*)*', // Catch-all route
        name     : 'public-content', // Ensured unique name
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
  {
    path     : '/preview/:pathMatch(.*)?',
    name     : 'preview',
    component: PreviewView
  },
];
const editorRoutes: readonly RouteRecordRaw[] = [
  {
    path     : '/editor',
    name     : 'editor',
    component: EditorView
  },
];

export {
  routes,
  editorRoutes
};
