<script setup>
const props = defineProps({
  project: { type: Object, required: true },
  typeLabel: { type: String, required: true },
  category: { type: String, required: true },
})

const badgeClass = computed(() => ({
  'open-source': 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/25 dark:text-emerald-300',
  'client': 'bg-primary/10 text-primary ring-primary/20',
  'personal': 'bg-muted text-muted-foreground ring-border',
}[props.project.type]))
</script>

<template>
  <div class="reveal h-full">
    <a
      :href="project.url"
      target="_blank"
      rel="noreferrer"
      class="group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md motion-reduce:transform-none sm:p-6"
    >
      <div class="flex items-center justify-between gap-3">
        <span class="truncate font-mono text-xs uppercase tracking-wide text-muted-foreground">{{ category }}</span>
        <span
          class="inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset"
          :class="badgeClass"
        >{{ typeLabel }}</span>
      </div>

      <h3 class="mt-3 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
        {{ project.title }}
      </h3>
      <p class="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
        {{ project.description }}
      </p>

      <div class="mt-auto flex items-center justify-between pt-6">
        <ul class="flex flex-wrap items-center gap-2">
          <li
            v-for="tag in project.tags"
            :key="tag"
            class="rounded-full border border-border px-2 py-0.5 text-xs font-medium"
          >
            {{ tag }}
          </li>
        </ul>
        <ion-icon
          name="arrow-forward-outline"
          class="shrink-0 text-lg text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden="true"
        />
      </div>
    </a>
  </div>
</template>
