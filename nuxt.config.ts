// import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', 'nuxt-icon', [
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
  ], '@nuxtjs/sitemap', '@nuxt/scripts'],

    scripts: {
      registry: {
        googleAnalytics: {
          id: 'G-Y8HQTRVW6H',
        }
      }
    },

  css: ['@/assets/css/styles.css'],

  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {},
  //   },
  // },
  nitro: {
    compressPublicAssets: true,
  },
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
});