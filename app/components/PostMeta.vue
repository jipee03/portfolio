<script setup>
const props = defineProps({
  post: { type: Object, required: true },
  minRead: { type: String, required: true },
  // Left out on cards, where the active filter already says it.
  categoryLabel: { type: String, default: undefined },
})

const { localeProperties } = useI18n()

// Fixed timezone so the prerendered date matches the browser's.
const date = computed(() => props.post.date && new Intl.DateTimeFormat(localeProperties.value.language, {
  dateStyle: 'medium',
  timeZone: 'UTC',
}).format(new Date(props.post.date)))

// Experience posts show a `period` ("2024–2026") instead of a publish date.
const parts = computed(() => [
  props.categoryLabel && { text: props.categoryLabel },
  props.post.period ? { text: props.post.period } : date.value && { text: date.value, datetime: props.post.date },
  props.post.minutes && { text: `${props.post.minutes} ${props.minRead}` },
].filter(Boolean))
</script>

<template>
  <div class="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
    <template
      v-for="(part, i) in parts"
      :key="i"
    >
      <span
        v-if="i"
        aria-hidden="true"
      >·</span>
      <time
        v-if="part.datetime"
        :datetime="part.datetime"
      >{{ part.text }}</time>
      <span v-else>{{ part.text }}</span>
    </template>
  </div>
</template>
