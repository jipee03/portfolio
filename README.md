# Gustavo Lima — Portfolio

Personal portfolio built with [Nuxt 4](https://nuxt.com), [Tailwind CSS](https://tailwindcss.com) and [@nuxtjs/i18n](https://i18n.nuxtjs.org). Written in English, translated with [DeepL](https://www.deepl.com) (currently English / Português (PT)). Design inspired by [afsakar.dev](https://afsakar.dev/).

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, featured projects, about teaser, latest writing, newsletter, CTA |
| `/about` | Experience timeline, education, working set, sponsorship, CTA |
| `/projects` | Project cards with a type filter |
| `/blog` | Article cards with a category filter |

## Editing content

You only ever write **English**. Other languages are generated (see [Translations](#translations)).

- [app/data/content/en.json](app/data/content/en.json): all copy: navigation, hero, About (experience, education, skills), projects, blog posts, footer. The projects, posts, experience and education in it are **sample content**: replace them with your own.
- [app/data/site.js](app/data/site.js): name, email, social links, avatar. **Set your real email here** (it is a placeholder).
- [public/images](public/images): `my-avatar.png` (home hero) and `about.svg`, `projects.svg`, `blog.svg` (inner-page hero placeholders). Swap in your own files with the same names.
- Colors live as CSS variables in [app/assets/css/style.css](app/assets/css/style.css) (light and dark).

## Translations

The site is static, so translation happens **before you commit**, not while visitors browse. [DeepL](https://www.deepl.com) translates `en.json` into one file per language, and the site simply reads those files.

### One-time setup

1. Create a DeepL API account. The **API Free** plan (500,000 characters/month) is far more than this site needs: <https://www.deepl.com/pro-api>.
2. Copy [.env.example](.env.example) to `.env` and paste your key (`.env` is git-ignored, never commit it):

   ```bash
   cp .env.example .env
   # DEEPL_API_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:fx
   ```

### Everyday workflow

```bash
# 1. edit app/data/content/en.json
pnpm translate          # 2. translate what changed
# 3. commit en.json together with app/data/content/translations/
```

- Only strings whose English text changed since they were last translated are sent to DeepL, so a normal run costs almost nothing. Identifiers, links, dates and tags (`slug`, `url`, `type`, `date`, `category`, `tags`) are never translated.
- **Fixing a wording by hand:** edit the value in `app/data/content/translations/<code>.json` (keys are dotted paths like `"about.heading"`). Your fix is kept until the English text of that same string changes.
- `pnpm translate --lang pt` translates one language; `pnpm translate --force` redoes everything (discarding hand edits).
- `pnpm translate:check` makes no API calls and fails if a translation is out of date. The GitHub Pages workflow runs it, so you can't deploy a half-translated site by accident.
- Anything not translated yet falls back to English, so the site never shows blanks.
- Files: [translations/pt.json](app/data/content/translations/pt.json) (output) and [translation-lock.json](app/data/content/translation-lock.json) (remembers which English text each translation came from). Commit both.

> The Portuguese currently in the repo was written by hand. Run `pnpm translate --force` once if you'd rather have DeepL's version, then fix any wording you disagree with.

### Adding another language

You can add **any language DeepL supports** (about 30: Spanish, French, German, Italian, Dutch, Polish, Japanese, Chinese, Turkish...). Full list of target codes: <https://developers.deepl.com/docs/getting-started/supported-languages>.

1. Add an entry to [app/data/locales.json](app/data/locales.json):

   ```json
   { "code": "es", "language": "es-ES", "name": "Español", "deepl": "ES" }
   ```

   - `code`: short code used by the site and the file name (`es.json`).
   - `language`: BCP 47 tag, used for the page `lang` attribute and date formatting.
   - `name`: label shown in the language switcher.
   - `deepl`: DeepL **target** code. Some languages have regional variants. Portuguese is **`PT-PT`** (Portugal) or **`PT-BR`** (Brazil), English is `EN-GB` / `EN-US`.
2. Run `pnpm translate`. DeepL translates everything into `app/data/content/translations/es.json`.
3. That's it: the language switcher, routing and dates pick the new language up automatically.

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint
pnpm translate  # see Translations
pnpm generate   # static build into .output/public
pnpm preview
```

## Deploying to GitHub Pages

Automated by [.github/workflows/deploy.yml](.github/workflows/deploy.yml): install from the lockfile, lint, `pnpm generate`, publish `.output/public`. The workflow sets `NUXT_APP_BASE_URL` so the site works from `https://<user>.github.io/<repo>/`. Enable it under **Settings → Pages → Source: GitHub Actions**.
