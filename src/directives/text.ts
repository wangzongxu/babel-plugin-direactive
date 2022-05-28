import { NodePath } from '@babel/core';
import { JSXElement, jSXExpressionContainer } from '@babel/types';
import { State } from '../types';
import { getAttrAndRemove, getAttrValueExpr } from '../utils';
import { TEXT } from '../constants';

export function textAttribute(state: State, elPath: NodePath<JSXElement>) {
  const textAttr = getAttrAndRemove(elPath, TEXT);
  if (!textAttr) {
    return;
  }

  const expr = getAttrValueExpr(textAttr);
  if (!expr) {
    throw elPath.buildCodeFrameError('The text directive miss attribute value');
  }

  elPath.node.children = [jSXExpressionContainer(expr)];
}
