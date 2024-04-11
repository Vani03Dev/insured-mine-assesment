const moment = require("moment");

const isValidDateString = (date) => moment(date, "YYYY-MM-DD", true).isValid();

module.exports = { isValidDateString };
