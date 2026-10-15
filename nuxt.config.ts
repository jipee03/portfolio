import locales from './app/data/locales.json'

// GitHub Pages serves project sites from /<repo-name>/, so the deploy workflow sets
// NUXT_APP_BASE_URL. Locally it stays '/'.
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
  ],

  css: ['~/assets/css/style.css'],

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('ion-'),
    },
  },

  colorMode: {
    classSuffix: '',
    // Dark by default; only Light and Dark are offered (no "system" option).
    preference: 'dark',
    fallback: 'dark',
    // New key so a previously stored "system" preference doesn't linger.
    storageKey: 'theme',
  },
  compatibilityDate: '2026-09-30',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about', '/projects', '/blog', '/404'],
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  // Copy lives in app/data/content (English source + generated translations); i18n only
  // tracks the active language. Add languages in app/data/locales.json.
  i18n: {
    locales: locales.map(({ code, language, name }) => ({ code, language, name })),
    defaultLocale: 'en',
    // Static hosting: keep one URL per page and remember the language in a cookie.
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'locale',
      fallbackLocale: 'en',
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
  },
})
