'use strict'

/**
 * Convert text to a CMS-friendly slug.
 * - Lowercase
 * - Normalize to ASCII (NFKD: accents, ligatures, fullwidth, compatibility chars)
 * - Map ß to ss
 * - Remove punctuation/symbols (emoji included) → separator
 * - Replace whitespace with -
 * - Collapse repeated separators
 * - Trim leading/trailing -
 *
 * @param {string} text - Input text
 * @returns {string} Slug string
 */
function slugify (text) {
  if (text == null || typeof text !== 'string') {
    return ''
  }

  let s = text.trim()
  if (s === '') return ''

  // 1. Normalize to ASCII: NFKD decomposes accents, ligatures, fullwidth, compatibility chars
  s = s.normalize('NFKD').replace(/\p{Mark}/gu, '')

  // 2. Lowercase
  s = s.toLowerCase()

  // 3. Map ß to ss (has no decomposition)
  s = s.replace(/ß/g, 'ss')

  // 4. Replace non-slug chars (anything that isn't a-z, 0-9) with hyphen
  s = s.replace(/[^a-z0-9]+/g, '-')

  // 5. Collapse repeated hyphens
  s = s.replace(/-+/g, '-')

  // 6. Trim leading/trailing hyphens
  s = s.replace(/^-|-$/g, '')

  return s
}

/**
 * Convert slug/text to Title Case.
 * - Replace hyphens and underscores with spaces
 * - Capitalize first letter of each word
 *
 * @param {string} text - Slug or text (e.g. "hello-world-example")
 * @returns {string} Title Case string (e.g. "Hello World Example")
 */
function slugToTitleCase (text) {
  if (text == null || typeof text !== 'string') {
    return ''
  }
  return text
    .replace(/[-_]+/g, ' ')
    // Split on any whitespace to handle tabs/newlines and collapse runs
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

module.exports = { slugify, slugToTitleCase }
