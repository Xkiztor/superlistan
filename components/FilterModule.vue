<template>
  <div class="filters">
    <div class="filter-div search-filter-div" :class="{ 'has-content': state.query.value }">
      <input type="text" placeholder=" Sök" v-model.prevent="state.query.value" class="m-2" title="Sök">
      <button @click="state.query.value = ''">
        <Icon name="ion:close-round" />
      </button>
    </div>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.favoriteFilter.value">
      <div class="icon-align">
        <Icon class="rekommenderas-icon" name="ph:heart-straight-fill" size="20" />
        <p>Favorit</p>
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
        <Icon class="grayed kommentar-icon" name="majesticons:comment-2-text" size="20" />
        <p>Kommentar</p>
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
        <Icon name="noto:deciduous-tree" size="16" title="Träd" />
        <p>Träd</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.typeFilter.value.B">
      <div class="icon-align">
        <Icon name="noto:evergreen-tree" size="16" title="Barrträd" />
        <p>Barrträd</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.typeFilter.value.P">
      <div class="icon-align">
        <Icon name="fxemoji:rosette" size="16" title="Perenner" />
        <p>Perenner</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.typeFilter.value.K">
      <div class="icon-align">
        <Icon name="game-icons:curling-vines" size="16" title="Klätterväxt" class="klattervaxt-icon" />
        <p>Klätterväxter</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.typeFilter.value.O">
      <div class="icon-align">
        <Icon name="game-icons:fern" class="ormbunke-icon" size="16" title="Ormbunke" />
        <p>Ormbunke</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.typeFilter.value.G">
      <div class="icon-align">
        <Icon name="game-icons:high-grass" class="grass-icon" size="16" title="Gräs" />
        <p>Gräs</p>
      </div>
    </form>
  </div>
</template>

<script setup>
defineEmits(['fetchList', 'handleClick'])
const state = useGlobalState()

console.log(state.typeFilter.value.G);

function handleTest() {
  console.log('chicken');
}
</script>

<style>
@media screen and (max-width: 1200px) {
  .filters {
    max-width: 50rem;
    margin: 1rem auto;
  }

  .filter-div {
    gap: 1rem;
  }

}




@media screen and (min-width: 1200px) {
  .filters {
    margin-right: 1rem;
  }

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
  padding: 1rem;
  width: auto;
  /* position: sticky; */
  top: 6rem;
  z-index: 10;
  background-color: var(--element-bg-light);
}

form p {
  line-height: 1;
}

.dark .filters {
  background: var(--element-bg-dark);
  color: var(--text-dark);
}

.dark input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  font: inherit;
  width: 1.3em;
  height: 1.3em;
  box-shadow: var(--box-shadow-inset-dark), var(--box-shadow);
  border-radius: 0.4em;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
}

.dark input[type="checkbox"]:hover {
  background-color: var(--element-top-hover-dark);
}

.dark input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  transform: scale(0);
  transition: 80ms transform;
  /* box-shadow: inset 3em 3em #606060; */
  border-radius: 0.2em;
  border: 0.15em solid var(--text-dark);
  /* box-shadow: inset 1em 1em rgb(35, 128, 40); */
  transform-origin: center;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

.dark input[type="checkbox"]:checked::before {
  transform: scale(1.4);
  background-color: var(--text-dark);
}

.dark input[type="checkbox"]:checked {
  /* transform: scale(1.3); */
  background-color: var(--primary-blue);
  /* background-color: #565d69; */
}

.grayed {
  color: var(--text-mute-dark);
}

.icon-align {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.filter-div {
  /* padding: 0.5rem; */
  padding: 0.5rem 0;
  padding-top: 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: 11fr 10fr;
  place-items: center start;

}

.search-filter-div {
  grid-template-columns: 10fr 1fr;
  gap: 0;
  display: flex;
  position: relative;
}

.search-filter-div button {
  width: 2rem !important;
  border-radius: 0 0.5rem 0.5rem 0;
  padding: auto;
  opacity: 0;
  position: absolute;
  right: 0;
  z-index: 2;
}

.search-filter-div.has-content input {
  border-radius: 0.5rem;
  /* border-right: 1px solid #d0d5dd; */
  padding-left: 0.75rem;
}

.search-filter-div.has-content button {
  opacity: 1;
}

.search-filter-div input {
  padding: 0.5rem;
}

.search-filter-div input:focus {
  /* outline: 2px solid #3b3f47 !important; */
  box-shadow: 0 0 0 2px var(--primary-blue);
  outline: none;
}

.search-filter-div input:focus:hover {
  box-shadow: 0 0 0 2px var(--primary-blue);
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
  border-radius: 0.5rem;
  /* margin-right: 1rem; */
  /* appearance: none; */
}

.check-filter-div {
  display: grid;
  margin: 0.15rem;
  grid-template-columns: 10% 90%;
  place-items: center start;
  margin-left: 0;
}

.dark .check-filter-div {
  margin: 0.3rem 0.2rem;
}
</style>