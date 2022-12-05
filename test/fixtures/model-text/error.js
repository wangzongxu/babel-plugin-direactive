module.exports = {
  duplicated: {
    source: `<input r-model="foo" r-model={bar}/>`,
    error: /Duplicate/,
  },
  'miss value': {
    source: `<input r-model/>`,
    error: /miss attribute value/,
  },
  'empty value': {
    source: `<input r-model=""/>`,
    error: /miss attribute value/,
  },
  'type not string': {
    source: `<input type={type} r-model="bar"/>`,
    error: /must be a string literal/,
  },
};
