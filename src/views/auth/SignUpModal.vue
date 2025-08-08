<script setup lang="ts">
import { ref, reactive, watch, type Ref } from 'vue'
import { Link } from '@element-plus/icons-vue'
import { type FormInstance, type FormRules } from 'element-plus'
import { DateTime } from 'luxon'
import { NAME_MES_INVALID_REGEX, NAME_REGEX } from '@/core/validation/field.ts'
import { LOGIN_MES_INVALID_REGEX, LOGIN_REGEX } from '@/core/validation/login.ts'
import { CURRENT_YEAR, generateDays, generateYears, getMonths } from '@/core/helpers/datetime'
import { EMAIL_MES_INVALID_REGEX, EMAIL_REGEX } from '@/core/validation/email.ts'
import {
  PASSWORD_MES_INVALID_MATCH,
  PASSWORD_MES_INVALID_MAX_LENGTH,
  PASSWORD_MES_INVALID_MIN_LENGTH,
  PASSWORD_MES_INVALID_REGEX,
  PASSWORD_REGEX,
} from '@/core/validation/password.ts'

import container from '@/di.ts'
import { AUTH_SERVICE_ID, AuthController } from '@/core/http/controllers/Auth.controller'
import RegistrationRequest from '@/core/http/request/auth/RegistrationRequest.ts'
import { useUserStore } from '@/core/stores/UserStore.ts'
import User from '@/core/models/User.ts'
import { SignUp } from '@/router/routes/auth.route.ts'
import { useAuthModalControl } from '@/core/composables/useAuthModalControl.ts'

interface LoginForm {
  name: string
  surname: string
  dayOfBirth: string
  monthOfBirth: string
  yearOfBirth: string
  login: string
  email: string
  password: string
  repeatPassword: string
}

