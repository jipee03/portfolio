<script setup>
import { site } from '~/data/site'

const { locale } = useI18n()

useHead({
  htmlAttrs: { lang: locale },
  titleTemplate: pageTitle => pageTitle ? `${pageTitle} - ${site.name}` : site.name,
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: asset('/favicon.svg') },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Instrument+Sans:wght@400;500;600;700&display=swap',
    },
  ],
  script: [
    { src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js', type: 'module' },
    { src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js', nomodule: true },
  ],
})
</script>

<template>
  <div class="site-canvas">
    <div class="site-shell bg-background text-foreground">
      <SiteHeader />

      <main
        id="main-content"
        class="relative"
      >
        <slot />
      </main>

      <SiteFooter />
    </div>

    <CookieBar />
  </div>
</template>
