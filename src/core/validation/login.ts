export const LOGIN_REGEX = /^[a-zA-Z0-9_.-]+$/
export const LOGIN_MES_INVALID_REGEX = 'Логин содержит запрещённые символы'

export const loginValidatorForFormElement = (
  value: string,
  callback: (error?: string | Error) => void,
) => {
  // Проверка на email
  if (!LOGIN_REGEX.test(value)) {
    callback(new Error(LOGIN_MES_INVALID_REGEX))
  } else {
    callback()
  }
}
