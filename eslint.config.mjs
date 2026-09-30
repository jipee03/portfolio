// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: ['README.md', 'app/layouts/README.md'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off', // content comes from our own server/api files
  },
})
