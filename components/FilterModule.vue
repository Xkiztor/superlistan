<script setup>
defineEmits(['fetchList', 'handleClick'])
const state = useGlobalState()

const showClear = computed(() => {
  if (state.favoriteFilter.value || state.edibleFilter.value || state.commentFilter.value || state.linkFilter.value || state.typeFilter.value.T || state.typeFilter.value.B || state.typeFilter.value.P || state.typeFilter.value.K || state.typeFilter.value.O || state.typeFilter.value.G) {
    return true
  } else return false
});

const clearFilters = () => {
  state.favoriteFilter.value = false
  state.edibleFilter.value = false
  state.commentFilter.value = false
  state.linkFilter.value = false
  state.typeFilter.value.T = false
  state.typeFilter.value.B = false
  state.typeFilter.value.P = false
  state.typeFilter.value.K = false
  state.typeFilter.value.O = false
  state.typeFilter.value.G = false
}
</script>

<template>
  <div class="filter-div search-filter-div">
    <div class="search">
      <Icon name="material-symbols:search" size="26" />
      <input v-model="state.query.value" placeholder="Sök" type="text">
      <button @click="state.query.value = ''" :class="{ 'show-close': state.query.value }">
        <Icon name="ion:close-round" />
      </button>
    </div>
    <!-- <input type="text" placeholder=" Sök" v-model.prevent="state.query.value" class="m-2" title="Sök"> -->

  </div>
  <div class="filters">
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.favoriteFilter.value">
      <div class="icon-align">
        <Icon class="rekommenderas-icon" name="ph:heart-straight-fill" size="20" />
        <p>Peters favoriter</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.edibleFilter.value">
      <div class="icon-align">
        <Icon class="grayed edible-icon" name="twemoji:fork-and-knife" size="20" />
        <p>Ätlig</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.commentFilter.value">
      <div class="icon-align">
        <Icon class="grayed kommentar-icon" name="ooui:articles-ltr" size="20" />
        <!-- <Icon class="grayed kommentar-icon" name="majesticons:comment-2-text" size="20" /> -->
        <p>Lignosdatabasen</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.linkFilter.value">
      <div class="icon-align">
        <Icon class="grayed länk-icon" name="mdi:link-variant" size="20" />
        <p>Länk</p>
      </div>
    </form>

    <!-------------  ----------------->

    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.typeFilter.value.T">
      <div class="icon-align">
        <Icon name="noto:deciduous-tree" size="18" title="Träd" />
        <p>Träd</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.typeFilter.value.B">
      <div class="icon-align">
        <Icon name="noto:evergreen-tree" size="18" title="Barrträd" />
        <p>Barrträd</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.typeFilter.value.P">
      <div class="icon-align">
        <Icon name="fxemoji:rosette" size="18" title="Perenner" />
        <p>Perenner</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.typeFilter.value.K">
      <div class="icon-align">
        <Icon name="game-icons:curling-vines" class="klattervaxt-icon" size="18" title="Klätterväxt" />
        <p>Klätterväxter</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.typeFilter.value.O">
      <div class="icon-align">
        <Icon name="game-icons:fern" class="ormbunke-icon" size="18" title="Ormbunke" />
        <p>Ormbunke</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.typeFilter.value.G">
      <div class="icon-align">
        <Icon name="game-icons:high-grass" class="grass-icon" size="18" title="Gräs" />
        <p>Gräs</p>
      </div>
    </form>

    <button @click="clearFilters()" class="clear" :class="{ 'show-clear': showClear }">
      <Icon name="material-symbols:cancel-outline-rounded" />
      Rensa filter
    </button>
  </div>
</template>

<style>
@media screen and (max-width: 1200px) {
  .filters {
    margin: 1rem auto;
  }

  .filter-div {
    gap: 1rem;
  }
}


@media screen and (min-width: 1200px) {

  .bottom-one {
    grid-template-columns: 1fr !important;
    grid-template-rows: 1fr 1fr !important;
  }
}

div.bottom-one {
  grid-template-columns: 1fr;
}

