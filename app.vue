<template>
  <div data-theme="light" class="main-layout tou-z65h9k" ref="el" :class="$route.path == '/lista' ? 'page-lista' : ''">
    <!-- <nav class="bg-white p-2 shadow-md m-2 px-4 rounded-[1rem] naver"
      :style="{ width: targetIsVisible ? '60rem' : '100%' }"> -->
    <nav class="naver" v-if="isSmallScreen && $route.path == '/lista'">
      <div class="dropdown-menu">
        <button @click.stop="openNav = !openNav">
          <Icon class="grayed nav-icon" name="material-symbols:menu-rounded" size="30" />
        </button>
        <div class="dropdown" v-if="openNav" ref="target">
          <nuxt-link :class="$route.path == '/' ? 'active' : ''" to="/" @click="openNav = false">Hem</nuxt-link>
          <nuxt-link :class="$route.path == '/lista' ? 'active' : ''" to="/lista"
            @click="openNav = false">Listan</nuxt-link>
          <nuxt-link :class="$route.path == '/onske-lista' ? 'active' : ''" to="/onske-lista"
            @click="openNav = false">Önskelistan</nuxt-link>
        </div>
      </div>
      <button @click="state.openFilter">
        <Icon class="grayed nav-icon" name="mdi:filter" size="30" />
      </button>
      <button @click="state.openJump">
        <Icon class="grayed nav-icon" name="quill:jump-alt" size="32" />
      </button>
    </nav>
    <nav class="naver" v-else>
      <nuxt-link :class="$route.path == '/' ? 'active' : ''" to="/">Hem</nuxt-link>
      <nuxt-link :class="$route.path == '/lista' ? 'active' : ''" to="/lista" v-if="isSmallScreen">Listan</nuxt-link>
      <nuxt-link :class="$route.path == '/lista' ? 'active' : ''" to="/lista" v-else>Linders Superlista 2023</nuxt-link>
      <nuxt-link :class="$route.path == '/onske-lista' ? 'active' : ''" to="/onske-lista">Önskelistan</nuxt-link>
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



// const emits = defineEmits(['testing'])

// const handleTest = () => {
//   console.log('hellooooooo');
// }
const state = useGlobalState()

const openNav = ref(false)

const screenSize = useWindowSize()
const isSmallScreen = computed(() => { return screenSize.width.value <= 1200 ? true : false })
// const route = useRoute()
// console.log(route.path)
const target = ref(null)

onClickOutside(target, (event) => {
  openNav.value = false
})


</script>

<style>
/* @font-face {
  font-family: "Inter";
  src: local("Inter"), url(./assets/fonts/Inter.ttf) format("truetype");
} */

* {
  font-family: 'Roboto', 'Inter', 'Helvetica';
  transition: all 150ms;
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
  cursor: pointer;
  /* cfd1d6 */
}

select:hover,
button:hover {
  background-color: #e0e2e6;
}


.main-layout {
  display: grid;
  place-items: center;
  padding: 0 1rem;
  grid-template-rows: min-content auto;
  /* Temp */
  height: 100vh !important;
  /* Temp */

}

.page-lista {
  grid-template-rows: min-content 87vh;
}

.dropdown {
  background-color: #fff;
  position: absolute;
  left: 0;
  /* top: 3rem; */
  z-index: 5;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.dropdown>.active {
  border: none;
  opacity: 0.2;
}


.dropdown-menu {
  position: relative;
  display: inline-block;
}

.naver>button,
.naver>div>button {
  background: none;
  box-shadow: none;
}

.naver>a {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.nav-icon {
  cursor: pointer;
}

.nav-icon:hover {
  transform: scale(110%);
}

.nav-icon:active {
  transform: scale(90%);
}

.naver {
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 1rem 2rem;
  place-self: end center;
  width: 100%;
  padding: 0;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  max-width: 115rem;
  /* margin-bottom: 1rem; */
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  background: white;
  /* position: sticky; */
  /* top: 1rem; */
  z-index: 11;
  transition: all 0.5s;
  letter-spacing: 0.05rem;
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

@media screen and (max-width:1200px) {

  .main-layout {
    grid-template-rows: min-content auto;
    height: 100vh;
  }
}
</style>