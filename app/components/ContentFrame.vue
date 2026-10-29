<script setup>
// Modal frame shared by blog posts (and later projects). Render it with v-if: it opens on
// mount and emits `close` on the X, Esc or a click outside, for the parent to unmount it.
defineProps({
  label: { type: String, required: true },
  closeLabel: { type: String, required: true },
  image: { type: String, default: undefined },
  imageAlt: { type: String, default: '' },
})

const emit = defineEmits(['close'])

const dialog = ref()
let closing = false

function close() {
  if (!closing) {
    closing = true
    emit('close')
  }
}

// Clicks on the dialog element itself outside its box land on the backdrop.
function onClick(event) {
  if (event.target !== dialog.value)
    return
  const box = dialog.value.getBoundingClientRect()
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)
    close()
}

onMounted(() => dialog.value.showModal())
// close() hands focus back to the link that opened the frame.
onBeforeUnmount(() => dialog.value?.close())
</script>

<template>
  <dialog
    ref="dialog"
    class="content-frame m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl flex-col overflow-hidden open:flex rounded-2xl border border-border bg-card p-0 text-foreground shadow-2xl shadow-black/20 backdrop:bg-black/60 backdrop:backdrop-blur-sm sm:max-h-[calc(100dvh-4rem)]"
    :aria-label="label"
    @cancel.prevent="close"
    @close="close"
    @click="onClick"
  >
    <button
      type="button"
      class="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-full border border-border bg-background/80 text-xl text-muted-foreground backdrop-blur transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      :aria-label="closeLabel"
      @click="close"
    >
      <ion-icon name="close-outline" />
    </button>

    <div class="overflow-y-auto overscroll-contain">
      <img
        v-if="image"
        :src="asset(image)"
        :alt="imageAlt"
        class="aspect-[16/7] w-full border-b border-border object-cover"
      >
      <header
        v-if="$slots.meta"
        class="blueprint-panel flex min-h-[3.75rem] items-center gap-2 border-b border-border py-3 pl-6 pr-16 font-mono text-xs text-muted-foreground sm:pl-8"
      >
        <slot name="meta" />
      </header>
      <div class="p-6 sm:p-8">
        <slot />
      </div>
    </div>
  </dialog>
</template>
