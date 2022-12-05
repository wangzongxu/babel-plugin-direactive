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

import React from 'react';

const Component = () => {
  const single = React.useState('A');
  const group = React.useState(['A']);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    value: true,
    checked: isCheckboxChecked_babel_plugin_direactive(single, true),
    onChange: e => onCheckboxChange_babel_plugin_direactive(e, single, true, false)
  }), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    value: true,
    checked: isCheckboxChecked_babel_plugin_direactive(single, true),
    onChange: e => onCheckboxChange_babel_plugin_direactive(e, single, true, false)
  }), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    value: "",
    checked: isCheckboxChecked_babel_plugin_direactive(single, ""),
    onChange: e => onCheckboxChange_babel_plugin_direactive(e, single, "", false)
  }), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    value: 1,
    checked: isCheckboxChecked_babel_plugin_direactive(single, 1),
    onChange: e => onCheckboxChange_babel_plugin_direactive(e, single, 1, false)
  }), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    value: "A",
    checked: isCheckboxChecked_babel_plugin_direactive(single, "A"),
    onChange: e => onCheckboxChange_babel_plugin_direactive(e, single, "A", "B")
  }), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    value: "C",
    checked: isCheckboxChecked_babel_plugin_direactive(single, "A"),
    onChange: e => onCheckboxChange_babel_plugin_direactive(e, single, "A", "B")
  }), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    value: "A",
    checked: isCheckboxChecked_babel_plugin_direactive(group, "A"),
    onChange: e => onCheckboxChange_babel_plugin_direactive(e, group, "A", false)
  }), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    value: "B",
    checked: isCheckboxChecked_babel_plugin_direactive(group, "B"),
    onChange: e => onCheckboxChange_babel_plugin_direactive(e, group, "B", false)
  }));
};
