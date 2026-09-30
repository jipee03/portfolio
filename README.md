<h2 align="center">

vCard Portfolio Nuxt Template<br>
<small>(extends from [codewithsadee](https://github.com/codewithsadee/vcard-personal-portfolio))</small>

</h2><br>

<pre align="center">
🧪 Working in Progress
</pre>

![vCard Desktop Demo](https://github.com/codewithsadee/vcard-personal-portfolio/raw/master/website-demo-image/desktop.png)
![vCard Mobile Demo](https://github.com/codewithsadee/vcard-personal-portfolio/raw/master/website-demo-image/mobile.png)

## Features

- [💚 Nuxt 4](https://nuxt.com) - SSR, ESR, File-based routing, components auto importing, modules, etc.

- ⚡️ Vite - Instant HMR

- 🎨 [Tailwind CSS](https://github.com/tailwindcss) - A utility-first CSS framework packed.

- 🔥 The `<script setup>` syntax

- 🍍 [State Management via Pinia](https://pinia.esm.dev), see [./app/composables](./app/composables)

- 📑 [Layout system](./app/layouts)

- 📥 APIs auto importing - for Composition API, VueUse and custom composables.

- 🏎 Zero-config cloud functions and deploy

- 🦾 TypeScript, of course

## Plugins

### Nuxt Modules

- [VueUse](https://github.com/vueuse/vueuse) - collection of useful composition APIs.
- [ColorMode](https://github.com/nuxt-community/color-mode-module) - dark and Light mode with auto detection made easy with Nuxt.
- [Pinia](https://pinia.esm.dev/) - intuitive, type safe, light and flexible Store for Vue.

## Getting started

This project is pinned so everyone gets the same toolchain and dependency versions.

| Tool | Version | Where it's pinned |
| ---- | ------- | ----------------- |
| Node.js | 24 (22.19+ also works) | [.nvmrc](./.nvmrc), `engines` in [package.json](./package.json) |
| pnpm | 10.34.6 | `packageManager` in [package.json](./package.json) |
| Dependencies | exact resolved versions | [pnpm-lock.yaml](./pnpm-lock.yaml) |

### 1. Install Node.js

Use any Node version manager (or your distro packages) to get the version in `.nvmrc`:

```bash
nvm install && nvm use      # nvm reads .nvmrc
# Arch: sudo pacman -S nodejs npm
```

### 2. Install pnpm

```bash
npm install -g pnpm         # or: sudo pacman -S pnpm
```

You do not need to match the exact pnpm version. pnpm reads `packageManager` from `package.json` and uses that version automatically.

### 3. Install dependencies

```bash
pnpm install --frozen-lockfile
```

`--frozen-lockfile` installs exactly what is in `pnpm-lock.yaml` and fails instead of silently upgrading anything. Use plain `pnpm install` only when you intentionally change dependencies, and commit the updated lockfile.

### 4. Run it

```bash
pnpm dev        # dev server on http://localhost:3000
pnpm lint       # check code style
pnpm generate   # build the static site into .output/public
pnpm preview    # preview the production build
```

## Deploying to GitHub Pages

Deployment is automated by [.github/workflows/deploy.yml](./.github/workflows/deploy.yml). It installs from the lockfile, lints, runs `pnpm generate` and publishes `.output/public`.

1. Push this repo to **your own** GitHub repository (the `origin` remote may still point at the upstream project: `git remote -v`).
2. In the repo go to **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`. The site is published at `https://<your-user>.github.io/<repo-name>/`.

The workflow sets `NUXT_APP_BASE_URL=/<repo-name>/` automatically, so assets work on the sub-path. To test that locally:

```bash
NUXT_APP_BASE_URL=/<repo-name>/ pnpm generate
```

If you use a custom domain or a `<user>.github.io` repository, remove the `NUXT_APP_BASE_URL` line from the workflow so the site is served from `/`.

## Keeping dependencies healthy

- Check what is outdated: `pnpm outdated`
- Update within the allowed ranges: `pnpm update`, then `pnpm generate` to verify it still builds.
- Consider enabling [Dependabot](https://docs.github.com/en/code-security/dependabot) so updates arrive in small, reviewable pull requests instead of one big jump.
