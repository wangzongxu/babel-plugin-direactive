import { NodePath } from '@babel/core';
import { jSXExpressionContainer, templateElement, templateLiteral, JSXElement } from '@babel/types';
import { State } from '../types';
import { getAttrAndRemove } from '../utils';
import { PRE } from '../constants';

export function preAttribute(state: State, elPath: NodePath<JSXElement>) {
  const preAttr = getAttrAndRemove(elPath, PRE);
  if (!preAttr) {
    return;
  }

  if (preAttr.value) {
    throw elPath.buildCodeFrameError('The pre directive cannot have attribute value');
  }

  let raw = '';
  const childrenTypes = [
    'JSXText',
    'JSXElement',
    'JSXFragment',
    'JSXSpreadChild',
    'JSXExpressionContainer',
  ];
  elPath.traverse(
    childrenTypes.reduce((visitor, type) => {
      visitor[type] = path => {
        if (path.parentPath !== elPath) return;
        raw += path.getSource();
      };
      return visitor;
    }, {}),
  );
  elPath.node.children = [
    jSXExpressionContainer(
      templateLiteral(
        [
          templateElement({
            raw,
          }),
        ],
        [],
      ),
    ),
  ];
}
