<template>
  <div class="list-layout">
    <div class="filter-container" v-if="shouldFilterOpen">
      <FilterModule @fetch-list="fetchAllList" @handle-click="handleClick" />
    </div>

    <div class="list-bg main-list">
      <ColumnTopInfo :isOnskeLista="false" />
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
    <div v-if="shouldJumpOpen" class="jump-to-canister">
      <div class="list-bg jump-to-container">
        <p>Hoppa till bokstav</p>

        <!-- <p>Hoppa till bokstav</p> -->
        <!-- <p>{{ screenSize.width }} {{ isCollapsed }}</p> -->
        <div class="filter-div jump-to">
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


watch(state.query, () => {
  console.log('changed');
})
watch(state.sortAscending, () => {
  console.log('test');
  fetchAllList()
})
watch(state.sortByWhat, () => {
  console.log('test');
  fetchAllList()
})

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

const computedList = computed(() => {
  let newList = dataList.value
  newList = newList.filter(e => e.Namn.toLowerCase().includes(state.query.value.toLowerCase()))
  newList = newList.filter(e => {
    if (state.favoriteFilter.value == true) {
      if (e.Rekommenderas == true) return 1
      else return 0
    } else return 1
  })
  newList = newList.filter(e => {
    if (state.edibleFilter.value == true) {
      if (e.Edible == true) return 1
      else return 0
    } else return 1
  })
  newList = newList.filter(e => {
    if (state.commentFilter.value == true) {
      if (e.Kommentar != null) return 1
      else return 0
    } else return 1
  })
  newList = newList.filter(e => {
    if (state.linkFilter.value == true) {
      if (e.Länk != null) return 1
      else return 0
    } else return 1
  })
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

  // console.log(newList.map(e => e.Rekommenderas).reduce((a, b) => a + b, 0) / newList.length * 100);
  return newList
})

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(computedList, {
  // itemHeight: i => (dataList.value[i].heigh),
  itemHeight: 32,
  overscan: 25,
})

const screenSize = useWindowSize()
const isCollapsed = computed(() => { return screenSize.width.value <= 1200 ? true : false })

// const onskeList = useStorage('onske-list', []);

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
const handleAdd = (id, count) => {
  // const arr = [{ id: id, count: count }]
  // onskeList.value.onskeList.push(arr[0])
  // console.log(onskeList.value.onskeList);

  onskeList.handleAdd(id, count)
}


/* - - - - - - Fetching list - - - - - - */
onMounted(() => {
  // fetchList(0, 200)
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
    .from('superlista')
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
</script>


<style>
.container-props {
  transition: none;

  height: 96%;

  padding: 0.2rem 1rem;
  padding-right: 0.5rem;
  width: auto;
  max-height: 100vh !important;
  /* overflow: hidden; */
}

.wrapper-props {
  transition: none;
  position: relative;
  /* padding-bottom: 5rem; */
}

.list-bg {
  border-radius: 1rem;
  padding-top: 1rem;
  /* padding: 1rem; */
  width: fit-content;
  /* width: 100%; */
  margin: 0 auto;
  background: #ffffff;


  /* height: 100%; */
  /* overflow: hidden; */
}

.dark .list-bg {
  background: #26292f;
  color: #b0bac5;
}

.main-list {
  padding-right: 0.5rem;
  /* height: calc(100vh - 80px - 5rem) !important; */
  /* height: 85vh; */
  height: auto;
  overflow: hidden;
  grid-row: 1/3;
  grid-column: 2;
  padding-top: 0.5rem;
  /* display: inline-block; */
  /* display: grid; */
}

/* width */
*::-webkit-scrollbar {
  width: 10px;
  margin-right: 5px;
}

* {
  scrollbar-color: rgb(234, 234, 234) white;
}

.dark * {
  scrollbar-color: #6d747b #2a2d34;
}

/* Track */
*::-webkit-scrollbar-track {
  /* box-shadow: 0 0 5px grey; */
  border-radius: 10px;
}

/* Handle */
*::-webkit-scrollbar-thumb {
  background: #e5e5e5;
  border-radius: 10px;
}

.dark *::-webkit-scrollbar-thumb {
  background: #6d747b;
  border-radius: 10px;
}

.jump-to-container {
  height: fit-content;
  padding: 1rem;
  margin-left: 1rem;
  width: calc(100% - 1rem);
}

.jump-to-container>p {
  width: 100%;
  text-align: center;
  margin-bottom: 0.7rem;
}

.dark .jump-to-container>p {
  color: #e5e5e5;
}

.jump-to-canister {
  width: auto;
  height: auto;
}

.jump-to>button {
  margin: 0rem;
  max-width: calc(3rem);
}

.jump-to-container>.jump-to {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  place-items: center;
}


.list-layout {
  display: grid;
  grid-template-columns: 5fr 15fr 5fr;
  grid-template-rows: min-content 1fr;
  gap: 1rem 0;
  max-width: 115rem;
  margin: 0 auto;
  width: 100%;


  height: 100% !important;
}

@media screen and (max-width: 1600px) {
  .list-layout {
    grid-template-columns: 4fr 9fr;
  }

  .main-list {
    grid-row: 1 / 3;
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
    margin-top: 1rem;
    height: 87vh;
  }

  .jump-to-container {
    margin-right: 0;
    width: auto;
    max-width: 50rem;
    margin: 1rem auto;
  }
}

@media screen and (max-width: 500px) {
  .list-bg {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .main-layout {
    padding: 0;
  }
}

@media screen and (min-width: 1200px) {
  .list-bg.main-list {
    min-width: 100%;
  }
}


.navigator {
  max-width: 20rem;
  margin: 0 auto;
  background: white;
  padding: 1rem;
  height: fit-content;
  border-radius: 1rem;
}

.pointer {
  cursor: pointer;
}


/* .navigator>a {
  background: #e5e7eb;
} */


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

.scroll-to-top {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 0.7rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  /* transition: all 100ms; */
  /* translate: 10rem 0; */
  border-radius: 1rem;
}

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

/* .testing {
  resize: horizontal;
  background-color: gray;
  width: v-bind(widthTest + 'px');
  overflow: auto;
} */
</style>