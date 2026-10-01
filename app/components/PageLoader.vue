<script setup>
defineProps({ visible: Boolean })
</script>

<template>
  <Transition name="page-loader">
    <div
      v-if="visible"
      class="page-loader"
      aria-hidden="true"
    >
      <div class="page-loader__logo">
        <Logo
          size="lg"
          animate
        />
      </div>
    </div>
  </Transition>
</template>
