<script setup lang="ts">
import { SignIn, SignInRecovery } from '@/router/routes/auth.route.ts'
import container from '@/di.ts'
import { AUTH_SERVICE_ID, AuthController } from '@/core/http/controllers/Auth.controller.ts'
import { useAuthModalControl } from '@/core/composables/useAuthModalControl.ts'
import { reactive, ref, type Ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { emailValidatorForFormElement } from '@/core/validation/email.ts'
import { loginValidatorForFormElement } from '@/core/validation/login.ts'
import {
  PASSWORD_MES_INVALID_EMPTY,
  PASSWORD_MES_INVALID_MAX_LENGTH,
  PASSWORD_MES_INVALID_MIN_LENGTH,
  PASSWORD_MES_INVALID_REGEX,
  PASSWORD_REGEX,
} from '@/core/validation/password.ts'

// withDefaults(
//   defineProps<{
//     mode: 'send-confirmation' | 'change-password'
//   }>(),
//   {},
// )

type RecoveryForm = {}

const controller = container.get<AuthController>(AUTH_SERVICE_ID)
const isVisible = ref(false)
const { openModalHandler, closeModalHandler } = useAuthModalControl(
  SignInRecovery.hashName,
  isVisible as Ref<boolean>,
)
const rules = reactive<FormRules<RecoveryForm>>({
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
  password: '',
  repeatPassword: '',
})
const submitDisabled = ref(true)

function submitForm(formEl: FormInstance | undefined) {
  console.log(formEl)
}
</script>

<template>
  <ElDialog
    v-model="isVisible"
    width="500"
    class="auth-sign-in--recovery-modal"
    @close="closeModalHandler"
    @open="openModalHandler"
  >
    <template #header><h3 class="title">Востановление пароля</h3></template>
    <ElForm :model="form" :rules="rules" label-width="auto" style="max-width: 500px" ref="formRef">
      <ElFormItem label="Пароль" prop="password">
        <ElInput
          v-model="form.password"
          type="password"
          placeholder="Не менее 8 символов, включая цифру и спецсимвол"
          show-password
        />
      </ElFormItem>
      <ElFormItem label="Повторите пароль" prop="repeatPassword">
        <ElInput
          v-model="form.repeatPassword"
          type="password"
          placeholder="Не менее 8 символов, включая цифру и спецсимвол"
          show-password
        />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <!-- todo: подтвержение -->
      <ElButton @click="submitForm(formRef)" type="primary" :disabled="submitDisabled">
        Сменить пароль
      </ElButton>
    </template>
  </ElDialog>
</template>

<style scoped lang="scss">
.auth-sign-in--recovery-modal {
}
</style>
