module.exports = {
  duplicated: {
    source: `<ul><li r-if="true"/><li r-else r-else/></ul>`,
    error: /Duplicate/,
  },
  'miss context': {
    source: `<p r-else/>`,
    error: /after the if\/else-if directive/,
  },
  'with value': {
    source: `<ul><li r-if="true"/><li r-else="true"/></ul>`,
    error: /cannot have attribute value/,
  },
};
