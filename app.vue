<template>
  <div data-theme="light" class="main-layout tou-z65h9k" ref="el">
    <!-- <nav class="bg-white p-2 shadow-md m-2 px-4 rounded-[1rem] naver"
      :style="{ width: targetIsVisible ? '60rem' : '100%' }"> -->
    <nav class="bg-white p-2 shadow-md m-2 px-4 rounded-[1rem] naver">
      <nuxt-link :class="$route.path == '/' ? 'active' : ''" to="/">Hem</nuxt-link>
      <nuxt-link :class="$route.path == '/lista' ? 'active' : ''" to="/lista">Lista</nuxt-link>
      <nuxt-link :class="$route.path == '/onske-lista' ? 'active' : ''" to="/onske-lista">Önskelista</nuxt-link>
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
  },
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
      crossorigin: ''
    }
  ],
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Rubik&display=swap',
      crossorigin: ''
    }
  ]
})


// const route = useRoute()
// console.log(route.path)



const el = ref(null)
const { y, arrivedState } = useScroll(el)
const { left, right, top, bottom } = toRefs(arrivedState)

</script>

<style>
/* @font-face {
  font-family: "Inter";
  src: local("Inter"), url(./assets/fonts/Inter.ttf) format("truetype");
} */

* {
  font-family: 'Roboto', 'Inter', 'Helvetica';
}

h1 {
  font-family: 'Rubik', 'Roboto', 'Inter', 'Helvetica';
  font-weight: 600 !important;
  stroke: 2px solid #116fea;
}

html {
  background: #e5e7eb;
}


button,
.btn-input,
.navigator>a,
input,
select,
.info-container>* {
  /* border: 1px solid rgb(223, 223, 223); */
  padding: 0.4rem;
  border-radius: 0.5rem;
  background-color: #ebedf1;
  box-shadow: inset 0 -0.5px 3px #cfd1d6;
  margin: 0.5rem;
  /* cfd1d6 */
}


.main-layout {
  display: grid;
  place-items: center;
  padding: 0 1rem;
  grid-template-rows: min-content 87vh;
  /* Temp */
  height: 100vh !important;
  /* Temp */

}

.naver>a {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.naver {
  margin: 1rem 2rem;
  width: 100%;
  padding: 0;
  height: 4rem;
  display: grid;
  max-width: 100rem;
  margin-bottom: 1rem;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  position: sticky;
  top: 1rem;
  z-index: 11;
  transition: all 0.5s
}

.nav-observer {
  position: absolute;
  top: 0;
}

.active {
  border-bottom: 2.5px ridge #116fea;
}

.the-grid {
  padding: 1rem;
  grid-template-columns: 8fr 100fr 8fr 8fr;
}

.el {
  width: fit-content;
  margin: 2px;
}
</style>