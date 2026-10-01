#!/usr/bin/env node
// Translates app/data/content/en.json with DeepL into app/data/content/translations/<code>.json.
//
//   pnpm translate                 translate new/changed strings for every language
//   pnpm translate --lang pt       only one language
//   pnpm translate --force         re-translate everything (discards hand edits)
//   pnpm translate:check           no API calls; exits 1 if a translation is out of date
//
// Only strings whose English text changed since they were last translated are sent
// to DeepL, so day-to-day runs cost almost nothing. Edit translations/<code>.json by
// hand to fix a wording: it is kept until the English source of that string changes.

import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { flatten } from '../app/data/content/flatten.js'

const dataDir = new URL('../app/data/', import.meta.url)
const SOURCE_LANG = 'en'
const BATCH_SIZE = 50
const CONTEXT = 'Personal portfolio website of a civil engineer turned web developer. Short interface labels and friendly marketing copy.'

const args = process.argv.slice(2)
const force = args.includes('--force')
const check = args.includes('--check')
const only = args.includes('--lang') ? args[args.indexOf('--lang') + 1] : undefined

const hash = text => createHash('sha1').update(text).digest('hex').slice(0, 12)

async function readJson(url, fallback) {
  try {
    return JSON.parse(await readFile(url, 'utf8'))
  }
  catch (error) {
    if (error.code === 'ENOENT')
      return fallback
    throw error
  }
}

function writeJson(url, data) {
  return writeFile(url, `${JSON.stringify(data, null, 2)}\n`)
}

async function deepl(texts, target) {
  const key = process.env.DEEPL_API_KEY
  if (!key) {
    console.error('Missing DEEPL_API_KEY. Copy .env.example to .env and paste your DeepL API key.')
    process.exit(1)
  }
  // Free-plan keys end in ":fx" and use a different host.
  const url = process.env.DEEPL_API_URL
    ?? `https://api${key.endsWith(':fx') ? '-free' : ''}.deepl.com/v2/translate`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `DeepL-Auth-Key ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: texts,
      source_lang: SOURCE_LANG.toUpperCase(),
      target_lang: target,
      context: CONTEXT,
      preserve_formatting: true,
    }),
  })

  if (!response.ok) {
    const hints = { 403: 'Invalid API key.', 456: 'DeepL quota exceeded.', 429: 'Too many requests, try again shortly.' }
    throw new Error(`DeepL responded ${response.status}. ${hints[response.status] ?? await response.text()}`)
  }
  const { translations } = await response.json()
  return translations.map(item => item.text)
}

const source = await readJson(new URL('content/en.json', dataDir))
const locales = (await readJson(new URL('locales.json', dataDir)))
  .filter(locale => locale.deepl && (!only || locale.code === only))
const lockUrl = new URL('content/translation-lock.json', dataDir)
const lock = await readJson(lockUrl, {})
const strings = Object.fromEntries(Object.entries(flatten(source)).filter(([, text]) => text.trim()))

if (only && !locales.length) {
  console.error(`No language "${only}" with a "deepl" target code in app/data/locales.json.`)
  process.exit(1)
}

let outdated = false

for (const locale of locales) {
  const file = new URL(`content/translations/${locale.code}.json`, dataDir)
  const previous = await readJson(file, {})
  const hashes = lock[locale.code] ?? {}

  const pending = Object.keys(strings).filter(path =>
    force || !previous[path] || hashes[path] !== hash(strings[path]))

  if (check) {
    if (pending.length) {
      outdated = true
      console.error(`${locale.code}: ${pending.length} string(s) need translating:`)
      pending.slice(0, 10).forEach(path => console.error(`  - ${path}`))
    }
    else {
      console.log(`${locale.code}: up to date`)
    }
    continue
  }

  const translated = {}
  for (let i = 0; i < pending.length; i += BATCH_SIZE) {
    const batch = pending.slice(i, i + BATCH_SIZE)
    const result = await deepl(batch.map(path => strings[path]), locale.deepl)
    batch.forEach((path, j) => {
      translated[path] = result[j]
    })
  }

  // Rebuild in source order, dropping strings that no longer exist in English.
  const next = {}
  const nextHashes = {}
  for (const path of Object.keys(strings)) {
    next[path] = translated[path] ?? previous[path]
    nextHashes[path] = path in translated ? hash(strings[path]) : hashes[path] ?? hash(strings[path])
  }
  lock[locale.code] = nextHashes

  await writeJson(file, next)
  console.log(`${locale.code} (${locale.deepl}): ${pending.length} translated, ${Object.keys(next).length - pending.length} unchanged`)
}

if (check) {
  if (outdated) {
    console.error('\nRun `pnpm translate` and commit the result.')
    process.exit(1)
  }
}
else {
  await writeJson(lockUrl, lock)
}
