<template>
  <div class="list-layout">
    <div>
      <FilterModule :sortBy="sortBy" :filterType="filterType" :query="query" @fetch-list="fetchList(0, 99)"
        @handle-click="handleClick" @fetch-all-list="fetchAllList" v-model:query="query"
        v-model:filterType="filterType" />
      <!-- <FilterModule :sortBy="sortBy" :query="query" @fetch-list="fetchList(0, 99)" @handle-click="handleClick"
        v-model:query="query" /> -->
      <!-- <div v-if="showSettings" class="bordery max-w-2xl w-fit m-2 p-2">
        <label for="height">Höjd:</label>
        <input type="number" v-model="rowHeight" class="bg-gray-50 m-2 p-2 bordery mr-10 rounded-lg">
        <label for="height">Textstorlek:</label>
        <input type="number" v-model="textSize" class="bg-gray-50 m-2 p-2 bordery rounded-lg">
      </div> -->
      <!-- <h1 class="text-4xl m-2 mt-5">Superlista!</h1> -->
      <!-- <div class="w-full shadow-2xl h-10 fixed top-[-2.5rem]"></div> -->

    </div>


    <div class="list-bg">
      <ColumnTopInfo :isOnskeLista="false" />
      <div ref="listEl" class="">
        <div v-for="plant in list" :key="plant.id">
          <ListElement :plant="plant" :rowHeight="rowHeight" :textSize="textSize" @add-to-cart="handleAdd"
            :isOnskeLista="false" />
        </div>
      </div>
    </div>
    <!-- 
    <div class="navigator">
      <button class="p-2 rounded-[0.75rem]" @click="showSettings = !showSettings">Inställningar</button>
      <nuxt-link class="p-2 rounded-[0.75rem]" to="/onske-lista">Önskelista</nuxt-link>
    </div> -->
    <!-- <ClientOnly fallbackTag="div" ref="listEl">
      <div v-for="plant in list" :key="plant.id">
        <ListElement :plant="plant" :rowHeight="rowHeight" :textSize="textSize" @add-to-cart="handleAdd" />
      </div>
    </ClientOnly> -->
    <!-- <div v-observe-visibility="visibilityChanged">Hello</div> -->
    <!-- <div class="center-bottom">
      <div v-if="!theEnd" id="loader" class="loader-style">1</div>
      <div v-if="!theEnd" id="loader">2</div>
      <div v-if="!theEnd">Laddar....</div>
      <div v-if="theEnd">Här är listan slut :)</div>
    </div> -->
    <div class="observer" ref="observerTarget">
      <h1>Hello!</h1>
    </div>
    <div class="center-bottom">
      {{ userMessage }}
      <p>Om det inte laddes fler, tryck <a @click="fetchMoreList()">här</a></p>
    </div>
    <nuxt-link @click="scrollToTop" class="scroll-to-top  bg-white">Skolla till toppen
    </nuxt-link>
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
const list = ref([])
const filterType = ref("")
// const list = useStorage('list', [])
const fetchRange = ref({ from: 0, to: 99 })

const rowHeight = ref(40)
const textSize = ref(16)

const userMessage = ref('Laddar')

const observerTarget = ref(null)
const targetIsVisible = ref(false)

const onskeList = useStorage('onske-list', [{ id: 420, count: 2 }]);
// console.log(onskeList.value);

const { stop } = useIntersectionObserver(
  observerTarget,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting
    if (targetIsVisible.value = true) {
      fetchMoreList()
      console.log('Intersecting');
    }
  },
)

// const targetIsVisible = useElementVisibility(observerTarget)

const cart = ref([
  { id: 69, count: 1 }
])

/* - - - - - - Adding to cart - - - - - - */
const handleAdd = (id, count) => {
  const arr = [{ id: id, count: count }]
  onskeList.value.push(arr[0])
  console.log(onskeList.value);
  // }
}


/* - - - - - - Search - - - - - - */
watch(query, () => {
  fetchList(0, 99)
})


/* - - - - - - Fetching list - - - - - - */
onMounted(() => {
  fetchList(0, 99)
})


const fetchList = async (from, to) => {
  userMessage.value = 'laddar...'
  list.value = []

  let search = supabase
    .from('superlista')
    .select()
    .ilike('Namn', `%${query.value.replace(/\s+/g, '%')}%`)
    .order(`${sortBy.value.sortByWhat}`, { ascending: sortBy.value.ascending })
    .range(from, to)
  if (!filterType.value == '') { search = search.eq('Typ', `${filterType.value}`) }

  const { data, error } = await search

  if (error) {
    console.error(error)
    list.value = null
  }
  if (data) {
    userMessage.value = 'Här är listan slut'
    if (!data.length > 0) {
      userMessage.value = 'Inga resultat'
    }
    // console.log(data)
    list.value = data
  }
}

/* - - - - - - Fetch all list- - - - - - */
const fetchAllList = async () => {
  userMessage.value = 'laddar...'
  list.value = []

  let search = supabase
    .from('superlista')
    .select()
    .ilike('Namn', `%${query.value.replace(/\s+/g, '%')}%`)
    .order(`${sortBy.value.sortByWhat}`, { ascending: sortBy.value.ascending })
  if (!filterType.value == '') { search = search.eq('Typ', `${filterType.value}`) }

  const { data, error } = await search

  // .range(fetchRange.value.from, fetchRange.value.to)
  // .order(orderBy.value, {ascending: ascending.value})

  if (error) {
    console.error(error)
  }
  if (data) {
    // console.log(data)
    userMessage.value = 'Här är listan slut'
    list.value = data
  }
}


/* - - - - - - Infinite scrolling - - - - - - */
const fetchMoreList = async () => {
  userMessage.value = 'laddar...'

  let search = supabase
    .from('superlista')
    .select()
    .ilike('Namn', `%${query.value.replace(/\s+/g, '%')}%`)
    .order(`${sortBy.value.sortByWhat}`, { ascending: sortBy.value.ascending })
    .range(fetchRange.value.from, fetchRange.value.to)
  if (!filterType.value == '') { search = search.eq('Typ', `${filterType.value}`) }

  const { data, error } = await search

  if (error) {
    console.log(error)
  }
  if (data) {
    if (fetchRange.value.from >= 100) {
      list.value.push(...data)
      // console.log(data)
    }
    if (!data.length > 0) {
      userMessage.value = 'Listan är slut här'
    }
    fetchRange.value.from += 100
    fetchRange.value.to += 100
  }
}


/* - - - - - - Handling click - - - - - - */
const handleClick = () => {
  sortBy.value.ascending = !sortBy.value.ascending
  console.log('Hello')
  fetchList(0, 99)
}

/* - - - - - - Scroll to top - - - - - - */
const scrollToTop = () => {
  window.scrollTo(0, 0);
}


if (typeof window !== 'undefined') {
  // console.log('we are running on the client')
  localStorage.setItem('test2', JSON.stringify(list.value));
} else {
  // console.log('we are running on the server');
}


</script>


<style>
.list-bg {
  border-radius: 1rem;
  padding: 1rem;
  width: fit-content;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.list-layout {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  max-width: 100rem;
  margin: 0 auto;
  width: 100%;
}

@media screen and (max-width: 1600px) {
  .list-layout {
    grid-template-columns: 1fr 3fr;
  }
}

@media screen and (max-width: 1200px) {
  .list-layout {
    display: flex;
    flex-direction: column;
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
  transform: translateY(-120rem);
  opacity: 0;
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