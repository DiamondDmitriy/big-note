import type {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router'
import { useUserStore } from '@/features/user/user.store.ts'

export default function roleMiddleware(
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
) {
  const userStore = useUserStore()

  console.log(userStore.role)
}
