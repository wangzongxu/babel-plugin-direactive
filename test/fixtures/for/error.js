module.exports = {
  duplicated: {
    source: `<li r-for="num in 5" r-for="num in 5"/>`,
    error: /Duplicate/,
  },
  'value not a string literal': {
    source: `<li r-for={x}/>`,
    error: /must be a string expression/,
  },
  'value invalid': {
    source: `<li r-for="x"/>`,
    error: /Invalid/,
  },
  'miss key': {
    source: `<li r-for="item , index of arr"/>`,
    error: /miss property: [a-z]-key/,
  },
  'more than one key': {
    source: `<li r-for="item , index of arr" key="1" r-key="item"/>`,
    error: /can use only [a-z]-key or key/,
  },
  'key miss value': {
    source: `<li r-for="item , index of arr" r-key/>`,
    error: /miss value/,
  },
  'react key miss value': {
    source: `<li r-for="item , index of arr" key/>`,
    error: /miss value/,
  },
};
