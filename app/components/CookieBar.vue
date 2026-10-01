<script setup>
const c = useSiteContent()
const accepted = useCookie('accept-cookie', { maxAge: 60 * 60 * 24 * 365 })

// Only render in the browser: the cookie isn't known when the static page is generated.
const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <Transition name="v">
    <aside
      v-if="mounted && !accepted"
      class="fixed inset-x-4 bottom-4 z-50 flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-lg shadow-black/10 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm"
      role="dialog"
      :aria-label="c.cookies.title"
    >
      <div class="grid flex-1 gap-3">
        <p class="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {{ c.cookies.title }}
        </p>
        <p class="text-sm leading-6 text-muted-foreground">
          {{ c.cookies.text }}
        </p>
        <div>
          <BaseButton @click="accepted = 'true'">
            {{ c.cookies.accept }}
          </BaseButton>
        </div>
      </div>

      <button
        type="button"
        class="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-lg text-muted-foreground transition-colors hover:bg-muted"
        :aria-label="c.cookies.close"
        @click="accepted = 'true'"
      >
        <ion-icon name="close-outline" />
      </button>
    </aside>
  </Transition>
</template>
