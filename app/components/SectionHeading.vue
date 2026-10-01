<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: undefined },
  linkLabel: { type: String, default: undefined },
  to: { type: String, default: undefined },
})
</script>

<template>
  <div class="reveal flex items-end justify-between gap-6">
    <div>
      <h2 class="text-2xl font-semibold tracking-tight sm:text-3xl">
        {{ title }}
      </h2>
      <p
        v-if="description"
        class="mt-2 max-w-2xl text-muted-foreground"
      >
        {{ description }}
      </p>
    </div>
    <NuxtLink
      v-if="to && linkLabel"
      :to="to"
      class="focus-ring shrink-0 text-sm font-semibold text-primary underline-offset-4 hover:underline"
    >
      {{ linkLabel }}
    </NuxtLink>
  </div>
</template>
