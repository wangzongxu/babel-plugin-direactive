import { NodePath } from '@babel/core';
import {
  identifier,
  isJSXIdentifier,
  isStringLiteral,
  stringLiteral,
  JSXElement,
  Expression,
  jsxAttribute,
  jsxIdentifier,
  jsxExpressionContainer,
  memberExpression,
  numericLiteral,
  arrowFunctionExpression,
  callExpression,
  booleanLiteral,
} from '@babel/types';
import { addHelper } from '../helpers';
import { State } from '../types';
import { MODEL } from '../constants';
import { getAttrAndRemove, getAttrValue, getAttrValueExpr } from '../utils';

function handleSelectModel(state: State, elPath: NodePath<JSXElement>, modelExpr: Expression) {
  const { openingElement } = elPath.node;
  const value = jsxAttribute(
    jsxIdentifier('value'),
    jsxExpressionContainer(memberExpression(modelExpr, numericLiteral(0), true)),
  );
  const onChange = jsxAttribute(
    jsxIdentifier('onChange'),
    jsxExpressionContainer(
      arrowFunctionExpression(
        [identifier('e')],
        callExpression(addHelper(state.file, 'onSelectChange'), [identifier('e'), modelExpr]),
      ),
    ),
  );
  openingElement.attributes.push(value, onChange);
}

function handleCheckboxModel(state: State, elPath: NodePath<JSXElement>, modelExpr: Expression) {
  const { openingElement } = elPath.node;
  const valueAttr = getAttrAndRemove(elPath, 'value', true);
  const trueValueAttr = getAttrAndRemove(elPath, 'true-value');
  const falseValueAttr = getAttrAndRemove(elPath, 'false-value');

  const value = getAttrValue(valueAttr);
  const trueValue = getAttrValue(trueValueAttr);
  const falseValue = getAttrValue(falseValueAttr);

  const finalTrueValue = trueValue ?? value ?? booleanLiteral(true);
  const finalFalseValue = falseValue ?? booleanLiteral(false);
  if (!valueAttr) {
    openingElement.attributes.push(
      jsxAttribute(jsxIdentifier('value'), jsxExpressionContainer(finalTrueValue)),
    );
  }

  const checked = jsxAttribute(
    jsxIdentifier('checked'),
    jsxExpressionContainer(
      callExpression(addHelper(state.file, 'isCheckboxChecked'), [modelExpr, finalTrueValue]),
    ),
  );
  const onChange = jsxAttribute(
    jsxIdentifier('onChange'),
    jsxExpressionContainer(
      arrowFunctionExpression(
        [identifier('e')],
        callExpression(addHelper(state.file, 'onCheckboxChange'), [
          identifier('e'),
          modelExpr,
          finalTrueValue,
          finalFalseValue,
        ]),
      ),
    ),
  );

  openingElement.attributes.push(checked, onChange);
}

function handleRadioModel(state: State, elPath: NodePath<JSXElement>, modelExpr: Expression) {
  const { openingElement } = elPath.node;
  const valueAttr = getAttrAndRemove(elPath, 'value', true);
  let value: Expression;
  if (valueAttr) {
    value = getAttrValue(valueAttr) as Expression;
  } else {
    value = stringLiteral('on');
    openingElement.attributes.push(jsxAttribute(jsxIdentifier('value'), value));
  }

  const checked = jsxAttribute(
    jsxIdentifier('checked'),
    jsxExpressionContainer(
      callExpression(addHelper(state.file, 'isRadioChecked'), [modelExpr, value]),
    ),
  );
  const onChange = jsxAttribute(
    jsxIdentifier('onChange'),
    jsxExpressionContainer(
      arrowFunctionExpression(
        [identifier('e')],
        callExpression(addHelper(state.file, 'onRadioChange'), [identifier('e'), modelExpr, value]),
      ),
    ),
  );

  openingElement.attributes.push(checked, onChange);
}

function handleTextModel(state: State, elPath: NodePath<JSXElement>, modelExpr: Expression) {
  const { openingElement } = elPath.node;
  const value = jsxAttribute(
    jsxIdentifier('value'),
    jsxExpressionContainer(memberExpression(modelExpr, numericLiteral(0), true)),
  );
  const onChange = jsxAttribute(
    jsxIdentifier('onChange'),
    jsxExpressionContainer(
      arrowFunctionExpression(
        [identifier('e')],
        callExpression(addHelper(state.file, 'onTextChange'), [identifier('e'), modelExpr]),
      ),
    ),
  );
  openingElement.attributes.push(value, onChange);
}

function handleComponentModel(state: State, elPath: NodePath<JSXElement>, modelExpr: Expression) {
  const { openingElement } = elPath.node;
  const value = jsxAttribute(
    jsxIdentifier('value'),
    jsxExpressionContainer(memberExpression(modelExpr, numericLiteral(0), true)),
  );
  const onChange = jsxAttribute(
    jsxIdentifier('onChange'),
    jsxExpressionContainer(
      arrowFunctionExpression(
        [identifier('e')],
        callExpression(addHelper(state.file, 'onComponentChange'), [identifier('e'), modelExpr]),
      ),
    ),
  );
  openingElement.attributes.push(value, onChange);
}

export function modelAttribute(state: State, elPath: NodePath<JSXElement>) {
  const modelAttr = getAttrAndRemove(elPath, MODEL);
  if (!modelAttr) {
    return;
  }

  const expr = getAttrValueExpr(modelAttr);
  if (!expr) {
    throw elPath.buildCodeFrameError('The model directive miss attribute value');
  }

  const { openingElement } = elPath.node;
  if (isJSXIdentifier(openingElement.name)) {
    const typeAttr = getAttrAndRemove(elPath, 'type', true);
    const type = typeAttr ? getAttrValue(typeAttr) ?? identifier('undefined') : stringLiteral('');
    if (!isStringLiteral(type)) {
      throw elPath.buildCodeFrameError('The type must be a string literal');
    }

    const { name: tag } = openingElement.name;
    if (tag === 'select') {
      handleSelectModel(state, elPath, expr);
    } else if (tag === 'input' && type.value === 'checkbox') {
      handleCheckboxModel(state, elPath, expr);
    } else if (tag === 'input' && type.value === 'radio') {
      handleRadioModel(state, elPath, expr);
    } else if (tag === 'input' || tag === 'textarea') {
      handleTextModel(state, elPath, expr);
    } else {
      handleComponentModel(state, elPath, expr);
    }
  } else {
    handleComponentModel(state, elPath, expr);
  }
}
