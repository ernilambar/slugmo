'use strict';

const { slugify, slugToTitleCase } = require('../index.js');

const cases = [
  // Basic
  ['Hello World', 'hello-world'],
  ['UPPERCASE', 'uppercase'],
  ['  foo   bar  ', 'foo-bar'],
  [' Hello  World  ', 'hello-world'],
  ['foo - bar', 'foo-bar'],
  ['foo_bar', 'foo-bar'],

  // Accents / normalization
  ['Café résumé', 'cafe-resume'],
  ['déjà vu', 'deja-vu'],
  ['ñoño', 'nono'],
  ['naïve', 'naive'],
  ['Zürich', 'zurich'],
  ['crème brûlée', 'creme-brulee'],
  ['Planeta Envíos', 'planeta-envios'],

  // Emojis and symbols
  ['Hello 😀 World', 'hello-world'],
  ['Hello — World 2024', 'hello-world-2024'],
  ['only-emojis-😀🎉', 'only-emojis'],
  ['!!!', ''],
  ['@#$', ''],
  ['...', ''],

  // Empty / whitespace
  ['', ''],
  ['   ', ''],
  ['\t\n  \r\n  ', ''],
  ['  -  ', ''],
  ['---', ''],
  [' - ', ''],

  // Single character / numbers
  ['a', 'a'],
  ['A', 'a'],
  ['1', '1'],
  ['123', '123'],
  ['foo123bar', 'foo123bar'],
  ['2024', '2024'],

  // Punctuation and separators
  ['.foo.bar.', 'foo-bar'],
  ['foo...bar', 'foo-bar'],
  ['hello---world', 'hello-world'],
  ['---hello---', 'hello'],
  ['hello-world', 'hello-world'],
  ['foo (bar) [baz]', 'foo-bar-baz'],
  ['foo: bar; baz!', 'foo-bar-baz'],
  ['question? yes & no', 'question-yes-no'],

  // Whitespace variants
  ['foo\nbar', 'foo-bar'],
  ['foo\tbar', 'foo-bar'],
  ['foo\n\t  bar', 'foo-bar'],
  ['foo\r\nbar', 'foo-bar'],

  // Null / non-string (edge cases for API)
  [null, ''],
  [undefined, ''],
];

// slugToTitleCase: slug → Title Case
const toTitleCases = [
  ['hello-world-example', 'Hello World Example'],
  ['hello_world', 'Hello World'],
  ['foo-bar-baz', 'Foo Bar Baz'],
  ['single', 'Single'],
  ['a', 'A'],
  ['', ''],
  ['   ', ''],
  ['hello---world', 'Hello World'],
  ['_foo_bar_', 'Foo Bar'],
  [null, ''],
  [undefined, ''],
];

let failed = 0;
for (const [input, expected] of cases) {
  const got = slugify(input);
  if (got !== expected) {
    console.error(`FAIL: slugify(${JSON.stringify(input)}) => ${JSON.stringify(got)}, expected ${JSON.stringify(expected)}`);
    failed++;
  }
}
for (const [input, expected] of toTitleCases) {
  const got = slugToTitleCase(input);
  if (got !== expected) {
    console.error(`FAIL: slugToTitleCase(${JSON.stringify(input)}) => ${JSON.stringify(got)}, expected ${JSON.stringify(expected)}`);
    failed++;
  }
}
if (failed > 0) {
  process.exit(1);
}
console.log('All', cases.length + toTitleCases.length, 'tests passed.');
