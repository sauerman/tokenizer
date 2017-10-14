import pretty from 'pretty-hrtime';
import fs from 'fs';

import { createTokenizer } from '../src/single/tokenizer';

import javascript from '../src/grammars/javascript';
import { intToType } from '../src/single/constants';
let jquery = fs.readFileSync(__dirname + '/assets/jquery-1.11.3.js').toString();
let angular = fs.readFileSync(__dirname + '/assets/angular-1.4.7.js').toString();
let test = fs.readFileSync(__dirname + '/assets/test.js').toString();

let start;
let end;
let cache;

let singleBenchmark = createTokenizer({
  grammar: javascript,
  bufferSize: 100000,
});

// start = process.hrtime();
// cache = esprima.parse(jquery);
// end = process.hrtime(start);
// console.log(pretty(end));

start = process.hrtime();
cache = singleBenchmark.tokenize(jquery);
cache = singleBenchmark.semantica();
end = process.hrtime(start);
console.log(pretty(end));

let single = createTokenizer({
  grammar: javascript,
  bufferSize: 100000,
});

let summary = {};
summary.types = {};
summary.levels = {};
summary.semantics = {};
function createSummary(tokens, i) {
  let type = intToType[cache.tokens.getType(i)];
  let level = cache.tokens.getContextLevel(i);
  let semantic = single.mappings.semantic[cache.tokens.getSemantic(i)];

  if (!summary.types[type]) {
    summary.types[type] = 0;
  }

  if (!summary.levels[level]) {
    summary.levels[level] = 0;
  }

  if (!summary.semantics[semantic]) {
    summary.semantics[semantic] = 0;
  }

  summary.types[type] += 1;
  summary.levels[level] += 1;
  summary.semantics[semantic] += 1;
}

start = process.hrtime();
cache = single.tokenize(test);
cache = single.semantica();
end = process.hrtime(start);

summary = {};
summary.types = {};
summary.levels = {};
summary.semantics = {};
let lastRow = 0;
let values = '';
for (let i = 1; i <= cache.tokenCount; i += 1) {
  let value = cache.tokens.getValue(i);
  let row = cache.tokens.getRow(i);

  if (row > lastRow) {
    values = '';
    lastRow = row;
  }

  if (value) {
    values += value + ' ';
  }

  createSummary(cache.tokens, i);
}
console.log(
  cache.tokenCount,
  cache.rowCount,
  summary
);
console.log(pretty(end));
