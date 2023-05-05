const getCurrentDate = () => {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  // This arrangement can be altered based on how we want the date's format to appear.
  const currentDate = `${year}-${month}-${day}`
  return currentDate
}

export default getCurrentDate
