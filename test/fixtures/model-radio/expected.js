function onRadioChange_babel_plugin_direactive(e, model, value) {
  model[1](value);
}

function isRadioChecked_babel_plugin_direactive(model, value) {
  return model[0] === value;
}

import React from 'react';

const Component = () => {
  const model = React.useState('foo');
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    value: "on",
    checked: isRadioChecked_babel_plugin_direactive(model, "on"),
    onChange: e => onRadioChange_babel_plugin_direactive(e, model, "on")
  }), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    value: "",
    checked: isRadioChecked_babel_plugin_direactive(model, ""),
    onChange: e => onRadioChange_babel_plugin_direactive(e, model, "")
  }), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    value: "A",
    checked: isRadioChecked_babel_plugin_direactive(model, "A"),
    onChange: e => onRadioChange_babel_plugin_direactive(e, model, "A")
  }), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    value: 1,
    checked: isRadioChecked_babel_plugin_direactive(model, 1),
    onChange: e => onRadioChange_babel_plugin_direactive(e, model, 1)
  }));
};
