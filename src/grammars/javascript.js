let check = `
    (\\n)
  | (\\/\\/.*|<!--.*|-->.*)
  | (0(?:[xX][0-9a-fA-F]+
         |[oO][0-7]+
         |[bB][01]+
      )
    |(?:\\d+(?:[.]\\d*)?|[.]\\d+)(?:[eE][+-]?\\d+)?
    |[1-9]\\d*
    |0[0-7]+
    )
  | ( "(?:\\\\[\\s\\S]|[^"\\n\\\\])*"
    | '(?:\\\\[\\s\\S]|[^'\\n\\\\])*'
    | \`(?:\\\\[\\s\\S]|[^\`\\\\])*\`
    )
  | (\`|\\.|,|;|:)
  | (\\{|\\(|\\[|\\/\\*)
  | (\\}|\\)|\\]|\\*\\/)
  | (\\/(?![*])(?:\\\\.|[^\\/\\n\\\\])+\\/(?:[gimuy]{0,5}|\\\\b))
  | (>>>=?|[.]{3}|<<=|===|!==|>>=|[+][+](?=[+])|--(?=-)
    |[=!<>*%+/&|^-]=|'&&|[|][|]|[+][+]|--|<<|>>|=>|[-+*/%<>=&|^~!?]
    )
  | (true|false)
  | (typeof|in|void|case|instanceof|yield|throw|delete
    |if|while|for|with
    |var|else|function|this|return|new|break|do
    |catch|finally|try|default|continue|switch
    |const|export|import|class|extends|debugger|super
    |let|static
    |enum|await
    |implements|package|protected|interface|private|public
    |null|undefined
    )(?![\\u00BF-\\u1FFF\\u2C00-\\uD7FF\\w])
  | ([\\u00BF-\\u1FFF\\u2C00-\\uD7FF\\w#@"'\`\\\\\\$]+)
`;

let contexts = {
  left: {
    '(': ')',
    '[': ']',
    '{': '}',
    '/*': '*/',
  },
  right: {
    ')': '(',
    ']': '[',
    '}': '{',
    '*/': '/*',
  },
  ignoreInside: {
    '/*': true,
  },
};

import semantics from './javascript-semantics';

export default {
  check,
  contexts,
  semantics,
};
