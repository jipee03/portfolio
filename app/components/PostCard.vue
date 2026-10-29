<script setup>
defineProps({
  post: { type: Object, required: true },
  minRead: { type: String, required: true },
  tagsLabel: { type: String, required: true },
})

const frame = usePostFrame()
</script>

<template>
  <div class="reveal h-full">
    <a
      :href="frame.href(post.slug)"
      class="focus-ring group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm shadow-black/5 transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md motion-reduce:transform-none"
      @click="frame.open(post.slug, $event)"
    >
      <PostMeta
        :post="post"
        :min-read="minRead"
      />

      <h3 class="mt-3 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
        {{ post.title }}
      </h3>
      <p
        v-if="post.org"
        class="mt-1.5 font-mono text-xs uppercase tracking-[0.08em] text-primary"
      >
        {{ post.org }}
      </p>
      <p class="mt-3 text-sm leading-6 text-muted-foreground">
        {{ post.description }}
      </p>

      <div class="mt-auto flex items-end justify-between gap-3 pt-5">
        <ul
          class="flex flex-wrap gap-2"
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
        <ion-icon
          name="arrow-forward-outline"
          class="shrink-0 text-lg text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden="true"
        />
      </div>
    </a>
  </div>
</template>
