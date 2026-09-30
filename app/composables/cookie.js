import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useCookieStore = defineStore('cookieStore', () => {
  const cookie = useCookie('accept-cookie', { maxAge: 60 * 60 * 24 * 30 })

  function setCookie() {
    cookie.value = 'true'
  }
  const getCookie = computed(() => !!cookie.value)

  return { cookie, setCookie, getCookie }
})
