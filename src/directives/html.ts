import { NodePath } from '@babel/core';
import { callExpression, jsxExpressionContainer, JSXElement } from '@babel/types';
import { addHelper } from '../helpers';
import { State } from '../types';
import { getAttrValueExpr, getAttrAndRemove } from '../utils';
import { HTML } from '../constants';

export function htmlAttribute(state: State, elPath: NodePath<JSXElement>) {
  const htmlAttr = getAttrAndRemove(elPath, HTML, true);
  if (!htmlAttr) {
    return;
  }

  htmlAttr.name.name = 'dangerouslySetInnerHTML';
  const expr = getAttrValueExpr(htmlAttr);
  if (!expr) {
    throw elPath.buildCodeFrameError('The html directive miss attribute value');
  }

  const getHTML = addHelper(state.file, 'getHTML');
  htmlAttr.value = jsxExpressionContainer(callExpression(getHTML, [expr]));
}
