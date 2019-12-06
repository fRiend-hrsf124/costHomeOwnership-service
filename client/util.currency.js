export default (num) => `$${new Intl.NumberFormat('en-US').format(num)}`;
