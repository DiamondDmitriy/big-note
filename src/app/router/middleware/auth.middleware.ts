import type {
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router'
import MiddlewareError from '@/app/router/middleware/error/MiddlewareError.ts'
import { useAuthStore } from '@/features/auth/auth.store.ts'

export default function authMiddleware(
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
) {
  const authStore = useAuthStore()
  if(!authStore.isAuthenticated){

  }

  // if (to.meta.requiresAuth && !isAuthenticated()) next('/login');
  // else next();
  // const isAuthenticated = localStorage.getItem('token');
  // if (to.meta.requiresAuth && !isAuthenticated) {
  //   next({ name: 'login' });
  // } else {
  // next()
  // }
  // if (true) {
  //   throw new MiddlewareError({ name: 'login' })
  // }
}
