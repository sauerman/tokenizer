const CONTEXT_LEFT = 6;
const CONTEXT_RIGHT = 7;

function createTokens(spec = {}) {
  const COUNT = spec.size || 1000000;

  /**
   * Struct
   **/
  let index = Array(COUNT);
  let row = Array(COUNT);
  let col = Array(COUNT);
  let type = Array(COUNT);
  let hash = Array(COUNT);
  let contextLevel = Array(COUNT);
  let semantic = Array(COUNT);
  let chunk = Array(COUNT);
  let context = Array(COUNT);

  let contextLeftToken = Array(COUNT);
  let contextRightToken = Array(COUNT);
  let contextParentToken = Array(COUNT);

  let value = Array(COUNT);

  /**
   * Getters
   **/
  function getType(i) {
    return type[i];
  }

  function getValue(i) {
    return value[i];
  }

  function getHash(i) {
    return hash[i];
  }

  function getContextLeft(i) {
    return contextLeftToken[i];
  }

  function getContextLevel(i) {
    return contextLevel[i];
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

  function setValue(i, v) {
    value[i] = v;
  }

  function setType(i, value) {
    type[i] = value;
  }

  function setContextLevel(i, value) {
    contextLevel[i] = value;
  }

  function setContextLeft(i, value) {
    contextLeftToken[i] = value;
  }

  function setParentContext(i, value) {
    contextParentToken[i] = value;
  }

  function isContextLeft(i) {
    return type[i] === CONTEXT_LEFT;
  }

  function isContextRight(i) {
    return type[i] === CONTEXT_RIGHT;
  }

  return {
    getType,
    getHash,
    getValue,
    getContextLeft,
    getContextLevel,
    init,
    setIndex,
    setRow,
    setCol,
    setType,
    setValue,
    setContextLevel,
    setContextLeft,
    setParentContext,

    isContextLeft,
    isContextRight,
  };
}

export default {
  createTokens,

  INDEX: 0,
  ROW: 1,
  COL: 2,
  TYPE: 3,
  HASH: 4,
  CONTEXT_LEVEL: 5,
  SEMANTIC: 6,
  CHUNK: 7,
  CONTEXT: 8,
  CONTEXT_LEFT_TOKEN: 9,
  CONTEXT_RIGHT_TOKEN: 10,
  CONTEXT_PARENT_TOKEN: 11,
};
