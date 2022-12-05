import { Fragment as _Fragment } from "react";

function renderList_babel_plugin_direactive(val, render) {
  let ret = null,
      i,
      l,
      keys,
      key;

  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);

    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);

    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject_babel_plugin_direactive(val)) {
    if (hasSymbol_babel_plugin_direactive && val[Symbol.iterator]) {
      ret = [];
      const iterator = val[Symbol.iterator]();
      let result = iterator.next();

      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);

      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }

  if (!isDef_babel_plugin_direactive(ret)) {
    ret = [];
  }

  return ret;
}

function hasSymbol_babel_plugin_direactive() {
  return typeof Symbol !== 'undefined' && isNative_babel_plugin_direactive(Symbol) && typeof Reflect !== 'undefined' && isNative_babel_plugin_direactive(Reflect.ownKeys);
}

function isNative_babel_plugin_direactive(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

function isObject_babel_plugin_direactive(obj) {
  return obj !== null && typeof obj === 'object';
}

function isDef_babel_plugin_direactive(v) {
  return v !== undefined && v !== null;
}

import React from 'react';
const node = renderList_babel_plugin_direactive(arr, function (item, index) {
  return /*#__PURE__*/React.createElement(_Fragment, {
    key: index
  }, /*#__PURE__*/React.createElement("li", null, item));
});
const nodeNested = /*#__PURE__*/React.createElement("ul", null, renderList_babel_plugin_direactive(arr, function (item, index) {
  return /*#__PURE__*/React.createElement(_Fragment, {
    key: index
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("ol", null, renderList_babel_plugin_direactive(item, function (innerItem, innerIndex) {
    return /*#__PURE__*/React.createElement(_Fragment, {
      key: innerIndex
    }, /*#__PURE__*/React.createElement("li", null, item, ": ", innerItem));
  })), /*#__PURE__*/React.createElement("ol", null, renderList_babel_plugin_direactive(item, function (innerItem2, innerIndex2) {
    return /*#__PURE__*/React.createElement(_Fragment, {
      key: "innerIndex"
    }, /*#__PURE__*/React.createElement("li", null, item, ": ", innerItem2));
  }))));
}));
