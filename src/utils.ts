import { parse, parseExpression } from '@babel/parser';
import {
  ConditionalExpression,
  Expression,
  identifier,
  Identifier,
  isConditionalExpression,
  isJSXAttribute,
  isJSXElement,
  isJSXEmptyExpression,
  isJSXExpressionContainer,
  isJSXNamespacedName,
  isJSXSpreadAttribute,
  isStringLiteral,
  JSXAttribute,
  JSXOpeningElement,
  objectExpression,
  ObjectExpression,
  objectProperty,
  Pattern,
  spreadElement,
  JSXElement,
} from '@babel/types';
import { NodePath } from '@babel/core';

export function isNodePath<T>(path: any): path is NodePath<T> {
  return path?.scope && typeof path.key !== 'undefined';
}

export function getAttrName(node: JSXAttribute): string {
  return isJSXNamespacedName(node.name)
    ? `${node.name.namespace.name}${node.name.name.name}`
    : node.name.name;
}

export function getAttrValue(node?: JSXAttribute): Expression | undefined {
  if (!node) return;
  return isJSXExpressionContainer(node.value) && !isJSXEmptyExpression(node.value.expression)
    ? node.value.expression
    : isStringLiteral(node.value)
    ? node.value
    : undefined;
}

export function getAttrValueExpr(node?: JSXAttribute): Expression | undefined {
  if (!node) return;
  return isJSXExpressionContainer(node.value) && !isJSXEmptyExpression(node.value.expression)
    ? node.value.expression
    : isStringLiteral(node.value) && node.value.value.trim() !== ''
    ? parseExpression(node.value.value, {
        plugins: ['jsx'],
      })
    : undefined;
}

export function getJSXAttributes(node: JSXOpeningElement): Array<ObjectExpression> {
  return node.attributes.map(item => {
    if (isJSXAttribute(item)) {
      const key = identifier(getAttrName(item));
      const value = getAttrValue(item);
      return objectExpression([objectProperty(key, value ?? identifier('undefined'))]);
    }
    if (isJSXSpreadAttribute(item)) {
      return objectExpression([spreadElement(item.argument)]);
    }
    // @ts-ignore
    throw new Error(`UnSupport attribute ${item.type}`);
  });
}

export function getSiblingJSXElement(
  elPath: NodePath<JSXElement>,
  isNext = true,
): NodePath<JSXElement> | undefined {
  let position = isNext ? 1 : -1;
  while (true) {
    const sibling = elPath.getSibling((elPath.key as number) + position);
    if (!sibling || !sibling.node) return;
    if (sibling.isJSXElement()) {
      return sibling;
    }
    position += 1;
  }
}

export function getAttrAndRemove(
  elPath: JSXElement | NodePath<JSXElement>,
  name: string,
  retain = false,
): JSXAttribute | undefined {
  const isPath = isNodePath<JSXElement>(elPath);
  const node = isPath ? elPath.node : elPath;
  if (!isJSXElement(node)) {
    return;
  }

  const { attributes } = node.openingElement;
  let result: JSXAttribute | undefined;
  for (let i = 0; i < attributes.length; i++) {
    const attr = attributes[i];
    if (isJSXAttribute(attr) && attr.name.name === name) {
      if (result) {
        const error = `Duplicate attribute ${name}`;
        if (isPath) {
          throw elPath.buildCodeFrameError(error);
        }
        throw new Error(error);
      }
      result = attr;
      if (!retain) {
        attributes.splice(i, 1);
        i--;
      }
    }
  }
  return result;
}

export function getLastExprInConditional(conditional: ConditionalExpression) {
  let expr = conditional;
  while (isConditionalExpression(expr.alternate)) {
    expr = expr.alternate;
  }
  return expr;
}

export function toFunctionParamsPattern(str?: string): Identifier | Pattern | void {
  if (!str) return;
  const ast = parse(`function _(${str}){}`) as any;
  return ast.program.body[0].params[0];
}

/*!
 * parseFor By Even You
 * https://github.com/vuejs/vue/blob/main/src/compiler/parser/index.ts#L522
 */
const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
const forIteratorRE = /,([^,}\]]*)(?:,([^,}\]]*))?$/;
const stripParensRE = /^\(|\)$/g;

type ForParseResult = {
  for: string;
  alias: string;
  iterator1?: string;
  iterator2?: string;
};

export function parseFor(exp: string): ForParseResult | undefined {
  const inMatch = exp.match(forAliasRE);
  if (!inMatch) return;
  const res: any = {};
  res.for = inMatch[2].trim();
  const alias = inMatch[1].trim().replace(stripParensRE, '');
  const iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res;
}
