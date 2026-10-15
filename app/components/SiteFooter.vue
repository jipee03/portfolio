<script setup>
import { site } from '~/data/site'

const c = useSiteContent()

const socials = [
  { label: 'GitHub', icon: 'logo-github', href: site.github },
  { label: 'LinkedIn', icon: 'logo-linkedin', href: site.linkedin },
  { label: 'Email', icon: 'mail-outline', href: `mailto:${site.email}` },
]
</script>

<template>
  <footer class="border-t border-border bg-muted/30">
    <div
      class="h-px bg-gradient-to-r from-primary via-primary/40 to-transparent"
      aria-hidden="true"
    />

    <div class="px-4 py-8 sm:px-8 lg:px-14">
      <div class="flex flex-col-reverse items-center gap-5 sm:flex-row sm:justify-between">
        <div class="text-sm text-muted-foreground">
          <p>© {{ new Date().getFullYear() }} {{ site.name }}. {{ c.footer.rights }}</p>
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
