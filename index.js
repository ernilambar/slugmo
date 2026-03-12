'use strict';

/**
 * Emoji and symbol Unicode ranges to strip (covers common emojis, emoticons, symbols, variation selectors).
 * Code points above U+FFFF must use \u{...} with regex u flag.
 */
const EMOJI_AND_SYMBOLS_REGEX = /[\u200D\uFE00-\uFE0F\u2600-\u26FF\u2700-\u27BF\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F1E0}-\u{1F1FF}\u{1F900}-\u{1F9FF}]/gu;

/**
 * Convert text to a CMS-friendly slug.
 * - Lowercase
 * - Normalize accented characters to ASCII
 * - Remove emojis and emotion symbols
 * - Remove punctuation/symbols
 * - Replace spaces with -
 * - Collapse repeated separators
 * - Trim leading/trailing -
 *
 * @param {string} text - Input text
 * @returns {string} Slug string
 */
function slugify(text) {
  if (text == null || typeof text !== 'string') {
    return '';
  }

  let s = text.trim();
  if (s === '') return '';

  // 1. Normalize accented characters: NFD then remove combining marks
  s = s.normalize('NFD').replace(/\p{Mark}/gu, '');

  // 2. Remove emojis and symbol ranges
  s = s.replace(EMOJI_AND_SYMBOLS_REGEX, '');

  // 3. Lowercase
  s = s.toLowerCase();

  // 4. Replace non-slug chars (anything that isn't a-z, 0-9) with hyphen
  // \p{L} would include letters but we already normalized to ASCII, so [a-z0-9] is enough
  s = s.replace(/[^a-z0-9]+/g, '-');

  // 5. Collapse repeated hyphens
  s = s.replace(/-+/g, '-');

  // 6. Trim leading/trailing hyphens
  s = s.replace(/^-|-$/g, '');

  return s;
}

/**
 * Convert slug/text to Title Case.
 * - Replace hyphens and underscores with spaces
 * - Capitalize first letter of each word
 *
 * @param {string} text - Slug or text (e.g. "hello-world-example")
 * @returns {string} Title Case string (e.g. "Hello World Example")
 */
function slugToTitleCase(text) {
  if (text == null || typeof text !== 'string') {
    return '';
  }
  return text
    .replace(/[-_]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

module.exports = { slugify, slugToTitleCase };
