// Helpers shared by the site and scripts/translate.mjs (plain JS, no Nuxt imports).
//
// Content is addressed by dotted paths, e.g. "about.experience.items.0.title".
// Translation files are flat { path: text } maps, so a single sentence can be
// translated, re-translated or corrected by hand without touching anything else.

// Keys whose values are identifiers, links, dates or names that must never be translated.
export const KEEP_KEYS = new Set(['slug', 'url', 'type', 'date', 'category', 'tags'])

/** Every translatable string in the content, as { path: text }. */
export function flatten(value, path = [], out = {}) {
  if (typeof value === 'string') {
    out[path.join('.')] = value
  }
  else if (Array.isArray(value)) {
    value.forEach((item, i) => flatten(item, [...path, i], out))
  }
  else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      if (!KEEP_KEYS.has(key))
        flatten(item, [...path, key], out)
    }
  }
  return out
}

function parent(target, path) {
  const keys = path.split('.')
  const last = keys.pop()
  let node = target
  for (const key of keys) {
    node = node?.[key]
    if (node === undefined || node === null)
      return [undefined, last]
  }
  return [node, last]
}

/** Overwrite an existing string at `path`. Unknown paths are ignored. */
export function setExisting(target, path, text) {
  const [node, last] = parent(target, path)
  if (node && typeof node[last] === 'string')
    node[last] = text
}

/** English content with every available translation applied; gaps fall back to English. */
export function localize(source, translations = {}) {
  const result = structuredClone(source)
  for (const [path, text] of Object.entries(translations)) {
    if (typeof text === 'string' && text.trim())
      setExisting(result, path, text)
  }
  return result
}
