module.exports = {
  duplicated: {
    source: `<p r-html="<span/>" r-html="<i/>"/>`,
    error: /Duplicate/,
  },
  'miss value': {
    source: `<p r-html/>`,
    error: /miss attribute value/,
  },
  'empty value': {
    source: `<p r-html=""/>`,
    error: /miss attribute value/,
  },
};
