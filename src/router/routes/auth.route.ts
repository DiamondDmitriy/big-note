import { useAuthStore } from '@/core/stores/AuthStore.ts'

export const SignIn = {
  hashName: 'sign_in',
}

export const SignUp = {
  hashName: 'sign_up',
}

export const SignInRecovery={
  hashName: 'sign_in_recovery',
}

export const SignOut = {
  path: '/sign-out',
  name: 'sign-out',
  component: {},
  beforeEnter: async () => {
    const authStore = useAuthStore()
    await authStore.signOut()
    return { name: 'home' }
  },
}