.filters {
  border-radius: 1rem;
  display: grid;
  /* position: sticky; */
  z-index: 10;
  background-color: var(--element-bg);
  color: var(--text-mute);
  /* box-shadow: var(--input-shadow); */
  padding: 0.5rem;
  color: var(--text);
  border: 1px solid var(--border-color);
  width: 100%;
}


form p {
  line-height: 1;
  letter-spacing: 0.4px;
}


input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  font: inherit;
  width: 1.5em;
  height: 1.5em;
  /* box-shadow: var(--box-shadow-inset-dark), var(--box-shadow); */
  border-radius: 0.3em;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  background: none;
  border: 2px solid var(--text-mute);
  /* border: 2px solid var(--border-color-bright-dark); */
  transition: border 150ms ease-in-out;
}

.dark input[type="checkbox"] {
  border: 2px solid var(--border-color-bright-dark);
}


@media screen and (min-width: 1000px) {
  input[type="checkbox"]:hover {
    /* background-color: var(--element-top-hover); */
    border-color: var(--primary-green);
    opacity: 0.8;
  }
}


input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  transform: scale(0);
  transition: 80ms transform;
  /* box-shadow: inset 3em 3em #606060; */
  /* border-radius: 0.2em; */
  /* border: 0.15em solid white; */
  /* box-shadow: inset 1em 1em rgb(35, 128, 40); */
  transform-origin: center;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
  background: white;
  /* background: var(--text); */
}

input[type="checkbox"]:checked {
  /* transform: scale(1.3); */
  background-color: var(--primary-green);
  border-color: var(--primary-green);
  /* background-color: #565d69; */
}

.icon-align {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.search {
  /* box-shadow: var(--input-shadow); */
  /* box-shadow: 0 0.5px 3px 0px rgba(0, 0, 0, 0.07); */
  /* box-shadow: 0px 1px 0px 1.5px rgba(0, 0, 0, 0.01); */
  background: var(--element-bg);
  border-radius: 100000rem;
  display: flex;
  align-items: center;
  padding-left: 0.7rem;
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
}

.search input {
  margin: 0;
  margin-left: 0.2rem;
  width: 100%;
  background: none;
  padding: 0.5rem;
}

.search input:focus {
  outline: none;
}

.search input::placeholder {
  color: var(--text-mute);
}

.search input:hover {
  background: none;
}

.search .icon * {
  color: var(--text-mute);
}

.search button {
  background: none;
  /* width: 2rem !important; */
  padding: auto;
  z-index: 2;
  padding: 0.5rem;
  margin: 0;
  opacity: 0;
  display: grid;
  place-items: center;
  border-radius: 1000000rem;
}

.search button.show-close {
  opacity: 1;
}

.filter-div>p {
  height: fit-content;
}

.filter-div>button,
.filter-div>select {
  width: 100%;
}

.filter-div>button,
.filter-div>select,
.filter-div>input {
  margin: 0.5rem 0;
  width: 100%;
}

.filter-div>select {
  text-align: center;
}

input.checkboxer {
  /* height: 1rem; */
  width: 1.2rem;
  height: 1.2rem;
  margin: 0.2rem;
  /* margin-right: 1rem; */
  /* appearance: none; */
}

.check-filter-div {
  display: grid;
  margin: 0.15rem;
  gap: 0.5rem;
  grid-template-columns: min-content 1fr;
  place-items: center start;
  margin-left: 0;
}

.filters .clear {
  /* border-radius: ; */
  margin: 0;
  display: grid;
  grid-template-columns: min-content 1fr;
  place-items: center start;
  gap: 0.5rem;
  grid-template-rows: 1fr;
  border-radius: 100000rem;
  margin-top: 0.6rem;
  padding: 0.5rem;
  opacity: 0.4;
  pointer-events: none;
  border: 1px solid transparent;
  transition: all 200ms ease;
}

.filters .clear *,
.filters .clear {
  color: var(--text-full-mute);
}

.filters .clear .icon {
  font-size: 1.5rem;
}

.filters .clear.show-clear {
  pointer-events: all;
  opacity: 1;
  border: 1px solid var(--border-color);
}

.filters .clear.show-clear,
.filters .clear.show-clear * {
  color: var(--text);
}

.dark .filters .clear.show-clear,
.dark .filters .clear.show-clear * {
  color: var(--text-mute);
}
</style>