<script setup>
const c = useSiteContent()

useHead({ title: () => c.value.meta.projects })

const type = ref('all')

const filters = computed(() => Object.entries(c.value.projects.filters).map(([value, label]) => ({ value, label })))
const projects = computed(() => {
  const items = c.value.projects.items
  return type.value === 'all' ? items : items.filter(item => item.type === type.value)
})
</script>

<template>
  <div class="page-blocks">
    <PageHero
      :eyebrow="c.projects.eyebrow"
      :title="c.projects.title"
      :description="c.projects.description"
      image="/images/projects.svg"
    />

    <section :aria-label="c.projects.filterLabel">
      <div class="reveal">
        <p class="mb-2 text-sm font-semibold">
          {{ c.projects.filterLabel }}
        </p>
        <FilterButtons
          v-model="type"
          :options="filters"
          :label="c.projects.filterLabel"
        />
      </div>

      <div
        v-if="projects.length"
        class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        <ProjectCard
          v-for="(project, i) in projects"
          :key="project.slug"
          :project="project"
          :type-label="c.projects.types[project.type]"
          :category="c.projects.categoryLabel"
          :style="{ '--reveal-delay': `${(i % 3) * 80}ms` }"
        />
      </div>
      <p
        v-else
        class="mt-8 text-muted-foreground"
      >
        {{ c.projects.empty }}
      </p>
    </section>
  </div>
</template>
