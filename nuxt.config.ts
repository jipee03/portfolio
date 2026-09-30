// GitHub Pages serves project sites from /<repo-name>/, so the deploy workflow sets
// NUXT_APP_BASE_URL. Locally it stays '/'.
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@pinia/nuxt',
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
  },
  compatibilityDate: '2026-09-30',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/portfolio', '/resume', '/blog', '/contact', '/404'],
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json' },
      { code: 'tr', language: 'tr-TR', file: 'tr.json' },
    ],
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
