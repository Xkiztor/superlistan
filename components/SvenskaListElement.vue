<template>
  <li class="svenskt-element" @click="goToList()">
    <p class="svenskt-namn">
      <!-- <p v-if="plant.Svenskt" class="svenskt-namn" :title="plant.Namn"> -->
      {{ plant.SvensktSlakte }}
    </p>
    <p class="svenskt-namn">
      <!-- <p v-if="plant.Svenskt" class="svenskt-namn" :title="plant.Namn"> -->
      {{ plant.Svenskt }}
    </p>
    <p class="vetenskapligt-namn">
      <!-- <p class="vetenskapligt-namn" :title="plant.Vetenskapligt" @click="goToList()"> -->
      <!-- <nuxt-link to="/lista" >
          {{ plant.Vetenskapligt }}
        </nuxt-link> -->
      {{ plant.Vetenskapligt }}
    </p>
  </li>
</template>

<script setup>
const props = defineProps({
  plant: Object,
})

const state = useGlobalState()

// const plant = {
//   Vetenskapligt: 'Acer griseum',
//   Svenskt: 'kopparlönn',
//   SvensktSlakte: 'lönn'
// }

const goToList = () => {
  state.query.value = props.plant.Vetenskapligt
  navigateTo('/lista')
}
</script>

<style>
.svenskt-element {
  display: grid;
  border-radius: 1rem;
  /* max-width: 90rem; */
  min-width: 100%;
  overflow: hidden;
  min-width: 0px;
  padding-left: 1rem;
  /* width: fit-content; */
  /* background-color: var(--element-bg-light); */
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center start;
  transition: all 100ms;
  height: 32px;
  z-index: 2;
  position: relative;
  border: 1px solid transparent;
  cursor: pointer;
}

.svenskt-element p {
  margin-right: 0.5rem;
}

.dark .svenskt-element {
  /* background: ; */
  color: var(--text-dark);
}


.svenskt-element>p {
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 0px;
  white-space: nowrap;
  max-width: 90%;
}

.svenskt-element:hover {
  background: var(--element-top-hover-light);
}

.dark .svenskt-element:hover {
  background: var(--element-top-hover-dark);
}
</style>