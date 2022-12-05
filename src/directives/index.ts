import { NodePath } from '@babel/core';
import { JSXElement } from '@babel/types';
import { State } from '../types';
import { ifAttribute } from './if';
import { elseIfAttribute } from './else-if';
import { elseAttribute } from './else';
import { forAttribute } from './for';
import { preAttribute } from './pre';
import { htmlAttribute } from './html';
import { textAttribute } from './text';
import { modelAttribute } from './model';
import { showAttribute } from './show';

export function handleDirectives(state: State, path: NodePath<JSXElement>) {
  ifAttribute(state, path);
  elseIfAttribute(state, path);
  elseAttribute(state, path);
  forAttribute(state, path);
  preAttribute(state, path);
  htmlAttribute(state, path);
  textAttribute(state, path);
  modelAttribute(state, path);
  showAttribute(state, path);
}
