<script setup>
import { site } from '~/data/site'

const c = useSiteContent()

useHead({ title: () => c.value.meta.home })

const featured = computed(() => c.value.projects.items.slice(0, 2))
const latest = computed(() => c.value.blog.items.slice(0, 2))
</script>

<template>
  <div class="page-blocks">
    <!-- Hero -->
    <section
      data-section="hero"
      class="grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)] lg:gap-16"
    >
      <div class="reveal max-w-3xl">
        <p class="flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <span
            class="size-1.5 shrink-0 animate-pulse rounded-full bg-primary"
            aria-hidden="true"
          />
          <span class="type-caret">{{ c.home.eyebrow }}</span>
        </p>
        <h1 class="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
          {{ c.home.title }}
        </h1>
        <p class="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
          {{ c.home.description }}
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <BaseButton to="/projects">
            <ion-icon name="albums-outline" />
            <span>{{ c.home.projects }}</span>
          </BaseButton>
          <BaseButton
            :href="site.github"
            variant="secondary"
          >
            <ion-icon name="logo-github" />
            <span>{{ c.home.github }}</span>
          </BaseButton>
        </div>
      </div>

      <figure class="reveal mx-auto w-full max-w-md">
        <div class="relative aspect-square">
          <span
            class="absolute inset-[10%] rounded-full bg-primary/10 blur-3xl"
            aria-hidden="true"
          />
          <span
            class="absolute inset-x-[12%] top-[8%] aspect-square rounded-full border border-primary/15"
            aria-hidden="true"
          />
          <span
            class="orbit absolute inset-x-[12%] top-[8%] aspect-square rounded-full border border-dashed border-primary/25"
            aria-hidden="true"
          >
            <span class="absolute -top-[3px] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-primary" />
          </span>
          <span
            class="absolute bottom-1 left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-[50%] bg-primary/25 blur-xl"
            aria-hidden="true"
          />
          <!-- Avatar: replace public/images/my-avatar.png with a larger, square portrait. -->
          <img
            :src="asset(site.avatar)"
            :alt="site.name"
            width="500"
            height="500"
            class="absolute inset-x-[22%] top-[14%] w-[56%] object-contain"
          >
        </div>
        <span
          class="block h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          aria-hidden="true"
        />
        <figcaption class="mt-4 text-center font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
          {{ c.home.caption }}
        </figcaption>
      </figure>
    </section>

    <!-- Featured projects -->
    <section data-section="projects">
      <SectionHeading
        :title="c.home.featured.title"
        :description="c.home.featured.description"
        :link-label="c.home.viewAll"
        to="/projects"
      />
      <div class="mt-8 grid gap-5 md:grid-cols-2">
        <ProjectCard
          v-for="(project, i) in featured"
          :key="project.slug"
          :project="project"
          :type-label="c.projects.types[project.type]"
          :category="c.projects.categoryLabel"
          :style="{ '--reveal-delay': `${i * 80}ms` }"
        />
      </div>
    </section>

    <!-- About -->
    <section
      data-section="about"
      class="blueprint-panel"
    >
      <div class="reveal grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
        <div>
          <h2 class="text-2xl font-semibold tracking-tight sm:text-3xl">
            {{ c.home.about.title }}
          </h2>
          <p class="mt-4 max-w-2xl font-handwriting text-xl leading-8 text-muted-foreground">
            {{ c.home.about.text }}
          </p>
          <NuxtLink
            to="/about"
            class="focus-ring mt-6 inline-flex items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            {{ c.home.about.link }}
          </NuxtLink>
        </div>
        <p class="-rotate-2 justify-self-center font-handwriting text-2xl leading-snug text-primary sm:text-3xl lg:justify-self-end">
          {{ c.home.about.note }}
        </p>
      </div>

      <dl class="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-3">
        <div
          v-for="(fact, i) in c.home.about.facts"
          :key="fact.label"
          class="reveal"
          :style="{ '--reveal-delay': `${i * 80}ms` }"
        >
          <dt class="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {{ fact.label }}
          </dt>
          <dd class="mt-1.5 text-sm font-semibold">
            {{ fact.value }}
          </dd>
        </div>
      </dl>
    </section>

    <!-- Latest writing -->
    <section data-section="posts">
      <SectionHeading
        :title="c.home.latest.title"
        :description="c.home.latest.description"
        :link-label="c.home.viewAll"
        to="/blog"
      />
      <div class="mt-8 grid gap-5 md:grid-cols-2">
        <PostCard
          v-for="(post, i) in latest"
          :key="post.slug"
          :post="post"
          :category-label="c.blog.filters[post.category]"
          :min-read="c.blog.minRead"
          :tags-label="c.blog.tagsLabel"
          :style="{ '--reveal-delay': `${i * 80}ms` }"
        />
      </div>
    </section>

    <div data-section="subscription">
      <NewsletterPanel />
    </div>

    <CtaPanel
      :title="c.cta.title"
      :text="c.cta.text"
    >
      <BaseButton :href="site.github">
        <ion-icon name="logo-github" />
        <span>{{ c.cta.primary }}</span>
      </BaseButton>
      <BaseButton
        :href="`mailto:${site.email}`"
        variant="secondary"
      >
        <ion-icon name="mail-outline" />
        <span>{{ c.cta.secondary }}</span>
      </BaseButton>
    </CtaPanel>
  </div>
</template>
