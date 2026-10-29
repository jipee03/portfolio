<script setup>
// The open blog post (`?post=<slug>`), shown in a frame over whichever page is open.
const c = useSiteContent()
const frame = usePostFrame()

const post = computed(() => c.value.blog.items.find(item => item.slug === frame.active.value))
</script>

<template>
  <ContentFrame
    v-if="post"
    :key="post.slug"
    :label="post.title"
    :close-label="c.blog.close"
    :image="post.image"
    :image-alt="post.imageAlt"
    @close="frame.close"
  >
    <template #meta>
      <PostMeta
        :post="post"
        :category-label="c.blog.filters[post.category]"
        :min-read="c.blog.minRead"
      />
    </template>

    <h2 class="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
      {{ post.title }}
    </h2>
    <p
      v-if="post.org"
      class="mt-2 font-mono text-xs uppercase tracking-[0.08em] text-primary"
    >
      {{ post.org }}
    </p>
    <ul
      v-if="post.tags?.length"
      class="mt-4 flex flex-wrap gap-2"
      :aria-label="c.blog.tagsLabel"
    >
      <li
        v-for="tag in post.tags"
        :key="tag"
        class="rounded-md border border-border px-2 py-1 font-mono text-xs text-muted-foreground"
      >
        {{ tag }}
      </li>
    </ul>

    <div class="mt-6 grid gap-4 border-t border-border pt-6 text-pretty leading-7">
      <p class="text-muted-foreground">
        {{ post.description }}
      </p>
      <!-- `body` in en.json: a string is a paragraph, { "heading": "…" } a sub-heading. -->
      <template
        v-for="(block, i) in post.body"
        :key="i"
      >
        <h3
          v-if="block.heading"
          class="mt-2 text-lg font-semibold tracking-tight"
        >
          {{ block.heading }}
        </h3>
        <p v-else>
          {{ block }}
        </p>
      </template>
    </div>

    <div
      v-if="post.url"
      class="mt-8"
    >
      <BaseButton
        :href="post.url"
        variant="secondary"
      >
        <ion-icon name="open-outline" />
        <span>{{ c.blog.visit }}</span>
      </BaseButton>
    </div>
  </ContentFrame>
</template>
