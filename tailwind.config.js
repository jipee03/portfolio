/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'app/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        ranko: {
          50: '#FCE5C1',
          100: '#FBDDAD',
          200: '#F9CD87',
          300: '#F7BC60',
          400: '#F5AC39',
          500: '#F39C12',
          600: '#C37B0A',
          700: '#8E5A07',
          800: '#583804',
          900: '#231602',
        },
        vue: '#42b883',
        laravel: '#f55247',
        html5: '#e34f26',
        css3: '#3C99DC',
      },
    },
  },
  darkMode: 'class',
}
