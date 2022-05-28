module.exports = {
  duplicated: {
    source: `<p r-show="foo" r-show={bar}/>`,
    error: /Duplicate/,
  },
  'miss value': {
    source: `<p r-show/>`,
    error: /miss attribute value/,
  },
  'empty value': {
    source: `<p r-show=""/>`,
    error: /miss attribute value/,
  },
};
