<script setup>
import { navLinks, site } from '~/data/site'

const c = useSiteContent()

const socials = [
  { label: 'GitHub', icon: 'logo-github', href: site.github },
  { label: 'LinkedIn', icon: 'logo-linkedin', href: site.linkedin },
  { label: 'Email', icon: 'mail-outline', href: `mailto:${site.email}` },
]

const linkClass = 'focus-ring text-muted-foreground transition-colors hover:text-primary'
</script>

<template>
  <footer class="border-t border-border bg-muted/30">
    <div
      class="h-px bg-gradient-to-r from-primary via-primary/40 to-transparent"
      aria-hidden="true"
    />

    <div class="px-4 py-12 sm:px-8 lg:px-14 lg:py-16">
      <div class="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.65fr)]">
        <div>
          <NuxtLink
            to="/"
            class="focus-ring inline-flex"
            :aria-label="`${site.name}, ${c.nav.home}`"
          >
            <Logo size="lg" />
          </NuxtLink>
          <p class="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {{ c.footer.role }}
          </p>
          <p class="mt-3 max-w-xl text-balance text-xl font-medium leading-8 tracking-tight sm:text-2xl">
            {{ c.footer.statement }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-8">
          <nav :aria-label="c.footer.quick">
            <p class="mb-4 text-sm font-semibold">
              {{ c.footer.quick }}
            </p>
            <ul class="grid gap-3 text-sm">
              <li
                v-for="link in navLinks"
                :key="link.to"
              >
                <NuxtLink
                  :to="link.to"
                  :class="linkClass"
                >
                  {{ c.nav[link.key] }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <nav :aria-label="c.footer.connect">
            <p class="mb-4 text-sm font-semibold">
              {{ c.footer.connect }}
            </p>
            <ul class="grid gap-3 text-sm">
              <li
                v-for="item in socials"
                :key="item.label"
              >
                <a
                  :href="item.href"
                  :target="item.href.startsWith('http') ? '_blank' : undefined"
                  rel="noreferrer"
                  :class="linkClass"
                >{{ item.label }}</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div class="mt-12 flex flex-col gap-6 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div class="text-sm text-muted-foreground">
          <p>© {{ new Date().getFullYear() }} {{ site.name }}. {{ c.footer.rights }}</p>
          <p class="mt-1">
            {{ c.footer.built }}
          </p>
        </div>

        <nav :aria-label="c.footer.social">
          <ul class="flex gap-3">
            <li
              v-for="item in socials"
              :key="item.label"
            >
              <a
                :href="item.href"
                :target="item.href.startsWith('http') ? '_blank' : undefined"
                rel="noreferrer"
                :aria-label="item.label"
                class="focus-ring inline-flex size-11 items-center justify-center rounded-full border border-border bg-background text-xl text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <ion-icon :name="item.icon" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>
