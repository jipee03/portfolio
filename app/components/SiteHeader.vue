<script setup>
import { navLinks, site } from '~/data/site'

const c = useSiteContent()
const route = useRoute()
const open = ref(false)

watch(() => route.path, () => {
  open.value = false
})

const linkClass = 'flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
    <a
      href="#main-content"
      class="sr-only rounded-md bg-background px-3 py-2 text-sm focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:ring-2 focus:ring-ring"
    >{{ c.nav.skip }}</a>

    <div class="flex min-h-16 items-center gap-5 px-4 sm:px-6">
      <NuxtLink
        to="/"
        class="focus-ring inline-flex shrink-0 items-center"
        :aria-label="`${site.name}, ${c.nav.home}`"
      >
        <Logo />
      </NuxtLink>

      <nav
        class="hidden items-center gap-1 md:flex"
        :aria-label="c.nav.mainNav"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="linkClass"
          active-class="!bg-accent !text-accent-foreground"
        >
          {{ c.nav[link.key] }}
        </NuxtLink>
        <a
          :href="site.github"
          target="_blank"
          rel="noreferrer"
          :class="linkClass"
        >
          <ion-icon name="logo-github" />
          <span>{{ c.nav.github }}</span>
        </a>
      </nav>

      <div class="ml-auto hidden items-center gap-3 md:flex">
        <LangSwitcher />
        <ThemeToggle />
      </div>

      <button
        type="button"
        class="ml-auto inline-flex size-11 items-center justify-center rounded-md text-2xl transition-colors hover:bg-muted md:hidden"
        :aria-label="open ? c.nav.closeMenu : c.nav.menu"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        @click="open = !open"
      >
        <ion-icon :name="open ? 'close-outline' : 'menu-outline'" />
      </button>
    </div>

    <div
      v-if="open"
      id="mobile-menu"
      class="grid gap-4 border-t border-border px-4 py-4 md:hidden"
    >
      <nav
        class="grid gap-1"
        :aria-label="c.nav.mainNav"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="linkClass"
          class="!justify-start"
          active-class="!bg-accent !text-accent-foreground"
        >
          {{ c.nav[link.key] }}
        </NuxtLink>
        <a
          :href="site.github"
          target="_blank"
          rel="noreferrer"
          :class="linkClass"
          class="!justify-start"
        >
          <ion-icon name="logo-github" />
          <span>{{ c.nav.github }}</span>
        </a>
      </nav>

      <div class="flex items-center justify-between gap-3">
        <LangSwitcher />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
