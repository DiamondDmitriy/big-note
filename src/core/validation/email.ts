export const EMAIL_REGEX = /^[^\s!?#$%^&*()]+@[^\s!?#$%^&*()]+\.[^\s!?#$%^&*()]+$/
export const EMAIL_MES_INVALID_REGEX = 'Некорректный email'
export const EMAIL_MES_INVALID_MAX_LENGTH = 'Длина не должна быть больше 20'
export const EMAIL_MES_INVALID_MIN_LENGTH = 'Длина не должна быть меньше 6'

export const emailValidatorForFormElement = (
  value: string,
  callback: (error?: string | Error) => void,
) => {
  // Проверка на email
  if (!EMAIL_REGEX.test(value)) {
    callback(new Error(EMAIL_MES_INVALID_REGEX))
  } else {
    callback()
  }
}
