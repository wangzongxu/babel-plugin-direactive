function onTextChange_babel_plugin_direactive(e, model) {
  model[1](e.target.value);
}

import React from 'react';

const Component = () => {
  const model = React.useState('foo');
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: model[0],
    onChange: e => onTextChange_babel_plugin_direactive(e, model)
  }), /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: model[0],
    onChange: e => onTextChange_babel_plugin_direactive(e, model)
  }), /*#__PURE__*/React.createElement("textarea", {
    value: model[0],
    onChange: e => onTextChange_babel_plugin_direactive(e, model)
  }));
};
