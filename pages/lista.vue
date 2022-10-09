<template>
  <div>
    <div v-if="showSettings" class="bordery max-w-2xl w-fit m-2 p-2">
      <label for="height">Höjd:</label>
      <input type="number" v-model="rowHeight" class="bg-gray-50 m-2 p-2 bordery mr-10 rounded-lg">
      <label for="height">Textstorlek:</label>
      <input type="number" v-model="textSize" class="bg-gray-50 m-2 p-2 bordery rounded-lg">
    </div>
    <h1 class="text-4xl m-2 mt-5">Superlista!</h1>
    <div class="w-full shadow-2xl h-10 fixed top-[-2.5rem]"></div>
    <div class="bg-gray-50 w-fit m-2 bordery sticky h-fit top-1 z-10 shadow-md">
      <button class="bg-slate-100 m-2 rounded-xl btn" @click="handleClick">
        <p v-if="sortBy.ascending">Stigande</p>
        <p v-if="!sortBy.ascending">Nedåtgående</p>
      </button>

      <select name="sortBy" id="sortBySelector" v-model="sortBy.sortByWhat" @change="fetchList(0, 99)">
        <option value="Namn">Namn</option>
        <option value="Pris">Pris</option>
        <option value="Typ">Typ</option>
      </select>
      <ClientOnly fallbackTag="div">
        <!-- <input type="text" placeholder=" Sök" v-model="query" v-if="!lazyInput" class="m-2 bg-gray-100 rounded-lg" title="Sök"> -->
        <input type="text" placeholder=" Sök" v-model="query" class="m-2 bg-gray-100 rounded-lg bordery" title="Lazy">
        <!-- {{lazyInput}} -->
      </ClientOnly>

      <!-- <input type="checkbox" v-model="lazyInput" title="Lazy input?" id="lazyInput">
        <label for="lazyInput" title="man behöver trycka enter för att söka" class="m-2">Lat sökning?</label> -->

      <button class="m-2 bg-gray-100 text-xs rounded-xl btn" @click="fetchAllList">Ladda Alla</button>

    </div>
    <div class="absolute top-14 right-0 grid grid-cols-2 grid-rows-1 p-2 gap-4">
      <button class="bordery p-2 bg-gray-50 rounded-lg" @click="showSettings = !showSettings">Inställningar</button>
      <nuxt-link class="bordery p-2 bg-gray-50 rounded-lg" to="/onske-lista">Önskelista</nuxt-link>
    </div>
    <div ref="listEl">
      <div v-for="plant in list" :key="plant.id">
        <ListElement :plant="plant" :rowHeight="rowHeight" :textSize="textSize" @add-to-cart="handleAdd" />
      </div>
    </div>
    <!-- <ClientOnly fallbackTag="div" ref="listEl">
      <div v-for="plant in list" :key="plant.id">
        <ListElement :plant="plant" :rowHeight="rowHeight" :textSize="textSize" @add-to-cart="handleAdd" />
      </div>
    </ClientOnly> -->
    <!-- <div v-observe-visibility="visibilityChanged">Hello</div> -->
    <div v-if="!theEnd" id="loader" class="loader-style">1</div>
    <div v-if="!theEnd" id="loader">2</div>
    <div v-if="!theEnd">Laddar....</div>
    <div v-if="theEnd">Här är listan slut :)</div>
    <nuxt-link @click="scrollToTop" class="scroll-to-top bg-gray-100 p-2 rounded-full shadow-lg">Skolla till toppen
    </nuxt-link>
  </div>
</template>

<script setup>
// import dataTest from "../composables/dataTest"
// import { useCounterStore } from '../stores/counter.js'
/* - - - - - - Supabase Setup - - - - - - */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4'
const supabase = createClient(supabaseUrl, supabaseKey)

/* - - - - - - Refs - - - - - - */
const sortBy = ref({ sortByWhat: 'Namn', ascending: true })
const query = ref("")
const getList = ref([])
const fetchRange = ref({ from: 0, to: 99 })
const theEnd = ref(false)
const lazyInput = ref()

const showSettings = ref(false)

const listEl = ref(null)

const rowHeight = ref(40)
const textSize = ref(16)

const cart = ref([
  { id: 69, count: 1 }
])

let testCount = 0;
/* - - - - - - Pinia - - - - - - */
// const store = useCounterStore()
// store.count++
// store.increment(2)

// console.log(store.count)

/* - - - - - - Saving on local storage - - - - - - */
watch(lazyInput, () => {
  if (typeof window !== 'undefined') {
    // console.log('clietn')
    localStorage.setItem('lazyInput', `${lazyInput.value}`);
    // console.log(localStorage.getItem('lazyInput'));
  }
})

/* - - - - - - Getting from local storage - - - - - - */
if (typeof window !== 'undefined') {
  if (localStorage.getItem('lazyInput')) {
    console.log('in local storage')
    // console.log(localStorage.getItem('lazyInput'));
    lazyInput.value = localStorage.getItem('lazyInput')
  } else {
    console.log('not in local storage')
    lazyInput.value = true
  }
}

/* - - - - - - Adding to cart - - - - - - */
const handleAdd = (id, count) => {
  const array = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : []
  array.push({ id, count })
  // console.log(array);
  localStorage.setItem('cart', `${JSON.stringify(array)}`);
  console.log(JSON.parse(localStorage.getItem('cart')));
  cart.value = array
  // }
}


