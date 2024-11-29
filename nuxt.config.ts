// import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    'nuxt-icon',
    '@nuxtjs/sitemap',
    [
      'nuxt-mail',
      {
        message: {
          // to: 'ugo.linder@gmail.com',
          to: 'peter@lindersplantskola.se',
        },
        smtp: {
          service: 'gmail',
          auth: {
            user: 'ugo.linder@gmail.com',
            pass: 'dcni tmfj wwfy cxwv',
          },
        },
      },
    ],
  ],

  css: ['@/assets/css/styles.css'],

  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {},
  //   },
  // },
  nitro: {
    // preset: 'netlify',
    compressPublicAssets: true,
  },
  ssr: false,
  // ssr: true,
  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: '123',

    // Public keys that are exposed to the client
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      anonKey: process.env.ANON_KEY,
    },
  },

  site: {
    url: 'https://superlistan.lindersplantskola.se/',
    name: 'Linders Superlista',
  },

  app: {
    keepalive: true,
  },

  build: {
    analyze: true, // Helps analyze build size and bottlenecks
  },
  vite: {
    build: {
      target: 'static', // Targets modern JS for better performance
      // target: 'esnext', // Targets modern JS for better performance
    },
  },

  compatibilityDate: '2024-11-28',
});
