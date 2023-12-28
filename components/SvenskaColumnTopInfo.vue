<template>
  <div class="svenska-top-info">
    <p @click="handleSort('SvensktSlakte')" class="name clickable">
      Svenskt släkte
      <i v-if="state.svenskaSortByWhat.value === 'SvensktSlakte'"
        @click="state.svenskaSortAscending.value = !state.svenskaSortAscending.value">
        <Icon v-if="state.svenskaSortAscending.value" name="material-symbols:arrow-drop-down-rounded" size="26" />
        <Icon v-else name="material-symbols:arrow-drop-up-rounded" size="26" />
      </i>
    </p>
    <p @click="handleSort('Svenskt')" class="name clickable">
      Svenskt namn
      <i v-if="state.svenskaSortByWhat.value === 'Svenskt'"
        @click="state.svenskaSortAscending.value = !state.svenskaSortAscending.value">
        <Icon v-if="state.svenskaSortAscending.value" name="material-symbols:arrow-drop-down-rounded" size="26" />
        <Icon v-else name="material-symbols:arrow-drop-up-rounded" size="26" />
      </i>
    </p>
    <p @click="handleSort('Vetenskapligt')" class="name clickable">
      Vetenskapligt namn
      <i v-if="state.svenskaSortByWhat.value === 'Vetenskapligt'"
        @click="state.svenskaSortAscending.value = !state.svenskaSortAscending.value">
        <Icon v-if="state.svenskaSortAscending.value" name="material-symbols:arrow-drop-down-rounded" size="26" />
        <Icon v-else name="material-symbols:arrow-drop-up-rounded" size="26" />
      </i>
    </p>
  </div>
</template>

<script setup>
// const props = defineProps([])
const state = useGlobalState()


const handleSort = (what) => {
  if (state.svenskaSortByWhat.value === what) {
    state.svenskaSortAscending.value = !state.svenskaSortAscending.value
  } else {
    state.svenskaSortByWhat.value = what
  }
}
</script>

<style>
.svenska-top-info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center start;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 0.5rem;
  padding-left: 1rem;
  border-bottom: 1px solid var(--border-color-light);
  /* color: rgb(63, 63, 63); */
}

.dark .svenska-top-info {
  color: var(--text-mute-dark);
  border-color: var(--border-color-dark);
}

.dark .top-info>p:hover {
  color: var(--text-dark);
}


.clickable,
.clickable>* {
  cursor: pointer;
}

.clickable {
  position: relative;
}

.clickable>svg,
.clickable>i {
  position: absolute;
  right: -1.5rem;
}
</style>