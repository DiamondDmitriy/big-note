import { defineStore } from 'pinia'
import UserEntity from '@/entities/user/user.entity.ts'
import { useUserStore } from '@/features/user/user.store.ts'
import { AuthApi } from '@/pages/auth/api/auth.api.ts'

type AuthState = {
  lastChecked: number // Время последней проверки
}

const api = new AuthApi()

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
      await api.signCheck().then(({ data }) => {
        if (!data) {
          return
        }
        const userSore = useUserStore()
        userSore.setUser(
          new UserEntity(
            data.id,
            data.username,
            data.name,
            data.surname,
            data.email,
            data.birth_date,
            data.created_at,
            data.updated_at,
            data.gender,
            data.role,
          ),
        )
      })
      this.lastChecked = Date.now()
      return this.isAuthenticated
    },
    async signOut() {
      const userSore = useUserStore()
      await api.signOut()
      userSore.$reset()
    },
  },
})
