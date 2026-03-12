'use strict';

const { spawnSync } = require('child_process');
const path = require('path');
const { version } = require('../package.json');

const cliPath = path.join(__dirname, '..', 'cli.js');
const node = process.execPath;

function runCli(args, stdin) {
  const result = spawnSync(node, [cliPath, ...args], {
    encoding: 'utf8',
    input: stdin,
  });
  return { stdout: result.stdout, stderr: result.stderr, status: result.status };
}

let failed = 0;

// node cli.js "Hello World" → hello-world
const r1 = runCli(['Hello World']);
if (r1.stdout.trim() !== 'hello-world') {
  console.error(`FAIL: node cli.js "Hello World" => ${JSON.stringify(r1.stdout)}, expected "hello-world\\n"`);
  failed++;
}

// echo "Hello World" | node cli.js → hello-world
const r2 = runCli([], 'Hello World\n');
if (r2.stdout.trim() !== 'hello-world') {
  console.error(`FAIL: echo "Hello World" | node cli.js => ${JSON.stringify(r2.stdout)}, expected "hello-world\\n"`);
  failed++;
}

// node cli.js --title "hello-world" → Hello World
const r3 = runCli(['--title', 'hello-world']);
if (r3.stdout.trim() !== 'Hello World') {
  console.error(`FAIL: node cli.js --title "hello-world" => ${JSON.stringify(r3.stdout)}, expected "Hello World\\n"`);
  failed++;
}

// --help
const r4 = runCli(['--help']);
if (!r4.stdout.includes('slugmo') || !r4.stdout.includes('--help')) {
  console.error('FAIL: node cli.js --help did not show help');
  failed++;
}

// -h
const r5 = runCli(['-h']);
if (!r5.stdout.includes('slugmo')) {
  console.error('FAIL: node cli.js -h did not show help');
  failed++;
}

// --version
const r6 = runCli(['--version']);
if (r6.stdout.trim() !== version) {
  console.error(`FAIL: node cli.js --version => ${JSON.stringify(r6.stdout.trim())}, expected ${JSON.stringify(version)}`);
  failed++;
}

// -v
const r7 = runCli(['-v']);
if (r7.stdout.trim() !== version) {
  console.error(`FAIL: node cli.js -v => ${JSON.stringify(r7.stdout.trim())}, expected ${JSON.stringify(version)}`);
  failed++;
}

// unknown option
const r8 = runCli(['--unknown']);
if (r8.status === 0 || !r8.stderr.includes('Unknown option')) {
  console.error('FAIL: node cli.js --unknown should exit non-zero and stderr should mention Unknown option');
  failed++;
}

if (failed > 0) {
  process.exit(1);
}
console.log('All CLI integration tests passed.');
