module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _grammars = __webpack_require__(2);
	
	var _grammars2 = _interopRequireDefault(_grammars);
	
	var _singleTokenizer = __webpack_require__(5);
	
	exports['default'] = {
	  grammars: _grammars2['default'],
	  createTokenizer: _singleTokenizer.createTokenizer
	};
	module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _javascript = __webpack_require__(3);
	
	var _javascript2 = _interopRequireDefault(_javascript);
	
	exports['default'] = {
	  javascript: _javascript2['default']
	};
	module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _javascriptSemantics = __webpack_require__(4);
	
	var _javascriptSemantics2 = _interopRequireDefault(_javascriptSemantics);
	
	var check = '\n    (\\n)\n  | (\\/\\/.*|<!--.*|-->.*)\n  | (0(?:[xX][0-9a-fA-F]+\n         |[oO][0-7]+\n         |[bB][01]+\n      )\n    |(?:\\d+(?:[.]\\d*)?|[.]\\d+)(?:[eE][+-]?\\d+)?\n    |[1-9]\\d*\n    |0[0-7]+\n    )\n  | ( "(?:\\\\[\\s\\S]|[^"\\n\\\\])*"\n    | \'(?:\\\\[\\s\\S]|[^\'\\n\\\\])*\'\n    | `(?:\\\\[\\s\\S]|[^`\\\\])*`\n    )\n  | (`|\\.|,|;|:)\n  | (\\{|\\(|\\[|\\/\\*)\n  | (\\}|\\)|\\]|\\*\\/)\n  | (\\/(?![*])(?:\\\\.|[^\\/\\n\\\\])+\\/(?:[gimuy]{0,5}|\\\\b))\n  | (>>>=?|[.]{3}|<<=|===|!==|>>=|[+][+](?=[+])|--(?=-)\n    |[=!<>*%+/&|^-]=|\'&&|[|][|]|[+][+]|--|<<|>>|=>|[-+*/%<>=&|^~!?]\n    )\n  | (true|false)\n  | (typeof|in|void|case|instanceof|yield|throw|delete\n    |if|while|for|with\n    |var|else|function|this|return|new|break|do\n    |catch|finally|try|default|continue|switch\n    |const|export|import|class|extends|debugger|super\n    |let|static\n    |enum|await\n    |implements|package|protected|interface|private|public\n    |null|undefined\n    )(?![\\u00BF-\\u1FFF\\u2C00-\\uD7FF\\w])\n  | ([\\u00BF-\\u1FFF\\u2C00-\\uD7FF\\w#@"\'`\\\\\\$]+)\n';
	
	var contexts = {
	  left: {
	    '(': ')',
	    '[': ']',
	    '{': '}',
	    '/*': '*/'
	  },
	  right: {
	    ')': '(',
	    ']': '[',
	    '}': '{',
	    '*/': '/*'
	  },
	  ignoreInside: {
	    '/*': true
	  }
	};
	
	exports['default'] = {
	  check: check,
	  contexts: contexts,
	  semantics: _javascriptSemantics2['default']
	};
	module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var comments = [{
	  semantic: 'block-comment-left',
	  context: 'block-comment',
	  checks: [{ rule: 'value', value: '/*' }]
	}, {
	  semantic: 'block-comment-right',
	  checks: [{ rule: 'value', value: '*/' }, { rule: 'context', value: 'block-comment' }]
	}];
	
	var variables = [{
	  chunk: 'variable-init',
	  checks: [{ rule: 'value', value: '=' }, { rule: 'matchLeft', checks: [{ rule: 'semantic', value: 'variable' }] }]
	}, {
	  endOfChunk: 'variable-init',
	  checks: [{ rule: 'value', value: ';' }, { rule: 'chunk', value: 'variable-init' }]
	}, {
	  semantic: 'variable-definition-seperator',
	  endOfChunk: 'variable-init',
	  checks: [{ rule: 'value', value: ',' }, [{ rule: 'chunk', value: 'variable-init' }, { rule: 'matchLeft', checks: [{ rule: 'semantic', value: 'variable' }] }]]
	}, {
	  semantic: 'variable',
	  checks: [{ rule: 'type', value: 'identifier' }, { rule: 'matchLeft', checks: [{ rule: 'value', value: ['let', 'const', 'var'] }, { rule: 'semantic', value: ['variable-definition-seperator', 'destructuring-left'] }] }]
	}];
	
	var destruct = [{
	  semantic: 'destructuring-left',
	  checks: [{ rule: 'value', value: '{' }, { rule: 'matchLeft', checks: [{ rule: 'value', value: ['let', 'var', 'const'] }] }]
	}];
	
	var functions = [{
	  semantic: 'function-name',
	  checks: [//and
	  { rule: 'type', value: 'identifier' }, [//or
	  { rule: 'matchLeft', checks: [{ rule: 'value', value: 'function' }] }, [//and
	  { rule: 'context', value: 'object' }, { rule: 'matchLeft', checks: [{ rule: 'value', value: ['{', ','] }] }, { rule: 'matchRight', checks: [{ rule: 'value', value: '(' }] }]]]
	}, {
	  semantic: 'function-call',
	  checks: [{ rule: 'type', value: 'identifier' }, { rule: 'matchRight', checks: [{ rule: 'value', value: '(' }] }]
	}, {
	  semantic: 'arguments-left',
	  context: 'function-arguments',
	  scope: 'new',
	  checks: [{ rule: 'value', value: '(' }, [{ rule: 'matchLeft', checks: [{ rule: 'semantic', value: 'function-name' }, { rule: 'value', value: 'function' }] }, { rule: 'matchNextContextRight', checks: [{ rule: 'value', value: '=>' }] }]]
	}, {
	  semantic: 'argument',
	  checks: [{ rule: 'type', value: 'identifier' }, { rule: 'context', value: 'function-arguments' }]
	}, {
	  semantic: 'arguments-right',
	  checks: [{ rule: 'value', value: ')' }, { rule: 'context', value: 'function-arguments' }]
	}, {
	  semantic: 'function-body-left',
	  context: 'function-body',
	  scope: 'reference-previous',
	  checks: [{ rule: 'value', value: '{' }, { rule: 'matchLeft', checks: [{ rule: 'semantic', value: 'arguments-right' }, { rule: 'value', value: ['=>'] }] }]
	}, {
	  semantic: 'function-body-right',
	  checks: [{ rule: 'value', value: '}' }, { rule: 'context', value: 'function-body' }]
	}];
	
	var object = [{
	  semantic: 'object-left',
	  context: 'object',
	  checks: [{ rule: 'value', value: '{' }, { rule: 'matchLeft', checks: [{ rule: 'value', value: ['=', ':', '(', 'return'] }] }]
	}, {
	  semantic: 'object-field-declaration',
	  checks: [{ rule: 'type', value: 'identifier' }, { rule: 'context', value: 'object' }, { rule: 'matchLeft', checks: [{ rule: 'value', value: ['{', ','] }] }, { rule: 'matchRight', checks: [{ rule: 'value', value: ':' }] }]
	}, {
	  semantic: 'object-right',
	  checks: [{ rule: 'value', value: '}' }, { rule: 'context', value: 'object' }]
	}, {
	  semantic: 'object-field-instance',
	  checks: [{ rule: 'type', value: 'identifier' }, { rule: 'matchLeft', checks: [{ rule: 'value', value: '.' }] }]
	}];
	
	var statements = [{
	  semantic: 'if-condition-left',
	  context: 'if-condition',
	  checks: [{ rule: 'value', value: '(' }, { rule: 'matchLeft', checks: [{ rule: 'value', value: 'if' }] }]
	}, {
	  semantic: 'if-condition-right',
	  checks: [{ rule: 'value', value: ')' }, { rule: 'context', value: 'if-condition' }]
	}, {
	  semantic: 'if-block-left',
	  context: 'if-block',
	  checks: [{ rule: 'value', value: '{' }, { rule: 'matchLeft', checks: [{ rule: 'semantic', value: 'if-condition-right' }] }]
	}, {
	  semantic: 'if-block-right',
	  checks: [{ rule: 'value', value: '}' }, { rule: 'context', value: 'if-block' }]
	}];
	
	exports['default'] = [].concat(comments, variables, destruct, functions, object, statements);
	module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _modulesTokensTyped = __webpack_require__(6);
	
	var _tokenizerContexts = __webpack_require__(8);
	
	var _tokenizerSemantics = __webpack_require__(16);
	
	var _tokenizerScopes = __webpack_require__(17);
	
	var _modulesGrammarMapper = __webpack_require__(9);
	
	var _modulesHelpers = __webpack_require__(10);
	
	var _constants = __webpack_require__(7);
	
	function createTokenizer(spec) {
	  var grammar = spec.grammar;
	  var bufferSize = spec.bufferSize;
	
	  bufferSize = bufferSize || 10000;
	
	  var grammarLocal = JSON.parse(JSON.stringify(grammar));
	  var check = grammarLocal.check.replace(/\n| /g, '');
	  var regexpWithWhitespace = new RegExp('( |\\t)|' + check, 'g');
	
	  var cache = {};
	  var tokens = (0, _modulesTokensTyped.createTokens)({
	    size: bufferSize
	  });
	  var lines = new Uint32Array(100000);
	
	  var init = tokens.init;
	  var getValue = tokens.getValue;
	  var setValue = tokens.setValue;
	  var setValueSave = tokens.setValueSave;
	
	  var semantics = (0, _modulesGrammarMapper.mapSemantics)(grammarLocal);
	  var contexts = (0, _tokenizerContexts.contexter)(grammarLocal, tokens);
	  var semantic = (0, _tokenizerSemantics.semantica)(semantics, tokens);
	  var scopes = (0, _tokenizerScopes.scoper)(tokens, semantics.mappings);
	
	  var resetContexts = contexts.reset;
	  var handleContexts = contexts.handle;
	
	  var resetSemantics = semantic.reset;
	  var handleSemantics = semantic.handle;
	
	  var handleScopes = scopes.handle;
	
	  var mappings = {
	    type: _constants.intToType,
	    context: semantics.mappings.context,
	    semantic: semantics.mappings.semantic,
	    chunk: semantics.mappings.chunk
	  };
	
	  return {
	    tokens: tokens,
	    mappings: mappings,
	    tokenizeLine: function tokenizeLine(text) {
	      var tokens = [];
	      var index = 0;
	
	      var match = undefined;
	      while ((match = regexpWithWhitespace.exec(text)) !== null) {
	        if (match.index === regexpWithWhitespace.lastIndex) {
	          regexpWithWhitespace.lastIndex += 1;
	        }
	
	        var type = undefined;
	        for (var i = 1; i <= 13; i += 1) {
	          if (match[i] !== undefined) {
	            type = i;
	            break;
	          }
	        }
	
	        tokens[index] = type;
	        tokens[index + 1] = match[0].length;
	
	        index += 2;
	      }
	
	      return tokens;
	    },
	    tokenize: function tokenize(text) {
	      resetContexts();
	      //index = 0 is the global-context-token
	      var index = 1;
	      var row = 0;
	      var col = 0;
	
	      var match = undefined;
	      while ((match = regexpWithWhitespace.exec(text)) !== null) {
	        if (match.index === regexpWithWhitespace.lastIndex) {
	          regexpWithWhitespace.lastIndex += 1;
	        }
	
	        var type = undefined;
	        for (var i = 1; i <= 13; i += 1) {
	          if (match[i] !== undefined) {
	            type = i;
	            break;
	          }
	        }
	
	        if (type === _constants.LINE_TERMINATOR) {
	          row += 1;
	          col = 0;
	          lines[row] = index;
	        } else if (type === _constants.WHITESPACE) {
	          col = col + 1;
	        } else {
	          var value = match[0];
	          var _length = value.length;
	          init(index, row, col, type, (0, _modulesHelpers.hash)(value, _length));
	
	          // console.log(index, value, hash(value, length), tokens.getHash(index));
	          // DEBUG
	          // if (storeValue) {
	          // setValue(index, value, length);
	          setValueSave(index, value, _length);
	          //   console.log(type, getValue(index));
	          // }
	          // getValue(index);
	
	          handleContexts(index);
	
	          index += 1;
	          col += _length;
	        }
	      }
	
	      //ref beginning and end of file "token"
	      lines[0] = 1;
	      lines[row + 1] = index;
	
	      cache.tokenCount = index - 1;
	      cache.rowCount = row;
	      cache.lines = lines;
	      cache.tokens = tokens;
	      return cache;
	    },
	
	    semantica: function semantica() {
	      resetSemantics();
	
	      var length = cache.tokenCount;
	      for (var i = 1; i <= length; i += 1) {
	        handleSemantics(i);
	        handleScopes(i);
	      }
	
	      return cache;
	    }
	  };
	}
	
	exports['default'] = {
	  createTokenizer: createTokenizer
	};
	module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _constants = __webpack_require__(7);
	
	function createTokens() {
	  var spec = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var COUNT = spec.size;
	  var MAX_STRING_LENGTH = spec.maxStringLength || 100;
	  var MAX_SCOPES = spec.maxScopes || 1000;
	  var SCOPES_HASHMAP_SIZE = spec.scopesHashmapSize || 10000;
	
	  /**
	   * HashMaps for scopes
	   **/
	  var scopes = new Int32Array(MAX_SCOPES * SCOPES_HASHMAP_SIZE);
	  var IdsInScopes = new Int32Array(MAX_SCOPES * SCOPES_HASHMAP_SIZE);
	
	  /**
	   * Struct
	   **/
	  var buffer = new ArrayBuffer(64 * COUNT * MAX_STRING_LENGTH);
	  var index = new Int32Array(buffer, 0, 1 * COUNT);
	  var row = new Int32Array(buffer, 4 * COUNT, 1 * COUNT);
	  var col = new Int32Array(buffer, 8 * COUNT, 1 * COUNT);
	  var type = new Int32Array(buffer, 12 * COUNT, 1 * COUNT);
	  var hash = new Uint32Array(buffer, 16 * COUNT, 1 * COUNT);
	  var contextLevel = new Int32Array(buffer, 20 * COUNT, 1 * COUNT);
	  var id = new Int32Array(buffer, 24 * COUNT, 1 * COUNT);
	  var semantic = new Int32Array(buffer, 28 * COUNT, 1 * COUNT);
	  var chunk = new Int32Array(buffer, 32 * COUNT, 1 * COUNT);
	  var context = new Int32Array(buffer, 36 * COUNT, 1 * COUNT);
	
	  var contextLeftToken = new Int32Array(buffer, 40 * COUNT, 1 * COUNT);
	  var contextRightToken = new Int32Array(buffer, 44 * COUNT, 1 * COUNT);
	  var contextParentToken = new Int32Array(buffer, 48 * COUNT, 1 * COUNT);
	
	  var scopeToken = new Int32Array(buffer, 52 * COUNT, 1 * COUNT);
	  var scopeParentToken = new Int32Array(buffer, 56 * COUNT, 1 * COUNT);
	  var value = new Int32Array(buffer, 60 * COUNT, MAX_STRING_LENGTH * COUNT);
	
	  /**
	   * GettersstringValue
	   **/
	  function getType(i) {
	    return type[i];
	  }
	
	  var fromCharCode = String.fromCharCode;
	  function getValue(i) {
	    var result = '';
	    var offset = i * MAX_STRING_LENGTH;
	
	    for (var j = 0; j < MAX_STRING_LENGTH; j += 1) {
	      var charCode = value[offset + j];
	
	      if (charCode === 0) {
	        break;
	      }
	
	      result += fromCharCode(charCode);
	    }
	
	    return result;
	  }
	
	  function getIndex(i) {
	    return i;
	  }
	
	  function getRow(i) {
	    return row[i];
	  }
	
	  function getCol(i) {
	    return col[i];
	  }
	
	  function getHash(i) {
	    return hash[i];
	  }
	
	  function getId(i) {
	    return id[i];
	  }
	
	  function getSemantic(i) {
	    return semantic[i];
	  }
	
	  function getContext(i) {
	    if (type[i] !== _constants.CONTEXT_LEFT) {
	      return context[contextLeftToken[i]];
	    } else {
	      return context[i];
	    }
	  }
	
	  function getChunk(i) {
	    return chunk[i];
	  }
	
	  function getContextLeft(i) {
	    return contextLeftToken[i];
	  }
	
	  function getContextRight(i) {
	    return contextRightToken[i];
	  }
	
	  function getNext(i) {
	    return i + 1;
	  }
	
	  function getPrevious(i) {
	    return i - 1;
	  }
	
	  function getParentContext(i) {
	    return type[i] !== _constants.CONTEXT_LEFT ? contextParentToken[contextLeftToken[i]] : contextParentToken[i];
	  }
	
	  function getScope(i) {
	    return type[i] !== _constants.CONTEXT_LEFT ? scopeToken[contextLeftToken[i]] : scopeToken[i];
	  }
	
	  function getParentScope(i) {
	    return type[i] !== _constants.CONTEXT_LEFT ? scopeParentToken[contextLeftToken[i]] : scopeParentToken[i];
	  }
	
	  function getNextContextRight(i) {
	    return contextRightToken[i] + 1;
	  }
	
	  function getContextLevel(i) {
	    return contextLevel[i];
	  }
	
	  function get(field, i) {
	    if (field === 'type') {
	      return getType(i);
	    } else if (field === 'hash') {
	      return getHash(i);
	    } else if (field === 'semantic') {
	      return getSemantic(i);
	    } else if (field === 'context') {
	      return getContext(i);
	    } else if (field === 'chunk') {
	      return getChunk(i);
	    }
	  }
	
	  /**
	   * All dem setters...
	   **/
	  function init(i, newRow, newCol, newType, newHash) {
	    index[i] = i;
	    row[i] = newRow;
	    col[i] = newCol;
	    type[i] = newType;
	    hash[i] = newHash;
	    id[i] = 0;
	    contextLevel[i] = 0;
	    semantic[i] = 0;
	    chunk[i] = 0;
	    context[i] = 0;
	    contextLeftToken[i] = 0;
	    contextRightToken[i] = 0;
	    contextParentToken[i] = 0;
	    scopeToken[i] = 0;
	    scopeParentToken[i] = 0;
	  }
	
	  function setIndex(i, value) {
	    index[i] = value;
	  }
	
	  function setRow(i, value) {
	    row[i] = value;
	  }
	
	  function setCol(i, value) {
	    col[i] = value;
	  }
	
	  function setValue(i, v, length) {
	    var offset = i * MAX_STRING_LENGTH;
	
	    for (var j = 0; j < length; j += 1) {
	      value[offset + j] = v.charCodeAt(j);
	    }
	  }
	
	  function setValueSave(i, v, length) {
	    var offset = i * MAX_STRING_LENGTH;
	
	    for (var j = 0; j < MAX_STRING_LENGTH; j += 1) {
	      var char = v.charCodeAt(j) || 0;
	      value[offset + j] = char;
	
	      if (!char && !value[offset + j + 1]) {
	        break;
	      }
	    }
	  }
	
	  function setId(i, value) {
	    id[i] = value;
	  }
	
	  function setType(i, value) {
	    type[i] = value;
	  }
	
	  function setSemantic(i, v) {
	    semantic[i] = v;
	  }
	
	  function setContext(i, v) {
	    context[i] = v;
	  }
	
	  function setChunk(i, v) {
	    chunk[i] = v;
	  }
	
	  function setContextLevel(i, value) {
	    contextLevel[i] = value;
	  }
	
	  function setContextLeft(i, value) {
	    contextLeftToken[i] = value;
	  }
	
	  function setContextRight(i, value) {
	    contextRightToken[i] = value;
	  }
	
	  function setParentContext(i, value) {
	    contextParentToken[i] = value;
	  }
	
	  function setScope(i, value) {
	    scopeToken[i] = value;
	  }
	
	  function setParentScope(i, value) {
	    scopeParentToken[i] = value;
	  }
	
	  function flush() {
	    for (var i = 0; i < COUNT; i += 1) {
	      index[i] = 0;
	      row[i] = 0;
	      col[i] = 0;
	      type[i] = 0;
	      hash[i] = 0;
	      contextLevel[i] = 0;
	      semantic[i] = 0;
	      chunk[i] = 0;
	      context[i] = 0;
	
	      contextLeftToken[i] = 0;
	      contextRightToken[i] = 0;
	      contextParentToken[i] = 0;
	
	      value[i] = 0;
	    }
	  }
	
	  function isContextLeft(i) {
	    return type[i] === _constants.CONTEXT_LEFT;
	  }
	
	  function isContextRight(i) {
	    return type[i] === _constants.CONTEXT_RIGHT;
	  }
	
	  function addToScope(i) {
	    var hashIndex = hash[i] % SCOPES_HASHMAP_SIZE;
	    var scopeIndex = type[i] !== _constants.CONTEXT_LEFT ? scopeToken[contextLeftToken[i]] : scopeToken[i];
	
	    var currentId = scopes[scopeIndex * SCOPES_HASHMAP_SIZE];
	    var index = scopeIndex * SCOPES_HASHMAP_SIZE + hashIndex;
	
	    if (scopes[index] === 0) {
	      scopes[scopeIndex * SCOPES_HASHMAP_SIZE] = currentId + 1; //update currentId
	      scopes[index] = i; //save reference to declaration
	      IdsInScopes[index] = currentId + 1; //save current "color"-id of this token
	    }
	
	    id[i] = IdsInScopes[index]; //set id
	  }
	
	  function isInScope(i, scopeIndex) {
	    var h = hash[i] % SCOPES_HASHMAP_SIZE;
	    return scopes[scopeIndex * SCOPES_HASHMAP_SIZE + h];
	  }
	
	  return {
	    getIndex: getIndex,
	    getType: getType,
	    getRow: getRow,
	    getCol: getCol,
	    getId: getId,
	    getHash: getHash,
	    getValue: getValue,
	    getSemantic: getSemantic,
	    getContext: getContext,
	    getChunk: getChunk,
	    getContextLeft: getContextLeft,
	    getContextRight: getContextRight,
	    getScope: getScope,
	    getParentScope: getParentScope,
	    getContextLevel: getContextLevel,
	    getNext: getNext,
	    getPrevious: getPrevious,
	    getParentContext: getParentContext,
	    getNextContextRight: getNextContextRight,
	    get: get,
	    init: init,
	    setIndex: setIndex,
	    setRow: setRow,
	    setCol: setCol,
	    setId: setId,
	    setType: setType,
	    setValue: setValue,
	    setValueSave: setValueSave,
	    setSemantic: setSemantic,
	    setContext: setContext,
	    setChunk: setChunk,
	    setContextLevel: setContextLevel,
	    setContextLeft: setContextLeft,
	    setContextRight: setContextRight,
	    setParentContext: setParentContext,
	    setScope: setScope,
	    setParentScope: setParentScope,
	
	    isContextLeft: isContextLeft,
	    isContextRight: isContextRight,
	    flush: flush,
	
	    addToScope: addToScope,
	    isInScope: isInScope
	  };
	}
	
	exports['default'] = {
	  createTokens: createTokens
	};
	module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var WHITESPACE = 1;
	var LINE_TERMINATOR = 2;
	var SINGLELINE_COMMMENT = 3;
	var NUMERIC = 4;
	var STRING = 5;
	var PUNCTUATOR = 6;
	var CONTEXT_LEFT = 7;
	var CONTEXT_RIGHT = 8;
	var REGEXP = 9;
	var OPERATOR = 10;
	var BOOLEAN = 11;
	var KEYWORD = 12;
	var IDENTIFIER = 13;
	var UNKNOWN = 14;
	
	var intToType = ['', 'whitespace', 'line-terminator', 'singleline-comment', 'numeric', 'string', 'punctuator', 'context-left', 'context-right', 'regexp', 'operator', 'boolean', 'keyword', 'identifier', 'unknown'];
	
	var typeToInt = {
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
	  'unknown': 14
	};
	
	exports['default'] = {
	  intToType: intToType,
	  typeToInt: typeToInt,
	
	  WHITESPACE: WHITESPACE,
	  LINE_TERMINATOR: LINE_TERMINATOR,
	  SINGLELINE_COMMMENT: SINGLELINE_COMMMENT,
	  NUMERIC: NUMERIC,
	  STRING: STRING,
	  PUNCTUATOR: PUNCTUATOR,
	  CONTEXT_LEFT: CONTEXT_LEFT,
	  CONTEXT_RIGHT: CONTEXT_RIGHT,
	  REGEXP: REGEXP,
	  OPERATOR: OPERATOR,
	  BOOLEAN: BOOLEAN,
	  KEYWORD: KEYWORD,
	  IDENTIFIER: IDENTIFIER,
	  UNKNOWN: UNKNOWN
	};
	module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _modulesGrammarMapper = __webpack_require__(9);
	
	var _constants = __webpack_require__(7);
	
	function contexter(grammar, tokens) {
	  var contexts = (0, _modulesGrammarMapper.mapContexts)(grammar.contexts);
	  var isIgnoring = false;
	  var current = 0;
	  var previous = 0;
	  var contextLevel = 0;
	  var contextStack = Array(50);
	
	  //make global-token a contextLeftToken
	  tokens.setType(0, _constants.CONTEXT_LEFT);
	
	  function handleContextLeft() {
	    if (!isIgnoring) {
	      var _parent = contextStack[contextLevel];
	      if (_parent) {
	        tokens.setParentContext(current, _parent);
	      }
	
	      contextLevel += 1;
	      contextStack[contextLevel] = current;
	
	      var shouldIgnore = contexts.ignoreInside[tokens.getHash(current)];
	      if (shouldIgnore) {
	        isIgnoring = true;
	      }
	    } else /* isIgnoring */{
	        tokens.setType(current, _constants.UNKNOWN);
	        tokens.setContextLeft(current, tokens.getContextLeft(previous));
	      }
	  }
	
	  function handleContextRight() {
	    var isContextRightOfCurrentContext = tokens.getHash(contextStack[contextLevel]) === contexts.getMatch(tokens.getHash(current));
	
	    if (isContextRightOfCurrentContext) {
	      tokens.setContextRight(contextStack[contextLevel], current);
	      tokens.setContextLeft(current, contextStack[contextLevel]);
	
	      isIgnoring = false;
	      return;
	    }
	
	    /***
	     * token.isContextRight but isn't matching the previous contextLeftToken.
	     * This can e.g. happen if we have context-tokens inside of comments..
	     * like this -> 1) do smth 2) do smth else...
	     **/
	    if (isIgnoring) {
	      tokens.setType(current, _constants.UNKNOWN);
	    }
	
	    tokens.setContextLeft(current, contextStack[contextLevel - 1]);
	  }
	
	  return {
	    reset: function reset() {
	      contextLevel = 0;
	    },
	    handle: function handle(index) {
	      current = index;
	      previous = index - 1;
	
	      if (tokens.isContextRight(previous)) {
	        contextLevel -= 1;
	      }
	
	      if (tokens.isContextLeft(current)) {
	        handleContextLeft(current);
	      } else if (tokens.isContextRight(current)) {
	        handleContextRight(current);
	      } else /* if not a context-token */{
	          var contextLeftIndex = tokens.isContextLeft(previous) ? previous : contextStack[contextLevel];
	
	          tokens.setContextLeft(current, contextLeftIndex);
	        }
	
	      tokens.setContextLevel(current, contextLevel);
	    }
	  };
	}
	
	exports['default'] = {
	  contexter: contexter
	};
	module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var _helpers = __webpack_require__(10);
	
	var _constants = __webpack_require__(7);
	
	var _semanticChecks = __webpack_require__(11);
	
	var _semanticChecks2 = _interopRequireDefault(_semanticChecks);
	
	var _util = __webpack_require__(12);
	
	var _util2 = _interopRequireDefault(_util);
	
	function mapContexts(contexts) {
	  var result = {
	    left: {},
	    right: {},
	    ignoreInside: {}
	  };
	
	  Object.keys(contexts.left).forEach(function (key) {
	    var value = (0, _helpers.hash)(contexts.left[key], contexts.left[key].length);
	
	    result.left[(0, _helpers.hash)(key, key.length)] = value;
	  });
	
	  Object.keys(contexts.right).forEach(function (key) {
	    var value = (0, _helpers.hash)(contexts.right[key], contexts.right[key].length);
	
	    result.right[(0, _helpers.hash)(key, key.length)] = value;
	  });
	
	  Object.keys(contexts.ignoreInside).forEach(function (key) {
	    result.ignoreInside[(0, _helpers.hash)(key, key.length)] = true;
	  });
	
	  var left = result.left;
	  var right = result.right;
	  result.getMatch = function (char) {
	    return left[char] || right[char];
	  };
	
	  return result;
	}
	
	function mapSemantics(grammar) {
	  var semanticsByHash = Object.create(null);
	  var semanticsByType = Object.create(null);
	  var semantics = grammar.semantics;
	  var id = 1;
	  var mappings = {
	    semantic: {},
	    chunk: {},
	    context: {}
	  };
	
	  function matchValues(item) {
	    function matchValue(rule, value) {
	      var result = undefined;
	
	      if (rule === 'hash') {
	        result = (0, _helpers.hash)(value, value.length);
	      } else if (rule === 'type') {
	        result = _constants.typeToInt[value];
	      } else if (rule === 'semantic' || rule === 'context' || rule === 'contexts' || rule === 'chunk') {
	        var key = rule === 'contexts' ? 'context' : rule;
	
	        if (!mappings[key][value]) {
	          mappings[key][value] = id;
	          mappings[key][id] = value;
	          id += 1;
	        }
	
	        result = mappings[key][value];
	      } else if (rule === 'matchLeft' || rule === 'matchRight' || rule === 'matchNextContextRight') {
	        console.log('this log shouldn\'t happen maybe?', value);
	      }
	      return result || value;
	    }
	    /*
	    * check against a single value
	    */
	    if (item.value.constructor === String) {
	      item.negate = item.value[0] === '!';
	      if (item.negate) {
	        item.value = item.value.substr(1);
	      }
	
	      var value = matchValue(item.rule, item.value);
	      item.value = value;
	    }
	    /*
	    * check against a list of values
	    */
	    else if (item.value.constructor === Array) {
	        item.negate = false;
	        item.value = item.value.map(function (value) {
	          return matchValue(item.rule, value);
	        });
	      }
	      /*
	      * execute checks on related tokens
	      */
	      else if (item.value.constructor === Object) {
	          var nestedItem = item.value;
	          nestedItem = matchValues(nestedItem);
	        }
	
	    item.handler = _semanticChecks2['default'][item.rule](item);
	  }
	
	  function mapChecks(checks, level) {
	    return checks.map(function (check) {
	      if (check instanceof Array) {
	        return _defineProperty({}, level % 2 === 0 ? 'or' : 'and', mapChecks(check, level + 1));
	      } else if (check instanceof Object) {
	        if (check.checks) {
	          return {
	            type: check.rule,
	            or: mapChecks(check.checks, level)
	          };
	        }
	
	        if (check.rule === 'value') {
	          check.rule = 'hash';
	        }
	
	        matchValues(check);
	        return check;
	      }
	    });
	  }
	
	  function composeHandlers(checks) {
	    var and = undefined;
	    var or = undefined;
	    function getOffsetModifier(type) {
	      if (type === 'matchLeft') {
	        return 'getPrevious';
	      } else if (type === 'matchRight') {
	        return 'getNext';
	      } else if (type === 'matchNextContextRight') {
	        return 'getNextContextRight';
	      } else {
	        return 'getIndex';
	      }
	    }
	
	    function checkNested(checks) {
	      for (var i = 0; i < checks.length; i += 1) {
	        if (checks[i].and) {
	          checks[i].handler = and(checks[i].and, getOffsetModifier(checks[i].type));
	        } else if (checks[i].or) {
	          checks[i].handler = or(checks[i].or, getOffsetModifier(checks[i].type));
	        }
	      }
	    }
	
	    and = function (checks, offsetModifier) {
	      // console.log('AND \n', offsetModifier, util.inspect(checks, {colors: true, depth: null}));
	      checkNested(checks);
	
	      return function (tokens, index) {
	        for (var i = 0; i < checks.length; i += 1) {
	          if (!checks[i].handler(tokens, index, offsetModifier)) {
	            return false;
	          }
	        }
	        return true;
	      };
	    };
	
	    or = function (checks, offsetModifier) {
	      // console.log('OR \n', offsetModifier, util.inspect(checks, {colors: true, depth: null}));
	      checkNested(checks);
	
	      return function (tokens, index) {
	        for (var i = 0; i < checks.length; i += 1) {
	          if (checks[i].handler(tokens, index, offsetModifier)) {
	            return true;
	          }
	        }
	        return false;
	      };
	    };
	
	    //first level always and yayaya..
	    return and(checks.and, getOffsetModifier(checks.type));
	  }
	
	  function addToSubList(semantics, i) {
	    var byHash = false;
	    var byType = false;
	    var checks = semantics[i].checks.and;
	    var result = undefined;
	
	    checks.forEach(function (c, index) {
	      if (c.rule === 'hash') {
	        if (!semanticsByHash[c.value]) {
	          semanticsByHash[c.value] = [];
	        }
	        var _length = semanticsByHash[c.value].push(semantics.splice(i, 1)[0]);
	        result = semanticsByHash[c.value][_length - 1];
	        byHash = index;
	      }
	    });
	
	    if (byHash !== false) {
	      checks.splice(byHash, 1);
	      return result;
	    } else {
	      checks.forEach(function (c, index) {
	        if (c.rule === 'type') {
	          if (!semanticsByType[c.value]) {
	            semanticsByType[c.value] = [];
	          }
	          var _length2 = semanticsByType[c.value].push(semantics.splice(i, 1)[0]);
	          result = semanticsByType[c.value][_length2 - 1];
	          byType = index;
	        }
	      });
	
	      if (byType !== false) {
	        checks.splice(byType, 1);
	        return result;
	      }
	    }
	
	    return semantics[i];
	  }
	
	  semantics = semantics.map(function (check, index) {
	    if (check.semantic && !mappings.semantic[check.semantic]) {
	      mappings.semantic[check.semantic] = id;
	      mappings.semantic[id] = check.semantic;
	      id += 1;
	    }
	
	    if (check.context && !mappings.context[check.context]) {
	      mappings.context[check.context] = id;
	      mappings.context[id] = check.context;
	      id += 1;
	    }
	
	    if (check.chunk && !mappings.chunk[check.chunk]) {
	      mappings.chunk[check.chunk] = id;
	      mappings.chunk[id] = check.chunk;
	      id += 1;
	    }
	
	    if (check.endOfChunk && !mappings.chunk[check.endOfChunk]) {
	      mappings.chunk[check.endOfChunk] = id;
	      mappings.chunk[id] = check.endOfChunk;
	      id += 1;
	    }
	
	    if (check.semantic) {
	      check.semantic = mappings.semantic[check.semantic];
	    }
	
	    if (check.context) {
	      check.context = mappings.context[check.context];
	    }
	
	    if (check.chunk) {
	      check.chunk = mappings.chunk[check.chunk];
	    }
	
	    if (check.endOfChunk) {
	      check.endOfChunk = mappings.chunk[check.endOfChunk];
	    }
	
	    check.checks = {
	      and: mapChecks(check.checks, 0)
	    };
	
	    // console.log('################');
	    // console.log(util.inspect(check, {colors: true, depth: null}));
	
	    return check;
	  });
	
	  var length = semantics.length;
	  for (var i = 0; i < length; i += 1) {
	    var semantic = addToSubList(semantics, i);
	
	    if (semantics.length < length) {
	      length = semantics.length;
	      i -= 1;
	    }
	
	    if (semantic.checks.and.length > 0) {
	      semantic.handler = composeHandlers(semantic.checks);
	    }
	  }
	
	  // console.log(util.inspect(semanticsByHash, {colors: true, depth: null}));
	  // console.log(util.inspect(semanticsByType, {colors: true, depth: null}));
	  // console.log(util.inspect(semantics, {colors: true, depth: null}));
	
	  // console.log(
	  //   Object.keys(semanticsByHash).length,
	  //   Object.keys(semanticsByType).length,
	  //   semantics.length
	  // );
	
	  return {
	    mappings: mappings,
	    semantics: semantics,
	    semanticsByHash: semanticsByHash,
	    semanticsByType: semanticsByType
	  };
	}
	
	exports['default'] = {
	  mapContexts: mapContexts,
	  mapSemantics: mapSemantics
	};
	module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	//https://github.com/darkskyapp/string-hash/blob/master/index.js
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function hash(string, length) {
	  var result = 5381;
	  var i = length;
	
	  while (i) {
	    result = result * 33 ^ string.charCodeAt(--i);
	  }
	
	  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
	   * integers. Since we want the results to be always positive, convert the
	   * signed int to an unsigned by doing an unsigned bitshift. */
	  return result >>> 0;
	}
	
	function stringToArray(string, array, length) {
	  var result = array;
	
	  for (var i = 0; i < length; i += 1) {
	    result[i] = string.charCodeAt(i);
	  }
	
	  return result;
	}
	
	var fromCharCode = String.fromCharCode;
	function arrayToString(array) {
	  var length = arguments.length <= 1 || arguments[1] === undefined ? array.length : arguments[1];
	  return (function () {
	    var result = '';
	
	    for (var i = 0; i < length; i += 1) {
	      var charCode = array[i];
	
	      if (charCode === 0) {
	        break;
	      }
	
	      result += fromCharCode(charCode);
	    }
	
	    return result;
	  })();
	}
	
	exports['default'] = {
	  hash: hash,
	  stringToArray: stringToArray,
	  arrayToString: arrayToString
	};
	module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _helpers = __webpack_require__(10);
	
	function isInArray(item) {
	  var rule = item.rule;
	  var array = item.value;
	  var length = array.length;
	
	  return function (tokens, index, offsetModifier) {
	    var value = tokens.get(rule, tokens[offsetModifier](index));
	    for (var i = 0; i < length; i += 1) {
	      if (array[i] === value) {
	        return true;
	      }
	    }
	    return false;
	  };
	}
	
	function isEqualValue(item) {
	  var rule = item.rule;
	  var value = item.value;
	
	  if (item.negate) {
	    return function (tokens, index, offsetModifier) {
	      return tokens.get(rule, tokens[offsetModifier](index)) !== value;
	    };
	  } else {
	    return function (tokens, index, offsetModifier) {
	      // console.log(index, rule, value, tokens.get(rule, tokens[offsetModifier](index)), offsetModifier, tokens.getHash(index-1));
	      return tokens.get(rule, tokens[offsetModifier](index)) === value;
	    };
	  }
	}
	
	function check(item) {
	  if (item.value instanceof Array) {
	    return isInArray(item);
	  } else {
	    return isEqualValue(item);
	  }
	}
	
	function contexts() {
	  //TODO: impl
	  return function () {
	    return false;
	  };
	}
	
	exports['default'] = {
	  type: check,
	  hash: check,
	  semantic: check,
	  context: check,
	  chunk: check,
	
	  contexts: contexts
	};
	module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(14);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(15);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(13)))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function semantica(grammar, tokens) {
	  var byHash = grammar.semanticsByHash;
	  var byType = grammar.semanticsByType;
	  var semantics = grammar.semantics;
	  var currentScope = 0;
	
	  function handleScopes(index, scope, tokens) {
	    if (scope === 'new') {
	      currentScope += 1;
	      tokens.setScope(index, currentScope);
	      tokens.setParentScope(index, tokens.getScope(tokens.getParentContext(index)));
	
	      // console.log('new', index, currentScope, tokens.getParentContext(index), tokens.getScope(tokens.getParentContext(index)));
	    } else if (scope === 'reference-previous') {
	        var previous = index - 1;
	        tokens.setScope(index, tokens.getScope(previous));
	        tokens.setParentScope(index, tokens.getParentScope(previous));
	
	        // console.log('ref-prev', index, tokens.getScope(previous), tokens.getParentScope(previous));
	      } else /* reference-parent */{
	          var _parent = tokens.getParentContext(index);
	          tokens.setScope(index, tokens.getScope(_parent));
	          tokens.setParentScope(index, tokens.getParentScope(_parent));
	
	          // console.log('ref-parent', index, tokens.getScope(parent), tokens.getParentScope(parent));
	        }
	  }
	
	  return {
	    reset: function reset() {
	      currentScope = 0;
	    },
	    handle: function handle(index) {
	      var checks = undefined;
	      var hash = byHash[tokens.getHash(index)];
	
	      if (hash) {
	        checks = hash;
	      } else {
	        var type = byType[tokens.getType(index)];
	        if (type) {
	          checks = type;
	        } else {
	          checks = semantics;
	        }
	      }
	
	      var currentChunk = tokens.getChunk(index - 1);
	      if (currentChunk) {
	        tokens.setChunk(index, currentChunk);
	      }
	
	      var semantic = undefined;
	      var length = checks.length;
	      for (var i = 0; i < length; i += 1) {
	        semantic = checks[i];
	        var handler = semantic.handler;
	
	        if (handler && handler(tokens, index)) {
	          if (semantic.semantic) {
	            tokens.setSemantic(index, semantic.semantic);
	            tokens.setContext(index, semantic.context);
	          }
	
	          if (semantic.chunk) {
	            tokens.setChunk(index, semantic.chunk);
	          } else if (semantic.endOfChunk) {
	            tokens.setChunk(index, 0);
	          }
	          break;
	        }
	      }
	
	      if (tokens.isContextLeft(index)) {
	        var scope = semantic && semantic.scope;
	        handleScopes(index, scope, tokens);
	      }
	    }
	  };
	}
	
	exports['default'] = {
	  semantica: semantica
	};
	module.exports = exports['default'];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _constants = __webpack_require__(7);
	
	function scoper(tokens, mappings) {
	  var intToContext = mappings.context;
	  var intToSemantic = mappings.semantic;
	
	  function getId(_x, _x2, _x3) {
	    var _again = true;
	
	    _function: while (_again) {
	      var index = _x,
	          contextLeftIndex = _x2,
	          scopeIndex = _x3;
	      _again = false;
	
	      if (scopeIndex === 0) {
	        return 0;
	      }
	
	      var id = tokens.isInScope(index, scopeIndex);
	
	      if (!id) {
	        var contextLeft = tokens.getContextLeft(contextLeftIndex);
	        _x = index;
	        _x2 = contextLeft;
	        _x3 = tokens.getParentScope(contextLeft);
	        _again = true;
	        id = contextLeft = undefined;
	        continue _function;
	      }
	
	      return id;
	    }
	  }
	
	  return {
	    handle: function handle(index) {
	      if (tokens.getType(index) !== _constants.IDENTIFIER) {
	        return;
	      }
	
	      var context = intToContext[tokens.getContext(index)];
	      if (context === 'function-arguments') {
	        tokens.addToScope(index);
	        return;
	      }
	
	      var semantic = intToSemantic[tokens.getSemantic(index)];
	      if (semantic === 'variable') {
	        tokens.addToScope(index);
	        return;
	      }
	
	      /**
	       * instances
	       **/
	      if (semantic === 'object-field-instance' || semantic === 'object-field-declaration') {
	        return;
	      }
	
	      var id = getId(index, index, tokens.getScope(index));
	      if (id) {
	        tokens.setId(index, id);
	      }
	    }
	  };
	}
	
	exports['default'] = {
	  scoper: scoper
	};
	module.exports = exports['default'];

/***/ })
/******/ ]);
//# sourceMappingURL=main.node-bundle.js.map