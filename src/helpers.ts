import template from '@babel/template';
import { Identifier, identifier, isIdentifier, isImportSpecifier } from '@babel/types';
import { addNamed } from '@babel/helper-module-imports';
import { Node } from '@babel/core';
import pkg from '../package.json';
import { File } from './types';

const suffix = pkg.name.replace(/@|-/g, '_');
const makeHelperName = name => identifier(`${name}_${suffix}`);

type Helper = (file: File, ...rest: any[]) => { id: Identifier; node: Node | Node[] };

const hideNode: Helper = file => {
  const id = makeHelperName('hide_node');
  const node = template(`
    function ${id.name}(isShow, ...args) {
      const result = EXTENDS(...args);
      if (isShow) return result;
      if (!result.hasOwnProperty('style')) {
        result.style = {};
      }
      result.style.display = 'none';
      return result;
    }
  `)({
    EXTENDS: file.addHelper('extends'),
  });

  return {
    id,
    node,
  };
};

const isObject: Helper = file => {
  const id = makeHelperName('isObject');
  const node = template(`
    function ${id.name}(obj) {
      return obj !== null && typeof obj === 'object'
    }
  `)();
  return {
    id,
    node,
  };
};

const isDef: Helper = file => {
  const id = makeHelperName('isDef');
  const node = template(`
    function ${id.name}(v) {
      return v !== undefined && v !== null
    }
  `)();
  return {
    id,
    node,
  };
};

const isNative: Helper = file => {
  const id = makeHelperName('isNative');
  const node = template(`
    function ${id.name}(Ctor) {
      return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
    }
  `)();
  return {
    id,
    node,
  };
};

const hasSymbol: Helper = file => {
  const id = makeHelperName('hasSymbol');
  const node = template(`
      function ${id.name}() {
        return typeof Symbol !== 'undefined' &&
          IS_NATIVE(Symbol) &&
          typeof Reflect !== 'undefined' &&
          IS_NATIVE(Reflect.ownKeys)
      }
  `)({
    IS_NATIVE: addHelper(file, 'isNative'),
  });
  return {
    id,
    node,
  };
};

/*!
 * renderList By Even You
 * https://github.com/vuejs/vue/blob/main/src/core/instance/render-helpers/render-list.ts
 */
const renderList: Helper = file => {
  const id = makeHelperName('renderList');
  const node = template(`
    function ${id.name}(
      val/*: any*/,
      render/*: (val: any, keyOrIndex: string | number, index?: number) => any*/
    )/*: Array<any> | null */{
      let ret = null, i, l, keys, key
      if (Array.isArray(val) || typeof val === 'string') {
        ret = new Array(val.length)
        for (i = 0, l = val.length; i < l; i++) {
          ret[i] = render(val[i], i)
        }
      } else if (typeof val === 'number') {
        ret = new Array(val)
        for (i = 0; i < val; i++) {
          ret[i] = render(i + 1, i)
        }
      } else if (IS_OBJECT(val)) {
        if (HAS_SYMBOL && val[Symbol.iterator]) {
          ret = []
          const iterator = val[Symbol.iterator]()
          let result = iterator.next()
          while (!result.done) {
            ret.push(render(result.value, ret.length))
            result = iterator.next()
          }
        } else {
          keys = Object.keys(val)
          ret = new Array(keys.length)
          for (i = 0, l = keys.length; i < l; i++) {
            key = keys[i]
            ret[i] = render(val[key], key, i)
          }
        }
      }
      if (!IS_DEF(ret)) {
        ret = []
      }
      return ret
    }
  `)({
    IS_DEF: addHelper(file, 'isDef'),
    IS_OBJECT: addHelper(file, 'isObject'),
    HAS_SYMBOL: addHelper(file, 'hasSymbol'),
  });
  return {
    id,
    node,
  };
};

