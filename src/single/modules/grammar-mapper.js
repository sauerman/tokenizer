import {hash} from './helpers';
import {intToType, typeToInt} from '../constants';
import checkHandler from './semantic-checks';

import util from 'util';

function mapContexts(contexts) {
  let result = {
    left: {},
    right: {},
    ignoreInside: {},
  };

  Object.keys(contexts.left).forEach((key) => {
    let value = hash(contexts.left[key], contexts.left[key].length);

    result.left[hash(key, key.length)] = value;
  });

  Object.keys(contexts.right).forEach((key) => {
    let value = hash(contexts.right[key], contexts.right[key].length);

    result.right[hash(key, key.length)] = value;
  });

  Object.keys(contexts.ignoreInside).forEach((key) => {
    result.ignoreInside[hash(key, key.length)] = true;
  });

  let left = result.left;
  let right = result.right;
  result.getMatch = (char) => {
    return left[char] || right[char];
  };

  return result;
}

function mapSemantics(grammar) {
  let semanticsByHash = Object.create(null);
  let semanticsByType = Object.create(null);
  let semantics = grammar.semantics;
  let id = 1;
  let mappings = {
    semantic: {},
    chunk: {},
    context: {},
  };

  function matchValues(item) {
    function matchValue(rule, value) {
      let result;

      if (rule === 'hash') {
        result = hash(value, value.length);
      }
      else if (rule === 'type') {
        result = typeToInt[value];
      }
      else if (
        rule === 'semantic' ||
        rule === 'context' ||
        rule === 'contexts' ||
        rule === 'chunk'
      ) {
        let key =
          rule === 'contexts'
          ? 'context'
          : rule;

        if (!mappings[key][value]) {
          mappings[key][value] = id;
          mappings[key][id] = value;
          id += 1;
        }

        result = mappings[key][value];
      }
      else if (
        rule === 'matchLeft' ||
        rule === 'matchRight' ||
        rule === 'matchNextContextRight'
      ) {
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

      let value = matchValue(item.rule, item.value);
      item.value = value;
    }
    /*
    * check against a list of values
    */
    else if (item.value.constructor === Array) {
      item.negate = false;
      item.value = item.value.map((value) => {
        return matchValue(item.rule, value);
      });
    }
    /*
    * execute checks on related tokens
    */
    else if (item.value.constructor === Object) {
      let nestedItem = item.value;
      nestedItem = matchValues(nestedItem);
    }

    item.handler = checkHandler[item.rule](item);
  }

  function mapChecks(checks, level) {
    return checks.map((check) => {
      if (check instanceof Array) {
        return {
          [level % 2 === 0 ? 'or' : 'and']: mapChecks(check, level + 1),
        };
      }
      else if (check instanceof Object) {
        if (check.checks) {
          return {
            type: check.rule,
            or: mapChecks(check.checks, level),
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
    let and;
    let or;
    function getOffsetModifier(type) {
      if (type === 'matchLeft') {
        return 'getPrevious';
      }
      else if (type === 'matchRight') {
        return 'getNext';
      }
      else if (type === 'matchNextContextRight') {
        return 'getNextContextRight';
      }
      else {
        return 'getIndex';
      }
    }

    function checkNested(checks) {
      for (let i = 0; i < checks.length; i += 1) {
        if (checks[i].and) {
          checks[i].handler = and(checks[i].and, getOffsetModifier(checks[i].type));
        }
        else if (checks[i].or) {
          checks[i].handler = or(checks[i].or, getOffsetModifier(checks[i].type));
        }
      }
    }

    and = (checks, offsetModifier) => {
      // console.log('AND \n', offsetModifier, util.inspect(checks, {colors: true, depth: null}));
      checkNested(checks);

      return (tokens, index) => {
        for (let i = 0; i < checks.length; i += 1) {
          if (!checks[i].handler(tokens, index, offsetModifier)) {
            return false;
          }
        }
        return true;
      };
    };

    or = (checks, offsetModifier) => {
      // console.log('OR \n', offsetModifier, util.inspect(checks, {colors: true, depth: null}));
      checkNested(checks);

      return (tokens, index) => {
        for (let i = 0; i < checks.length; i += 1) {
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
    let byHash = false;
    let byType = false;
    let checks = semantics[i].checks.and;
    let result;

    checks.forEach((c, index) => {
      if (c.rule === 'hash') {
        if (!semanticsByHash[c.value]) {
          semanticsByHash[c.value] = [];
        }
        let length = semanticsByHash[c.value].push(semantics.splice(i, 1)[0]);
        result = semanticsByHash[c.value][length - 1];
        byHash = index;
      }
    });

    if (byHash !== false) {
      checks.splice(byHash, 1);
      return result;
    }
    else {
      checks.forEach((c, index) => {
        if (c.rule === 'type') {
          if (!semanticsByType[c.value]) {
            semanticsByType[c.value] = [];
          }
          let length = semanticsByType[c.value].push(semantics.splice(i, 1)[0]);
          result = semanticsByType[c.value][length - 1];
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

  semantics = semantics.map((check, index) => {
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
      and: mapChecks(check.checks, 0),
    };

    // console.log('################');
    // console.log(util.inspect(check, {colors: true, depth: null}));

    return check;
  });

  let length = semantics.length;
  for (let i = 0; i < length; i += 1) {
    let semantic = addToSubList(semantics, i);

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
    mappings,
    semantics,
    semanticsByHash,
    semanticsByType,
  };
}

export default {
  mapContexts,
  mapSemantics,
};
