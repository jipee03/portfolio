<script setup>
// Four small corner marks, like a technical drawing. Parent must be `relative`.
defineProps({ offset: { type: String, default: '0' } })
</script>

<template>
  <span
    class="pointer-events-none absolute size-3 border-l border-t border-primary/45"
    :style="{ top: offset, left: offset }"
    aria-hidden="true"
  />
  <span
    class="pointer-events-none absolute size-3 border-r border-t border-primary/45"
    :style="{ top: offset, right: offset }"
    aria-hidden="true"
  />
  <span
    class="pointer-events-none absolute size-3 border-b border-l border-primary/45"
    :style="{ bottom: offset, left: offset }"
    aria-hidden="true"
  />
  <span
    class="pointer-events-none absolute size-3 border-b border-r border-primary/45"
    :style="{ bottom: offset, right: offset }"
    aria-hidden="true"
  />
</template>
