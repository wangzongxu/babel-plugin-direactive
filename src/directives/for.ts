import { Node, NodePath } from '@babel/core';
import {
  blockStatement,
  callExpression,
  functionExpression,
  isStringLiteral,
  jsxExpressionContainer,
  returnStatement,
  jsxElement,
  jsxClosingElement,
  jsxOpeningElement,
  JSXElement,
  JSXAttribute,
  jsxIdentifier,
} from '@babel/types';
import { parseExpression } from '@babel/parser';
import { addHelper, addNamedImport } from '../helpers';
import { State } from '../types';
import {
  parseFor,
  toFunctionParamsPattern,
  getAttrValueExpr,
  getAttrAndRemove,
  getAttrValue,
  getAttrName,
} from '../utils';
import { FOR, KEY } from '../constants';

function getKeyAttribute(state: State, elPath: NodePath<JSXElement>): JSXAttribute {
  const keyAttr = getAttrAndRemove(elPath, KEY);
  const reactKeyAttr = getAttrAndRemove(elPath, 'key');
  if (!keyAttr && !reactKeyAttr) {
    throw elPath.buildCodeFrameError(`The for directive miss property: ${KEY}`);
  }

  if (keyAttr && reactKeyAttr) {
    throw elPath.buildCodeFrameError(`You can use only ${KEY} or key`);
  }

  const attr = (keyAttr ?? reactKeyAttr) as JSXAttribute;
  const expr = keyAttr ? getAttrValueExpr(keyAttr) : getAttrValue(reactKeyAttr);
  if (!expr) {
    throw elPath.buildCodeFrameError(`The attribute ${getAttrName(attr)} miss value`);
  }

  attr.name = jsxIdentifier('key');
  attr.value = jsxExpressionContainer(expr);
  return attr;
}

export function forAttribute(state: State, elPath: NodePath<JSXElement>) {
  const forAttr = getAttrAndRemove(elPath, FOR);
  if (!forAttr) {
    return;
  }

  if (!isStringLiteral(forAttr.value)) {
    throw elPath.buildCodeFrameError('The for directive value must be a string expression');
  }

  const forExpr = forAttr.value.value;
  const ret = parseFor(forExpr);
  if (!ret) {
    throw elPath.buildCodeFrameError(`Invalid for directive: ${forExpr}`);
  }

  let iterFor;
  let alias;
  let iter1;
  let iter2;
  try {
    iterFor = parseExpression(ret.for);
    alias = toFunctionParamsPattern(ret.alias);
    iter1 = toFunctionParamsPattern(ret.iterator1);
    iter2 = toFunctionParamsPattern(ret.iterator2);
  } catch (e) {
    throw elPath.buildCodeFrameError(`Invalid for directive: ${forExpr}`);
  }

  const fragmentId = addNamedImport(state.file, 'Fragment', 'react');
  const jsxFragmentId = jsxIdentifier(fragmentId.name);
  const keyAttrExpr = getKeyAttribute(state, elPath);
  const renderListId = addHelper(state.file, 'renderList');
  const params = [alias, iter1, iter2].filter(Boolean);
  const body = blockStatement([
    returnStatement(
      jsxElement(
        jsxOpeningElement(jsxFragmentId, [keyAttrExpr]),
        jsxClosingElement(jsxFragmentId),
        [jsxExpressionContainer(elPath.node)],
      ),
    ),
  ]);
  elPath.replaceWith(
    callExpression(renderListId, [iterFor, functionExpression(null, params, body)]) as Node,
  );
}
