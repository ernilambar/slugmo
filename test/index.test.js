'use strict';

const { slugify } = require('../index.js');

const cases = [
  ['Hello World', 'hello-world'],
  ['Café résumé', 'cafe-resume'],
  ['  foo   bar  ', 'foo-bar'],
  ['Hello 😀 World', 'hello-world'],
  ['Hello — World 2024', 'hello-world-2024'],
  ['UPPERCASE', 'uppercase'],
  ['foo - bar', 'foo-bar'],
  ['', ''],
  ['!!!', ''],
  ['   ', ''],
  ['only-emojis-😀🎉', 'only-emojis'],
  ['déjà vu', 'deja-vu'],
  ['ñoño', 'nono'],
  [' Hello  World  ', 'hello-world'],
];

let failed = 0;
for (const [input, expected] of cases) {
  const got = slugify(input);
  if (got !== expected) {
    console.error(`FAIL: slugify(${JSON.stringify(input)}) => ${JSON.stringify(got)}, expected ${JSON.stringify(expected)}`);
    failed++;
  }
}
if (failed > 0) {
  process.exit(1);
}
console.log('All', cases.length, 'tests passed.');
