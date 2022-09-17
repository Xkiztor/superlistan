<template>
  <div>
    <h1 class="text-4xl">Superlista!</h1>
      <div>
        <button class="bg-slate-100 p-2-me m-2 rounded-xl" @click="sortBy.ascending = !sortBy.ascending">
          <p v-if="sortBy.ascending">Stigande</p>
          <p v-if="!sortBy.ascending">Nedåtgående</p>
        </button>

        <select name="sortBy" id="sortBySelector" v-model="sortBy.sortByWhat">
          <option value="VetenskapligtNamn">Namn</option>
          <option value="PrisMedMoms">Pris</option>
          <option value="Typ">Typ</option>
        </select
        >
        <input type="text" placeholder="Sök" v-model="query" class="m-2 bg-gray-100 rounded-lg" title="Tryck Enter för attr söka">

        <nuxt-link class="absolute top-5 right-5" to="/onske-lista">Önskelista</nuxt-link>

      </div>  
      <ClientOnly fallbackTag="div">
        <div v-for="plant in list" :key="plant.ID">
          <ListElement :plant="plant"/>
        </div>
      </ClientOnly>
  </div>
</template>

<script setup>
// if (typeof window !== 'undefined') {
//     if(!JSON.parse(localStorage.getItem('test2'))) {
//       import dataTest from "../composables/dataTest"
//     }
// }
import dataTest from "../composables/dataTest"

const sortBy = ref({sortByWhat: 'VetenskapligtNamn', ascending: true})
const query = ref("")

/// Ref
// if(!JSON.parse(localStorage.getItem('test2')).lengh > 10) {
let getList = ref([])  
  
  if (typeof window !== 'undefined') {
    if(!JSON.parse(localStorage.getItem('test2'))) {
      getList.value = dataTest()
      console.log('from script')
      // console.log(JSON.parse(localStorage.getItem('test2')))
    } else {
      getList.value = JSON.parse(localStorage.getItem('test2'))
      console.log('from local storage')
      // console.log(JSON.parse(localStorage.getItem('test2')).lenght)
    // let getList = JSON.parse(localStorage.getItem('test2'))
    }
  }






// localStorage.setItem("test", "Hello")

// let list = getList.value.sort((a, b) => a.PrisMedMoms - b.PrisMedMoms);

const list = computed(() => {
  // const filter = () => {
  //   if(query.value) {
  //     return getList.value.filter(foo => foo.VetenskapligtNamn.toUpperCase().includes(query.value.toUpperCase()))
  //     } else return getList.value
  //   }  
  let filteredArray = query.value 
    ? getList.value.filter(foo => foo.VetenskapligtNamn.toUpperCase().includes(query.value.toUpperCase()))
    : getList.value
  
  // const filteredArray = ref(filter())

  // return getList.value
  // return filteredArray
  return filteredArray.sort((a, b) => {
    if(sortBy.value.ascending) {
      return a[sortBy.value.sortByWhat] > b[sortBy.value.sortByWhat] ? 1 : -1
    } else {
      return a[sortBy.value.sortByWhat] < b[sortBy.value.sortByWhat] ? 1 : -1
    }
  })
})

if (typeof window !== 'undefined') {
  // console.log('we are running on the client')
  localStorage.setItem('test2', JSON.stringify(list.value));
} else {
  // console.log('we are running on the server');
}

if (typeof window !== 'undefined') {
  console.log(JSON.parse(localStorage.getItem('test2')) )
  // localStorage.getItem('test2', JSON.stringify(list.value));
} else {
  // console.log('we are running on the server');
}


// const { yee } = getList()s

// console.log(list?.value)

// console.log(list)
// console.log(yee)


</script>


<style>
.p-2-me {
  padding: 0.5px 8px;
}

.lista {
  transition: all 1s
}
</style>