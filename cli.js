#!/usr/bin/env node
'use strict';

const { slugify, toTitle } = require('./index.js');
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
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    process.stdout.write(HELP);
    return;
  }
  if (args.includes('--version') || args.includes('-v')) {
    process.stdout.write(version + '\n');
    return;
  }

  const fullArgs = process.argv.slice(0);
  let input = getInput(fullArgs);

  if (input === null) {
    input = await readStdin();
  }

  const output = useTitleMode(fullArgs)
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
