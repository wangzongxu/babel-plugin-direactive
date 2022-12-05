function hide_node_babel_plugin_direactive(isShow, ...args) {
  const result = _extends(...args);

  if (isShow) return result;

  if (!result.hasOwnProperty('style')) {
    result.style = {};
  }

  result.style.display = 'none';
  return result;
}

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
const node = /*#__PURE__*/React.createElement("div", hide_node_babel_plugin_direactive(foo, {
  a: "a"
}, {
  b: b
}, { ...c
}, { ...d()
}, { ...{
    e: 'e'
  }
}), /*#__PURE__*/React.createElement("p", hide_node_babel_plugin_direactive(bar), /*#__PURE__*/React.createElement("i", hide_node_babel_plugin_direactive(baz === 1)), /*#__PURE__*/React.createElement("b", _extends({
  f: "f"
}, g))));
