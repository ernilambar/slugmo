#!/usr/bin/env node
'use strict';

const { slugify } = require('./index.js');

function getInput(args) {
  const arg = args[2];
  if (arg !== undefined && arg !== '') {
    return arg;
  }
  return null; // caller will read stdin
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

  const slug = slugify(input);
  if (slug !== '') {
    process.stdout.write(slug + '\n');
  }
}

main().catch((err) => {
  console.error('slugmo:', err.message);
  process.exit(1);
});
