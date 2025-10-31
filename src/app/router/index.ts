import { createRouter, createWebHistory } from 'vue-router'
import type {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router'
import HomeRoute from '@/app/router/routes/home.route.ts'
import ToDoRoute from '@/app/router/routes/to-do.route.ts'
import DocsRoute from '@/app/router/routes/docs.route.ts'
import NotesRoute from '@/app/router/routes/notes.route.ts'
// import authMiddleware from '@/app/router/middleware/auth.middleware.ts'
import roleMiddleware from '@/app/router/middleware/role.middleware.ts'
import MiddlewareError from '@/app/router/middleware/error/MiddlewareError.ts'
import { SignOut } from '@/app/router/routes/auth.route.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [HomeRoute, ToDoRoute, NotesRoute, DocsRoute, SignOut],
})

// @docs: https://router.vuejs.org/guide/advanced/navigation-guards.html
router.beforeEach(
  (
    to: RouteLocationNormalizedGeneric,
    from: RouteLocationNormalizedLoadedGeneric,
    next: NavigationGuardNext,
  ) => {
    try {
      // authMiddleware(to, from)
      roleMiddleware(to, from)
      next()
    } catch (err) {
      if (err instanceof MiddlewareError) {
        console.error(err.getMessage())
        next(err.getRouteLocation())
      } else {
        console.error(err)
        next({ name: 'error' })
      }
    }
  },
)

export default router