const getHTML: Helper = file => {
  const id = makeHelperName('getHTML');
  const node = template(`
    function ${id.name}(html) {
      return typeof html === 'string' ? {
        __html: html,
      } : html;
    }
  `)();
  return {
    id,
    node,
  };
};

const isRadioChecked: Helper = file => {
  const id = makeHelperName('isRadioChecked');
  const node = template(`
    function ${id.name}(model, value) {
      return model[0] === value;
    }
  `)();
  return {
    id,
    node,
  };
};

const onRadioChange: Helper = file => {
  const id = makeHelperName('onRadioChange');
  const node = template(`
    function ${id.name}(e, model, value) {
      model[1](value);
    }
  `)();
  return {
    id,
    node,
  };
};

const isCheckboxChecked: Helper = file => {
  const id = makeHelperName('isCheckboxChecked');
  const node = template(`
    function ${id.name}(model, trueValue) {
      return Array.isArray(model[0])
        ? model[0].includes(trueValue)
        : model[0] === trueValue;
    }
  `)();
  return {
    id,
    node,
  };
};

const onCheckboxChange: Helper = file => {
  const id = makeHelperName('onCheckboxChange');
  const node = template(`
    function ${id.name}(e, model, trueValue, falseValue) {
      const { checked } = e.target;
      if (Array.isArray(model[0])) {
        const checkedAll = model[0].slice();
        const index = checkedAll.findIndex(item => item === trueValue);
        if (checked && index === -1) {
          checkedAll.push(trueValue);
        } else if (!checked && index > -1) {
          checkedAll.splice(index, 1);
        }
        model[1](checkedAll);
      } else {
        model[1](checked ? trueValue : falseValue);
      }
    }
  `)();
  return {
    id,
    node,
  };
};

const onSelectChange: Helper = file => {
  const id = makeHelperName('onSelectChange');
  const node = template(`
    function ${id.name}(e, model) {
      if (!e.target.multiple) {
        model[1](e.target.value);
      } else {
        model[1](
          Array.from(e.target.selectedOptions, option => option.value)
        );
      }
    }
  `)();
  return {
    id,
    node,
  };
};

const onTextChange: Helper = file => {
  const id = makeHelperName('onTextChange');
  const node = template(`
    function ${id.name}(e, model) {
      model[1](e.target.value);
    }
  `)();
  return {
    id,
    node,
  };
};

const onComponentChange: Helper = file => {
  const id = makeHelperName('onComponentChange');
  const node = template(`
    function ${id.name}(value, model) {
      model[1](value);
    }
  `)();
  return {
    id,
    node,
  };
};

const helpers = {
  hideNode,
  renderList,
  getHTML,
  isDef,
  isNative,
  isObject,
  hasSymbol,
  isRadioChecked,
  onRadioChange,
  isCheckboxChecked,
  onCheckboxChange,
  onSelectChange,
  onTextChange,
  onComponentChange,
};

export const addHelper = (file: File, name: keyof typeof helpers, ...rest: any[]): Identifier => {
  const { id, node } = helpers[name](file, ...rest);
  const has = file.path
    .get('body')
    .find(path => path.isFunctionDeclaration() && path.node.id?.name === id.name);
  if (has) return id;
  // @ts-ignore
  file.path.unshiftContainer('body', node);
  return id;
};

export const addNamedImport = (file: File, name: string, sourcePath: string): Identifier => {
  let has: Identifier | undefined;
  file.path.get('body').find(path => {
    if (!path.isImportDeclaration()) return false;
    const { source, specifiers } = path.node;
    if (source.value !== sourcePath) return false;
    const specifier = specifiers.find(item => {
      if (!isImportSpecifier(item)) return false;
      const { imported } = item;
      const importedName = isIdentifier(imported) ? imported.name : imported.value;
      return importedName === name;
    });
    if (!specifier) return false;
    has = specifier.local;
    return true;
  });
  if (!has) return addNamed(file.path, name, sourcePath);
  return has;
};
