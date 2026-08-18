#!/usr/bin/env node
'use strict';

const { parseArgs } = require('node:util');
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

// Help/version should work even if other args are invalid.
const rawArgs = process.argv.slice(2);
if (rawArgs.includes('--help') || rawArgs.includes('-h')) {
  process.stdout.write(HELP);
  process.exit(0);
}
if (rawArgs.includes('--version') || rawArgs.includes('-v')) {
  process.stdout.write(version + '\n');
  process.exit(0);
}

let values;
let positionals;
try {
  ({ values, positionals } = parseArgs({
    args: rawArgs,
    options: {
      help: { type: 'boolean', short: 'h' },
      version: { type: 'boolean', short: 'v' },
      title: { type: 'boolean' },
    },
    allowPositionals: true,
    strict: true,
  }));
} catch (err) {
  if (err && err.code === 'ERR_PARSE_ARGS_UNKNOWN_OPTION') {
    const match = err.message.match(/Unknown option '([^']+)'/);
    console.error('slugmo: Unknown option: ' + (match ? match[1] : ''));
    process.exit(1);
  }
  throw err;
}

function readStdin() {
  return new Promise((resolve, reject) => {
    const chunks = [];
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => chunks.push(chunk));
    process.stdin.on('end', () => resolve(chunks.join('')));
    process.stdin.on('error', reject);
  });
}

async function main() {
  if (values.help) {
    process.stdout.write(HELP);
    return;
  }
  if (values.version) {
    process.stdout.write(version + '\n');
    return;
  }

  let input;
  if (positionals.length > 0) {
    input = positionals.join(' ');
  } else {
    input = await readStdin();
  }

  const output = values.title ? slugToTitleCase(input ?? '') : slugify(input);
  if (output !== '') {
    process.stdout.write(output + '\n');
  }
}

main().catch((err) => {
  console.error('slugmo:', err.message);
  process.exit(1);
});
