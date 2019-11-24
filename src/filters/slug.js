const slugify = require("slugify");

function slugifyText(input) {
  if (!input) {
    return false;
  }
  const options = {
    replacement: "-",
    remove: /[&,+()$~%.'":*?<>{}]/g,
    lower: true
  };

  return slugify(input, options);
}

module.exports = {
  slugifyText
};
