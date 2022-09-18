<template>
  <div>
    <h1 class="text-4xl">Superlista!</h1>
      <div>
        <button class="bg-slate-100 p-2-me m-2 rounded-xl" @click="handleClick">
          <p v-if="sortBy.ascending">Stigande</p>
          <p v-if="!sortBy.ascending">Nedåtgående</p>
        </button>

        <select name="sortBy" id="sortBySelector" v-model="sortBy.sortByWhat" @change="fetchList(0, 99)">
          <option value="Namn">Namn</option>
          <option value="Pris">Pris</option>
          <option value="Typ">Typ</option>
        </select
        >
        <input type="text" placeholder=" Lazy" v-model.lazy="query" v-if="lazyInput" class="m-2 bg-gray-100 rounded-lg" title="Lazy">
        <input type="text" placeholder=" Sök" v-model="query" v-if="!lazyInput" class="m-2 bg-gray-100 rounded-lg" title="Sök">

        <input type="checkbox" v-model="lazyInput" title="Lazy input?" id="lazyInput">
        <label for="lazyInput" title="man behöver trycka enter för att söka" class="m-2">Lat sökning?</label>

        <nuxt-link class="absolute top-5 right-5" to="/onske-lista">Önskelista</nuxt-link>

        <!-- {{fetchRange.from}} till {{fetchRange.to}} -->

        <!-- <button @click="fetchAllList">Ladda alla</button> -->

      </div>  
      <ClientOnly fallbackTag="div">
        <div v-for="plant in list" :key="plant.id">
          <ListElement :plant="plant"/>
        </div>
      </ClientOnly>
      <!-- <div v-observe-visibility="visibilityChanged">Hello</div> -->
      <div v-if="!theEnd" id="loader">Loading...</div>
      <div v-if="theEnd">Här är listan slut :)</div>
  </div>
</template>

<script setup>
// import dataTest from "../composables/dataTest"

/* - - - - - - Supabase Setup - - - - - - */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4'
const supabase = createClient(supabaseUrl, supabaseKey)

/* - - - - - - Refs - - - - - - */
const sortBy = ref({sortByWhat: 'Namn', ascending: true})
const query = ref("")
const getList = ref([])  
const fetchRange = ref({from: 0, to: 99})
const theEnd = ref(false)
const lazyInput = ref(true)

/* - - - - - - Saving on local storage - - - - - - */
watch(lazyInput, () => {
  if (typeof window !== 'undefined') {
    console.log('clietn')
    localStorage.setItem('lazyInput', `${lazyInput.value}`);
    // console.log(localStorage.getItem('lazyInput'));
  }
})

/* - - - - - - Getting from local storage - - - - - - */
if (typeof window !== 'undefined') {
  if(localStorage.getItem('lazyInput')) {
    console.log(localStorage.getItem('lazyInput'));
    lazyInput.value = localStorage.getItem('lazyInput')
  } else {
    lazyInput.value = true
  }
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
    const { data, error } = await supabase
      .from('superlista')
      .select()
      // .ilike('Namn', `%${query.value}%`)
      .ilike('Namn', `%${query.value.replace(/\s+/g, '%')}%`)
      .order(`${sortBy.value.sortByWhat}`, { ascending: sortBy.value.ascending })
      .range(from, to)
      if(error) {
        console.error(error)
        getList.value = null
      }
      if(data) {
        // console.log(data)
        getList.value = data
      }
}  

/* - - - - - - Fetch all list- - - - - - */
const fetchAllList = async () => {
  const { data, error } = await supabase
    .from('superlista')
    .select()
    .ilike('Namn', `%${query.value.replace(/\s+/g, '%')}%`)
    .order(`${sortBy.value.sortByWhat}`, { ascending: sortBy.value.ascending })
    // .range(fetchRange.value.from, fetchRange.value.to)
    // .order(orderBy.value, {ascending: ascending.value})

  if(error) {
    console.error(error)
  }
  if(data) {
    // console.log(data)
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

  if(error) {
    console.log(error)
  } 
  if(data) {
    if(fetchRange.value.from >= 100) {
      getList.value.push(...data)
      // console.log(data)
    }
    if(!data.length > 0) theEnd.value = true
    fetchRange.value.from += 100
    fetchRange.value.to += 100
  }
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.intersectionRatio > 0) {
        // console.log('i see you')
        fetchMoreList()
      }
    })
  })
  document.querySelectorAll('#loader').forEach((section) => {
    observer.observe(section)
  })
})


/* - - - - - - Handling click - - - - - - */
const handleClick = () => {
  sortBy.value.ascending = !sortBy.value.ascending
  console.log('Hello')
  fetchList(0, 99)
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
</style>