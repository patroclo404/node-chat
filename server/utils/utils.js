var isValidString = (str) => {
  return typeof str == 'string' && str.trim().length > 0;
}

var isValidInteger = (int) => {
  return Math.round(int) == int;
}

module.exports = {isValidString , isValidInteger};