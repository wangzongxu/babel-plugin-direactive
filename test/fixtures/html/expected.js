function getHTML_babel_plugin_direactive(html) {
  return typeof html === 'string' ? {
    __html: html
  } : html;
}

import React from 'react';
const node = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
  dangerouslySetInnerHTML: getHTML_babel_plugin_direactive(content)
}), /*#__PURE__*/React.createElement("div", {
  dangerouslySetInnerHTML: getHTML_babel_plugin_direactive(content)
}), /*#__PURE__*/React.createElement("div", {
  dangerouslySetInnerHTML: getHTML_babel_plugin_direactive('raw')
}));
