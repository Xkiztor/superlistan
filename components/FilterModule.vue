<template>
  <div class="filters bg-white w-fit sticky h-fit top-4 z-10 shadow-md rounded-[1rem]">
    <div class="filter-div">
      <p>Ordning:</p>
      <button class="bg-gray-100 text-black m-2" @click="$emit('handleClick')">
        <div v-if="props.sortBy.sortByWhat == 'Pris'">
          <p v-if="props.sortBy.ascending">Stigande (1 - 9)</p>
          <p v-if="!props.sortBy.ascending">Fallande (9 - 1)</p>
        </div>
        <div v-else>
          <p v-if="props.sortBy.ascending">Stigande (A - Z)</p>
          <p v-if="!props.sortBy.ascending">Fallande (Z - A)</p>
        </div>
      </button>
    </div>

    <div class="filter-div">
      <p>Sortera efter:</p>
      <select name="sortBy" id="sortBySelector" v-model="props.sortBy.sortByWhat" @change="$emit('fetchList')">
        <option value="Namn">Namn</option>
        <option value="Pris">Pris</option>
        <!-- <option value="Typ">Typ</option> -->
      </select>
    </div>
    <div class="filter-div">
      <p>Filtrera typ:</p>
      <select name="filterType" id="filterTypeSelector" v-model="type" :value="props.filterType"
        @input="$emit('update:filterType', $event.target.value)" @change="$emit('fetchList')">
        <option value="">Välj</option>
        <option value="T">Träd</option>
        <option value="B">Barrträd</option>
        <option value="P">Perenner</option>
        <option value="K">Klätterväxt</option>
        <option value="O">Ormbunke</option>
        <option value="G">Gräs</option>
        <!-- <option value="Typ">Typ</option> -->
      </select>
    </div>
    <div class="filter-div bottom-one">
      <!-- <ClientOnly fallbackTag="div"> -->
      <input type="text" placeholder=" Sök" :value="query" @input="$emit('update:query', $event.target.value)"
        class="m-2 bg-gray-100 rounded-lg bordery" title="Lazy">
      <!-- </ClientOnly> -->
      <button class="m-2 bg-gray-100" @click="$emit('fetchAllList')">Ladda Alla</button>
    </div>

  </div>
</template>

<script setup>
const props = defineProps(['sortBy', 'query', 'filterType'])

const type = ref('')
type.value = props.filterType
// defineProps(['query', 'sortBy'])
defineEmits(['update:query', 'update:filterType', 'fetchAllList', 'fetchList', 'handleClick'])
</script>

<style>
@media screen and (max-width: 1200px) {
  .filters {
    max-width: 50rem;
    margin: 1rem auto;
  }

  .filter-div {
    gap: 1rem;
  }

}

@media screen and (max-width: 750px) {
  .hide-on-phone {
    display: none;
  }

  .element {
    grid-template-columns: 1fr 40fr 15fr 3fr !important;
  }

  .top-info {
    grid-template-columns: 3fr 40fr 15fr 3fr !important;
  }

  .top-info>.pris {
    place-self: center end;
    margin-right: 0.75rem;
  }
}

@media screen and (max-width:481px) {
  .top-info {
    grid-template-columns: 7fr 40fr 15fr 8fr !important;
  }
}

@media screen and (min-width: 1200px) {
  .filters {
    margin-right: 1rem;
  }

  .bottom-one {
    grid-template-columns: 1fr !important;
    grid-template-rows: 1fr 1fr !important;
  }
}

.filters {
  display: grid;
  padding: 1rem;
  width: auto;
}

.filter-div {
  padding: 0.5rem;
  padding-top: 0;
  display: grid;
  grid-template-columns: 4fr 5fr;
  place-items: center start;

}

.filter-div>p {
  height: fit-content;
}

.filter-div>button,
.filter-div>select {
  width: 100%;
}

.filter-div>button,
.filter-div>select,
.filter-div>input {
  margin: 0.5rem 0;
  width: 100%;
}

.filter-div>select {
  text-align: center;
}
</style>