import { NodePath } from '@babel/core';
import { Identifier } from '@babel/types';

export type File = {
  path: NodePath;
  addHelper: (name: string) => Identifier;
};

export type State = {
  file: File;
  opts: any;
};
