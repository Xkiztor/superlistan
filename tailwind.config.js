/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  // purge: [
  //   './assets/**/*.{css}',
  //   './components/*.{vue,js}',
  //   './components/**/*.{vue,js}',
  //   './pages/*.vue',
  //   './pages/**/*.vue',
  //   './plugins/**/*.{js,ts}',
  //   './*.{vue,js,ts}',
  //   './nuxt.config.{js,ts}',
  // ],
  theme: {
    // extend: {

    // },
    colors: {
      rinth: {
        100: '#f3f3f4',
        200: '#e5e7eb',
        300: '#696969'
      },
      white: '#ffffff'
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: true,
    base: false,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
};
