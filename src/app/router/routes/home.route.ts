import HomePage from '@/pages/home/ui/HomePage.vue'

export default {
  path: '/',
  name: 'home',
  component: HomePage,
  meta: {
    layout: 'only-header',
    requiresAuth: false,
  },
}
