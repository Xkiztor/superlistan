<template>
  <div class="list-layout">
    <div class="filter-container">
      <FilterModule :sortBy="sortBy" :filterType="filterType" :query="query" @fetch-list="fetchList(0, 99)"
        @handle-click="handleClick" @fetch-all-list="fetchAllList" v-model:query="query" v-model:filterType="filterType"
        :filterLetter="filterLetter" v-model:filterLetter="filterLetter" :hasFetchedAll="hasFetchedAll" />
    </div>

    <div class="list-bg main-list">
      <ColumnTopInfo :isOnskeLista="false" />
      <div v-bind="containerProps" class="container-props">
        <div v-bind="wrapperProps" class="wrapper-props">
          <div v-for="{ index, data } in list" :key="index">
            <ListElement :plant="data" :rowHeight="rowHeight" :textSize="textSize" @add-to-cart="handleAdd"
              :isOnskeLista="false" />
          </div>
          <!-- <div class="observer" ref="observerTarget">
            <h1>above 1</h1>
          </div> -->
          <div class="center-bottom" ref="observerTarget2">
            {{ userMessage }}
            <p v-if="userMessage != 'Här är listan slut'">Om det inte laddas fler, tryck <a class="pointer"
                @click="fetchMoreList()">här</a></p>
          </div>
        </div>

      </div>
    </div>

    <div class="list-bg jump-to-container">
      <p>Hoppa till bokstav</p>
      <div class="filter-div jump-to">
        <button value="A">A</button>
        <button value="B">B</button>
        <button value="C">C</button>
        <button value="D">D</button>
        <button value="E">E</button>
        <button value="F">F</button>
        <button value="G">G</button>
        <button value="H">H</button>
        <button value="I">I</button>
        <button value="J">J</button>
        <button value="K">K</button>
        <button value="L">L</button>
        <button value="M">M</button>
        <button value="N">N</button>
        <button value="O">O</button>
        <button value="P">P</button>
        <button value="Q">Q</button>
        <button value="R">R</button>
        <button value="S">S</button>
        <button value="T">T</button>
        <button value="U">U</button>
        <button value="V">V</button>
        <button value="W">W</button>
        <button value="X">X</button>
        <button value="Y">Y</button>
        <button value="Z">Z</button>
      </div>
    </div>
    <nuxt-link @click="handleScrollTo" class="scroll-to-top  bg-white">Skolla till toppen {{ fps }}</nuxt-link>
  </div>
</template>

<script setup>
// import dataTest from "../composables/dataTest"
// import { useCounterStore } from '../stores/counter.js'
/* - - - - - - Supabase Setup - - - - - - */
import { createClient } from '@supabase/supabase-js'
import { useElementVisibility, useIntersectionObserver, useStorage } from '@vueuse/core'

const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4'
const supabase = createClient(supabaseUrl, supabaseKey)

/* - - - - - - Refs - - - - - - */
const sortBy = ref({ sortByWhat: 'Namn', ascending: true })
const query = ref("")
const dataList = ref([])
const filterType = ref("")
// const list = useStorage('list', [])
const fetchRange = ref({ from: 0, to: 50 })
const hasFetchedAll = ref(false)

const rowHeight = ref(40)
const textSize = ref(16)

const userMessage = ref('Laddar')

const filterLetter = ref('')

const fps = useFps()

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(dataList, {
  itemHeight: 40,
  overscan: 35,
})

const onskeList = useStorage('onske-list', [{ id: 420, count: 2 }]);

useInfiniteScroll(containerProps.ref, () => {
  console.log('yeeee');
  fetchMoreList()
},
  { distance: 800 }
)
useInfiniteScroll(containerProps.ref, () => {
  console.log('yeeeerrrrrrrrrrrrrrrrrr');
  fetchMoreList()
},
  { distance: 0 }
)

const handleScrollTo = () => {
  scrollTo(5000)
}

/* - - - - - - Adding to cart - - - - - - */
const handleAdd = (id, count) => {
  const arr = [{ id: id, count: count }]
  onskeList.value.push(arr[0])
  console.log(onskeList.value);
  // }
}


/* - - - - - - Search - - - - - - */
watch(query, () => {
  fetchList(0, 50)
})


/* - - - - - - Fetching list - - - - - - */
onMounted(() => {
  fetchList(0, 100)
})

