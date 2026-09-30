<script setup>
const color = useColorMode()

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    aria-label="Toggle dark mode"
    @click="toggleDark"
  >
    <ion-icon :name="color.value === 'dark' ? 'sunny-outline' : 'moon-outline'" />
  </button>
</template>
