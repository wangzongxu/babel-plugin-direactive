function onComponentChange_babel_plugin_direactive(value, model) {
  model[1](value);
}

import React from 'react';

const Component = () => {
  const model = React.useState('foo');
  return /*#__PURE__*/React.createElement(From, {
    value: model[0],
    onChange: e => onComponentChange_babel_plugin_direactive(e, model)
  });
};
