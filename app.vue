<script setup>
import { useStorage } from '@vueuse/core';
useHead({
  title: 'Linders Superlista - Beställ från tusentals växter',
  // or, instead:
  // titleTemplate: (title) => `My App - ${title}`,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=6',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'En lista med tusentals växter att beställa från.' },
    {
      name: 'keywords',
      content:
        'Lista, Lindersplantskola, superlista, Superlistan, super lista, linders, listan, Växter, ovanliga växter, lista att beställa ifån, plantskola',
    },
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
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:400,500,600,700,800,900&display=swap',
      crossorigin: '',
    },
    {
      rel: 'canonical',
      href: 'https://lignosdatabasen.se',
    },
    {
      rel: 'nofollow',
      href: 'https://oykwqfkocubjvrixrunf.supabase.co/storage/v1/object/public/bilder/SuperDownscale%20-%203IKzqvkmhA%20-%20superlista%20bakgrund.jpg',
    },
  ],
});

useSeoMeta({
  title: 'Linders Superlista',
  ogTitle: 'Superlista',
  description: 'En härligt speckad lista med tusentals växter att beställa från.',
  ogDescription:
    'En chans att hitta det du länge letat efter! Linders superlista är en härligt späckad lista med 18 000 rader av ovanliga och odlingsvärda växter att beställa ifrån och hämta upp i Hörby i Skåne.',
  ogImage: 'https://lindersplantskola.s3.eu-north-1.amazonaws.com/hemsida-assets/ogImage.jpg',
});

const isDark = useDark();

const state = useGlobalState();

const onskeList = useGlobalOnskeList();

const openNav = ref(false);

const screenSize = useWindowSize();
const isSmallScreen = computed(() => {
  return screenSize.width.value <= 1200 ? true : false;
});
// const route = useRoute()
// console.log(route.path)
const target = ref(null);

onClickOutside(target, (event) => {
  openNav.value = false;
});

const openNavFunc = () => {
  if (openNav.value == false) {
    openNav.value = true;
  }
};

const justAdded = ref(false);

watch(onskeList.onskeList, () => {
  if (justAdded.value) {
    justAdded.value = false;
    clearTimeout();
    setTimeout(() => {
      justAdded.value = true;
    }, 100);
  } else {
    justAdded.value = true;
    setTimeout(() => {
      justAdded.value = false;
    }, 3000);
  }
});
</script>

<template>
  <div
    data-theme="light"
    class="main-layout tou-z65h9k"
    ref="el"
    :class="$route.path == '/lista' ? 'page-lista' : ''"
  >
    <nav class="naver" v-if="isSmallScreen && $route.path == '/lista'">
      <button @click="state.openFilter" :class="{ 'if-filter-open': state.isFilterOpen.value }">
        <Icon v-if="state.isFilterOpen.value" class="nav-icon" name="mdi:filter-remove" size="30" />
        <Icon v-else class="nav-icon" name="mdi:filter-cog" size="30" />
      </button>
      <button @click="state.openJump" :class="{ 'if-filter-open': state.isJumpOpen.value }">
        <Icon class="nav-icon" name="quill:jump-alt" size="32" />
      </button>
      <div class="dropdown-menu">
        <button>
          <Icon
            @click="openNavFunc()"
            v-if="!openNav"
            class="nav-icon"
            name="material-symbols:menu-rounded"
            size="30"
          />
          <Icon
            @click="openNav = false"
            v-if="openNav"
            class="nav-icon"
            name="material-symbols:close"
            size="30"
          />
        </button>
        <div class="dropdown" v-if="openNav" ref="target">
          <nuxt-link :class="$route.path == '/' ? 'active' : ''" to="/" @click="openNav = false">
            <Icon name="material-symbols:home-outline-rounded" />Hem
          </nuxt-link>
          <nuxt-link
            :class="$route.path == '/lista' ? 'active' : ''"
            to="/lista"
            @click="openNav = false"
          >
            <Icon name="ant-design:unordered-list-outlined" />Listan
          </nuxt-link>
          <nuxt-link
            :class="$route.path == '/onske-lista' ? 'active' : ''"
            to="/varukorg"
            @click="openNav = false"
          >
            <Icon name="material-symbols:shopping-cart-outline" />Varukorg
          </nuxt-link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
    <nav class="naver big-screen-naver" v-else>
      <img src="/lindersplantskola-logo.svg" class="logo" alt="lindersplantskola-logo" />
      <nuxt-link :class="$route.path == '/' ? 'active' : ''" to="/">
        <Icon name="material-symbols:home-outline-rounded" /><i>Hem</i>
      </nuxt-link>
      <nuxt-link :class="$route.path == '/lista' ? 'active' : ''" to="/lista">
        <Icon name="ant-design:unordered-list-outlined" /><i>Listan</i>
      </nuxt-link>
      <!-- <nuxt-link :class="$route.path == '/lista' ? 'active' : ''" to="/lista" v-else>
        <Icon name="ph:list-dashes-fill" />Linders Superlista 2023
      </nuxt-link> -->
      <nuxt-link :class="$route.path == '/onske-lista' ? 'active' : ''" to="/varukorg">
        <Icon name="material-symbols:shopping-cart-outline" /><i>Varukorg</i>
        <Transition name="just-added">
          <Icon
            name="material-symbols:check-circle-rounded"
            class="just-added"
            v-if="justAdded && screenSize.width > 1200"
          />
        </Transition>
      </nuxt-link>
      <ThemeToggle />
      <!-- <ThemeToggle v-if="$route.path == '/lista' || !isSmallScreen" /> -->
    </nav>
    <KeepAlive>
      <NuxtPage />
    </KeepAlive>
  </div>
