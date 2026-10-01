<script setup>
const c = useSiteContent()

useHead({ title: () => c.value.meta.blog })

const category = ref('all')

const filters = computed(() => Object.entries(c.value.blog.filters).map(([value, label]) => ({ value, label })))
const posts = computed(() => {
  const items = c.value.blog.items
  return category.value === 'all' ? items : items.filter(item => item.category === category.value)
})
</script>

<template>
  <div class="page-blocks">
    <PageHero
      :eyebrow="c.blog.eyebrow"
      :title="c.blog.title"
      :description="c.blog.description"
      image="/images/blog.svg"
    />

    <section
      data-section="post-list"
      :aria-label="c.blog.filterLabel"
    >
      <div class="reveal">
        <FilterButtons
          v-model="category"
          :options="filters"
          :label="c.blog.filterLabel"
        />
      </div>

      <div class="mt-8 grid gap-5 md:grid-cols-2">
        <PostCard
          v-for="(post, i) in posts"
          :key="post.slug"
          :post="post"
          :category-label="c.blog.filters[post.category]"
          :min-read="c.blog.minRead"
          :tags-label="c.blog.tagsLabel"
          :style="{ '--reveal-delay': `${(i % 2) * 80}ms` }"
        />
      </div>
    </section>
  </div>
</template>
