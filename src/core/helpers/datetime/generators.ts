/**
 * Генерирует список дней в указанном диапазоне
 * @param from - Начальный день (например, 1)
 * @param to - Конечный день (например, 31)
 * @param padZero - Добавлять ли ведущий ноль (01, 02...)
 * @returns {Array<{value: number, label: string}>}
 */
export const generateDays = (
  from: number = 1,
  to = 31,
  padZero = true,
): {
  value: number
  label: string
}[] => {
  if (from < 1 || to > 31 || from > to) {
    throw new Error('Некорректный диапазон дней')
  }

  return Array.from({ length: to - from + 1 }, (_, i) => {
    const day = i + from
    return {
      value: day,
      label: padZero ? day.toString().padStart(2, '0') : day.toString(),
    }
  })
}

// Генератор дней месяца (учитывает високосные годы)
export const generateDaysInMonth = (year: number, month: number) => {
  const daysInMonth = new Date(year, month, 0).getDate()
  return Array.from({ length: daysInMonth }, (_, i) => ({
    value: i + 1,
    label: (i + 1).toString().padStart(2, '0'), // 01, 02, ... 31
  }))
}

// Генератор годов
export const generateYears = (yearRangeMin: number, yearRangeMax: number, reverse = true) => {
  const years = []
  for (let year = yearRangeMin; year <= yearRangeMax; year++) {
    years.push({ value: year, label: year.toString() })
  }
  return reverse ? years.reverse() : years
}
