<script setup lang="ts">
import { Tools, UserFilled } from '@element-plus/icons-vue'
import ThemeSwitch from '@/widgets/ThemeSwitch.vue'
import SignInModal from '@/pages/auth/auth/SignInModal.vue'
import logo from '@/shared/assets/images/logo.png'
import { ref, reactive, markRaw } from 'vue'
import SignUpModal from '@/pages/auth/auth/SignUpModal.vue'
import { useAuthStore } from '@/features/auth/auth.store.ts'
import { useUserStore } from '@/features/user/user.store.ts'
import LogoutIcon from '@/shared/components/icons/LogoutIcon.vue'
import SignInRecoveryModal from '@/pages/auth/auth/SignInRecoveryModal.vue'
import { SignIn, SignUp } from '@/app/router/routes/auth.route.ts'

const authStore = useAuthStore()
const userStore = useUserStore()

const profileMenuVisible = ref(false)
const profileMenuItems = reactive([
  {
    iconComponent: markRaw(Tools),
    label: 'Профиль',
    route: 'user-settings',
  },
  {
    iconComponent: markRaw(LogoutIcon),
    label: 'Выйти',
    route: '/sign-out',
  },
])

function openModalHandler(hashName: string) {
  window.location.hash = hashName
}
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'home' }">
        <img :src="logo" alt="" height="30" />
      </router-link>
    </div>

    <div class="header__content">
      <ThemeSwitch />

      <div class="header-user-profile" v-if="authStore.isAuthenticated">
        <ElPopover
          placement="bottom"
          :width="200"
          :hide-after="0"
          trigger="click"
          v-model:visible="profileMenuVisible"
        >
          <template #reference>
            <ElAvatar :icon="UserFilled" :size="30" />
          </template>
          <template #default>
            <div class="header-user-profile__info">
              <h5 class="title">{{ userStore.fullName }}</h5>
              <span class="email">{{ userStore.email }}</span>
            </div>
            <ElMenu class="header-user-profile-menu" router>
              <!--              @open="handleOpen"-->
              <!--              @close="handleClose"-->
              <ElMenuItem
                v-for="(item, index) in profileMenuItems"
                :key="index"
                :index="item.route"
                collapse
                @click="profileMenuVisible = false"
              >
                <ElIcon v-if="item.iconComponent">
                  <component :is="item.iconComponent" />
                </ElIcon>
                <span>{{ item.label }}</span>
              </ElMenuItem>
            </ElMenu>
          </template>
        </ElPopover>
      </div>
      <div class="auth" v-else>
        <ElButton @click="openModalHandler(SignUp.hashName)" round>Регистрация</ElButton>
        <ElButton @click="openModalHandler(SignIn.hashName)" round type="primary">Войти</ElButton>
      </div>
    </div>
  </header>

  <SignInModal />
  <SignInRecoveryModal />
  <SignUpModal />
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--base-border);
  height: var(--header-height);
  padding: 0 var(--site-content-offset-horizon);
  background-color: var(--base-background);

  &__logo {
    display: flex;
  }

  &__content {
    display: flex;
    margin-left: auto;
    align-items: center;
    gap: 24px;

    .header-user-profile {
      cursor: pointer;
      display: flex;
      gap: 15px;
    }
  }
}

.header-user-profile {
  &__info {
    margin-bottom: 12px;

    .title {
      font-size: 16px;
    }

    .email {
      font-size: 12px;
      color: var(--secondary-text);
    }
  }

  &-menu {
    --el-menu-base-level-padding: 0;
    --el-menu-item-height: 46px;
    --el-menu-border-color: #ffffff;
  }
}
</style>
