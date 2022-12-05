const PREFIX = 'r-';
const withPrefix = flag => `${PREFIX}${flag}`;

export const IF = withPrefix('if');
export const ELSE_IF = withPrefix('else-if');
export const ELSE = withPrefix('else');
export const SHOW = withPrefix('show');

export const FOR = withPrefix('for');
export const KEY = withPrefix('key');
export const MODEL = withPrefix('model');

export const TEXT = withPrefix('text');
export const HTML = withPrefix('html');
export const PRE = withPrefix('pre');
