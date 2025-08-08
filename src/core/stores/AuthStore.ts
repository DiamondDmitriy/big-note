import { defineStore } from 'pinia'
import container from '@/di.ts'
import { AUTH_SERVICE_ID, AuthController } from '@/core/http/controllers/Auth.controller.ts'
import User from '@/core/models/User.ts'
import { useUserStore } from '@/core/stores/UserStore.ts'

type AuthState = {
  lastChecked: number // Время последней проверки
}

export const useAuthStore = defineStore('auth', {
  state(): AuthState {
    return {
      lastChecked: 0,
    }
  },
  getters: {
    isAuthenticated: () => {
      const userSore = useUserStore()
      return !!userSore.id
    },
  },
  actions: {
    async checkAuth(): Promise<boolean> {
      const controller = container.get<AuthController>(AUTH_SERVICE_ID)
      await controller
        .signCheck()
        .then(({ data }) => {
          if (!data) {
            return
          }
          const userSore = useUserStore()
          userSore.setUser(
            new User(
              data.id,
              data.username,
              data.name,
              data.surname,
              data.email,
              data.birth_date,
              data.created_at,
              data.updated_at,
              data.role,
            ),
          )
        })
      this.lastChecked = Date.now()

      return this.isAuthenticated
    },
    async signOut() {
      const userSore = useUserStore()
      const controller = container.get<AuthController>(AUTH_SERVICE_ID)
      await controller.signOut()
      userSore.$reset()
    },
  },
})
