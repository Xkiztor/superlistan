<template>
  <div class="search-modal" v-if="state.showGoogleSearchResult.value">
    <!-- <button @click="printGoogle()">Print</button>
    <button @click="state.showImages.value = !state.showImages.value">Visa bilder</button> -->
    <div class="image-grid" ref="imageGrid">
      <h1>{{ state.searchedPlant.value }}</h1>
      <button class="close" @click="state.showGoogleSearchResult.value = false, state.showImages.value = false">
        <Icon name="material-symbols:close" size="35" />
      </button>
      <img @click="openNewTab(state.googleSearchResult.value.items[0].link)" v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[0].link" alt="">
      <img @click="openNewTab(state.googleSearchResult.value.items[1].link)" v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[1].link" alt="">
      <img @click="openNewTab(state.googleSearchResult.value.items[2].link)" v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[2].link" alt="">
      <img @click="openNewTab(state.googleSearchResult.value.items[3].link)" v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[3].link" alt="">
      <img @click="openNewTab(state.googleSearchResult.value.items[4].link)" v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[4].link" alt="">
      <img @click="openNewTab(state.googleSearchResult.value.items[5].link)" v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[5].link" alt="">
      <img @click="openNewTab(state.googleSearchResult.value.items[6].link)" v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[6].link" alt="">
      <img @click="openNewTab(state.googleSearchResult.value.items[7].link)" v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[7].link" alt="">
      <img @click="openNewTab(state.googleSearchResult.value.items[8].link)" v-if="state.showImages.value"
        :src="state.googleSearchResult.value.items[8].link" alt="">
      <Icon class="loader" v-else name="line-md:loading-loop" size="80" />
    </div>
  </div>
  <div class="list-layout">

    <div class="filter-container" v-if="shouldFilterOpen">
      <FilterModule @fetch-list="fetchAllList" @handle-click="handleClick" />
    </div>

    <div v-if="shouldJumpOpen" class="jump-to">
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
          <ListElement v-for="{ index, data } in list" :key="data.id" :plant="data" @add-to-cart="handleAdd"
            :isOnskeLista="false" />
          <!-- <div class="observer" ref="observerTarget">
            <h1>above 1</h1>
          </div> -->
          <div class="bottom-spacer"></div>
          <div class="center-bottom" @click="fetchAllList()">
            {{ userMessage }}
            <!-- <p v-if="userMessage != 'Här är listan slut'">Om det inte laddas fler, tryck <a class="pointer"
                @click="fetchAllList()">här</a></p> -->
          </div>
        </ul>

      </div>
    </div>
    <!-- <nuxt-link @click="handleScrollTo" class="scroll-to-top hide-on-phone bg-white">Skolla till toppen {{ fps
    }}</nuxt-link> -->
  </div>
</template>

<script setup>
// import dataTest from "../composables/dataTest"
// import { useCounterStore } from '../stores/counter.js'
/* - - - - - - Supabase Setup - - - - - - */
import { createClient } from '@supabase/supabase-js'
import { useStorage } from '@vueuse/core'

const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4'
const supabase = createClient(supabaseUrl, supabaseKey)

definePageMeta({
  // keepalive: true
})

// })
/* - - - - - - Refs - - - - - - */
const state = useGlobalState()
const onskeList = useGlobalOnskeList()


// const dataList = ref([])
const dataList = useStorage('datalist', [])

const hasUpdated = useStorage('has-updated', false)

console.log(' ');
console.log(dataList.value);
console.log(' ');

const userMessage = ref('Laddar')


const shouldFilterOpen = computed(() => {
  if (!isCollapsed.value) return true
  else {
    if (state.isFilterOpen.value) return true
    else return false
  }
})
const shouldJumpOpen = computed(() => {
  if (!isCollapsed.value) return true
  else {
    if (state.isJumpOpen.value) return true
    else return false
  }
})

// Filter and sort the list
const computedList = computed(() => {
  let newList = dataList.value

  let queryArray = state.query.value.toLowerCase().split(" ")

  console.log(queryArray);


  newList = newList.filter(item => queryArray.every(str => item.Namn.toLowerCase().includes(str)))


  if (state.favoriteFilter.value) newList = newList.filter(e => e.Rekommenderas == true)

  if (state.edibleFilter.value) newList = newList.filter(e => e.Edible == true)

  if (state.commentFilter.value) newList = newList.filter(e => e.Kommentar != null)

  if (state.linkFilter.value) newList = newList.filter(e => e.Länk != null)

  newList = newList.sort((a, b) => {
    // console.log('heho');
    if (state.sortByWhat.value == 'Namn') {
      if (a.Namn.toLowerCase() < b.Namn.toLowerCase()) {
        if (state.sortAscending.value) return -1
        else return 1
      }
      if (a.Namn.toLowerCase() > b.Namn.toLowerCase()) {
        if (state.sortAscending.value) return 1
        else return -1
      }
      return 0
    } else if (state.sortByWhat.value == 'Pris') {
      if (a.Pris < b.Pris) {
        if (state.sortAscending.value) return -1
        else return 1
      }
      if (a.Pris > b.Pris) {
        if (state.sortAscending.value) return 1
        else return -1
      }
      return 0
    } else if (state.sortByWhat.value == 'Höjd') {
      if (a.Höjd < b.Höjd) {
        if (state.sortAscending.value) return -1
        else return 1
      }
      if (a.Höjd > b.Höjd) {
        if (state.sortAscending.value) return 1
        else return -1
      }
      return 0
    } else if (state.sortByWhat.value == 'Kruka') {
      if (a.Kruka < b.Kruka) {
        if (state.sortAscending.value) return -1
        else return 1
      }
      if (a.Kruka > b.Kruka) {
        if (state.sortAscending.value) return 1
        else return -1
      }
      return 0
    } else if (state.sortByWhat.value == 'MinOrder') {
      if (a.MinOrder < b.MinOrder) {
        if (state.sortAscending.value) return -1
        else return 1
      }
      if (a.MinOrder > b.MinOrder) {
        if (state.sortAscending.value) return 1
        else return -1
      }
      return 0
    }
  })

  if (state.typeFilter.value.T || state.typeFilter.value.B || state.typeFilter.value.P || state.typeFilter.value.K || state.typeFilter.value.O || state.typeFilter.value.G) {
    newList = newList.filter(e => state.typeFilter.value[e.Typ])
  }

  return newList
})

