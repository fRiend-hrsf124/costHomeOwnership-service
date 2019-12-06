import validator from 'validator';

const formatNum = (num) => `$${new Intl.NumberFormat('en-US').format(num)}`;
const parseUserStr = (str, prevNum) => {
  // TODO - sanitize input to prevent XSS
  if (str === '') return 0;

  let nextNum = prevNum;
  if (validator.isDecimal(str)) {
    nextNum = parseInt(str, 10);
  }
  return nextNum;
};

export {
  formatNum,
  parseUserStr,
};