</template>

<style>
:root {
  --primary-green: #76994e;
  /* --primary-green: #6fa246; */

  --primary-red-light: #ef5050;
  --primary-red-dark: #f36161;

  --link-light: #0645ad;
  --link-dark: #75b4f8;

  --bg-light: #eee9d9;
  /* --bg-light: hsl(90, 15%, 98%); */
  --bg-dark: #1b1611;
  /* --bg-dark: hsl(90, 10%, 6%); */

  --element-bg-light: #f7f1e5;
  /* --element-bg-light: hsl(0, 0%, 100%); */
  --element-bg-dark: #221c16;
  /* --element-bg-dark: hsl(90, 3%, 13%); */

  --element-top-light: #e8e3d6;
  /* --element-top-light: hsl(0, 0%, 97%); */
  --element-top-dark: #2d251d;
  /* --element-top-dark: hsl(96, 3%, 16%); */
  --element-top-border-dark: #3f352b;
  /* --element-top-border-dark: #383a38; */

  --element-top-hover-light: #d9d3c5;
  /* --element-top-hover-light: hsl(0, 0%, 88%); */
  --element-top-hover-dark: #3e3429;
  /* --element-top-hover-dark: hsl(120, 2%, 19%); */

  --box-shadow-light: 0 0px 0px 1px var(--border-color-light);
  --input-shadow-light: 0 0px 0px 1px var(--border-color-light);

  --border-color-light: #dbd8ca;
  /* --border-color-light: #e2e1e1; */
  --border-color-dark: #2e251e;
  /* --border-color-dark: #2b2d2b; */
  --border-color-bright-dark: #473e31;
  /* --border-color-bright-dark: #3b3d3a; */

  --text-mute-dark: #d8cbbc;
  /* --text-mute-dark: hsl(212, 16%, 85%); */
  --text-mute-light: hsl(25, 15%, 54%);
  /* --text-mute-light: hsl(0, 0%, 47%); */

  --text-full-mute-dark: #aea192;
  --text-full-mute-light: hsl(24, 17%, 60%);

  --text-white: hsl(0, 0%, 100%);

  --text-light: #412d21;
  /* --text-light: hsl(116, 100%, 7%); */
  --text-dark: #fdf8f3;
  /* --text-dark: hsl(90, 50%, 95%); */
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

  --text: var(--text-light);

  --text-mute: var(--text-mute-light);

  --text-full-mute: var(--text-full-mute-light);

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

  --text: var(--text-dark);

  --text-mute: var(--text-mute-dark);

  --text-full-mute: var(--text-full-mute-dark);

  --border-color: var(--border-color-dark);
}

