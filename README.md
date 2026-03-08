# slugmo

Convert text to URL-safe slugs.

## Install

```bash
npm install @nilambar/slugmo
```

Or run without installing:

```bash
npx @nilambar/slugmo "Your text here"
```

## Usage

**From argument:**

```bash
npx @nilambar/slugmo "Hello World"
# hello-world

npx @nilambar/slugmo "Café résumé — 2024"
# cafe-resume-2024
```

**From stdin:**

```bash
echo "Hello World" | npx @nilambar/slugmo
# hello-world
```

## Rules

- **Lowercase** — All output is lowercase.
- **Normalize accented characters** — e.g. `é` → `e`, `ñ` → `n`.
- **Remove emojis** — Emoji and emotion symbols are stripped.
- **Remove punctuation/symbols** — Only letters, digits, and hyphens remain.
- **Spaces become `-`** — Spaces and equivalent whitespace become a single hyphen.
- **Collapse separators** — Multiple consecutive `-` become one.
- **Trim hyphens** — No leading or trailing `-`.

## API

```js
const { slugify } = require('@nilambar/slugmo');

slugify('Hello World');        // 'hello-world'
slugify('Café résumé');        // 'cafe-resume'
slugify('  foo   bar  ');      // 'foo-bar'
slugify('Hello 😀 World');     // 'hello-world'
```

## License

MIT
