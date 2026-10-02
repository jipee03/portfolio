<script setup>
// import { site } from '~/data/site'

const c = useSiteContent()

useHead({ title: () => c.value.meta.about })
</script>

<template>
  <div class="page-blocks">
    <PageHero
      :eyebrow="c.about.eyebrow"
      :title="c.about.heading"
      :description="c.about.description"
      image="/images/about.svg"
    />

    <!-- Experience -->
    <section data-section="timeline">
      <SectionHeading
        :title="c.about.experience.title"
        :description="c.about.experience.description"
      />
      <ol class="mt-10">
        <li
          v-for="item in c.about.experience.items"
          :key="item.period + item.title"
          class="reveal group grid grid-cols-[2.75rem_1fr] gap-x-4 sm:grid-cols-[9rem_2.75rem_1fr] sm:gap-x-6"
        >
          <p class="hidden pt-1 text-right font-mono text-xs leading-5 tracking-tight text-muted-foreground sm:block">
            {{ item.period }}
          </p>
          <div
            class="flex flex-col items-center"
            aria-hidden="true"
          >
            <span class="mt-1.5 size-2.5 shrink-0 rotate-45 border border-primary bg-background transition-colors duration-200 group-hover:bg-primary" />
            <span class="mt-3 w-px flex-1 bg-border" />
          </div>
          <div class="pb-10">
            <p class="font-mono text-xs text-muted-foreground sm:hidden">
              {{ item.period }}
            </p>
            <h3 class="mt-1 font-semibold tracking-tight transition-colors duration-200 group-hover:text-primary sm:mt-0">
              {{ item.title }}
            </h3>
            <p class="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-primary">
              {{ item.org }}
            </p>
            <p class="mt-3 max-w-2xl text-pretty text-sm leading-6 text-muted-foreground">
              {{ item.text }}
            </p>
          </div>
        </li>
      </ol>
    </section>

    <!-- Education -->
    <section data-section="timeline">
      <SectionHeading :title="c.about.education.title" />
      <div class="mt-10 grid gap-5 md:grid-cols-2">
        <article
          v-for="(item, i) in c.about.education.items"
          :key="item.title"
          class="reveal group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors duration-200 hover:border-primary/40"
          :style="{ '--reveal-delay': `${i * 80}ms` }"
        >
          <header class="blueprint-panel flex items-center justify-between gap-4 border-b border-border px-6 py-3 font-mono text-xs text-muted-foreground">
            <span>{{ item.period }}</span>
            <span
              class="text-muted-foreground/50"
              aria-hidden="true"
            >{{ String(i + 1).padStart(2, '0') }}</span>
          </header>
          <div class="flex flex-1 flex-col gap-3 p-6">
            <div>
              <h3 class="text-balance text-lg font-semibold leading-6 tracking-tight transition-colors duration-200 group-hover:text-primary">
                {{ item.title }}
              </h3>
              <p class="mt-1.5 font-mono text-xs uppercase tracking-[0.08em] text-primary">
                {{ item.org }}
              </p>
            </div>
            <p class="text-pretty text-sm leading-6 text-muted-foreground">
              {{ item.text }}
            </p>
          </div>
        </article>
      </div>
    </section>

    <!-- Working set -->
    <section data-section="capabilities">
      <SectionHeading
        :title="c.about.working.title"
        :description="c.about.working.description"
      />
      <div class="reveal mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <dl class="grid gap-8">
          <div
            v-for="set in c.about.working.sets"
            :key="set.label"
            class="border-t border-border pt-8 first:border-0 first:pt-0"
          >
            <dt class="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {{ set.label }}
            </dt>
            <dd class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="item in set.tags ?? set.items"
                :key="item"
                class="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-accent hover:text-primary"
              >
                <!-- Placeholder mark: swap for a logo <img> per item if you like.  -->
                <span
                  class="size-1.5 rotate-45 bg-primary/60"
                  aria-hidden="true"
                />
                {{ item }}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Development -->
    <section data-section="timeline">
      <SectionHeading :title="c.about.development.title" />
      <div class="mt-10 grid gap-5 md:grid-cols-2">
        <article
          v-for="(item, i) in c.about.development.items"
          :key="item.title"
          class="reveal group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors duration-200 hover:border-primary/40"
          :style="{ '--reveal-delay': `${i * 80}ms` }"
        >
          <header class="blueprint-panel flex items-center justify-between gap-4 border-b border-border px-6 py-3 font-mono text-xs text-muted-foreground">
            <span>{{ item.period }}</span>
            <span
              class="text-muted-foreground/50"
              aria-hidden="true"
            >{{ String(i + 1).padStart(2, '0') }}</span>
          </header>
          <div class="flex flex-1 flex-col gap-3 p-6">
            <div>
              <h3 class="text-balance text-lg font-semibold leading-6 tracking-tight transition-colors duration-200 group-hover:text-primary">
                <!-- `url` in en.json turns the title into an external link. -->
                <a
                  v-if="item.url"
                  :href="item.url"
                  target="_blank"
                  rel="noreferrer"
                  class="focus-ring underline-offset-4 hover:underline"
                >{{ item.title }}<ion-icon
                  name="open-outline"
                  class="ml-1.5 inline-block align-[-0.1em] text-base text-muted-foreground"
                  aria-hidden="true"
                /></a>
                <template v-else>
                  {{ item.title }}
                </template>
              </h3>
              <p class="mt-1.5 font-mono text-xs uppercase tracking-[0.08em] text-primary">
                {{ item.org }}
              </p>
            </div>
            <p class="text-pretty text-sm leading-6 text-muted-foreground">
              {{ item.text }}
            </p>
          </div>
        </article>
      </div>
    </section>

    <!-- Sponsorship -->
    <!--
    <section>
      <div class="reveal flex flex-col gap-6 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div class="max-w-2xl">
          <p class="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {{ c.about.sponsor.eyebrow }}
          </p>
          <h2 class="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            {{ c.about.sponsor.title }}
          </h2>
          <p class="mt-3 leading-7 text-muted-foreground">
            {{ c.about.sponsor.text }}
          </p>
          <div class="mt-6">
            <BaseButton :href="site.github">
              <ion-icon name="heart-outline" />
              <span>{{ c.about.sponsor.button }}</span>
            </BaseButton>
          </div>
        </div>
        <p class="-rotate-3 font-handwriting text-3xl text-primary">
          {{ c.about.sponsor.note }} ♥
        </p>
      </div>
    </section> -->

    <!--
    <CtaPanel
      :title="c.about.cta.title"
      :text="c.about.cta.text"
    >
      <BaseButton to="/projects">
        <ion-icon name="albums-outline" />
        <span>{{ c.about.cta.primary }}</span>
      </BaseButton>
      <BaseButton
        :href="site.linkedin"
        variant="secondary"
      >
        <ion-icon name="logo-linkedin" />
        <span>{{ c.about.cta.secondary }}</span>
      </BaseButton>
    </CtaPanel>
    -->
  </div>
</template>
