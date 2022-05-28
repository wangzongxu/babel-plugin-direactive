import { NodePath } from '@babel/core';
import { ConditionalExpression, JSXElement } from '@babel/types';
import { State } from '../types';
import { getAttrAndRemove, getLastExprInConditional } from '../utils';
import { ELSE } from '../constants';

export function elseAttribute(
  state: State,
  elPath: NodePath<JSXElement>,
  context?: ConditionalExpression,
) {
  const elseAttr = getAttrAndRemove(elPath, ELSE);
  if (!elseAttr) {
    return;
  }

  if (!context) {
    throw elPath.buildCodeFrameError(
      'The else directive can only be used after the if/else-if directive',
    );
  }

  if (elseAttr.value) {
    throw elPath.buildCodeFrameError('The else directive cannot have attribute value');
  }

  const expr = getLastExprInConditional(context);
  expr.alternate = elPath.node;
  elPath.remove();
}
