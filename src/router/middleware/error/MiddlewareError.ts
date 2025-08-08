import type { MiddlewareErrorInterface } from '@/router/middleware/error/MiddlewareError.interface.ts'
import type { RouteLocationRaw } from 'vue-router'

export default class MiddlewareError extends Error implements MiddlewareErrorInterface {
  private readonly routeLocation: RouteLocationRaw

  constructor(routeLocation: RouteLocationRaw, message?: string) {
    super(message)
    this.routeLocation = routeLocation
  }

  public getRouteLocation(): RouteLocationRaw {
    return this.routeLocation
  }

  public getMessage() {
    return this.message
  }
}
