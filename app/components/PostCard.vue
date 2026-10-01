<script setup>
const props = defineProps({
  post: { type: Object, required: true },
  categoryLabel: { type: String, required: true },
  minRead: { type: String, required: true },
  tagsLabel: { type: String, required: true },
})

const { localeProperties } = useI18n()

// Fixed timezone so the prerendered date matches the browser's.
const date = computed(() => new Intl.DateTimeFormat(localeProperties.value.language, {
  dateStyle: 'medium',
  timeZone: 'UTC',
}).format(new Date(props.post.date)))
</script>

<template>
  <div class="reveal h-full">
    <article class="group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm shadow-black/5 transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md motion-reduce:transform-none">
      <div class="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
        <span>{{ categoryLabel }}</span>
        <span aria-hidden="true">·</span>
        <time :datetime="post.date">{{ date }}</time>
        <span aria-hidden="true">·</span>
        <span>{{ post.minutes }} {{ minRead }}</span>
      </div>

      <h3 class="mt-3 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
        <a
          v-if="post.url"
          :href="post.url"
          class="focus-ring"
        >{{ post.title }}</a>
        <template v-else>
          {{ post.title }}
        </template>
      </h3>
      <p class="mt-3 text-sm leading-6 text-muted-foreground">
        {{ post.description }}
      </p>

      <ul
        class="mt-auto flex flex-wrap gap-2 pt-5"
        :aria-label="tagsLabel"
      >
        <li
          v-for="tag in post.tags"
          :key="tag"
          class="rounded-md border border-border px-2 py-1 font-mono text-xs text-muted-foreground"
        >
          {{ tag }}
        </li>
      </ul>
    </article>
  </div>
</template>
