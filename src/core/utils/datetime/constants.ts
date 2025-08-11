export const CURRENT_YEAR = new Date().getFullYear()

export const getMonths = (locale: string) => {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'long' })
  return Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: formatter.format(new Date(2023, i)),
  }))
}
