import { Node, NodePath } from '@babel/core';
import { conditionalExpression, nullLiteral, JSXElement } from '@babel/types';
import { State } from '../types';
import { getAttrAndRemove, getAttrValueExpr, getSiblingJSXElement } from '../utils';
import { elseIfAttribute } from './else-if';
import { elseAttribute } from './else';
import { IF } from '../constants';

export function ifAttribute(state: State, elPath: NodePath<JSXElement>) {
  const ifAttr = getAttrAndRemove(elPath, IF);
  if (!ifAttr) {
    return;
  }

  const assertTest = getAttrValueExpr(ifAttr);
  if (!assertTest) {
    throw elPath.buildCodeFrameError('The if directive miss attribute value');
  }

  const context = conditionalExpression(assertTest, elPath.node, nullLiteral());
  while (true) {
    const nextElPath = getSiblingJSXElement(elPath);
    if (!nextElPath) {
      break;
    }

    const handled = elseIfAttribute(state, nextElPath, context);
    if (!handled) {
      elseAttribute(state, nextElPath, context);
      break;
    }
  }

  elPath.replaceWith(context as Node);
}
