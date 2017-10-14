const WHITESPACE = 1;
const LINE_TERMINATOR = 2;
const SINGLELINE_COMMMENT = 3;
const NUMERIC = 4;
const STRING = 5;
const PUNCTUATOR = 6;
const CONTEXT_LEFT = 7;
const CONTEXT_RIGHT = 8;
const REGEXP = 9;
const OPERATOR = 10;
const BOOLEAN = 11;
const KEYWORD = 12;
const IDENTIFIER = 13;
const UNKNOWN = 14;

let intToType = [
  '',
  'whitespace',
  'line-terminator',
  'singleline-comment',
  'numeric',
  'string',
  'punctuator',
  'context-left',
  'context-right',
  'regexp',
  'operator',
  'boolean',
  'keyword',
  'identifier',
  'unknown',
];

let typeToInt = {
  'whitespace': 1,
  'line-terminator': 2,
  'singleline-comment': 3,
  'numerlic': 4,
  'string': 5,
  'punctuator': 6,
  'context-left': 7,
  'context-right': 8,
  'regexp': 9,
  'operator': 10,
  'boolean': 11,
  'keyword': 12,
  'identifier': 13,
  'unknown': 14,
};

export default {
  intToType,
  typeToInt,

  WHITESPACE,
  LINE_TERMINATOR,
  SINGLELINE_COMMMENT,
  NUMERIC,
  STRING,
  PUNCTUATOR,
  CONTEXT_LEFT,
  CONTEXT_RIGHT,
  REGEXP,
  OPERATOR,
  BOOLEAN,
  KEYWORD,
  IDENTIFIER,
  UNKNOWN,
};
