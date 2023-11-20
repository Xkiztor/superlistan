<template>
  <div data-theme="light" class="main-layout tou-z65h9k" ref="el" :class="$route.path == '/lista' ? 'page-lista' : ''">
    <nav class="naver" v-if="isSmallScreen && $route.path == '/lista'">
      <div class="dropdown-menu">
        <button @click.stop="openNav = !openNav">
          <Icon class="grayed nav-icon" name="material-symbols:menu-rounded" size="30" />
        </button>
        <div class="dropdown" v-if="openNav" ref="target">
          <nuxt-link :class="$route.path == '/' ? 'active' : ''" to="/" @click="openNav = false">Hem</nuxt-link>
          <nuxt-link :class="$route.path == '/lista' ? 'active' : ''" to="/lista"
            @click="openNav = false">Listan</nuxt-link>
          <nuxt-link :class="$route.path == '/onske-lista' ? 'active' : ''" to="/varukorg"
            @click="openNav = false">Varukorg</nuxt-link>
          <ThemeToggle />
        </div>
      </div>
      <button @click="state.openFilter">
        <Icon class="grayed nav-icon" name="mdi:filter" size="30" />
      </button>
      <button @click="state.openJump">
        <Icon class="grayed nav-icon" name="quill:jump-alt" size="32" />
      </button>
    </nav>
    <nav class="naver big-screen-naver" v-else>
      <nuxt-link :class="$route.path == '/' ? 'active' : ''" to="/">Hem</nuxt-link>
      <nuxt-link :class="$route.path == '/lista' ? 'active' : ''" to="/lista" v-if="isSmallScreen">Listan</nuxt-link>
      <nuxt-link :class="$route.path == '/lista' ? 'active' : ''" to="/lista" v-else>Linders Superlista 2023</nuxt-link>
      <nuxt-link :class="$route.path == '/onske-lista' ? 'active' : ''" to="/varukorg">Varukorg</nuxt-link>
      <ThemeToggle v-if="$route.path == '/lista'" />
    </nav>
    <KeepAlive>
      <NuxtPage />
    </KeepAlive>
  </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core'
useHead({
  title: 'Linders Superlista',
  // or, instead:
  // titleTemplate: (title) => `My App - ${title}`,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=6',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'En lista med tusentals växter att beställa från.' },
    { name: 'keywords', content: 'Lista, Lindersplantskola, superlista, Växter' },
    { name: 'author', content: 'Ugo Linder, Peter Linder' },
  ],
  bodyAttrs: {
    // class: 'test'
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
      href: 'https://fonts.googleapis.com/css2?family=Inter&display=swap',
      crossorigin: ''
    }
  ]
})


const state = useGlobalState()

const onskeList = useGlobalOnskeList()
const onskeListOld = useGlobalOnskeListOld()

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
:root {
  --primary-blue: #116fea;

  --primary-red-light: #ff0000;
  --primary-red-dark: #f36161;

  --link-light: #0645AD;
  --link-dark: #75b4f8;

  --bg-light: #e5e7eb;
  --bg-dark: #131519;

  --element-bg-light: #ffffff;
  --element-bg-dark: #23252b;

  --element-top-light: #ebedf1;
  --element-top-dark: #30343b;

  --element-top-hover-light: #e0e2e6;
  --element-top-hover-dark: #3b3f47;

  --box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  --box-shadow-inset-light: inset 0 -0.5px 3px #cfd1d6;
  --box-shadow-inset-dark: inset 0 -0.5px 3px #3a3e47e0;

  --text-mute-dark: #b0bac5;

  --text-white: #fff;

  --text-light: #000000;
  --text-dark: #ebebeb;

  --border-color-light: #e5e7eb;
  --border-color-dark: #373c46;
}


* {
  font-family: 'Robotoo', 'Inter', 'Helvetica';
  transition: all 150ms;
  letter-spacing: -0.25px;
}

h1 {
  font-family: 'Rubik', 'Roboto', 'Inter', 'Helvetica';
  font-weight: 600;
  /* stroke: 2px solid #116fea; */
}

html {
  background: var(--bg-light);
  /* background: #16181c; */
}

html.dark {
  background: var(--bg-dark);
}

button,
.btn-input,
.navigator>a,
input,
select,
.info-container>* {
  padding: 0.4rem;
  border-radius: 0.5rem;
  background-color: var(--element-top-light);
  box-shadow: var(--box-shadow-inset-light);
  margin: 0.5rem;
  cursor: pointer;
  /* cfd1d6 */
}

.dark button,
.dark input,
.dark .info-container>* {
  background: var(--element-top-dark);
  box-shadow: var(--box-shadow-inset-dark);
  color: var(--text-mute-dark);
}

.dark button:hover,
.dark input:hover {
  background: var(--element-top-hover-dark);
  box-shadow: var(--box-shadow-inset-dark);
}

select:hover,
button:hover {
  background-color: var(--element-top-hover-light);
}


.main-layout {
  display: grid;
  place-items: center;
  padding: 0 1rem;
  grid-template-rows: min-content auto;
  height: 100vh !important;

}

.dark .main-layout {
  background: var(--bg-dark);
}

.page-lista {
  grid-template-rows: min-content 87vh;
}

.dropdown {
  background-color: var(--element-bg-light);
  position: absolute;
  left: 0;
  z-index: 5;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.dark .dropdown {
  background: var(--element-top-dark);
}

.dropdown .theme-toggle {
  margin: 0;
  padding: 0;
}

.dropdown .theme-toggle:not(.dark) {
  background: none;
  box-shadow: none;
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

.dark .grayed {
  color: var(--text-mute-dark);
}

.nav-icon:hover {
  transform: scale(110%);
}

.nav-icon:active {
  transform: scale(90%);
}

.naver {
  border-radius: 1rem;
  box-shadow: var(--box-shadow);
  margin: 1rem 2rem;
  place-self: end center;
  width: 100%;
  padding: 0;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  max-width: 115rem;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  background: var(--element-bg-light);
  z-index: 11;
  transition: all 0.5s;
  letter-spacing: 0.05rem;
  position: relative;
}

.big-screen-naver>.theme-toggle {
  position: absolute;
  right: 1rem;
  margin: 0;
}

.dark .naver {
  background: var(--element-bg-dark);
  color: var(--text-dark);
}

.big-screen-naver>a:hover {
  transform: scale(105%);
  /* font-weight: 800; */

}

.dark .big-screen-naver>a:hover {
  color: var(--text-white);
}

.dark .big-screen-naver>a:hover {
  background: var(--element-top-dark);
  transform: none;
}

.dark .big-screen-naver>a {
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
}

.nav-observer {
  position: absolute;
  top: 0;
}

.big-screen-naver .router-link-active {
  border-bottom: 2.5px ridge var(--primary-blue);
}

.dark .big-screen-naver .router-link-active {
  border: none;
  position: relative;
}

.dark .big-screen-naver .router-link-active::after {
  content: "";
  width: calc(100% - 1rem);
  height: 3px;
  border-radius: 1rem;
  background: var(--primary-blue);
  position: absolute;
  bottom: 0;
  left: 0.5rem;
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

.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* 
.page-enter-from {
  transform: rotate(360deg);
}

.page-leave-to {
  transform: rotate(-360deg);
} */
</style>