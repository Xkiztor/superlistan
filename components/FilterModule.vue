<template>
  <div class="filters w-fit h-fit shadow-md rounded-[1rem]">
    <form class="filter-div first-one">
      <input type="text" placeholder=" Sök" :value="query" @input="$emit('update:query', $event.target.value)"
        class="m-2" title="Lazy">
      <button class="bg-gray-100 text-black m-2" @click="$emit('handleClick')">
        <div v-if="props.sortBy.sortByWhat == 'Pris'">
          <p v-if="props.sortBy.ascending" class="icon-align">
            <Icon class="grayed" name="mdi:sort-numeric-ascending" size="20" />
            Stigande
          </p>
          <p v-if="!props.sortBy.ascending" class="icon-align">
            <Icon class="grayed" name="mdi:sort-numeric-descending" size="20" />
            Fallande
          </p>
        </div>
        <div v-else>
          <p v-if="props.sortBy.ascending" class="icon-align">
            <Icon class="grayed" name="mdi:order-alphabetical-ascending" size="20" />
            Stigande
          </p>
          <p v-if="!props.sortBy.ascending" class="icon-align">
            <Icon class="grayed" name="mdi:order-alphabetical-descending" size="20" />
            Fallande
          </p>
        </div>
      </button>
    </form>

    <form class="filter-div">
      <div class="icon-align">
        <Icon class="grayed" name="mdi:order-bool-ascending" size="20" />
        <p>Sortera efter:</p>
      </div>
      <select name="sortBy" id="sortBySelector" v-model="props.sortBy.sortByWhat" @change="$emit('fetchList')">
        <option value="Namn">Namn</option>
        <option value="Pris">Pris</option>
        <!-- <option value="Typ">Typ</option> -->
      </select>
    </form>
    <form class="filter-div">
      <div class="icon-align">
        <Icon class="grayed" name="ic:round-filter-list" size="20" />
        <p>Filtrera typ:</p>
      </div>
      <select name="filterType" id="filterTypeSelector" v-model="type" :value="props.filterType"
        @input="$emit('update:filterType', $event.target.value)" @change="$emit('fetchList')">
        <!-- <option value="" default disabled>Välj</option> -->
        <option value="">Alla</option>
        <option value="T">Träd</option>
        <option value="B">Barrträd</option>
        <option value="P">Perenner</option>
        <option value="K">Klätterväxt</option>
        <option value="O">Ormbunke</option>
        <option value="G">Gräs</option>
        <!-- <option value="Typ">Typ</option> -->
      </select>
    </form>
    <form class="filter-div">
      <div class="icon-align">
        <Icon class="grayed" name="ic:baseline-filter-alt" size="20" />
        <p>Filtrera bokstav:</p>
      </div>
      <select name="filterLetter" id="filterLetterSelector" v-model="letter" :value="props.filterLetter"
        @input="$emit('update:filterLetter', $event.target.value)" @change="$emit('fetchList')">
        <!-- <option value="" default disabled>Välj</option> -->
        <option value="">Alla</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
        <option value="G">G</option>
        <option value="H">H</option>
        <option value="I">I</option>
        <option value="J">J</option>
        <option value="K">K</option>
        <option value="L">L</option>
        <option value="M">M</option>
        <option value="N">N</option>
        <option value="O">O</option>
        <option value="P">P</option>
        <option value="Q">Q</option>
        <option value="R">R</option>
        <option value="S">S</option>
        <option value="T">T</option>
        <option value="U">U</option>
        <option value="V">V</option>
        <option value="W">W</option>
        <option value="X">X</option>
        <option value="Y">Y</option>
        <option value="Z">Z</option>
        <!-- <option value="Typ">Typ</option> -->
      </select>
    </form>
    <!-- <div class="filter-div bottom-one"> -->

    <!-- <ClientOnly fallbackTag="div"> -->
    <!-- </ClientOnly> -->
    <!-- <button v-if="!hasFetchedAll" class="" @click="$emit('fetchAllList')">Ladda Alla</button> -->
    <!-- <button v-else class="disabled-btn">Ladda Alla</button> -->
    <!-- </div> -->

  </div>
</template>

<script setup>
const props = defineProps(['sortBy', 'query', 'filterType', 'filterLetter', 'hasFetchedAll'])

const type = ref('')
type.value = props.filterType

const letter = ref('')
letter.value = props.filterLetter
// defineProps(['query', 'sortBy'])
defineEmits(['update:query', 'update:filterType', 'update:filterLetter', 'fetchAllList', 'fetchList', 'handleClick'])
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

div.bottom-one {
  grid-template-columns: 1fr;
}

.filters {
  display: grid;
  padding: 1rem;
  width: auto;
  /* position: sticky; */
  top: 6rem;
  z-index: 10;
  background-color: #fff;
}

.grayed {
  color: #383838;
}

.icon-align {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.filter-div {
  /* padding: 0.5rem; */
  padding: 0.5rem 0;
  padding-top: 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: 11fr 10fr;
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

.disabled-btn {
  color: #9ca3af;
}
</style>