const controller = container.get<AuthController>(AUTH_SERVICE_ID)
const userSore = useUserStore()
const isVisible = ref(false)
const { openModalHandler, closeModalHandler } = useAuthModalControl(
  SignUp.hashName,
  isVisible as Ref<boolean>,
)
const monthList = getMonths('ru-Ru')
const rules = reactive<FormRules<LoginForm>>({
  name: [
    { min: 2, message: 'Длина должна быть от 2 символов', trigger: 'blur' },
    { max: 15, message: 'Длина должна быть до 15 символов', trigger: 'blur' },
    {
      pattern: NAME_REGEX,
      message: NAME_MES_INVALID_REGEX,
    },
  ],
  surname: [
    { min: 3, message: 'Длина должна быть от 3 символов', trigger: 'blur' },
    { max: 15, message: 'Длина должна быть до 15 символов', trigger: 'blur' },
    {
      pattern: NAME_REGEX,
      message: NAME_MES_INVALID_REGEX,
    },
  ],
  dayOfBirth: [],
  monthOfBirth: [],
  yearOfBirth: [],
  login: [
    { min: 6, message: 'Длина должна быть от 6 символов', trigger: 'change' },
    { max: 20, message: 'Длина должна быть до 20 символов', trigger: 'change' },
    {
      pattern: LOGIN_REGEX,
      message: LOGIN_MES_INVALID_REGEX,
      trigger: 'change',
    },
  ],
  email: [
    { min: 6, message: 'Длина должна быть от 6 символов', trigger: 'change' },
    { max: 20, message: 'Длина должна быть до 20 символов', trigger: 'change' },
    {
      pattern: EMAIL_REGEX,
      message: EMAIL_MES_INVALID_REGEX,
      trigger: 'change',
    },
  ],
  password: [
    {
      pattern: PASSWORD_REGEX,
      message: PASSWORD_MES_INVALID_REGEX,
      trigger: 'blur',
    },
    { min: 8, message: PASSWORD_MES_INVALID_MIN_LENGTH, trigger: 'blur' },
    { max: 64, message: PASSWORD_MES_INVALID_MAX_LENGTH, trigger: 'blur' },
  ],
  repeatPassword: [
    {
      validator: (rule, value, callback) => {
        if (value !== form.password) {
          callback(new Error(PASSWORD_MES_INVALID_MATCH))
        } else {
          callback()
        }
      },
    },
  ],
})
const formRef = ref()
const form = reactive({
  name: '',
  surname: '',
  dayOfBirth: null,
  monthOfBirth: null,
  yearOfBirth: null,
  login: '',
  email: '',
  password: '',
  repeatPassword: '',
})
const submitDisabled = ref(true)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  let formValid: boolean = false

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      formValid = true
    } else {
      console.log('error submit!', fields)
      formValid = false
    }
  })

  if (!formValid) {
    return
  }

  const date = DateTime.fromObject({
    day: parseInt(form.dayOfBirth!),
    month: parseInt(form.monthOfBirth!),
    year: parseInt(form.yearOfBirth!),
  })

  const formattedDate = date.toFormat('dd.MM.yyyy')

  if (!date.isValid) {
    console.error('Некорректная дата:', date.invalidExplanation)
    return
  }

  controller
    .signUp(
      new RegistrationRequest(
        form.name,
        form.surname,
        formattedDate,
        form.login,
        form.email,
        form.password,
      ),
    )
    .then(({ data }) => {
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
    .catch((e) => {
      console.error(e)
    })
}

function checkFieldsNotEmpty() {
  for (const key in form) {
    if (typeof form[key] === 'string' && !form[key].length) {
      return false
    } else if (!form[key]) {
      return false
    }
  }
  return true
}

watch(form, async () => {
  try {
    await formRef.value.validate()
    if (!checkFieldsNotEmpty()) {
      throw new Error('empty')
    }
    submitDisabled.value = false
  } catch (_) {
    submitDisabled.value = true
  }
})
</script>

<template>
  <ElDialog
    v-model="isVisible"
    width="500"
    @open="openModalHandler(SignUp.hashName)"
    @close="closeModalHandler"
  >
    <template #header><h3 class="title">Регистрация в Big Note</h3></template>
    <ElForm :model="form" :rules="rules" label-width="auto" style="max-width: 500px" ref="formRef">
      <ElFormItem label="Имя" prop="name">
        <ElInput v-model="form.name" placeholder="Введите Имя" />
      </ElFormItem>
      <ElFormItem label="Фамилия" prop="surname">
        <ElInput v-model="form.surname" placeholder="Введите Фамилию" />
      </ElFormItem>
      <ElFormItem label="Дата рождения" prop="surname">
        <div class="date-birth-field">
          <ElSelect
            v-model="form.dayOfBirth"
            style="width: 200px"
            placeholder="День"
            filterable
            default-first-option
            no-match-text="Не найден"
          >
            <ElOption
              v-for="(day, key) in generateDays()"
              :key="key"
              :label="day.label"
              :value="day.value"
            />
          </ElSelect>
          <ElSelect
            v-model="form.monthOfBirth"
            placeholder="Месяц"
            filterable
            default-first-option
            no-match-text="Месяц не найден"
          >
            <ElOption
              v-for="(month, key) in monthList"
              :key="key"
              :label="(() => month.label.charAt(0).toUpperCase() + month.label.slice(1))()"
              :value="month.value"
            />
          </ElSelect>
          <ElSelect
            v-model="form.yearOfBirth"
            style="width: 260px"
            placeholder="Год"
            filterable
            default-first-option
            no-match-text="Год не найден"
          >
            <ElOption
              v-for="(year, key) in generateYears(CURRENT_YEAR - 108, CURRENT_YEAR - 8)"
              :key="key"
              :label="year.label"
              :value="year.value"
            />
          </ElSelect>
        </div>
      </ElFormItem>
      <ElFormItem label="Логин" prop="login">
        <ElInput v-model="form.login" placeholder="Введите логин" autocomplete="off" />
      </ElFormItem>
      <ElFormItem label="Email" prop="email">
        <ElInput v-model="form.email" placeholder="Введите логин" autocomplete="off" />
      </ElFormItem>
      <ElFormItem label="Пароль" prop="password">
        <ElInput
          v-model="form.password"
          placeholder="Введите логин"
          autocomplete="off"
          type="password"
          show-password
        />
      </ElFormItem>
      <ElFormItem label="Повторите пароли" prop="repeatPassword">
        <ElInput
          v-model="form.repeatPassword"
          placeholder="Введите логин"
          autocomplete="off"
          type="password"
          show-password
        />
      </ElFormItem>
    </ElForm>
    <ElFormItem label="Зарегистрироваться с помощью:">
      <ElButton :icon="Link" size="small" circle />
      <ElButton :icon="Link" size="small" circle />
    </ElFormItem>
    <template #footer>
      <ElButton @click="submitForm(formRef)" type="primary" :disabled="submitDisabled">
        Зарегистрироваться
      </ElButton>
    </template>
  </ElDialog>
</template>

<style scoped lang="scss">
.date-birth-field {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  gap: 14px;
}
</style>
