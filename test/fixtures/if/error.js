module.exports = {
  duplicated: {
    source: `<li r-if={true} r-if={true}/>`,
    error: /Duplicate/,
  },
  'miss value': {
    source: `<li r-if/>`,
    error: /miss attribute value/,
  },
  'empty value': {
    source: `<li r-if=""/>`,
    error: /miss attribute value/,
  },
};
