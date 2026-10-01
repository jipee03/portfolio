<script setup>
const ready = ref(false)

onMounted(() => {
  setTimeout(() => {
    ready.value = true
  }, 900)
})
</script>

<template>
  <PageLoader :visible="!ready" />

  <NuxtLayout>
    <NuxtPage transition />
  </NuxtLayout>
</template>
