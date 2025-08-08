import { type Ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/core/stores/AuthStore.ts'
import { ElNotification } from 'element-plus'

export function useAuthModalControl(hashName: string, isVisible: Ref<boolean>) {
  const route = useRoute()
  const router = useRouter()
  const authStore = useAuthStore()

  function openModalHandler() {
    window.location.hash = hashName
  }

  function closeModalHandler() {
    window.location.hash = ''
  }

  const checkRouteAndOpen = () => {
    const hasHash = route.hash === `#${hashName}`

    if (hasHash && !isVisible.value) {
      if (authStore.isAuthenticated) {
        ElNotification({
          title: 'Info',
          message: 'Вы уже авторизованы',
          type: 'info',
          position: 'bottom-right',
        })
        router.replace({ hash: '' })
        return
      }
      isVisible.value = true
    } else {
      isVisible.value = false
    }
  }

  // Проверяем при монтировании
  checkRouteAndOpen()

  // Следим за изменениями маршрута
  watch(() => route.hash, checkRouteAndOpen)

  return {
    openModalHandler,
    closeModalHandler,
  }
}

export function openAuthModalHandler(hashName: string) {
  window.location.hash = hashName
}
