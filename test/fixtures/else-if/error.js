module.exports = {
  duplicated: {
    source: `<ul><li r-if="true"/><li r-else-if={true} r-else-if={true}/></ul>`,
    error: /Duplicate/,
  },
  'miss context': {
    source: `<p r-else-if="true"/>`,
    error: /can only be used after the if directive/,
  },
  'miss value': {
    source: `<ul><li r-if="true"/><li r-else-if/></ul>`,
    error: /miss attribute value/,
  },
  'empty value': {
    source: `<ul><li r-if="true"/><li r-else-if=""/></ul>`,
    error: /miss attribute value/,
  },
};
