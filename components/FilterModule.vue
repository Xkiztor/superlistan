<template>
  <div class="filters w-fit h-fit shadow-md rounded-[1rem]">
    <div class="filter-div first-one">
      <input type="text" placeholder=" Sök" v-model.prevent="state.query.value" class="m-2" title="Sök">
      <button class="bg-gray-100 text-black m-2" @click.prevent="state.switchFilterDirection()">
        <div v-if="state.sortByWhat.value == 'Pris'">
          <p v-if="state.sortAscending.value" class="icon-align">
            <Icon class="grayed" name="mdi:sort-numeric-ascending" size="23" />
            Stigande
          </p>
          <p v-if="!state.sortAscending.value" class="icon-align">
            <Icon class="grayed" name="mdi:sort-numeric-descending" size="23" />
            Fallande
          </p>
        </div>
        <div v-else>
          <p v-if="state.sortAscending.value" class="icon-align">
            <Icon class="grayed" name="mdi:order-alphabetical-ascending" size="23" />
            Stigande
          </p>
          <p v-if="!state.sortAscending.value" class="icon-align">
            <Icon class="grayed" name="mdi:order-alphabetical-descending" size="23" />
            Fallande
          </p>
        </div>
      </button>
    </div>

    <form class="filter-div">
      <div class="icon-align">
        <Icon class="grayed" name="mdi:order-bool-ascending" size="20" />
        <p>Sortera efter:</p>
      </div>
      <select name="sortBy" id="sortBySelector" v-model="state.sortByWhat.value">
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
      <select name="filterType" id="filterTypeSelector" v-model="state.typeFilter.value">
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
    <!-- <h1>Filterar ikoner:</h1> -->
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.favoriteFilter.value">
      <div class="icon-align">
        <Icon class="grayed rekommenderas-icon" name="ph:heart-straight-fill" size="20" />
        <p>Favorit</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.edibleFilter.value">
      <div class="icon-align">
        <Icon class="grayed edible-icon" name="twemoji:fork-and-knife" size="20" />
        <p>Ätlig</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.commentFilter.value">
      <div class="icon-align">
        <Icon class="grayed kommentar-icon" name="majesticons:comment-2-text" size="20" />
        <p>Kommentar</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.linkFilter.value">
      <div class="icon-align">
        <Icon class="grayed länk-icon" name="mdi:link-variant" size="20" />
        <p>Länk</p>
      </div>
    </form>

    <transition-group tag="div" name="tags" class="filter-tags">
      <div v-if="state.typeFilter.value" key="typeFilter">
        <div v-if="state.typeFilter.value == 'T'">Träd</div>
        <div v-if="state.typeFilter.value == 'B'">Barrräd</div>
        <div v-if="state.typeFilter.value == 'P'">Perenner</div>
        <div v-if="state.typeFilter.value == 'K'">Klätterväxter</div>
        <div v-if="state.typeFilter.value == 'O'">Ormbunke</div>
        <div v-if="state.typeFilter.value == 'G'">Gräs</div>
        <button @click="state.typeFilter.value = ''">
          <Icon class="grayed" name="ion:close-round" size="14" />
        </button>
      </div>
      <div v-if="state.query.value" key="query">
        "{{ state.query.value }}"
        <button @click="state.query.value = ''">
          <Icon class="grayed" name="ion:close-round" size="14" />
        </button>
      </div>
      <div v-if="state.favoriteFilter.value" key="favoriteFilter">
        Favoriter
        <button @click="state.favoriteFilter.value = false">
          <Icon class="grayed" name="ion:close-round" size="14" />
        </button>
      </div>
      <div v-if="state.edibleFilter.value" key="edibleFilter">
        Ätliga
        <button @click="state.edibleFilter.value = false">
          <Icon class="grayed" name="ion:close-round" size="14" />
        </button>
      </div>
      <div v-if="state.commentFilter.value" key="commentFilter">
        Kommentar
        <button @click="state.commentFilter.value = false">
          <Icon class="grayed" name="ion:close-round" size="14" />
        </button>
      </div>
      <div v-if="state.linkFilter.value" key="linkFilter">
        Länk
        <button @click="state.linkFilter.value = false">
          <Icon class="grayed" name="ion:close-round" size="14" />
        </button>
      </div>
      <!-- <div v-if="state.sortByWhat.value">{{ state.sortByWhat.value }}</div> -->
    </transition-group>
    <!-- <form class="filter-div">
      <div class="icon-align">
        <Icon class="grayed" name="ic:baseline-filter-alt" size="20" />
        <p>Filtrera bokstav:</p>
      </div>
      <select name="filterLetter" id="filterLetterSelector" v-model="letterFilter">
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
Y">Y</option>
        <option value="Z">Z</option>
      </select>
    </form> -->
    <!-- <div class="filter-div bottom-one"> -->
  </div>
</template>

<script setup>
defineEmits(['fetchList', 'handleClick'])
const state = useGlobalState()

function handleTest() {
  console.log('chicken');
}
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
    display: none !important;
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
  color: #454545;
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

input.checkboxer {
  /* height: 1rem; */
  width: 1.2rem;
  height: 1.2rem;
  margin: 0.2rem;
  border-radius: 0.5rem;
  /* margin-right: 1rem; */
  /* appearance: none; */
}

.check-filter-div {
  display: grid;
  margin: 0.2rem;
  grid-template-columns: 10% 90%;
  place-items: center start;
  margin-left: 0;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.filter-tags:has(+ div) {
  margin-top: 1rem;
}

.filter-tags>div {
  padding: 0.3rem 0.6rem;
  background-color: #ebedf1;
  margin: 0.1rem;
  width: fit-content;
  border-radius: 10000rem;
}

/* .filter-div>div:nth-child(-n + 1) {
  margin-top: 1rem;
} */

.filter-tags>div>button {
  background: none;
  border: none;
  box-shadow: none;
  padding: 0;
  margin: 0;
}

.filter-tags>div>div {
  display: inline;
}

.tags-move,
.tags-enter-active,
.tags-leave-active {
  transition: all 0.5s cubic-bezier(.58, 1.02, 1, -1.17);
}

.tags-enter-from,
.tags-leave-to {
  opacity: 0;
  transform: translateY(-3.2rem);
}


.tags-leave-active {
  position: absolute;
}
</style>