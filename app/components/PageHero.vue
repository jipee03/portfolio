<script setup>
defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
})
</script>

<template>
  <section
    data-section="page-hero"
    class="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,22rem)] lg:gap-16"
  >
    <div class="reveal max-w-3xl">
      <p class="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        <span
          class="h-px w-8 bg-primary/50"
          aria-hidden="true"
        />
        {{ eyebrow }}
      </p>
      <h1 class="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-6xl">
        {{ title }}
      </h1>
      <p class="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
        {{ description }}
      </p>
    </div>

    <!-- Placeholder artwork lives in public/images: swap the file to use your own. -->
    <div class="reveal stage mx-auto w-48 sm:w-60 lg:w-full">
      <div
        class="stage__floor"
        aria-hidden="true"
      >
        <div class="stage__grid blueprint-panel" />
      </div>
      <div
        class="stage__glow"
        aria-hidden="true"
      />
      <img
        :src="asset(image)"
        alt=""
        width="1024"
        height="1024"
        class="stage__icon"
      >
      <CornerTicks />
    </div>
  </section>
</template>
