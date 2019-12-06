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

const formatLoanType = (term, type) => {
  let formattedLoan;
  if (type === 'Fixed') {
    formattedLoan = `${term} Year Fixed`;
  } else {
    formattedLoan = `${term}/1 ARM`;
  }

  return formattedLoan;
};

export {
  formatNum,
  parseUserStr,
  formatLoanType,
};