*,
::before,
::after {
  box-sizing: border-box;
}

* {
  font-family: 'Inter', 'Helvetica', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  /* font-family: SFR, 'SFR'; */
  /* transition: all 150ms; */
  letter-spacing: -0.25px;
}

h1 {
  /* font-family: SFB, 'SFB'; */
  font-family: 'Inter', 'Helvetica', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 600;
  /* stroke: 2px solid #116fea; */
}

html {
  min-height: 100vh;
  height: fit-content;
  background: var(--bg);
  color: var(--text);
  /* background: #16181c; */
}

body {
  min-height: 100vh;
  height: fit-content;
}

html:has(.home-container) {
  background: var(--element-bg);
}

button,
.navigator > a,
input,
select,
.info-container > * {
  padding: 0.4rem;
  border-radius: 0.5rem;
  background-color: var(--element-top);
  box-shadow: var(--box-shadow-inset);
  /* border: none; */
  margin: 0.5rem;
  /* cfd1d6 */
  transition: background 150ms ease-in-out;
}

button,
.navigator > a,
input,
select {
  cursor: pointer;
}

.dark .increment,
.dark .expanded button:not(.increment *),
.dark .info-container > *,
.dark .onske-list-bg button:not(.element *),
.dark .onske-list-bg input {
  border: 1px solid var(--element-top-border-dark);
}

input:not([type='checkbox']) {
  cursor: text;
}

.dark .info-container > * {
  background: var(--element-top);
  /* box-shadow: var(--box-shadow-inset); */
  color: var(--text-mute);
}

.dark input,
.dark button {
  /* box-shadow: var(--box-shadow-inset); */
  color: var(--text);
}

@media screen and (min-width: 1000px) {
  .dark button:hover,
  .dark input:hover {
    background: var(--element-top-hover);
    /* box-shadow: var(--box-shadow-inset); */
  }

  select:hover,
  button:hover {
    background-color: var(--element-top-hover);
  }
}

.red {
  color: var(--primary-red);
}

.main-layout {
  display: grid;
  place-items: center;
  /* padding: 0 1rem; */
  grid-template-rows: min-content auto;
  min-height: 100vh !important;
}

.dark .main-layout {
  background: var(--bg);
}

@media screen and (min-width: 1200px) {
  .page-lista {
    grid-template-rows: min-content 91vh;
  }
}

.dropdown {
  background-color: var(--element-bg);
  position: absolute;
  right: -50%;
  z-index: 5;
  border-radius: 1rem;
  box-shadow: 0 0 15px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);

  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.dark .dropdown {
  box-shadow: 0 0 20px 8px rgba(0, 0, 0, 0.2);
}

.dropdown a {
  display: grid;
  grid-template-columns: min-content min-content;
  gap: 0.5rem;
  place-items: center;
}

.dropdown .theme-toggle {
  margin: 0;
  padding: 0;
  width: fit-content;
}

.dropdown .theme-toggle:not(.dark) {
  background: none;
  box-shadow: none;
}

.dropdown > .active {
  border: none;
  opacity: 0.2;
}

.dropdown-menu {
  position: relative;
  display: inline-block;
}

.naver > button:not(.if-filter-open),
.naver > div > button:not(.if-filter-open) {
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
  /* padding: 0 30rem; */
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7rem;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  z-index: 11;
  letter-spacing: 0.05rem;
  position: relative;

  border-bottom: 1px solid var(--border-color);
  background: var(--element-bg);
  /* box-shadow: var(--box-shadow); */
}

.big-screen-naver > .theme-toggle {
  position: absolute;
  right: 1rem;
  margin: 0;
}

.big-screen-naver > img {
  position: absolute;
  left: 1rem;
  margin: 0;
  height: 45%;
  color: #6fa246;
  fill: #6fa246;
  filter: opacity(70%);
}

