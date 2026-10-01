<script setup>
import { site } from '~/data/site'

defineProps({
  size: { type: String, default: 'md' },
  animate: Boolean,
})
</script>

<template>
  <span
    class="inline-flex items-center gap-2.5"
    :class="{ 'site-logo': animate }"
  >
    <span
      class="grid shrink-0 place-items-center rounded-lg bg-primary font-mono font-bold text-primary-foreground"
      :class="size === 'lg' ? 'size-12 text-lg' : 'size-9 text-sm'"
    >{{ site.initials }}</span>
    <span
      class="font-semibold tracking-tight"
      :class="size === 'lg' ? 'text-2xl' : 'text-base'"
    >{{ site.name }}</span>
  </span>
</template>
