import { NodePath } from '@babel/core';
import {
  conditionalExpression,
  nullLiteral,
  ConditionalExpression,
  JSXElement,
} from '@babel/types';
import { State } from '../types';
import { getAttrAndRemove, getLastExprInConditional, getAttrValueExpr } from '../utils';
import { ELSE_IF } from '../constants';

export function elseIfAttribute(
  state: State,
  elPath: NodePath<JSXElement>,
  context?: ConditionalExpression,
): boolean | undefined {
  const elseIfAttr = getAttrAndRemove(elPath, ELSE_IF);
  if (!elseIfAttr) {
    return;
  }

  if (!context) {
    throw elPath.buildCodeFrameError(
      'The else-if directive can only be used after the if directive',
    );
  }

  const assertTest = getAttrValueExpr(elseIfAttr);
  if (!assertTest) {
    throw elPath.buildCodeFrameError('The else-if directive miss attribute value');
  }

  const expr = getLastExprInConditional(context);
  expr.alternate = conditionalExpression(assertTest, elPath.node, nullLiteral());
  elPath.remove();
  return true;
}
