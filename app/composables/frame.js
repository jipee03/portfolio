// A content frame (modal) opened over the current page and keyed by a query param, e.g.
// `?post=<slug>`, so it can be linked to and the browser's back button closes it.
// `path` is the page a link points to when opened in a new tab (e.g. /blog?post=<slug>).
export function useQueryFrame(key, path) {
  const route = useRoute()
  const router = useRouter()

  // Pages are prerendered without the query, so only read it once in the browser.
  const mounted = ref(false)
  onMounted(() => {
    mounted.value = true
  })

  const active = computed(() => mounted.value ? route.query[key] : undefined)

  const href = id => router.resolve({ path, query: { [key]: id } }).href

  function open(id, event) {
    // Modified clicks (new tab / window) follow the href instead.
    if (event && (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey))
      return
    event?.preventDefault()
    router.push({ query: { ...route.query, [key]: id }, state: { [key]: true } })
  }

  function close() {
    // Opened from this page: step back so the history doesn't keep the frame.
    // Opened from a shared link: just drop the param.
    if (window.history.state?.[key])
      return router.back()
    const query = { ...route.query }
    delete query[key]
    router.replace({ query })
  }

  return { active, href, open, close }
}

// Blog posts open from any page; the shareable link points to the Blog.
export const usePostFrame = () => useQueryFrame('post', '/blog')
