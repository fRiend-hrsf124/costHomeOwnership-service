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

const formatLoan = (term, type) => {
  let formattedLoan;
  if (type === 'Fixed') {
    formattedLoan = `${term} Year Fixed`;
  } else {
    formattedLoan = `${term}/1 ARM`;
  }

  return formattedLoan;
};

const unFormatLoan = (loan) => {
  const parts = loan.split(' ');
  const type = parts[parts.length - 1];
  const term = parts[0].split('/')[0];

  return { term, type };
};

const createCreditDisplayRange = (credit) => (
  // eslint-disable-next-line prefer-template
  `${credit}${credit === 740 ? '+' : ' - ' + (credit + 19)} Credit Score`
);

const getCreditFromDisplayRange = (displayRange) => (
  parseInt(displayRange.substring(0, 3), 10)
);

const getDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  return ` ${mm}/${dd}`;
};

// eslint-disable-next-line arrow-body-style
const getFakeRate = ({ apr, lenderId }) => {
  // TODO - remove once server provides
  const rateAdjusted = Math.floor((parseFloat(apr) * 1000) - (lenderId * 43));
  return Number.prototype.toFixed.call((rateAdjusted - (rateAdjusted % 125)) / 1000, 3);
};

const getMortgagePayment = (cost, term, rate, downPay) => {
  // const { term } = rate;
  // const r = parseFloat(getFakeRate(rate));
  const r = parseFloat(rate);

  const n = term * 12;
  const i = r / 12 / 100;
  const d = (((1 + i) ** n) - 1) / (i * (1 + i) ** n);
  return Math.trunc((cost * (1 - (downPay / 100))) / d);
};

export {
  formatNum,
  parseUserStr,
  formatLoan,
  unFormatLoan,
  createCreditDisplayRange,
  getCreditFromDisplayRange,
  getDate,
  getMortgagePayment,
  getFakeRate,
};
