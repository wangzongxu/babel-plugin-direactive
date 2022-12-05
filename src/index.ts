import { NodePath, Visitor } from '@babel/core';
import { JSXElement } from '@babel/types';
import { State } from './types';
import { handleDirectives } from './directives';

export default () => {
  const visitor: Visitor = {
    JSXElement(path: NodePath<JSXElement>, state: State) {
      handleDirectives(state, path);
    },
  };
  return {
    visitor,
  };
};
