#!/usr/bin/env node
'use strict';

const minimist = require('minimist');
const { slugify, slugToTitleCase } = require('./index.js');
const { version } = require('./package.json');

const HELP = `slugmo — Convert text to URL-safe slugs.

Usage:
  slugmo [options] [text]
  echo "text" | slugmo [options]

Options:
  -h, --help     Show this help
  -v, --version  Show version
  --title        Treat input as slug; output Title Case

Examples:
  slugmo "Hello World"           → hello-world
  echo "Hello World" | slugmo    → hello-world
  slugmo --title "hello-world"   → Hello World
`;

const unknownOptions = [];
const argv = minimist(process.argv.slice(2), {
  alias: { help: ['h'], version: ['v'] },
  boolean: ['help', 'version', 'title'],
  unknown(arg) {
    if (arg.startsWith('-')) {
      unknownOptions.push(arg);
      return false;
    }
    return true;
  },
});

function readStdin() {
  return new Promise((resolve) => {
    const chunks = [];
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => chunks.push(chunk));
    process.stdin.on('end', () => resolve(chunks.join('')));
  });
}

async function main() {
  if (unknownOptions.length > 0) {
    console.error('slugmo: Unknown option: ' + unknownOptions[0]);
    process.exit(1);
  }

  if (argv.help) {
    process.stdout.write(HELP);
    return;
  }
  if (argv.version) {
    process.stdout.write(version + '\n');
    return;
  }

  let input;
  if (argv._.length > 0) {
    input = argv._.join(' ');
  } else {
    input = await readStdin();
  }

  const output = argv.title ? slugToTitleCase(input ?? '') : slugify(input);
  if (output !== '') {
    process.stdout.write(output + '\n');
  }
}

main().catch((err) => {
  console.error('slugmo:', err.message);
  process.exit(1);
});
