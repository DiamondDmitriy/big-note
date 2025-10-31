<script setup lang="ts">
import { ref, reactive, watch, type Ref } from 'vue'
import { Link } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { emailValidatorForFormElement } from '@/shared/validators/email.ts'
import { loginValidatorForFormElement } from '@/shared/validators/login.ts'
import {
  PASSWORD_MES_INVALID_EMPTY,
  PASSWORD_MES_INVALID_MAX_LENGTH,
  PASSWORD_MES_INVALID_MIN_LENGTH,
  PASSWORD_MES_INVALID_REGEX,
  PASSWORD_REGEX,
} from '@/shared/validators/password.ts'
import UserEntity from '@/entities/user/user.entity.ts'
import { useUserStore } from '@/features/user/user.store.ts'
import { SignIn, SignInRecovery } from '@/app/router/routes/auth.route.ts'
import { openAuthModalHandler, useAuthModalControl } from '@/pages/auth/model/composables/useAuthModalControl.ts'
import { AuthApi } from '@/pages/auth/api/auth.api.ts'

interface LoginForm {
  login: string
  password: string
}
const authApi = new AuthApi()
const isVisible = ref(false)
const userSore = useUserStore()
const loading = ref(false)
const rules = reactive<FormRules<LoginForm>>({
  login: [
    { required: true, message: 'Поле не может быть пустым', trigger: 'blur' },
    { min: 6, max: 20, message: 'Длина должна быть от 6 до 20 символов', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value.includes('@')) {
          emailValidatorForFormElement(value, callback)
        } else {
          // Проверка на логин
          loginValidatorForFormElement(value, callback)
        }
      },
      trigger: 'blur',
    },
  ],
  password: [
    {
      pattern: PASSWORD_REGEX,
      message: PASSWORD_MES_INVALID_REGEX,
      trigger: 'blur',
    },
    { required: true, message: PASSWORD_MES_INVALID_EMPTY, trigger: 'blur' },
    { min: 8, message: PASSWORD_MES_INVALID_MIN_LENGTH, trigger: 'blur' },
    { max: 64, message: PASSWORD_MES_INVALID_MAX_LENGTH, trigger: 'blur' },
  ],
})
const formRef = ref()
const form = reactive({
  login: '',
  password: '',
})
const submitDisabled = ref(true)
const { openModalHandler, closeModalHandler } = useAuthModalControl(
  SignIn.hashName,
  isVisible as Ref<boolean>,
)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  let formValid: boolean = false

  await formEl.validate((valid) => {
    formValid = valid
  })

  if (!formValid) {
    return
  }

  loading.value = true
  await authApi
    .signIn({ login: form.login, password: form.password })
    .then(({ data }) => {
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
          data.role,
        ),
      )
      isVisible.value = false
    })
    .catch((e) => {
      console.error(e)
    })
    .finally(() => {
      loading.value = false
    })
}

watch(
  () => [form.login, form.password],
  async () => {
    try {
      await formRef.value.validate()
      submitDisabled.value = false
    } catch (_) {
      submitDisabled.value = true
    }
  },
)
</script>

<template>
  <ElDialog
    v-model="isVisible"
    width="500"
    class="auth-sign-in-modal"
    @close="closeModalHandler"
    @open="openModalHandler"
  >
    <template #header><h3 class="title">Войти в Big Note</h3></template>
    <ElForm :model="form" :rules="rules" label-width="auto" ref="formRef">
      <ElFormItem label="Логи или email" prop="login">
        <ElInput v-model="form.login" placeholder="Введите логин" />
      </ElFormItem>
      <ElFormItem label="Пароль" prop="password">
        <ElInput
          v-model="form.password"
          type="password"
          placeholder="Не менее 8 символов, включая цифру и спецсимвол"
          show-password
        />
      </ElFormItem>
      <ElFormItem label="Войти с помощью:">
        <ElButton :icon="Link" size="small" circle />
        <ElButton :icon="Link" size="small" circle />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElLink
        class="lnk-to-auth-recovery"
        type="primary"
        @click="
          () => {
            closeModalHandler()
            openAuthModalHandler(SignInRecovery.hashName)
          }
        "
      >
        Забыл пароль?
      </ElLink>
      <ElButton @click="submitForm(formRef)" type="primary" :disabled="submitDisabled">
        Войти
      </ElButton>
    </template>
  </ElDialog>
</template>

<style scoped lang="scss">
.auth-sign-in-modal {
  .lnk-to-auth-recovery {
    margin-right: 25px;
  }
}
</style>
