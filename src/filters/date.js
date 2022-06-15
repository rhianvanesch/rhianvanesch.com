function toFullDate(value) {
  const dateObject = new Date(value)

  const dateParts = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    day: "numeric",
    month: "long",
  }).formatToParts(dateObject)

  const suffixes = {
    one: "st",
    two: "nd",
    few: "rd",
    other: "th",
  }

  const ordinalRules = new Intl.PluralRules("en", { type: "ordinal" })

  const dayPart = dateParts.find((part) => part.type === "day").value
  const monthPart = dateParts.find((part) => part.type === "month").value
  const yearPart = dateParts.find((part) => part.type === "year").value

  const ordinal = ordinalRules.select(Number(dayPart))

  return `${dayPart}${suffixes[ordinal]} ${monthPart} ${yearPart}`
}

function getMonthDay(value) {
  const dateObject = new Date(value)

  const month = new Intl.DateTimeFormat("en-GB", {
    month: "short",
  }).format(dateObject)

  return `${month} ${dateObject.getDate()}`
}

function getYear(value) {
  const dateObject = new Date(value)
  return dateObject.getFullYear()
}

function getDatetime(value) {
  return new Date(value).toISOString().split("T")[0]
}

module.exports = {
  getDatetime,
  getMonthDay,
  getYear,
  toFullDate,
}
