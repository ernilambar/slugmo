# AGENTS.md

## Overview

`slugmo` is a Node.js CLI and library that converts text to URL-safe slugs. It is plain CommonJS JavaScript with no build step or TypeScript.

## Setup

```bash
npm install
```

Requires Node.js 22 or newer. The package has no runtime dependencies.

## Commands

```bash
npm test
npm run lint
npm run format
```

There is no build command (plain JS, run directly). There is no typecheck command (JavaScript only).

## Conventions

- Use CommonJS (`require` / `module.exports`) and `'use strict'` in all runtime and test files.
- Keep the public API surface in `src/index.js`; the CLI entry point is `src/cli.js` and uses Node's built-in `node:util` `parseArgs`.
- The exported functions `slugify` and `slugToTitleCase` must return `''` for `null`, `undefined`, and non-string inputs.
- Prefer Node built-in modules over third-party dependencies; the project intentionally has zero runtime dependencies.
- Follow `neostandard` style, which is enforced by `npm run lint` and auto-fixed by `npm run format`.

## Quality gate

Before declaring a task complete, run these commands and confirm each exits with code 0:

```bash
npm run lint
npm test
```
