function onSelectChange_babel_plugin_direactive(e, model) {
  if (!e.target.multiple) {
    model[1](e.target.value);
  } else {
    model[1](Array.from(e.target.selectedOptions, option => option.value));
  }
}

import React from 'react';

const Component = () => {
  const single = React.useState('A');
  const group = React.useState(['A']);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("select", {
    value: single[0],
    onChange: e => onSelectChange_babel_plugin_direactive(e, single)
  }, /*#__PURE__*/React.createElement("option", {
    value: "A"
  }, "A"), /*#__PURE__*/React.createElement("option", {
    value: "B"
  }, "B")), /*#__PURE__*/React.createElement("select", {
    multiple: true,
    value: group[0],
    onChange: e => onSelectChange_babel_plugin_direactive(e, group)
  }, /*#__PURE__*/React.createElement("option", {
    value: "A"
  }, "A"), /*#__PURE__*/React.createElement("option", {
    value: "B"
  }, "B")));
};
