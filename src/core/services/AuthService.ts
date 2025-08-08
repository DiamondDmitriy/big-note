import type User from '@/core/models/User.ts'
import { useUserStore } from '@/core/stores/UserStore.ts'

const userSore = useUserStore()

export default class AuthService {
  authorization(userMode: User) {
    userSore.setUser(userMode)
    // Вариант 2: Куки (безопаснее, если настроены флаги HttpOnly и Secure)
    // document.cookie = `authToken=${token}; Path=/; Secure; SameSite=Strict`
    // setAuthCookie(token)
  }

  // setAuthCookie(token: string, days = 30) {
  //   const date = new Date()
  //   date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  //   const expires = 'expires=' + date.toUTCString()
  //
  //   document.cookie = `authToken=${encodeURIComponent(token)}; ${expires}; Path=/; Secure; SameSite=Strict; HttpOnly`
  // }

  getAuthCookie() {}

  deleteAuthCookie() {}
}
