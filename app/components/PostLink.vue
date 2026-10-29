<script setup>
// Wraps a title in a link that opens the blog post `slug` in a frame; plain text without one.
defineProps({
  slug: { type: String, default: undefined },
})

const frame = usePostFrame()
</script>

<template>
  <a
    v-if="slug"
    :href="frame.href(slug)"
    class="focus-ring underline-offset-4 hover:underline"
    @click="frame.open(slug, $event)"
  ><slot /><ion-icon
    name="reader-outline"
    class="ml-1.5 inline-block align-[-0.1em] text-base text-muted-foreground"
    aria-hidden="true"
  /></a>
  <slot v-else />
</template>
