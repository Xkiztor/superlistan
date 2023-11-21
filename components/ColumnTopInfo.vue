<template>
  <div class="top-info">
    <p></p>
    <client-only placeholder="Namn">
      <p v-if="isAboveAverage" @click="handleSort('Namn')" class="name clickable">
        Vetenskapligt Namn
        <i v-if="state.sortByWhat.value === 'Namn' && !isOnskeLista">
          <Icon v-if="state.sortAscending.value" name="material-symbols:arrow-drop-down-rounded" size="26" />
          <Icon v-else name="material-symbols:arrow-drop-up-rounded" size="26" />
        </i>
      </p>
      <p v-else @click="handleSort('Namn')" class="name clickable">
        Namn
        <i v-if="state.sortByWhat.value === 'Namn' && !isOnskeLista">
          <Icon v-if="state.sortAscending.value" name="material-symbols:arrow-drop-down-rounded" size="26" />
          <Icon v-else name="material-symbols:arrow-drop-up-rounded" size="26" />
        </i>
      </p>
    </client-only>
    <!-- <p v-if="props.isOnskeLista == false" class=""></p> -->
    <p v-if="props.isOnskeLista == false" @click="handleSort('Höjd')" class="hide-on-phone clickable">
      Höjd
      <i v-if="state.sortByWhat.value === 'Höjd' && !isOnskeLista">
        <Icon v-if="state.sortAscending.value" name="material-symbols:arrow-drop-down-rounded" size="26" />
        <Icon v-else name="material-symbols:arrow-drop-up-rounded" size="26" />
      </i>
    </p>
    <p v-if="props.isOnskeLista == false" @click="handleSort('Kruka')" class="hide-on-phone clickable">
      Kruka
      <i v-if="state.sortByWhat.value === 'Kruka' && !isOnskeLista">
        <Icon v-if="state.sortAscending.value" name="material-symbols:arrow-drop-down-rounded" size="26" />
        <Icon v-else name="material-symbols:arrow-drop-up-rounded" size="26" />
      </i>
    </p>
    <p v-if="props.isOnskeLista == false" @click="handleSort('MinOrder')" class="hide-on-phone clickable"
      title="minsta order">
      Min.
      <i v-if="state.sortByWhat.value === 'MinOrder' && !isOnskeLista">
        <Icon v-if="state.sortAscending.value" name="material-symbols:arrow-drop-down-rounded" size="26" />
        <Icon v-else name="material-symbols:arrow-drop-up-rounded" size="26" />
      </i>
    </p>
    <p v-if="props.isOnskeLista == true" class="hide-on-phone"></p>
    <p v-if="props.isOnskeLista == true" class="hide-on-phone">Antal</p>
    <p v-if="props.isOnskeLista == true" class="hide-on-phone"></p>
    <p @click="handleSort('Pris')" class="pris clickable">
      Pris
      <i v-if="state.sortByWhat.value === 'Pris' && !isOnskeLista">
        <Icon v-if="state.sortAscending.value" name="material-symbols:arrow-drop-down-rounded" size="26" />
        <Icon v-else name="material-symbols:arrow-drop-up-rounded" size="26" />
      </i>
    </p>
    <div class="hide-on-phone"></div>
  </div>
</template>

<script setup>
const props = defineProps(['isOnskeLista'])
const state = useGlobalState()
const isAboveAverage = useMediaQuery('(min-width: 481px)')


const handleSort = (what) => {
  if (state.sortByWhat.value === what) {
    state.sortAscending.value = !state.sortAscending.value
  } else {
    state.sortByWhat.value = what
  }
}
</script>

<style>
.top-info {
  display: grid;
  grid-template-columns: 5% 50.5% 18% 9% 6% 9% 2%;
  place-items: center start;
  padding: 5px;
  border-bottom: 1px solid var(--border-color-light);
  /* color: rgb(63, 63, 63); */
}

.dark .top-info {
  color: var(--text-mute-dark);
  border-color: var(--border-color-dark);
}

.dark .top-info>p:hover {
  color: var(--text-dark);
}

@media screen and (max-width: 750px) {
  .top-info {
    grid-template-columns: 5fr 57fr 15fr !important;
  }

  .top-info>.pris {
    margin-right: 0.75rem;
  }

  .name {
    margin-left: 0.8rem;
  }
}

@media screen and (max-width:481px) {
  .top-info {
    place-self: center end;
    grid-template-columns: 5fr 50fr 15fr !important;
  }

  .name {
    margin-left: 1.4rem;
  }
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