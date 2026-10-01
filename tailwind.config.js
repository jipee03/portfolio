import defaultTheme from 'tailwindcss/defaultTheme'

// Colors are CSS variables holding "r g b" channels (see app/assets/css/style.css),
// so opacity modifiers like `bg-primary/10` work and dark mode only swaps variables.
function token(name) {
  return `rgb(var(--${name}) / <alpha-value>)`
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'app/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'background': token('background'),
        'foreground': token('foreground'),
        'card': token('card'),
        'border': token('border'),
        'input': token('input'),
        'ring': token('ring'),
        'muted': token('muted'),
        'muted-foreground': token('muted-foreground'),
        'accent': token('accent'),
        'accent-foreground': token('accent-foreground'),
        'primary': token('primary'),
        'primary-foreground': token('primary-foreground'),
      },
      borderColor: {
        DEFAULT: token('border'),
      },
      fontFamily: {
        sans: ['"Instrument Sans"', ...defaultTheme.fontFamily.sans],
        handwriting: ['Caveat', 'cursive'],
      },
    },
  },
  darkMode: 'class',
}
