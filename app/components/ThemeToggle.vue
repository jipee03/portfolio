<script setup>
const color = useColorMode()
const c = useSiteContent()

// The stored preference is only known in the browser, so highlight it after mount.
const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

const options = [
  { value: 'light', icon: 'sunny-outline' },
  { value: 'dark', icon: 'moon-outline' },
]
</script>

<template>
  <div
    class="flex items-center rounded-lg border border-border bg-background p-1"
    role="group"
    :aria-label="c.nav.theme"
  >
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="inline-flex size-8 items-center justify-center rounded-md text-base transition-all duration-200"
      :class="mounted && color.preference === option.value ? 'bg-accent text-primary shadow-sm' : 'text-muted-foreground hover:bg-muted'"
      :aria-pressed="mounted && color.preference === option.value"
      @click="color.preference = option.value"
    >
      <ion-icon :name="option.icon" />
      <span class="sr-only">{{ c.nav[option.value] }}</span>
    </button>
  </div>
</template>
