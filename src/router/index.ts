import { createRouter, createWebHistory } from 'vue-router'
import type {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router'
import HomeRoute from '@/router/routes/home.route.ts'
import ToDoRoute from '@/router/routes/toDo.route.ts'
import DocsRoute from '@/router/routes/docs.route.ts'
import NotesRoute from '@/router/routes/notes.route.ts'
import authMiddleware from '@/router/middleware/auth.ts'
import roleMiddleware from '@/router/middleware/role.ts'
import MiddlewareError from '@/router/middleware/error/MiddlewareError.ts'
import { SignOut } from '@/router/routes/auth.route.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [HomeRoute, ToDoRoute, NotesRoute, DocsRoute, SignOut],
})

router.beforeEach(
  (
    to: RouteLocationNormalizedGeneric,
    from: RouteLocationNormalizedLoadedGeneric,
    next: NavigationGuardNext,
  ) => {
    try {
      authMiddleware(to, from)
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
