<script setup>
const props = defineProps({
  to: { type: String, default: undefined },
  href: { type: String, default: undefined },
  variant: { type: String, default: 'primary' },
})

const external = computed(() => props.href?.startsWith('http'))

const classes = computed(() => [
  'inline-flex h-10 items-center justify-center gap-2.5 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  props.variant === 'primary'
    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
    : 'border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground',
])
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="classes"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noreferrer' : undefined"
    :class="classes"
  >
    <slot />
  </a>
  <button
    v-else
    type="button"
    :class="classes"
  >
    <slot />
  </button>
</template>
