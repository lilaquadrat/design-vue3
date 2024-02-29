import { createMemoryHistory, createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

export default (routes: readonly RouteRecordRaw[]) => {

  const historyMode = import.meta.env.SSR
    ? createMemoryHistory('/')
    : createWebHistory('/');
  const router = createRouter({
    history: historyMode,
    routes
  });

  console.log(historyMode);
  
  return router;

};