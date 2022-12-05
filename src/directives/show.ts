import { NodePath } from '@babel/core';
import { callExpression, jsxSpreadAttribute, JSXElement } from '@babel/types';
import { addHelper } from '../helpers';
import { State } from '../types';
import { getAttrAndRemove, getAttrValueExpr, getJSXAttributes } from '../utils';
import { SHOW } from '../constants';

export function showAttribute(state: State, elPath: NodePath<JSXElement>) {
  const showAttr = getAttrAndRemove(elPath, SHOW);
  if (!showAttr) {
    return;
  }

  const hideNodeId = addHelper(state.file, 'hideNode');
  const assertTest = getAttrValueExpr(showAttr);
  if (!assertTest) {
    throw elPath.buildCodeFrameError('The show directive miss attribute value');
  }

  const { openingElement } = elPath.node;
  const params = getJSXAttributes(openingElement);
  openingElement.attributes = [
    jsxSpreadAttribute(callExpression(hideNodeId, [assertTest, ...params])),
  ];
}