const fetchTest = async () => {
  let search = supabase
    .from('superlista')
    .select()
    .ilike('Namn', 'u%')

  const { data, error } = await search

  if (error) {
    console.error(error);
  }
  if (data) {
    // console.log(data);
  }
}

fetchTest()


const fetchList = async (from, to) => {
  if (!hasFetchedAll.value) {
    userMessage.value = 'laddar...'
    dataList.value = []
    let search = supabase
      .from('superlista')
      .select()
      .ilike('Namn', `%${query.value.replace(/\s+/g, '%')}%`)
      .order(`${sortBy.value.sortByWhat}`, { ascending: sortBy.value.ascending })
      .range(from, to)
    if (!filterType.value == '') { search = search.eq('Typ', `${filterType.value}`) }
    if (!filterLetter.value == '') { search = search.ilike('Namn', `${filterLetter.value}%`) }

    const { data, error } = await search

    if (error) {
      console.error(error)
      dataList.value = null
    }
    if (data) {
      userMessage.value = 'Här är listan slut'
      if (!data.length > 0) {
        userMessage.value = 'Inga resultat'
      }
      // console.log(data)
      dataList.value = data
    }
  }

}

/* - - - - - - Fetch all list- - - - - - */
const fetchAllList = async () => {
  userMessage.value = 'laddar...'
  dataList.value = []
  hasFetchedAll.value = true;

  let search = supabase
    .from('superlista')
    .select()
    .ilike('Namn', `%${query.value.replace(/\s+/g, '%')}%`)
    .order(`${sortBy.value.sortByWhat}`, { ascending: sortBy.value.ascending })
  if (!filterType.value == '') { search = search.eq('Typ', `${filterType.value}`) }
  if (!filterLetter.value == '') { search = search.ilike('Namn', `${filterLetter.value}%`) }

  const { data, error } = await search

  // .range(fetchRange.value.from, fetchRange.value.to)
  // .order(orderBy.value, {ascending: ascending.value})

  if (error) {
    console.error(error)
  }
  if (data) {
    // console.log(data)
    userMessage.value = 'Här är listan slut'
    dataList.value = data
  }
}


/* - - - - - - Infinite scrolling - - - - - - */
const fetchMoreList = async () => {
  if (!hasFetchedAll.value) {
    userMessage.value = 'laddar...'
    console.log('fetching more');
    let search = supabase
      .from('superlista')
      .select()
      .ilike('Namn', `%${query.value.replace(/\s+/g, '%')}%`)
      .order(`${sortBy.value.sortByWhat}`, { ascending: sortBy.value.ascending })
      .range(fetchRange.value.from, fetchRange.value.to)
    if (!filterType.value == '') { search = search.eq('Typ', `${filterType.value}`) }
    if (!filterLetter.value == '') { search = search.ilike('Namn', `${filterLetter.value}%`) }

    const { data, error } = await search

    if (error) {
      console.log(error)
    }
    if (data) {
      if (fetchRange.value.from >= 100) {
        dataList.value.push(...data)
        console.log(data)
      }
      if (!data.length > 0) {
        userMessage.value = 'Här är listan slut'
      }
      fetchRange.value.from += 50
      fetchRange.value.to += 50
    }
  }

}


/* - - - - - - Handling click - - - - - - */
const handleClick = () => {
  sortBy.value.ascending = !sortBy.value.ascending
  // console.log('Hello')
  fetchList(0, 99)
}

/* - - - - - - Scroll to top - - - - - - */
const scrollToTop = () => {
  window.scrollTo(0, 0);
}


</script>


<style>
.container-props {
  height: 100% !important;
  padding: 1rem;
}


.list-bg {
  border-radius: 1rem;
  padding-top: 1rem;
  /* padding: 1rem; */
  width: fit-content;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  height: 100%;
  overflow: hidden;
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
  margin-bottom: 0.5rem;
}

.jump-to>button {
  margin: 0rem;
}

.jump-to {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}


.list-layout {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: min-content 1fr;
  gap: 1rem 0;
  max-width: 100rem;
  margin: 0 auto;
  width: 100%;


  height: 100% !important;
}

@media screen and (max-width: 1600px) {
  .list-layout {
    grid-template-columns: 1fr 3fr;
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

.center-bottom {
  grid-column-start: 2;
  grid-row-start: 2;
  margin: 1rem auto 5rem;
  font-size: 1.5rem;
  text-align: center
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