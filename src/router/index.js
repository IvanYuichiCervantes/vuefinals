import { createRouter, createWebHistory } from 'vue-router';

// Define routes directly related to App.vue functionality
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../App.vue'), // Load App.vue as the main route component
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
