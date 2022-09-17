<template>
  <div>
    <h1 class="text-4xl">Superlista</h1>
      <div>
        <button class="bg-slate-100 p-2-me m-2 rounded-xl" @click="sortBy.ascending = !sortBy.ascending, getSorted(), getFiltered(query)">
          <p v-if="sortBy.ascending">Stigande</p>
          <p v-if="!sortBy.ascending">Nedåtgående</p>
        </button>

        <select name="sortBy" id="sortBySelector" @change="getSorted(), getFiltered(query)" v-model="sortBy.sortByWhat">
          <option value="name">Namn</option>
          <option value="price">Pris</option>
          <option value="type">Typ</option>
        </select
        >
        <input type="text" placeholder="Sök" v-model="query" class="m-2 bg-gray-100 rounded-lg" @change="getFiltered(query)" title="Tryck Enter för attr söka">

      </div>  

    <!-- <button>Sign in with google</button>
    <div>User details:</div>
    <button>Sign out</button> -->
    <!-- <div v-for="plant in list">
      {{ plant.Typ }}
      {{ plant.VetenskapligtNamn }}
      {{ plant.PrisMedMoms }} kr
    </div> -->
    <transition-group name="list" tag="ul" class="lista">
      <div v-for="plant in list" :key="plant.VetenskapligtNamn + plant.PrisMedMoms">
        <ListElement :plant="plant"/>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import dataTest from "../composables/dataTest-copy2"

const sortBy = ref({sortByWhat: 'price', ascending: true})
const query = ref("")

let getList = dataTest()

// localStorage.setItem("test", "Hello")

// let list = getList.value.sort((a, b) => a.PrisMedMoms - b.PrisMedMoms);

const list = ref([])


const getSorted = () => {
  if(sortBy.value.sortByWhat == 'name') {

    if(sortBy.value.ascending) {

      list.value = getList.value.sort((a, b) => {
        const nameA = a.VetenskapligtNamn.toUpperCase(); // ignore upper and lowercase
        const nameB = b.VetenskapligtNamn.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

    } else {

      list.value = getList.value.sort((a, b) => {
        const nameA = a.VetenskapligtNamn.toUpperCase(); // ignore upper and lowercase
        const nameB = b.VetenskapligtNamn.toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });

    }

    
  } else if (sortBy.value.sortByWhat == 'type') {

    if(sortBy.value.ascending) {

      list.value = getList.value.sort((a, b) => {
        const nameA = a.Typ
        const nameB = b.Typ
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

    } else {

      list.value = getList.value.sort((a, b) => {
        const nameA = a.Typ
        const nameB = b.Typ
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });

    }

  } else if (sortBy.value.sortByWhat == 'price') {
    if(sortBy.value.ascending) {

      list.value = getList.value.sort((a, b) => {
        if (a.PrisMedMoms < b.PrisMedMoms) {
          return -1;
        }
        if (a.PrisMedMoms > b.PrisMedMoms) {
          return 1;
        }
        return 0;
      });

    } else {

      list.value = getList.value.sort((a, b) => {
        if (a.PrisMedMoms > b.PrisMedMoms) {
          return -1;
        }
        if (a.PrisMedMoms < b.PrisMedMoms) {
          return 1;
        }
        return 0;
      });

    }

  }

}



const getFiltered = (query) => {
  // console.log('filtering')
  getSorted()
  if(query) {
    // console.log(query)
    list.value = list.value.filter(foo => foo.VetenskapligtNamn.toUpperCase().includes(query.toUpperCase()))
  } else {
    getSorted()
    // console.log('no query')
  }

}

getSorted()
getFiltered(query.value)

if (typeof window !== 'undefined') {
  console.log('we are running on the client')
  localStorage.setItem('test2', JSON.stringify(list.value));
} else {
  console.log('we are running on the server');
}

if (typeof window !== 'undefined') {
  console.log(JSON.parse(localStorage.getItem('test2')) )
  // localStorage.getItem('test2', JSON.stringify(list.value));
} else {
  console.log('we are running on the server');
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