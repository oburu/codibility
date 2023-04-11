const { deepStrictEqual } = require('node:assert/strict');

const challenge = (input = {}) => {
  let finalObj = {};

  function recursiveWalk(obj, path = '') {
    Object.entries(obj).forEach((item) => {
      if (typeof item[1] === 'object') {
        recursiveWalk(item[1], path + item[0] + '.');
      }

      if (typeof item[1] === 'number') {
        finalObj = { ...finalObj, [path + item[0]]: item[1] };
      }
    });
  }

  recursiveWalk(input);
  console.log(finalObj);

  return finalObj;
};

deepStrictEqual(
  challenge({
    a: {
      b: {
        c: 1,
        f: 2,
      },
      g: 3,
    },
    d: 2,
  }),
  {
    'a.b.c': 1,
    'a.b.f': 2,
    'a.g': 3,
    d: 2,
  }
);
