<script setup lang='ts'>
const state = useGlobalState()

let plantList = [
  {
    id: 1,
    Vetenskapligt: 'Acer griseum',
    Svenskt: 'kopparlönn',
    SvensktSlakte: 'lönn'
  },
  {
    id: 2,
    Vetenskapligt: 'Acer campestre',
    Svenskt: 'naverlönn',
    SvensktSlakte: 'lönn'
  },
  {
    id: 3,
    Vetenskapligt: 'Abies koreana',
    Svenskt: 'koreagran',
    SvensktSlakte: 'gran'
  },
  {
    id: 4,
    Vetenskapligt: 'Fraxinus ornus',
    Svenskt: 'mannaask',
    SvensktSlakte: 'ask'
  },
  {
    id: 5,
    Vetenskapligt: 'Magnolia obovata ',
    Svenskt: 'junimagnolia',
    SvensktSlakte: 'magnolia'
  },
  {
    id: 6,
    Vetenskapligt: 'Sorbus ulleungensis',
    Svenskt: 'ullungrönn',
    SvensktSlakte: 'rönn'
  },

]

const computedList = computed(() => {
  console.log('compute');

  let newList = plantList

  //test
  // for (let i = 0; i < 3; i++) {
  //   newList = newList.concat(newList)
  // }

  newList = newList.filter(item => item.Svenskt.toLowerCase().includes(state.svenskaQuery.value.toLowerCase()))

  newList = newList.sort((a, b) => {
    if (state.svenskaSortByWhat.value == 'SvensktSlakte') {
      if (a.SvensktSlakte.toLowerCase() < b.SvensktSlakte.toLowerCase()) {
        if (state.svenskaSortAscending.value) return -1
        else return 1
      }
      if (a.SvensktSlakte.toLowerCase() > b.SvensktSlakte.toLowerCase()) {
        if (state.svenskaSortAscending.value) return 1
        else return -1
      }
      return 0
    } else if (state.svenskaSortByWhat.value == 'Svenskt') {
      if (a.Svenskt.toLowerCase() < b.Svenskt.toLowerCase()) {
        if (state.svenskaSortAscending.value) return -1
        else return 1
      }
      if (a.Svenskt.toLowerCase() > b.Svenskt.toLowerCase()) {
        if (state.svenskaSortAscending.value) return 1
        else return -1
      }
      return 0
    } else if (state.svenskaSortByWhat.value == 'Vetenskapligt') {
      if (a.Vetenskapligt.toLowerCase() < b.Vetenskapligt.toLowerCase()) {
        if (state.svenskaSortAscending.value) return -1
        else return 1
      }
      if (a.Vetenskapligt.toLowerCase() > b.Vetenskapligt.toLowerCase()) {
        if (state.svenskaSortAscending.value) return 1
        else return -1
      }
      return 0
    }
  })

  return newList
})


const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(computedList, {
  itemHeight: 32,
  overscan: 25,
})
</script>


<template>
  <div class="namn-list-align">

    <div class="namn-list-bg sidebar">
      <h1>Svenska namn</h1>
      <p>Här kan man hitta de växter man letar efter via det svenska namnet.</p>
      <p class="spacer"></p>
      <p>Klickar man på namnet kommer man till listan med den sökningen.</p>
      <p class="spacer"></p>
      <p>Tänk på att det finns fler växter på listan som inte syns här, då de inte har något svenskt namn</p>
      <!-- <p class="spacer"></p>
      <p>Sökrutan nedan söker på de svenska namnen</p> -->
      <div class="filter-div search-filter-div" :class="{ 'has-content': state.svenskaQuery.value }">
        <input type="text" placeholder=" Sök på svenskt namn" v-model.prevent="state.svenskaQuery.value" class="m-2"
          title="Sök">
        <button @click="state.svenskaQuery.value = ''">
          <Icon name="ion:close-round" />
        </button>
      </div>
    </div>

    <div class="namn-list-bg list">
      <SvenskaColumnTopInfo :isOnskeLista="false" />
      <div v-bind="containerProps" class="container-props">
        <ul v-bind="wrapperProps" class="wrapper-props">
          <SvenskaListElement v-for="{ index, data } in list" :key="data.id" :plant="data" />
        </ul>
      </div>
      <!-- <SvenskaListElement /> -->
    </div>
  </div>
</template>


<style>
.namn-list-align {
  width: 100%;
  height: 100%;
  padding-bottom: 1rem;
  display: grid;
  /* grid-template-columns: 38.2% 61.8%; */
  /* grid-template-columns: 1fr 1.618fr; */
  grid-template-columns: 1fr 3.236fr;
  grid-template-rows: 1fr;
  gap: 1rem;
  /* place-items: start center; */
  max-width: 115rem;
}

.namn-list-bg {
  height: auto;
  border-radius: 1rem;
  padding: 1rem;
  /* width: fit-content; */
  width: 100%;
  margin: 0 auto;
  background: var(--element-bg-light);
}

.namn-list-bg .container-props {
  transition: none;

  height: 100%;

  padding: 0;
  padding-right: 0.5rem;
  width: auto;
  /* max-height: 100vh !important; */
  overflow: hidden;
}

.namn-list-bg .wrapper-props {
  transition: none;
  position: relative;
  /* padding-bottom: 5rem; */
}


.namn-list-bg.list {
  padding: 0;
  padding-top: 0.5rem;
  /* height: 100%; */
  height: auto;
  overflow: hidden;
}


.dark .namn-list-bg {
  background: var(--element-bg-dark);
  color: var(--text-mute-dark);
}

.namn-list-bg.sidebar {
  height: fit-content;
}

.namn-list-bg.sidebar * {
  color: var(--text-light);
}

.dark .namn-list-bg.sidebar * {
  color: var(--text-dark);
}

.namn-list-bg.sidebar {
  margin-bottom: 1rem;
}

.namn-list-bg.sidebar h1 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.namn-list-bg.sidebar .filter-div {
  padding: 0;
  margin-top: 0.75rem;
}

.namn-list-bg.sidebar .filter-div>input {
  margin: 0;
}

.namn-list-bg .spacer {
  height: 0.5rem;
}
</style>