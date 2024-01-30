<template>
  <div data-theme="light" class="main-layout tou-z65h9k" ref="el" :class="$route.path == '/lista' ? 'page-lista' : ''">
    <nav class="naver" v-if="isSmallScreen && $route.path == '/lista'">
      <div class="dropdown-menu">
        <button @click.stop="openNav = !openNav">
          <Icon class=" nav-icon" name="material-symbols:menu-rounded" size="30" />
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
        <Icon class=" nav-icon" name="mdi:filter" size="30" />
      </button>
      <button @click="state.openJump">
        <Icon class=" nav-icon" name="quill:jump-alt" size="32" />
      </button>
    </nav>
    <nav class="naver big-screen-naver" v-else>

      <nuxt-link :class="$route.path == '/' ? 'active' : ''" to="/">
        <Icon name="ic:round-home" />Hem
      </nuxt-link>
      <nuxt-link :class="$route.path == '/lista' ? 'active' : ''" to="/lista">
        <Icon name="ph:list-dashes-fill" />Listan
      </nuxt-link>
      <!-- <nuxt-link :class="$route.path == '/lista' ? 'active' : ''" to="/lista" v-else>
        <Icon name="ph:list-dashes-fill" />Linders Superlista 2023
      </nuxt-link> -->
      <nuxt-link :class="$route.path == '/onske-lista' ? 'active' : ''" to="/varukorg">
        <Icon name="ic:round-shopping-cart" />Varukorg
      </nuxt-link>
      <ThemeToggle v-if="$route.path == '/lista' || !isSmallScreen" />
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
    { name: 'keywords', content: 'Lista, Lindersplantskola, superlista, Växter, ovanliga växter, lista att beställa ifån, 2024' },
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
const isDark = useDark()

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
  --primary-blue: #105dfb;

  --primary-red-light: #ff0000;
  --primary-red-dark: #f36161;

  --link-light: #0645AD;
  --link-dark: #75b4f8;

  --bg-light: #fbfbfb;
  --bg-dark: #0f0f11;

  --element-bg-light: #ffffff;
  --element-bg-dark: #181a1e;

  --element-top-light: #ebedf1;
  --element-top-dark: #1e2024;

  --element-top-hover-light: #e0e2e6;
  --element-top-hover-dark: #22252a;

  --box-shadow-light: 0 0.5px 3px 0px rgba(0, 0, 0, 0.07);
  --box-shadow-dark: 0 0.5px 3px 0px rgba(0, 0, 0, 0.2);

  --input-shadow-light: 0 1.5px 3px 0px rgba(0, 0, 0, 0.05);
  --input-shadow-dark: 0 1.5px 3px 0px rgba(0, 0, 0, 0.2);

  /* --box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); */

  /* --box-shadow-inset-light: inset 0 -0.5px 3px #cfd1d6; */
  /* --box-shadow-inset-dark: inset 0 -0.5px 3px #3a3e47e0; */

  --text-mute-dark: #b0bac5;
  --text-mute-light: #787878;

  --text-white: #fff;

  --text-light: #000000;
  --text-dark: #ebebeb;

  --border-color-light: #e6e6e6;
  --border-color-dark: #2b2b2d;
}

html:not(.dark) {
  --primary-red: var(--primary-red-light);

  --link: var(--link-light);

  --bg: var(--bg-light);

  --element-bg: var(--element-bg-light);

  --element-top: var(--element-top-light);

  --element-top-hover: var(--element-top-hover-light);

  --box-shadow: var(--box-shadow-light);

  --input-shadow: var(--input-shadow-light);

  --text-mute: var(--text-mute-light);

  --text: var(--text-light);

  --border-color: var(--border-color-light);
}

.dark {
  --primary-red: var(--primary-red-dark);

  --link: var(--link-dark);

  --bg: var(--bg-dark);

  --element-bg: var(--element-bg-dark);

  --element-top: var(--element-top-dark);

  --element-top-hover: var(--element-top-hover-dark);

  --box-shadow: var(--box-shadow-dark);

  --input-shadow: var(--input-shadow-dark);

  --text-mute: var(--text-mute-dark);

  --text: var(--text-dark);

  --border-color: var(--border-color-dark);
}

