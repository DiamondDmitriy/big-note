import type { RouteLocationRaw } from 'vue-router'

export interface MiddlewareErrorInterface {
  getRouteLocation(): RouteLocationRaw
}