// Virtual list settings
const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(computedList, {
  itemHeight: 33,
  overscan: 25,
})

const screenSize = useWindowSize()
const isCollapsed = computed(() => { return screenSize.width.value <= 1200 ? true : false })


const handleScrollTo = (letter) => {

  scrollTo(computedList.value.map(e => {
    return Array.from(e.Namn)[0]
  }).indexOf(letter))
}


watch(computedList, () => {
  scrollTo(0)
  console.log(computedList.value);
})

/* - - - - - - Adding to cart - - - - - - */
const handleAdd = (plant, order) => {
  onskeList.handleAdd(plant, order)
}


/* - - - - - - Clearing list cache - - - - - - */
const hasVisited2024 = useStorage('has-visited-2024', false)

onMounted(() => {
  if (!hasVisited2024.value) {
    dataList.value = []
    hasVisited2024.value = true
  }
})

/* - - - - - - Fetching list - - - - - - */
onMounted(() => {
  if (dataList.value.length <= 0) {
    fetchAllList()
    return
  } else {
    userMessage.value = 'Här är listan slut'
  }

  if (hasUpdated.value === false) {
    hasUpdated.value = true
    fetchAllList()
  }

})



/* - - - - - - Fetch all list- - - - - - */
const fetchAllList = async () => {
  userMessage.value = 'laddar...'
  dataList.value = []
  console.log('fetching all');

  let search = supabase
    .from('superlista-2024')
    .select()
  const { data, error } = await search

  if (error) {
    console.error(error)
  }
  if (data) {
    // console.log(data)
    scrollTo(0)
    userMessage.value = 'Här är listan slut'
    console.log(data);
    dataList.value = data
  }
}


/* - - - - - - Handling click - - - - - - */
const handleClick = () => {
  sortBy.value.ascending = !sortBy.value.ascending
  fetchAllList()
}

const openNewTab = (url) => {
  window.open(url, '_blank')
}

const imageGrid = ref(null)

onClickOutside(imageGrid, () => {
  state.showGoogleSearchResult.value = false
  state.showImages.value = false
})
</script>


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
  scrollbar-color: rgb(234, 234, 234) #ffffff00;
  --scrollbar-color-thumb: rgb(234, 234, 234);
  --scrollbar-color-track: #ffffff00;
}

.dark * {
  scrollbar-color: #6d747b #ffffff00;
  --scrollbar-color-thumb: #6d747b;
  --scrollbar-color-track: #ffffff00;
}

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
  padding: 0 .75rem;
  border: none;
}

.jump-to button:hover {
  translate: 4px 0;
  background: none;
}

.jump-to>div {
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
  .jump-to>div {
    width: 100%;
  }

  .jump-to>div {
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
  .jump-to>div {
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


.pointer {
  cursor: pointer;
}


.html {
  transition: all 1s
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
  height: 5rem;
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
  position: absolute;
  bottom: -5rem;
  width: 100%;
}

.center-bottom>p,
.center-bottom>a {
  font-size: 0.8rem;
  color: #6c6f87;
}

.center-bottom>p>a {
  text-decoration: underline !important;
  color: #0645AD;
}

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
  position: absolute;
  z-index: 13;
  background: rgba(0, 0, 0, 0.2);
  width: 100vw;
  min-height: 100vh;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 30vh;
}

.search-modal .image-grid {
  position: relative;
  /* top: 30vh; */
  /* bottom: 0; */
  /* height: 70%; */
  width: 70%;
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
  color: var(--text)
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

.search-modal .close {
  background: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  margin: 0;
  padding: 0;
}

.search-modal h1 {
  padding-right: 2rem;
  grid-column: 1/4;
  color: var(--text);
  font-size: 2rem;
}

@media screen and (max-width: 800px) {
  .search-modal {
    justify-content: flex-end;

  }

  .search-modal .image-grid {
    width: 100%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: min-content;
  }

  .search-modal .image-grid h1 {
    font-size: 1.1rem;
    grid-column: 1/3;
  }

  .search-modal .image-grid .close {
    top: 0.5rem;
    right: 0.5rem;
  }

  .search-modal .image-grid>:last-child {
    display: none;
  }

}
</style>
