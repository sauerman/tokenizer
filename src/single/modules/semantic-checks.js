import {hash} from './helpers';

function isInArray(item) {
  let rule = item.rule;
  let array = item.value;
  let length = array.length;

  return (tokens, index, offsetModifier) => {
    let value = tokens.get(rule, tokens[offsetModifier](index));
    for (let i = 0; i < length; i += 1) {
      if (array[i] === value) {
        return true;
      }
    }
    return false;
  };
}

function isEqualValue(item) {
  let rule = item.rule;
  let value = item.value;

  if (item.negate) {
    return (tokens, index, offsetModifier) => {
      return tokens.get(rule, tokens[offsetModifier](index)) !== value;
    };
  }
  else {
    return (tokens, index, offsetModifier) => {
      // console.log(index, rule, value, tokens.get(rule, tokens[offsetModifier](index)), offsetModifier, tokens.getHash(index-1));
      return tokens.get(rule, tokens[offsetModifier](index)) === value;
    };
  }
}

function check(item) {
  if (item.value instanceof Array) {
    return isInArray(item);
  }
  else {
    return isEqualValue(item);
  }
}

function contexts() {
  //TODO: impl
  return () => {
    return false;
  };
}

export default {
  type: check,
  hash: check,
  semantic: check,
  context: check,
  chunk: check,

  contexts,
};
