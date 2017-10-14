//https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(string, length) {
  let result = 5381;
  let i = length;

  while (i) {
    result = (result * 33) ^ string.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return result >>> 0;
}

function stringToArray(string, array, length) {
  let result = array;

  for (let i = 0; i < length; i += 1) {
    result[i] = string.charCodeAt(i);
  }

  return result;
}

let fromCharCode = String.fromCharCode;
function arrayToString(array, length = array.length) {
  let result = '';

  for (let i = 0; i < length; i += 1) {
    let charCode = array[i];

    if (charCode === 0) {
      break;
    }

    result += fromCharCode(charCode);
  }

  return result;
}

export default {
  hash,
  stringToArray,
  arrayToString,
};
