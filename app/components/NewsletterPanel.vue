<script setup>
import { site } from '~/data/site'

const c = useSiteContent()
const email = ref('')
const inputId = useId()

function onSubmit(event) {
  // With a provider configured the browser posts the form itself.
  if (site.newsletterAction)
    return

  event.preventDefault()
  const subject = encodeURIComponent(c.value.newsletter.subject)
  const body = encodeURIComponent(email.value)
  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
}
</script>

<template>
  <section class="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-10">
    <div class="reveal grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.85fr)] lg:items-end">
      <div class="max-w-2xl">
        <p class="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {{ c.newsletter.eyebrow }}
        </p>
        <h2 class="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {{ c.newsletter.title }}
        </h2>
        <p class="mt-3 leading-7 text-muted-foreground">
          {{ c.newsletter.text }}
        </p>
      </div>

      <form
        class="w-full"
        :action="site.newsletterAction || undefined"
        method="post"
        @submit="onSubmit"
      >
        <label
          :for="inputId"
          class="sr-only"
        >{{ c.newsletter.label }}</label>
        <div class="flex flex-col gap-3 sm:flex-row">
          <input
            :id="inputId"
            v-model="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            :placeholder="c.newsletter.placeholder"
            class="h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-w-0 sm:flex-1"
          >
          <button
            type="submit"
            class="inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {{ c.newsletter.button }}
          </button>
        </div>
        <p class="mt-3 text-xs leading-5 text-muted-foreground">
          {{ c.newsletter.note }}
        </p>
      </form>
    </div>
  </section>
</template>
