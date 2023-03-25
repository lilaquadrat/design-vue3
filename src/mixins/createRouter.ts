import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';


export default (routes: readonly RouteRecordRaw[]) => {

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  });

  
  return router;

};