* {
  font-family: 'Inter', 'Helvetica', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  /* font-family: SFR, 'SFR'; */
  transition: all 150ms;
  letter-spacing: -0.25px;
}

h1 {
  /* font-family: SFB, 'SFB'; */
  font-family: 'Inter', 'Helvetica', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 600;
  /* stroke: 2px solid #116fea; */
}

html {
  background: var(--bg);
  /* background: #16181c; */
}

html.dark {
  background: var(--bg);
}

button,
.btn-input,
.navigator>a,
input,
select,
.info-container>* {
  padding: 0.4rem;
  border-radius: 0.5rem;
  background-color: var(--element-top);
  box-shadow: var(--box-shadow-inset);
  /* border: none; */
  margin: 0.5rem;
  cursor: pointer;
  /* cfd1d6 */
}


.dark .info-container>* {
  background: var(--element-top);
  box-shadow: var(--box-shadow-inset);
  color: var(--text-mute);
}

.dark input,
.dark button {
  box-shadow: var(--box-shadow-inset);
  color: var(--text);
}

.dark button:hover,
.dark input:hover {
  background: var(--element-top-hover);
  box-shadow: var(--box-shadow-inset);
}

select:hover,
button:hover {
  background-color: var(--element-top-hover);
}




.main-layout {
  display: grid;
  place-items: center;
  /* padding: 0 1rem; */
  grid-template-rows: min-content auto;
  height: 100vh !important;

}

.dark .main-layout {
  background: var(--bg);
}

.page-lista {
  grid-template-rows: min-content 91vh;
}

.dropdown {
  background-color: var(--element-bg);
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



.nav-icon {
  cursor: pointer;
}

.dark .grayed {
  color: var(--text-mute);
}

.nav-icon:hover {
  transform: scale(110%);
}

.nav-icon:active {
  transform: scale(90%);
}

.naver {
  color: var(--text);
  place-self: end center;
  width: 100%;
  padding: 0;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  border-bottom: 1px solid var(--border-color);
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

.naver>a {
  /* font-size: 16px; */
  font-size: 1.075rem;
  font-weight: 400;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  height: 100%;
}

.naver>a .icon {
  font-size: 1.3em;
}

.big-screen-naver>a:hover {
  /* transform: scale(105%); */
  opacity: 0.5;
  /* font-weight: 800; */

}

.big-screen-naver>a {
  padding: 0.7rem 1rem;
  /* border-radius: 1rem; */
}


@media screen and (max-width: 500px) {
  .naver>a {
    font-size: 0.9rem;
    padding: 0.5rem 0.6rem;
    /* border-radius: 0.75rem; */
  }

  .naver {
    gap: 0;
    margin: 1rem 0;
  }
}

.nav-observer {
  position: absolute;
  top: 0;
}

.big-screen-naver .router-link-active {
  /* background: var(--element-top); */
  border-bottom: 2px solid var(--primary-blue);
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

.t-green {
  border-color: rgb(130, 203, 130);
}

.p-blue {
  border-color: rgb(255, 146, 157);
}

.b-green {
  border-color: rgb(89, 161, 79);
}

.k-orange {
  border-color: rgb(68, 187, 52);
}

.klattervaxt-icon {
  color: rgb(18, 141, 4);
}

.dark .klattervaxt-icon {
  color: rgb(98, 147, 93);
}

.o-lime {
  border-color: rgb(152, 189, 43);
}

.ormbunke-icon {
  color: rgb(95, 135, 22);
}

.dark .ormbunke-icon {
  color: rgb(137, 189, 43);
}

.g-yellow {
  border-color: rgb(236, 226, 117);
}

.grass-icon {
  color: rgb(181, 168, 23);
}

.dark .grass-icon {
  color: rgb(236, 226, 117);
}

.dark .b-green {
  border-color: rgb(25, 89, 45);
}

.dark .p-blue {
  border-color: rgb(255, 146, 157);
}

.dark .k-orange {
  border-color: rgb(89, 161, 79);
}
</style>
