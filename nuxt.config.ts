// import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', 'nuxt-icon'],

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
  app: {
    keepalive: true,
  },
  keepalive: true,
});
