import { Fragment as _Fragment } from "react";

function getHTML_babel_plugin_direactive(html) {
  return typeof html === 'string' ? {
    __html: html
  } : html;
}

function onCheckboxChange_babel_plugin_direactive(e, model, trueValue, falseValue) {
  const {
    checked
  } = e.target;

  if (Array.isArray(model[0])) {
    const checkedAll = model[0].slice();
    const index = checkedAll.findIndex(item => item === trueValue);

    if (checked && index === -1) {
      checkedAll.push(trueValue);
    } else if (!checked && index > -1) {
      checkedAll.splice(index, 1);
    }

    model[1](checkedAll);
  } else {
    model[1](checked ? trueValue : falseValue);
  }
}

function isCheckboxChecked_babel_plugin_direactive(model, trueValue) {
  return Array.isArray(model[0]) ? model[0].includes(trueValue) : model[0] === trueValue;
}

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
const node = render ? /*#__PURE__*/React.createElement("ul", null, bar === 1 ? renderList_babel_plugin_direactive(arr, function (item, index) {
  return /*#__PURE__*/React.createElement(_Fragment, {
    key: index
  }, /*#__PURE__*/React.createElement("li", hide_node_babel_plugin_direactive(visible), "bar1"));
}) : bar === 2 ? renderList_babel_plugin_direactive(obj, function ({
  id,
  state
}, key, index) {
  return /*#__PURE__*/React.createElement(_Fragment, {
    key: index
  }, /*#__PURE__*/React.createElement("li", null, "bar2: ", id, " ", state));
}) : renderList_babel_plugin_direactive(arr, function (item, index) {
  return /*#__PURE__*/React.createElement(_Fragment, {
    key: index
  }, /*#__PURE__*/React.createElement("li", null, "bar", /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    value: true,
    checked: isCheckboxChecked_babel_plugin_direactive(item, true),
    onChange: e => onCheckboxChange_babel_plugin_direactive(e, item, true, false)
  }), /*#__PURE__*/React.createElement("div", null, `<p/>`), /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: getHTML_babel_plugin_direactive("<p>p</p>")
  }), /*#__PURE__*/React.createElement("div", null, children)));
})) : null;
