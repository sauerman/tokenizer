import {
  CONTEXT_LEFT,
  CONTEXT_RIGHT,
} from '../constants';

function createTokens(spec = {}) {
  const COUNT = spec.size;
  const MAX_STRING_LENGTH = spec.maxStringLength || 100;
  const MAX_SCOPES = spec.maxScopes || 1000;
  const SCOPES_HASHMAP_SIZE = spec.scopesHashmapSize || 10000;

  /**
   * HashMaps for scopes
   **/
  let scopes = new Int32Array(MAX_SCOPES * SCOPES_HASHMAP_SIZE);
  let IdsInScopes = new Int32Array(MAX_SCOPES * SCOPES_HASHMAP_SIZE);

  /**
   * Struct
   **/
  let buffer = new ArrayBuffer(64 * COUNT * MAX_STRING_LENGTH);
  let index = new Int32Array(buffer, 0, 1 * COUNT);
  let row = new Int32Array(buffer, 4 * COUNT, 1 * COUNT);
  let col = new Int32Array(buffer, 8 * COUNT, 1 * COUNT);
  let type = new Int32Array(buffer, 12 * COUNT, 1 * COUNT);
  let hash = new Uint32Array(buffer, 16 * COUNT, 1 * COUNT);
  let contextLevel = new Int32Array(buffer, 20 * COUNT, 1 * COUNT);
  let id = new Int32Array(buffer, 24 * COUNT, 1 * COUNT);
  let semantic = new Int32Array(buffer, 28 * COUNT, 1 * COUNT);
  let chunk = new Int32Array(buffer, 32 * COUNT, 1 * COUNT);
  let context = new Int32Array(buffer, 36 * COUNT, 1 * COUNT);

  let contextLeftToken = new Int32Array(buffer, 40 * COUNT, 1 * COUNT);
  let contextRightToken = new Int32Array(buffer, 44 * COUNT, 1 * COUNT);
  let contextParentToken = new Int32Array(buffer, 48 * COUNT, 1 * COUNT);

  let scopeToken = new Int32Array(buffer, 52 * COUNT, 1 * COUNT);
  let scopeParentToken = new Int32Array(buffer, 56 * COUNT, 1 * COUNT);
  let value = new Int32Array(buffer, 60 * COUNT, MAX_STRING_LENGTH * COUNT);

  /**
   * GettersstringValue
   **/
  function getType(i) {
    return type[i];
  }

  let fromCharCode = String.fromCharCode;
  function getValue(i) {
    let result = '';
    let offset = i * MAX_STRING_LENGTH;

    for (let j = 0; j < MAX_STRING_LENGTH; j += 1) {
      let charCode = value[offset + j];

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
    if (type[i] !== CONTEXT_LEFT) {
      return context[contextLeftToken[i]];
    }
    else {
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
    return type[i] !== CONTEXT_LEFT
      ? contextParentToken[contextLeftToken[i]]
      : contextParentToken[i]
      ;
  }

  function getScope(i) {
    return type[i] !== CONTEXT_LEFT
      ? scopeToken[contextLeftToken[i]]
      : scopeToken[i]
      ;
  }

  function getParentScope(i) {
    return type[i] !== CONTEXT_LEFT
      ? scopeParentToken[contextLeftToken[i]]
      : scopeParentToken[i]
      ;
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
    }
    else if (field === 'hash') {
      return getHash(i);
    }
    else if (field === 'semantic') {
      return getSemantic(i);
    }
    else if (field === 'context') {
      return getContext(i);
    }
    else if (field === 'chunk') {
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
    let offset = i * MAX_STRING_LENGTH;

    for (let j = 0; j < length; j += 1) {
      value[offset + j] = v.charCodeAt(j);
    }
  }

  function setValueSave(i, v, length) {
    let offset = i * MAX_STRING_LENGTH;

    for (let j = 0; j < MAX_STRING_LENGTH; j += 1) {
      const char = v.charCodeAt(j) || 0;
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
    for (let i = 0; i < COUNT; i += 1) {
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
    return type[i] === CONTEXT_LEFT;
  }

  function isContextRight(i) {
    return type[i] === CONTEXT_RIGHT;
  }

  function addToScope(i) {
    let hashIndex = hash[i] % SCOPES_HASHMAP_SIZE;
    let scopeIndex =
      type[i] !== CONTEXT_LEFT
        ? scopeToken[contextLeftToken[i]]
        : scopeToken[i]
      ;

    let currentId = scopes[scopeIndex * SCOPES_HASHMAP_SIZE];
    let index = scopeIndex * SCOPES_HASHMAP_SIZE + hashIndex;

    if (scopes[index] === 0) {
      scopes[scopeIndex * SCOPES_HASHMAP_SIZE] = currentId + 1; //update currentId
      scopes[index] = i; //save reference to declaration
      IdsInScopes[index] = currentId + 1; //save current "color"-id of this token
    }

    id[i] = IdsInScopes[index]; //set id
  }

  function isInScope(i, scopeIndex) {
    let h = hash[i] % SCOPES_HASHMAP_SIZE;
    return scopes[scopeIndex * SCOPES_HASHMAP_SIZE + h];
  }

  return {
    getIndex,
    getType,
    getRow,
    getCol,
    getId,
    getHash,
    getValue,
    getSemantic,
    getContext,
    getChunk,
    getContextLeft,
    getContextRight,
    getScope,
    getParentScope,
    getContextLevel,
    getNext,
    getPrevious,
    getParentContext,
    getNextContextRight,
    get,
    init,
    setIndex,
    setRow,
    setCol,
    setId,
    setType,
    setValue,
    setValueSave,
    setSemantic,
    setContext,
    setChunk,
    setContextLevel,
    setContextLeft,
    setContextRight,
    setParentContext,
    setScope,
    setParentScope,

    isContextLeft,
    isContextRight,
    flush,

    addToScope,
    isInScope,
  };
}

export default {
  createTokens,
};
