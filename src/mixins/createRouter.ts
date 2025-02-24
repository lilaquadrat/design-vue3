import { createMemoryHistory, createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { smartScrollBehavior } from './scroll';

export default (routes: readonly RouteRecordRaw[]) => {

  const historyMode = import.meta.env.SSR
    ? createMemoryHistory('/')
    : createWebHistory('/');
  const router = createRouter({
    history       : historyMode,
    routes,
    scrollBehavior: smartScrollBehavior
  });

  return router;

};