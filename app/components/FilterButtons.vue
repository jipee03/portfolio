<script setup>
defineProps({
  options: { type: Array, required: true },
  label: { type: String, required: true },
})

const model = defineModel({ type: String, required: true })
</script>

<template>
  <div
    class="flex flex-wrap gap-2"
    role="group"
    :aria-label="label"
  >
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="focus-ring min-h-11 rounded-lg border px-4 py-2 text-sm font-semibold transition"
      :class="model === option.value ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background hover:bg-accent'"
      :aria-pressed="model === option.value"
      @click="model = option.value"
    >
      {{ option.label }}
    </button>
  </div>
</template>
