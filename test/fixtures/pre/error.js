module.exports = {
  duplicated: {
    source: `<p r-pre r-pre/>`,
    error: /Duplicate/,
  },
  'with value': {
    source: `<p r-pre="1"/>`,
    error: /cannot have attribute value/,
  },
};
