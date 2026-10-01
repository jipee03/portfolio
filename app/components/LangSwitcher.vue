<script setup>
const { locale, locales, setLocale } = useI18n()
const c = useSiteContent()
</script>

<template>
  <ul
    class="flex flex-wrap items-center gap-1"
    :aria-label="c.nav.language"
  >
    <li
      v-for="item in locales"
      :key="item.code"
    >
      <button
        type="button"
        class="inline-flex min-h-8 items-center rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
        :class="locale === item.code ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'"
        :aria-current="locale === item.code ? 'true' : undefined"
        :lang="item.language"
        @click="setLocale(item.code)"
      >
        {{ item.name }}
      </button>
    </li>
  </ul>
</template>
