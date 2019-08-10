// Stolen from https://stackoverflow.com/a/31615643
const appendSuffix = n => {
  var s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

function toFullDate(value) {
  const dateObject = new Date(value);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const dayWithSuffix = appendSuffix(dateObject.getDate());

  return `${dayWithSuffix} ${
    months[dateObject.getMonth()]
  } ${dateObject.getFullYear()}`;
}

function getDayMonth(value) {
  const dateObject = new Date(value);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];

  return `${months[dateObject.getMonth()]} ${dateObject.getDate()}`;
}

function getYear(value) {
  const dateObject = new Date(value);
  return dateObject.getFullYear();
}

module.exports = {
  getDayMonth,
  getYear,
  toFullDate
};
