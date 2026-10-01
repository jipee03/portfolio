// Fades `.reveal` elements in as they scroll into view. A MutationObserver picks up
// elements added later (route changes, filtered grids) so pages don't need any wiring.
export default defineNuxtPlugin(() => {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'))
    return
  }

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        io.unobserve(entry.target)
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

  let queued = false
  function scan() {
    queued = false
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => io.observe(el))
  }

  new MutationObserver(() => {
    if (!queued) {
      queued = true
      requestAnimationFrame(scan)
    }
  }).observe(document.body, { childList: true, subtree: true })

  scan()
})
