<script setup>
const c = useSiteContent()

useHead({ title: () => c.value.meta.notFound })
</script>

<template>
  <NuxtLayout>
    <NotFound />
  </NuxtLayout>
</template>
