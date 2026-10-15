// Personal details that don't change with the language. Edit these first.
export const site = {
  name: 'Gustavo Lima',
  initials: 'GL',
  location: 'Porto, Portugal',
  // TODO: replace with your real address (used by the "Write me" button and newsletter form).
  email: 'hello@example.com',
  github: 'https://github.com/jipee03',
  linkedin: 'https://www.linkedin.com/in/gustavofelima',
  avatar: '/images/my-avatar.png',
  // Optional: POST endpoint of a newsletter provider (Buttondown, Formspree...).
  // While empty, the form opens a pre-filled email instead.
  newsletterAction: '',
}

// Nuxt routes shown in the header and footer (labels come from content.js).
export const navLinks = [
  { key: 'about', to: '/about' },
  { key: 'projects', to: '/projects' },
  { key: 'writing', to: '/blog' },
]
