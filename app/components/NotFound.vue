<script setup>
const c = useSiteContent()
</script>

<template>
  <div class="page-blocks">
    <section class="grid gap-6">
      <p class="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {{ c.notFound.eyebrow }}
      </p>
      <h1 class="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-6xl">
        {{ c.notFound.title }}
      </h1>
      <p class="max-w-xl text-lg leading-8 text-muted-foreground">
        {{ c.notFound.text }}
      </p>
      <div class="flex flex-wrap gap-3">
        <BaseButton to="/">
          <ion-icon name="home-outline" />
          {{ c.notFound.back }}
        </BaseButton>
        <BaseButton
          to="/projects"
          variant="secondary"
        >
          {{ c.notFound.projects }}
        </BaseButton>
      </div>
    </section>
  </div>
</template>