/* - - - - - - Search - - - - - - */
watch(query, () => {
  fetchList(0, 99)
})


/* - - - - - - Fetching list - - - - - - */
onMounted(() => {
  console.log('mounted');
  fetchList(0, 99)
})
const fetchList = async (from, to) => {
  getList.value = []
  const { data, error } = await supabase
    .from('superlista')
    .select()
    // .ilike('Namn', `%${query.value}%`)
    .ilike('Namn', `%${query.value.replace(/\s+/g, '%')}%`)
    .order(`${sortBy.value.sortByWhat}`, { ascending: sortBy.value.ascending })
    .range(from, to)
  if (error) {
    console.error(error)
    getList.value = null
  }
  if (data) {
    // console.log(data)
    getList.value = data
  }
}

/* - - - - - - Fetch all list- - - - - - */
const fetchAllList = async () => {
  getList.value = []
  const { data, error } = await supabase
    .from('superlista')
    .select()
    .ilike('Namn', `%${query.value.replace(/\s+/g, '%')}%`)
    .order(`${sortBy.value.sortByWhat}`, { ascending: sortBy.value.ascending })
  // .range(fetchRange.value.from, fetchRange.value.to)
  // .order(orderBy.value, {ascending: ascending.value})

  if (error) {
    console.error(error)
  }
  if (data) {
    // console.log(data)
    theEnd.value = true
    getList.value = data
  }
}


/* - - - - - - Infinite scrolling - - - - - - */
const fetchMoreList = async () => {
  const { data, error } = await supabase
    .from('superlista')
    .select()
    .ilike('Namn', `%${query.value.replace(/\s+/g, '%')}%`)
    .order(`${sortBy.value.sortByWhat}`, { ascending: sortBy.value.ascending })
    // .order('id', { ascending: true})
    // .range(from, to)
    .range(fetchRange.value.from, fetchRange.value.to)
  // .range(0, 10)

  if (error) {
    console.log(error)
  }
  if (data) {
    if (fetchRange.value.from >= 100) {
      getList.value.push(...data)
      // console.log(data)
    }
    if (!data.length > 0) theEnd.value = true
    fetchRange.value.from += 100
    fetchRange.value.to += 100
  }
}

// useInfiniteScroll(
//   listEl,
//   () => {
//     console.log('heloooooooooo')
//   },
//   { distance: 10 }
// );


onMounted(() => {
  console.log('mounted 2');
  console.log(testCount);
  testCount++;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log('i see you')
      if (entry.intersectionRatio > 0) {
        // console.log('i see you')
        fetchMoreList()
      }
    })
  })
  document.querySelectorAll('#loader').forEach((section) => {
    console.log('observe');
    observer.observe(section)
  })
})


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

// if (typeof window !== 'undefined') {
// if(!JSON.parse(localStorage.getItem('test2'))) {
//     getList.value = dataTest()
//     console.log('from script')
//     // console.log(JSON.parse(localStorage.getItem('test2')))
//   } else {
//     getList.value = JSON.parse(localStorage.getItem('test2'))
//     console.log('from local storage')
//     // console.log(JSON.parse(localStorage.getItem('test2')).lenght)
//   // let getList = JSON.parse(localStorage.getItem('test2'))
//   }
// }

// localStorage.setItem("test", "Hello")

// let list = getList.value.sort((a, b) => a.PrisMedMoms - b.PrisMedMoms);

const list = computed(() => {
  // const filter = () => {
  //   if(query.value) {
  //     return getList.value.filter(foo => foo.VetenskapligtNamn.toUpperCase().includes(query.value.toUpperCase()))
  //     } else return getList.value
  //   }  
  let filteredArray = query.value
    ? getList.value.filter(foo => foo.Namn.toUpperCase().includes(query.value.toUpperCase()))
    : getList.value

  // const filteredArray = ref(filter())

  // return getList.value
  // return filteredArray
  return getList.value
  // return filteredArray.sort((a, b) => {
  //   if(sortBy.value.ascending) {
  //     return a[sortBy.value.sortByWhat] > b[sortBy.value.sortByWhat] ? 1 : -1
  //   } else {
  //     return a[sortBy.value.sortByWhat] < b[sortBy.value.sortByWhat] ? 1 : -1
  //   }
  // })
})

if (typeof window !== 'undefined') {
  // console.log('we are running on the client')
  localStorage.setItem('test2', JSON.stringify(list.value));
} else {
  // console.log('we are running on the server');
}

// if (typeof window !== 'undefined') {
//   console.log(JSON.parse(localStorage.getItem('test2')) )
//   // localStorage.getItem('test2', JSON.stringify(list.value));
// } else {
//   // console.log('we are running on the server');
// }


</script>


<style>
.p-2-me {
  padding: 0.5px 8px;
}

.lista {
  transition: all 1s
}

.loader-style {
  position: relative;
  bottom: 50rem;
  /* opacity: 0; */
}

#loader {
  opacity: 0;
}

.bordery {
  border: 1px solid rgb(238, 238, 238);
}

.scroll-to-top {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  /* transition: all 100ms; */
  /* translate: 10rem 0; */
}

.btn {
  padding: 4px;
  font-size: 0.9rem;
}

/* .testing {
  resize: horizontal;
  background-color: gray;
  width: v-bind(widthTest + 'px');
  overflow: auto;
} */
</style>