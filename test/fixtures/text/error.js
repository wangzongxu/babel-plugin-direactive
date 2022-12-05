module.exports = {
  duplicated: {
    source: `<p r-text="foo" r-text={bar}/>`,
    error: /Duplicate/,
  },
  'miss value': {
    source: `<p r-text/>`,
    error: /miss attribute value/,
  },
  'empty value': {
    source: `<p r-text=""/>`,
    error: /miss attribute value/,
  },
};
