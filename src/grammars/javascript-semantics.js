let comments = [
  {
    semantic: 'block-comment-left',
    context: 'block-comment',
    checks: [
      {rule: 'value', value: '/*'},
    ],
  },

  {
    semantic: 'block-comment-right',
    checks: [
      {rule: 'value', value: '*/'},
      {rule: 'context', value: 'block-comment'},
    ],
  },
];

let variables = [
  {
    chunk: 'variable-init',
    checks: [
      {rule: 'value', value: '='},
      {rule: 'matchLeft', checks: [
        {rule: 'semantic', value: 'variable'},
      ]},
    ],
  },

  {
    endOfChunk: 'variable-init',
    checks: [
      {rule: 'value', value: ';'},
      {rule: 'chunk', value: 'variable-init'},
    ],
  },

  {
    semantic: 'variable-definition-seperator',
    endOfChunk: 'variable-init',
    checks: [
      {rule: 'value', value: ','},
      [
        {rule: 'chunk', value: 'variable-init'},
        {rule: 'matchLeft', checks: [
          {rule: 'semantic', value: 'variable'},
        ]},
      ],
    ],
  },

  {
    semantic: 'variable',
    checks: [
      {rule: 'type', value: 'identifier'},
      {rule: 'matchLeft', checks: [
        {rule: 'value', value: ['let', 'const', 'var']},
        {rule: 'semantic', value: [
          'variable-definition-seperator',
          'destructuring-left',
        ]},
      ]},
    ],
  },
];

let destruct = [
  {
    semantic: 'destructuring-left',
    checks: [
      {rule: 'value', value: '{'},
      {rule: 'matchLeft', checks: [
        {rule: 'value', value: ['let', 'var', 'const']},
      ]},
    ],
  },
];

let functions = [
  {
    semantic: 'function-name',
    checks: [ //and
      {rule: 'type', value: 'identifier'},
      [ //or
        {rule: 'matchLeft', checks: [
          {rule: 'value', value: 'function'},
        ]},
        [ //and
          {rule: 'context', value: 'object'},
          {rule: 'matchLeft', checks: [
            {rule: 'value', value: ['{', ',']},
          ]},
          {rule: 'matchRight', checks: [
            {rule: 'value', value: '('},
          ]},
        ],
      ],
    ],
  },

  {
    semantic: 'function-call',
    checks: [
      {rule: 'type', value: 'identifier'},
      {rule: 'matchRight', checks: [
        {rule: 'value', value: '('},
      ]},
    ],
  },

  {
    semantic: 'arguments-left',
    context: 'function-arguments',
    scope: 'new',
    checks: [
      {rule: 'value', value: '('},
      [
        {rule: 'matchLeft', checks: [
          {rule: 'semantic', value: 'function-name'},
          {rule: 'value', value: 'function'},
        ]},
        {rule: 'matchNextContextRight', checks: [
          {rule: 'value', value: '=>'},
        ]},
      ],
    ],
  },

  {
    semantic: 'argument',
    checks: [
      {rule: 'type', value: 'identifier'},
      {rule: 'context', value: 'function-arguments'},
    ],
  },

  {
    semantic: 'arguments-right',
    checks: [
      {rule: 'value', value: ')'},
      {rule: 'context', value: 'function-arguments'},
    ],
  },

  {
    semantic: 'function-body-left',
    context: 'function-body',
    scope: 'reference-previous',
    checks: [
      {rule: 'value', value: '{'},
      {rule: 'matchLeft', checks: [
        {rule: 'semantic', value: 'arguments-right'},
        {rule: 'value', value: ['=>']},
      ]},
    ],
  },

  {
    semantic: 'function-body-right',
    checks: [
      {rule: 'value', value: '}'},
      {rule: 'context', value: 'function-body'},
    ],
  },
];

let object = [
  {
    semantic: 'object-left',
    context: 'object',
    checks: [
      {rule: 'value', value: '{'},
      {rule: 'matchLeft', checks: [
        {rule: 'value', value: ['=', ':', '(', 'return']},
      ]},
    ],
  },

  {
    semantic: 'object-field-declaration',
    checks: [
      {rule: 'type', value: 'identifier'},
      {rule: 'context', value: 'object'},
      {rule: 'matchLeft', checks: [
        {rule: 'value', value: ['{', ',']},
      ]},
      {rule: 'matchRight', checks: [
        {rule: 'value', value: ':'},
      ]},
    ],
  },

  {
    semantic: 'object-right',
    checks: [
      {rule: 'value', value: '}'},
      {rule: 'context', value: 'object'},
    ],
  },

  {
    semantic: 'object-field-instance',
    checks: [
      {rule: 'type', value: 'identifier'},
      {rule: 'matchLeft', checks: [
        {rule: 'value', value: '.'},
      ]},
    ],
  },
];

let statements = [
  {
    semantic: 'if-condition-left',
    context: 'if-condition',
    checks: [
      {rule: 'value', value: '('},
      {rule: 'matchLeft', checks: [
        {rule: 'value', value: 'if'},
      ]},
    ],
  },

  {
    semantic: 'if-condition-right',
    checks: [
      {rule: 'value', value: ')'},
      {rule: 'context', value: 'if-condition'},
    ],
  },

  {
    semantic: 'if-block-left',
    context: 'if-block',
    checks: [
      {rule: 'value', value: '{'},
      {rule: 'matchLeft', checks: [
        {rule: 'semantic', value: 'if-condition-right'},
      ]},
    ],
  },

  {
    semantic: 'if-block-right',
    checks: [
      {rule: 'value', value: '}'},
      {rule: 'context', value: 'if-block'},
    ],
  },
];

export default [
  ...comments,
  ...variables,
  ...destruct,
  ...functions,
  ...object,
  ...statements,
];
