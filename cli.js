#!/usr/bin/env node
'use strict';

const { slugify, toTitle } = require('./index.js');

function getInput(args) {
  const i = args.includes('--title') ? args.indexOf('--title') + 1 : 2;
  const arg = args[i];
  if (arg !== undefined && arg !== '') {
    return arg;
  }
  return null; // caller will read stdin
}

function useTitleMode(args) {
  return args.includes('--title');
}

function readStdin() {
  return new Promise((resolve) => {
    const chunks = [];
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => chunks.push(chunk));
    process.stdin.on('end', () => resolve(chunks.join('')));
  });
}

async function main() {
  const args = process.argv.slice(0);
  let input = getInput(args);

  if (input === null) {
    input = await readStdin();
  }

  const output = useTitleMode(process.argv)
    ? toTitle(input ?? '')
    : slugify(input);
  if (output !== '') {
    process.stdout.write(output + '\n');
  }
}

main().catch((err) => {
  console.error('slugmo:', err.message);
  process.exit(1);
});