@media screen and (max-width: 1200px) {
  .naver img.logo {
    display: none;
  }
}

@media screen and (max-width: 350px) {
  .big-screen-naver > a i {
    display: none;
  }

  nav.big-screen-naver a svg.icon,
  nav.big-screen-naver svg {
    font-size: 1.35rem;
  }
}

@media screen and (max-width: 450px) {
  nav.big-screen-naver .theme-toggle {
    position: relative;
    right: 0;
  }
}

.dark .big-screen-naver > img {
  filter: opacity(85%) invert(98%) sepia(5%) saturate(203%) hue-rotate(228deg) brightness(119%)
    contrast(100%);
}

.naver > a {
  /* font-size: 16px; */
  font-size: 1.075rem;
  font-weight: 400;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  height: 100%;
  transition: all 200ms ease-in-out;
  border-bottom: 2px solid transparent;
}

.naver > a .icon {
  font-size: 1.3em;
}

.naver a:has(.just-added) {
  position: relative;
}

@keyframes hover {
  0% {
    /* transform: scale(1); */
    transform: translateY(0px);
  }
  50% {
    /* transform: scale(1.1); */
    transform: translateY(1px);
  }
  /* 0% {
    transform: scale(1);
    transform: translateY(0px);
  } */
}

.just-added {
  color: var(--primary-green);
  transform: scale(1);
  position: absolute;
  top: 15%;
  right: -0.4rem;
  animation: hover 1s infinite;
}

@media screen and (max-width: 1200px) {
  .just-added {
    display: none;
  }
}

@keyframes bounce {
  0%,
  20% {
    transform: scale(0);
  }
  40% {
    transform: scale(1.5);
  }
  50% {
    transform: scale(1);
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.just-added-enter-active {
  animation: bounce 0.5s ease-out;
}
.just-added-leave-active {
  transition: all 0.3s ease;
}

.just-added-enter-from {
  transform: scale(0);
}
.just-added-leave-to {
  opacity: 0;
  /* transform: scale(0); */
}

.naver button:not(.if-filter-open):hover {
  background: none;
}

.if-filter-open {
  background: var(--element-top);
  /* border-bottom: 2px solid var(--primary-green); */
}

.if-filter-open * {
  color: var(--primary-green);
}

.big-screen-naver > a:hover {
  /* transform: scale(105%); */
  opacity: 0.5;
  /* font-weight: 800; */
}

.big-screen-naver > a {
  padding: 0.7rem 1rem;
  /* border-radius: 1rem; */
}

@media screen and (max-width: 1000px) {
  .naver {
    gap: 5rem;
  }
}

@media screen and (max-width: 500px) {
  .naver > a {
    font-size: 0.9rem;
    padding: 0.5rem 0.6rem;
    /* border-radius: 0.75rem; */
  }

  .naver {
    padding: 0 1rem;
    justify-content: space-around;
    gap: 0rem;
  }
}

.nav-observer {
  position: absolute;
  top: 0;
}

@media screen and (min-width: 1200px) {
  .big-screen-naver .router-link-active {
    /* background: var(--element-top); */
    border-bottom: 2px solid var(--primary-green);
  }
}

.big-screen-naver a {
  /* border-color: var(--primary-green); */
}

.the-grid {
  padding: 1rem;
  grid-template-columns: 8fr 100fr 8fr 8fr;
}

.el {
  width: fit-content;
  margin: 2px;
}

@media screen and (max-width: 1200px) {
  .main-layout {
    /* grid-template-rows: min-content auto; */
    /* height: 100vh; */
  }
}

.t-green {
  border-color: rgb(153, 196, 103);
  /* border-color: rgb(130, 203, 130); */
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
  color: rgb(77, 141, 4);
}

.o-lime {
  border-color: rgb(152, 189, 43);
}

.ormbunke-icon {
  color: rgb(95, 135, 22);
}

.g-yellow {
  border-color: rgb(236, 226, 117);
}

.grass-icon {
  color: rgb(173, 168, 2);
}

/* ------------- */

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
