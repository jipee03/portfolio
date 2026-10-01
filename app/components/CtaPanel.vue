<script setup>
defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true },
})
</script>

<template>
  <section>
    <div class="blueprint-panel reveal relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-10">
      <CornerTicks offset="1rem" />
      <div class="relative max-w-3xl">
        <h2 class="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {{ title }}
        </h2>
        <p class="mt-3 max-w-xl text-pretty leading-7 text-muted-foreground">
          {{ text }}
        </p>
        <div class="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
