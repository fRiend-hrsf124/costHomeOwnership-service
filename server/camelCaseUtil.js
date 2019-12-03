// Convert db keys to camelCase for client
// https://matthiashager.com/converting-snake-case-to-camel-case-object-keys-with-javascript
const keysToCamel = function (o) {
  const toCamel = (s) => {
    return s.replace(/([-_][a-z])/ig, ($1) => {
      return $1.toUpperCase()
        .replace('-', '')
        .replace('_', '');
    });
  };

  const isArray = function (a) {
    return Array.isArray(a);
  };

  const isObject = function (o) {
    return o === Object(o) && !isArray(o) && typeof o !== 'function';
  };

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
