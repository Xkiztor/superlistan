<script setup>
// import dataTest from "../composables/dataTest"
// import { useCounterStore } from '../stores/counter.js'
/* - - - - - - Supabase Setup - - - - - - */
import { createClient } from '@supabase/supabase-js';
import { useStorage } from '@vueuse/core';

const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4';
const supabase = createClient(supabaseUrl, supabaseKey);

definePageMeta({
  // keepalive: true
});

// })
/* - - - - - - Refs - - - - - - */
const state = useGlobalState();
const onskeList = useGlobalOnskeList();
const windowSize = useWidth();

const dataList = ref([]);

const hasUpdated = useStorage('has-updated', false);

const userMessage = ref('Laddar...');

const listHasBeenFetched = ref(false);

const shouldFilterOpen = computed(() => {
  if (!isCollapsed.value) return true;
  else {
    if (state.isFilterOpen.value) return true;
    else return false;
  }
});
const shouldJumpOpen = computed(() => {
  if (!isCollapsed.value) return true;
  else {
    if (state.isJumpOpen.value) return true;
    else return false;
  }
});

const { data: lignosdatabasen } = await useAsyncData('lignosdatabasen-fetch', async () => {
  const { data, error } = await supabase
    .from('lignosdatabasen')
    .select()
    .neq('art', 'slakte')
    .eq('hidden', false)
    .neq('text', 'Ingen info');
  // const { data, error } = await client.from('lignosdatabasen').select().eq('slakte', `${planta}`).single()
  if (error) {
    console.error(error);
  }
  // console.log(data);
  return data;
});

// ! Filter and sort the list

