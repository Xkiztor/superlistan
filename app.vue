<template>
  <div>
    <nav class="bg-gray-100 p-2 shadow-md m-2">
      <nuxt-link class="m-2" to="/">Home</nuxt-link>
      <nuxt-link class="m-2" to="/lista">Lista</nuxt-link>
      <!-- <NuxtLink to="/loggain" v-if="!isLoggedIn">Logga in</NuxtLink>
      <NuxtLink to="/registrera" v-if="!isLoggedIn">Registera dig</NuxtLink>
      <button @click="handleSignOut" v-if="isLoggedIn">Logga ut</button> -->
    </nav>
    <NuxtPage />
  </div>
  <!-- <div class="grid bg-gray-50 the-grid">
    <div class="bg-red-500 el">1</div>
    <div class="bg-green-500 el">Elemtn 2 long text</div>
    <div class="bg-blue-500 el">3 price</div>
    <div class="bg-yellow-500 el">4 add</div>
  </div> -->
</template>

<script setup>
useHead({
  title: 'Super-lista',
  // or, instead:
  // titleTemplate: (title) => `My App - ${title}`,
  lang: 'se',

  viewport: 'width=device-width, initial-scale=1, maximum-scale=6',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'En lista med tusentals växter att beställa från' },
    { name: 'keywords', content: 'Lista, Lindersplantskola, superlista, Växter' },
    { name: 'author', content: 'Ugo Linder, Peter Linder' },
  ],
  bodyAttrs: {
    class: 'test'
  },
  htmlAttrs: {
    lang: 'se',
  }
})


</script>

<style scoped>
.the-grid {
  padding: 1rem;
  grid-template-columns: 8fr 100fr 8fr 8fr;
}

.el {
  width: fit-content;
  margin: 2px;
}
</style>