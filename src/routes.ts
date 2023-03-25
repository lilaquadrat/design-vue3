import type { RouteRecordRaw } from 'vue-router'
import ContentView from './views/content.view.vue'
import SecondView from './views/second.view.vue'

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'editor',
    component: ContentView
  },
  {
    path: '/second',
    name: 'second',
    component: SecondView
  },
]

export default routes
