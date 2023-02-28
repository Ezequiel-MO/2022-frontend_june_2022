const getDayOfWeek = (date) => {
  const day = date.getDay()
  return [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ][day]
}

const getMonthOfYear = (date) => {
  const month = date.getMonth()
  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ][month]
}

const formatDate = (date) => {
  const dayOfWeek = getDayOfWeek(date)
  const monthOfYear = getMonthOfYear(date)
  return `${dayOfWeek}, ${monthOfYear} ${date.getDate()}`
}

export const convertDate = (index, arrivalDay) => {
  const date = new Date(arrivalDay)
  if (index === 0) {
    return formatDate(date)
  }
  const newDate = new Date(date.setDate(date.getDate() + index))
  return formatDate(newDate)
}
