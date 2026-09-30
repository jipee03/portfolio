// Prefix a /public path with the app base URL so assets also work when the site is
// served from a sub-path (e.g. https://<user>.github.io/<repo>/).
export function asset(path) {
  if (!path)
    return undefined
  const base = useRuntimeConfig().app.baseURL.replace(/\/$/, '')
  return `${base}${path}`
}
