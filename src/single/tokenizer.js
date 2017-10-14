import { createTokens } from './modules/tokens-typed';
import { contexter } from './tokenizer-contexts';
import { semantica } from './tokenizer-semantics';
import { scoper } from './tokenizer-scopes';
import { mapSemantics } from './modules/grammar-mapper';

import {
  hash,
} from './modules/helpers';

import {
  WHITESPACE,
  LINE_TERMINATOR,
  intToType,
} from './constants';

function createTokenizer(spec) {
  let {
    grammar,
    bufferSize,
  } = spec;

  bufferSize = bufferSize || 10000;

  let grammarLocal = JSON.parse(JSON.stringify(grammar));
  let check = grammarLocal.check.replace(/\n| /g, '');
  let regexpWithWhitespace = new RegExp('( |\\t)|' + check, 'g');

  let cache = {};
  let tokens = createTokens({
    size: bufferSize,
  });
  let lines = new Uint32Array(100000);

  let { init, getValue, setValue, setValueSave } = tokens;

  let semantics = mapSemantics(grammarLocal);
  let contexts = contexter(grammarLocal, tokens);
  let semantic = semantica(semantics, tokens);
  let scopes = scoper(tokens, semantics.mappings);

  let resetContexts = contexts.reset;
  let handleContexts = contexts.handle;

  let resetSemantics = semantic.reset;
  let handleSemantics = semantic.handle;

  let handleScopes = scopes.handle;

  let mappings = {
    type: intToType,
    context: semantics.mappings.context,
    semantic: semantics.mappings.semantic,
    chunk: semantics.mappings.chunk,
  };

  return {
    tokens,
    mappings: mappings,
    tokenizeLine(text) {
      let tokens = [];
      let index = 0;

      let match;
      while ((match = regexpWithWhitespace.exec(text)) !== null) {
        if (match.index === regexpWithWhitespace.lastIndex) {
          regexpWithWhitespace.lastIndex += 1;
        }

        let type;
        for (let i = 1; i <= 13; i += 1) {
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
    tokenize(text) {
      resetContexts();
      //index = 0 is the global-context-token
      let index = 1;
      let row = 0;
      let col = 0;

      let match;
      while ((match = regexpWithWhitespace.exec(text)) !== null) {
        if (match.index === regexpWithWhitespace.lastIndex) {
          regexpWithWhitespace.lastIndex += 1;
        }

        let type;
        for (let i = 1; i <= 13; i += 1) {
          if (match[i] !== undefined) {
            type = i;
            break;
          }
        }

        if (type === LINE_TERMINATOR) {
          row += 1;
          col = 0;
          lines[row] = index;
        }
        else if (type === WHITESPACE) {
          col = col + 1;
        } else {
          let value = match[0];
          let length = value.length;
          init(
            index,
            row,
            col,
            type,
            hash(value, length)
          );

          // console.log(index, value, hash(value, length), tokens.getHash(index));
          // DEBUG
          // if (storeValue) {
          // setValue(index, value, length);
          setValueSave(index, value, length);
          //   console.log(type, getValue(index));
          // }
          // getValue(index);

          handleContexts(index);

          index += 1;
          col += length;
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

    semantica() {
      resetSemantics();

      let length = cache.tokenCount;
      for (let i = 1; i <= length; i += 1) {
        handleSemantics(i);
        handleScopes(i);
      }

      return cache;
    },
  };
}

export default {
  createTokenizer,
};