const computedList = computed(() => {
  let newList = dataList.value;

  // ? Search
  let queryArray = state.query.value.toLowerCase().split(' ');
  newList = newList.filter((item) =>
    queryArray.every((str) => item.Namn.toLowerCase().includes(str))
  );

  // ? Filter
  if (state.favoriteFilter.value) newList = newList.filter((e) => e.Rekommenderas == true);
  if (state.edibleFilter.value) newList = newList.filter((e) => e.Edible == true);
  if (state.lignosdatabasenFilter.value) {
    newList = newList.filter((e) =>
      lignosdatabasen.value
        .map(
          (obj) =>
            obj.slakte.toLowerCase().replace(/ /g, '') +
            obj.art.toLowerCase().replace(/ /g, '') +
            obj.sortnamn.toLowerCase().replace(/'/g, '').replace(/ /g, '') +
            ' '
        )
        .join(' ')
        .includes(e.Namn.toLowerCase().replace(/'/g, '').replace(/ /g, '') + ' ')
    );
  }
  // if (state.lignosdatabasenFilter.value) newList = newList.filter(e => e.Kommentar != null)
  if (state.linkFilter.value) newList = newList.filter((e) => e.Länk != null);

  // newList.forEach(e => console.log(e.Namn.toLowerCase().replace(/'/g, "").replace(/ /g, "")))
  // console.log(lignosdatabasen.value.map(obj => obj.slakte.toLowerCase().replace(/ /g, "") + obj.art.toLowerCase().replace(/ /g, "") + obj.sortnamn.toLowerCase().replace(/'/g, "").replace(/ /g, "")).join(' '));

  // ? Sorting
  newList = newList.sort((a, b) => a.Pris - b.Pris);

  newList = newList.sort((a, b) => {
    // console.log('heho');
    if (state.sortByWhat.value == 'Namn') {
      if (a.Namn.toLowerCase().replace(/x /g, '') < b.Namn.toLowerCase().replace(/x /g, '')) {
        if (state.sortAscending.value) return -1;
        else return 1;
      }
      if (a.Namn.toLowerCase().replace(/x /g, '') > b.Namn.toLowerCase().replace(/x /g, '')) {
        if (state.sortAscending.value) return 1;
        else return -1;
      }
      return 0;
    } else if (state.sortByWhat.value == 'Pris') {
      if (a.Pris < b.Pris) {
        if (state.sortAscending.value) return -1;
        else return 1;
      }
      if (a.Pris > b.Pris) {
        if (state.sortAscending.value) return 1;
        else return -1;
      }
      return 0;
    } else if (state.sortByWhat.value == 'Höjd') {
      if (a.Höjd < b.Höjd) {
        if (state.sortAscending.value) return -1;
        else return 1;
      }
      if (a.Höjd > b.Höjd) {
        if (state.sortAscending.value) return 1;
        else return -1;
      }
      return 0;
    } else if (state.sortByWhat.value == 'Kruka') {
      if (a.Kruka < b.Kruka) {
        if (state.sortAscending.value) return -1;
        else return 1;
      }
      if (a.Kruka > b.Kruka) {
        if (state.sortAscending.value) return 1;
        else return -1;
      }
      return 0;
    } else if (state.sortByWhat.value == 'MinOrder') {
      if (a.MinOrder < b.MinOrder) {
        if (state.sortAscending.value) return -1;
        else return 1;
      }
      if (a.MinOrder > b.MinOrder) {
        if (state.sortAscending.value) return 1;
        else return -1;
      }
      return 0;
    }
  });

  // ? Type filter
  if (
    state.typeFilter.value.T ||
    state.typeFilter.value.B ||
    state.typeFilter.value.P ||
    state.typeFilter.value.K ||
    state.typeFilter.value.O ||
    state.typeFilter.value.G
  ) {
    newList = newList.filter((e) => state.typeFilter.value[e.Typ]);
  }

  // ? User message
  if (!newList.length && (state.query.value || state.edibleFilter.value)) {
    userMessage.value = 'Inga resultat';
  } else if (dataList.value.length) {
    userMessage.value = 'Här är listan slut';
  }

  state.filteredListLength.value = newList.length;

  return newList;
});

// Virtual list settings
const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(computedList, {
  itemHeight: 33,
  overscan: 25,
});

const isCollapsed = computed(() => {
  return windowSize.value.width <= 1200 ? true : false;
});

const handleScrollTo = (letter) => {
  scrollTo(
    computedList.value
      .map((e) => {
        return Array.from(e.Namn)[0];
      })
      .indexOf(letter)
  );
};

watch(computedList, () => {
  scrollTo(0);
  // console.log(computedList.value);
});

/* - - - - - - Adding to cart - - - - - - */
const handleAdd = (plant, order) => {
  onskeList.handleAdd(plant, order);
};

/* - - - - - - Fetching list - - - - - - */
onMounted(() => {
  if (dataList.value.length <= 0) {
    fetchAllList();
    return;
  } else {
    userMessage.value = 'Här är listan slut';
  }

  if (hasUpdated.value === false) {
    hasUpdated.value = true;
    fetchAllList();
  }
});

/* - - - - - - Fetch all list- - - - - - */
const fetchAllList = async () => {
  userMessage.value = 'laddar...';
  dataList.value = [];
  console.log('fetching all');
  listHasBeenFetched.value = false;

  // !                        ---------------
  let search = supabase.from('superlista-2025').select();
  // !                        ---------------

  const { data, error } = await search;

  if (error) {
    console.error(error);
  }
  if (data) {
    // console.log(data)
    scrollTo(0);
    listHasBeenFetched.value = false;
    userMessage.value = 'Här är listan slut';
    console.log(data);
    state.listLength.value = data.length;
    dataList.value = data;
  }
};

/* - - - - - - Handling click - - - - - - */
const handleClick = () => {
  sortBy.value.ascending = !sortBy.value.ascending;
  fetchAllList();
};

const openNewTab = (url) => {
  window.open(url, '_blank');
};

const imageGrid = ref(null);

onClickOutside(imageGrid, () => {
  if (state.sidebarMode.value === false) {
    state.showGoogleSearchResult.value = false;
    state.showImages.value = false;
  }
});

onMounted(() => {
  if (windowSize.value.width > 1200) {
    state.sidebarMode.value = true;
  }
});

watch(windowSize, () => {
  if (windowSize.value.width <= 1200) {
    state.sidebarMode.value = false;
  }
});

const resetFilters = () => {
  state.favoriteFilter.value = false;
  state.edibleFilter.value = false;
  state.lignosdatabasenFilter.value = false;
  state.linkFilter.value = false;
  state.query.value = '';
  state.typeFilter.value.B = false;
  state.typeFilter.value.G = false;
  state.typeFilter.value.K = false;
  state.typeFilter.value.O = false;
  state.typeFilter.value.P = false;
  state.typeFilter.value.T = false;

  fetchAllList();
};

const bigImage = ref(null);
onClickOutside(bigImage, () => {
  state.showImageModal.value = false;
});
</script>

<template>
  <div class="search-modal" v-if="state.showGoogleSearchResult.value">
    <!-- <button @click="printGoogle()">Print</button>
    <button @click="state.showImages.value = !state.showImages.value">Visa bilder</button> -->
    <div class="image-grid" ref="imageGrid" :class="{ 'sidebar-mode': state.sidebarMode.value }">
      <div class="top-part">
        <h1>{{ state.searchedPlant.value }}</h1>
        <div class="top-buttons">
          <button
            v-if="!state.sidebarMode.value"
            @click="state.sidebarMode.value = true"
            class="side-switcher hide-on-phone"
          >
            <!-- <Icon name="fluent:panel-left-expand-24-filled" size="35" /> -->
            <Icon name="carbon:side-panel-open-filled" size="30" />
            Sidoläge
          </button>
          <button
            v-else
            @click="state.sidebarMode.value = false"
            class="side-switcher hide-on-phone"
          >
            <!-- <Icon name="material-symbols:fullscreen-rounded" size="35" /> -->
            <Icon name="carbon:fit-to-screen" size="30" />
            Fullt läge
          </button>

          <button
            class="close"
            @click="(state.showGoogleSearchResult.value = false), (state.showImages.value = false)"
          >
            <Icon name="material-symbols:close" size="35" />
          </button>
        </div>
      </div>
      <img
        @click="openNewTab(state.googleSearchResult.value.items[0].link)"
        v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[0].link"
        alt=""
      />
      <img
        @click="openNewTab(state.googleSearchResult.value.items[1].link)"
        v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[1].link"
        alt=""
      />
      <img
        @click="openNewTab(state.googleSearchResult.value.items[2].link)"
        v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[2].link"
        alt=""
      />
      <img
        @click="openNewTab(state.googleSearchResult.value.items[3].link)"
        v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[3].link"
        alt=""
      />
      <img
        @click="openNewTab(state.googleSearchResult.value.items[4].link)"
        v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[4].link"
        alt=""
      />
      <img
        @click="openNewTab(state.googleSearchResult.value.items[5].link)"
        v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[5].link"
        alt=""
      />
      <img
        @click="openNewTab(state.googleSearchResult.value.items[6].link)"
        v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[6].link"
        alt=""
      />
      <img
        @click="openNewTab(state.googleSearchResult.value.items[7].link)"
        v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[7].link"
        alt=""
      />
      <img
        @click="openNewTab(state.googleSearchResult.value.items[8].link)"
        v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[8].link"
        alt=""
      />
      <Icon class="loader" v-else name="line-md:loading-loop" size="80" />
      <p class="disclaimer">Bilder från google.com</p>
    </div>
  </div>
  <div class="big-image" v-if="state.showImageModal.value">
    <img ref="bigImage" :src="state.currentImages.value[state.currentImageIndex.value]" alt="" />
  </div>
  <div
    class="list-layout"
    :class="{
      'sidebar-layout':
        state.sidebarMode.value === true && state.showGoogleSearchResult.value === true,
    }"
  >
    <div class="filter-container" v-if="shouldFilterOpen">
      <FilterModule @fetch-list="fetchAllList" @handle-click="handleClick" />
    </div>

    <div
      v-if="shouldJumpOpen"
      class="jump-to"
      :class="{ disabled: state.sortByWhat.value !== 'Namn' || state.sortAscending.value !== true }"
    >
      <div>
        <h1>Hoppa till bokstav</h1>
        <Icon name="carbon:jump-link" size="23" />
        <button @click="handleScrollTo('A')">A</button>
        <button @click="handleScrollTo('B')">B</button>
        <button @click="handleScrollTo('C')">C</button>
        <button @click="handleScrollTo('D')">D</button>
        <button @click="handleScrollTo('E')">E</button>
        <button @click="handleScrollTo('F')">F</button>
        <button @click="handleScrollTo('G')">G</button>
        <button @click="handleScrollTo('H')">H</button>
        <button @click="handleScrollTo('I')">I</button>
        <button @click="handleScrollTo('J')">J</button>
        <button @click="handleScrollTo('K')">K</button>
        <button @click="handleScrollTo('L')">L</button>
        <button @click="handleScrollTo('M')">M</button>
        <button @click="handleScrollTo('N')">N</button>
        <button @click="handleScrollTo('O')">O</button>
        <button @click="handleScrollTo('P')">P</button>
        <button @click="handleScrollTo('Q')">Q</button>
        <button @click="handleScrollTo('R')">R</button>
        <button @click="handleScrollTo('S')">S</button>
        <button @click="handleScrollTo('T')">T</button>
        <button @click="handleScrollTo('U')">U</button>
        <button @click="handleScrollTo('V')">V</button>
        <button @click="handleScrollTo('W')">W</button>
        <!-- <button @click="handleScrollTo('X')">X</button> -->
        <button @click="handleScrollTo('Y')">Y</button>
        <button @click="handleScrollTo('Z')">Z</button>
      </div>
    </div>

    <ColumnTopInfo :isOnskeLista="false" />
    <div class="list-bg main-list">
      <div v-bind="containerProps" class="container-props">
        <ul v-bind="wrapperProps" class="wrapper-props">
          <ListElement
            v-for="{ index, data } in list"
            :key="data.id"
            :plant="data"
            @add-to-cart="handleAdd"
            :isOnskeLista="false"
            :lignosdatabasen="lignosdatabasen"
          />

          <div class="bottom-spacer"></div>
          <div class="center-bottom">
            <Icon
              class="loader"
              v-if="userMessage === 'laddar...'"
              @click="fetchAllList()"
              name="line-md:loading-loop"
              size="80"
            />
            <p v-else-if="userMessage === 'Inga resultat'" @click="resetFilters()">
              Inga resultalt, klicka här för att nållställa filter
            </p>
            <p
              v-else-if="
                !state.query.value &&
                !state.edibleFilter.value &&
                !state.lignosdatabasenFilter.value &&
                !state.linkFilter.value &&
                !state.typeFilter.value.T &&
                !state.typeFilter.value.B &&
                !state.typeFilter.value.P &&
                !state.typeFilter.value.K &&
                !state.typeFilter.value.O &&
                !state.typeFilter.value.G
              "
              @click="fetchAllList()"
              data-no-crawl="true"
            >
              {{ userMessage }}
            </p>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.container-props {
  transition: none;
  /* box-shadow: var(--box-shadow); */
  border: 1px solid var(--border-color);
  /* box-shadow: 0 0.5px 0px 2px rgba(0, 0, 0, 0.01); */
  /* border: 1px solid ; */
  background: var(--element-bg);
  height: 100%;
  border-radius: 1rem;

  /* border: 1px solid var(--border-color); */
  /* padding: 0.2rem 0; */
  /* padding-right: 0.5rem; */
  width: auto;
  max-height: 100vh !important;
  /* overflow: hidden; */
  /* padding: 0.2rem 1rem; */
}

.wrapper-props {
  transition: none;
  position: relative;
  /* padding-bottom: 5rem; */
}

.dark .list-bg {
  /* background: var(--element-bg-dark); */
  /* color: var(--text); */
  color: var(--text-mute-dark);
}

.main-list {
  height: auto;
  grid-row: 2/4;
  grid-column: 2;
}

div.main-list {
  padding-left: 0;
}

/* width */
*::-webkit-scrollbar {
  width: 10px;
  margin-right: 5px;
}

* {
  scrollbar-color: rgb(232, 227, 215) #ffffff00;
  --scrollbar-color-thumb: rgb(232, 227, 215);
  --scrollbar-color-track: #ffffff00;
}

/* * {
  scrollbar-color: rgb(234, 234, 234) #ffffff00;
  --scrollbar-color-thumb: rgb(234, 234, 234);
  --scrollbar-color-track: #ffffff00;
} */

.dark * {
  scrollbar-color: #514234 #ffffff00;
  --scrollbar-color-thumb: #625c55;
  --scrollbar-color-track: #ffffff00;
}

/* .dark * {
  scrollbar-color: #6d747b #ffffff00;
  --scrollbar-color-thumb: #6d747b;
  --scrollbar-color-track: #ffffff00;
} */

/* Track */
*::-webkit-scrollbar-track {
  background: #ffffff00;
  /* box-shadow: 0 0 5px grey; */
  border-radius: 10px;
}

/* Handle */
*::-webkit-scrollbar-thumb {
  background: #e5e5e5;
  border-radius: 100px;
}

.dark *::-webkit-scrollbar-thumb {
  background: #6d747b;
  border-radius: 10px;
}

.jump-to {
  width: fit-content;
  height: 100%;
  grid-row: 2/3;
  grid-column: 3/4;
  color: var(--text);
}

.jump-to button {
  margin: 0;
  background: none;
  padding: 0 0.75rem;
  border: none;
  transition: color 150ms ease-in-out;
}

.jump-to button:hover {
  /* transform: translate(4px, 0); */
  background: none;
  color: var(--primary-green);
}

.jump-to > div {
  display: grid;
  /* gap: 1rem; */
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  flex-direction: column;
  padding: 0.75rem 0rem;
  height: 100%;

  background: var(--element-bg);
  border-radius: 1rem;
  /* box-shadow: var(--box-shadow); */
  border: 1px solid var(--border-color);
}

@media screen and (max-width: 1200px) {
  .jump-to,
  .jump-to > div {
    width: 100%;
  }

  .jump-to > div {
    gap: 1rem;
    padding: 1.5rem 1rem;
  }

  .jump-to {
    margin-bottom: 0.5rem;
  }

  .jump-to .icon {
    display: none;
  }

  .jump-to h1 {
    font-size: 1.1em;
    font-weight: 500;
  }
}

@media screen and (min-width: 1200px) {
  .jump-to > div {
    display: flex;
    margin-left: 2rem;
  }

  .jump-to h1 {
    display: none;
  }
}

.jump-to .icon {
  margin: 0 auto;
}

.dark .jump-to .icon {
  color: var(--text-mute);
}

.jump-to h1 {
  grid-column: 1/6;
  text-align: center;
}

.jump-to.disabled button,
.jump-to.disabled .icon {
  opacity: 0.5;
  cursor: default;
  pointer-events: none;
}

.list-layout {
  padding-top: 0.5rem;
  display: grid;
  grid-template-columns: 5fr 15fr 5fr;
  grid-template-rows: min-content 1fr;
  max-width: 115rem;
  margin: 0 auto;
  width: 100%;
  padding-right: 2rem;
  padding-left: 2rem;

  height: 100% !important;
}

@media screen and (max-width: 1600px) {
  .list-layout {
    grid-template-columns: 3fr 9fr min-content;
  }

  .main-list {
    grid-row: 2 / 4;
    grid-column: 2;
  }

  .jump-to-container {
    margin-left: 0;
    margin-right: 1rem;
  }
}

@media screen and (max-width: 1200px) {
  .list-layout {
    display: flex;
    flex-direction: column;
  }

  .main-list.list-bg {
    order: 3;
    height: calc(100vh - 7rem);
    /* height: 87vh; */
    padding-bottom: 1rem;
  }

  .jump-to-container {
    margin-right: 0;
    width: auto;
    max-width: 50rem;
    margin: 1rem auto;
  }
}

@media screen and (max-width: 750px) {
  .list-layout {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media screen and (max-width: 500px) {
  .main-layout {
    padding: 0;
  }
}

@media screen and (min-width: 1200px) {
  .list-bg.main-list {
    min-width: 100%;
  }
}

.sidebar-layout .filter-container {
  display: none;
}

.sidebar-layout .main-list {
  grid-column: 1/2;
  z-index: 13;
}

.sidebar-layout .jump-to {
  grid-column: 2/3;
}

.sidebar-layout .top-info {
  grid-column: 1/2;
}

.list-layout.sidebar-layout {
  grid-template-columns: 50% 50%;
  padding-left: 1rem;
}

.pointer {
  cursor: pointer;
}

.html {
  transition: all 1s;
}

.loader-style {
  position: relative;
  bottom: 50rem;
  /* opacity: 0; */
}

.observer {
  /* transform: translateY(-40rem); */
  /* opacity: 0; */
  height: fit-content;
}

/* .scroll-to-top {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 0.7rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
} */

.bottom-spacer {
  /* height: 5rem; */
  grid-column-start: 2;
  grid-row-start: 2;
  margin: 1rem auto 5rem;
  font-size: 1.5rem;
  text-align: center;
}

.center-bottom {
  /* grid-column-start: 2; */
  /* grid-row-start: 2; */
  margin: 1rem auto;
  font-size: 1.5rem;
  text-align: center;
  /* position: absolute; */
  /* bottom: -5rem; */
  width: 100%;
  padding-bottom: 5rem;
}

/* .center-bottom>p,
.center-bottom>a {
  font-size: 0.8rem;
  color: #6c6f87;
}

.center-bottom>p>a {
  text-decoration: underline !important;
  color: #0645AD;
} */

.filter-container {
  grid-row: 2/3;
}

@media screen and (max-width: 1200px) {
  .filter-container {
    margin-top: 0.5rem;
  }
}

@media screen and (min-width: 1200px) {
  .filter-container {
    margin-right: 2rem;
  }
}

.search-modal {
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 13;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 10vh;
  transition: background 200ms;
}

.search-modal:has(.sidebar-mode) {
  width: 50%;
  right: 0;
  background: none;
  height: 100vh;
  padding-top: 0;
  align-items: flex-end;
}

.search-modal:not(:has(.sidebar-mode)) {
  min-height: 200vh;
}

.search-modal .image-grid {
  position: relative;
  /* top: 30vh; */
  /* bottom: 0; */
  /* height: 70%; */

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: min-content 1fr 1fr 1fr;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 1rem 1rem 0 0;
  background: var(--element-bg);
  border: 1px solid var(--border-color);
  box-shadow: 0 0 40px 10px rgba(0, 0, 0, 0.1);
}

.search-modal .image-grid:not(.sidebar-mode) {
  width: 70%;
  min-height: 72vh;
  height: fit-content;
  flex-grow: 1;
}

.search-modal .image-grid.sidebar-mode {
  /* width: 50%; */
  width: 100%;
  height: 100%;
  grid-template-rows: 8% 30% 30% 30%;
  /* grid-template-rows: min-content min-content min-content min-content; */
  border-radius: 1rem 0 0 1rem;
}

.dark .search-modal .image-grid {
  box-shadow: 0 0 30px 20px rgba(0, 0, 0, 0.5);
}

.search-modal .image-grid img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
  cursor: pointer;
}

.search-modal .image-grid .loader * {
  color: var(--text);
}

.search-modal .image-grid .loader {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
}

.search-modal .top-part {
  grid-column: 1/4;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-modal .top-buttons {
  /* position: absolute; */
  /* top: 1rem; */
  /* right: 1rem; */
  display: flex;
  gap: 1rem;
}

.search-modal .top-buttons button {
  white-space: nowrap;
  margin: 0;
}

.search-modal .close {
}

.search-modal h1 {
  padding-right: 2rem;
  color: var(--text);
  font-size: 2rem;
  margin: 0.4rem 0 0.6rem;
  /* margin-bottom: 1rem */
}

@media screen and (max-width: 800px) {
  .search-modal {
    justify-content: flex-end;
  }

  .search-modal .image-grid {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* grid-template-columns: 1fr;
    grid-template-rows: repeat(5, min-content); */
  }

  .search-modal .image-grid:not(.sidebar-mode) {
    width: 100%;
    min-height: 72vh;
  }

  .search-modal .image-grid h1 {
    font-size: 1.1rem;
    grid-column: 1/3;
  }

  .search-modal .image-grid .close {
    top: 0.5rem;
    right: 0.5rem;
  }

  .search-modal .image-grid > :last-child {
    display: none;
  }
}

.search-modal .disclaimer {
  position: absolute;
  right: 1.5rem;
  bottom: 1rem;
  color: white;
  font-size: 0.8rem;
  /* text-shadow: 0 0 5px rgba(0, 0, 0, 0.1); */
}

.search-modal .side-switcher {
  padding: 0.5rem 0.75rem;
}

@media screen and (max-width: 1200px) {
  .search-modal .side-switcher {
    display: none;
  }
}

.big-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 12;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  /* justify-content: center; */
  /* flex-shrink: 1; */
  backdrop-filter: blur(2px);
  padding: 2rem 2rem 3rem;
  object-fit: scale-down;
}

.big-image img {
  box-shadow: 0 0 100px 5px rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  max-height: 100%;
  /* height: 100%; */
  max-width: 100%;
  /* object-fit: cover; */
  transition: none;
  /* flex-shrink: 1; */
  /* flex-grow: 1; */
  margin: auto;
}
</style>
