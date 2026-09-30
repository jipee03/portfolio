<script setup>
const { locale, setLocale } = useI18n()

function changeLang() {
  setLocale(locale.value === 'tr' ? 'en' : 'tr')
}
</script>

<template>
  <div
    class="cursor-pointer transition-all fade"
    @click="changeLang()"
  >
    <img
      :src="asset(`/flags/${locale}.png`)"
      class="h-6"
    >
  </div>
</template>
