<template>
  <div>
    <nav>
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/lista">Lista</nuxt-link>
      <!-- <NuxtLink to="/loggain" v-if="!isLoggedIn">Logga in</NuxtLink>
      <NuxtLink to="/registrera" v-if="!isLoggedIn">Registera dig</NuxtLink>
      <button @click="handleSignOut" v-if="isLoggedIn">Logga ut</button> -->
    </nav>
    <NuxtPage />
  </div>
</template>

<script setup>
useHead({
  title: 'Super-lista',
  // or, instead:
  // titleTemplate: (title) => `My App - ${title}`,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'En lista med tusentals växter att beställa från' }
  ],
  bodyAttrs: {
    class: 'test'
  }
})


</script>