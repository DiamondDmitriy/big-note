import type {
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router'
import MiddlewareError from '@/router/middleware/error/MiddlewareError.ts'

export default function authMiddleware(
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
) {
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
