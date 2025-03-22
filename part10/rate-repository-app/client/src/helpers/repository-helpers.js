export const formatNumber = (number) => {
  if (number < 1000) {
    return number
  } else {
    return `${(number / 1000).toFixed(1)}k`
  }
}
