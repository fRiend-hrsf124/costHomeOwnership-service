// Convert db keys to camelCase for client
// https://matthiashager.com/converting-snake-case-to-camel-case-object-keys-with-javascript
const keysToCamel = (o) => {
  const toCamel = (s) => s.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase()
    .replace('-', '')
    .replace('_', ''));

  const isArray = (a) => Array.isArray(a);

  const isObject = (obj) => obj === Object(obj) && !isArray(obj) && typeof obj !== 'function';

  if (isObject(o)) {
    const n = {};

    Object.keys(o)
      .forEach((k) => {
        n[toCamel(k)] = keysToCamel(o[k]);
      });

    return n;
  } if (isArray(o)) {
    return o.map((i) => keysToCamel(i));
  }

  return o;
};

module.exports = keysToCamel;
