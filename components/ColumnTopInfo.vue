<template>
  <div class="top-info" :class="{ onskelist: isOnskeLista }">
    <p></p>
    <client-only placeholder="Namn">
      <p v-if="isAboveAverage" @click="handleSort('Namn')" class="name clickable">
        Vetenskapligt Namn
        <i v-if="state.sortByWhat.value === 'Namn' && !isOnskeLista">
          <Icon v-if="state.sortAscending.value" name="typcn:arrow-sorted-down" size="20" />
          <Icon v-else name="typcn:arrow-sorted-up" size="20" />
        </i>
        <i v-else-if="!isOnskeLista" class="unsorted">
          <Icon name="typcn:arrow-unsorted" size="16" />
        </i>
      </p>
      <p v-else @click="handleSort('Namn')" class="name clickable">
        Namn
        <i v-if="state.sortByWhat.value === 'Namn' && !isOnskeLista">
          <Icon v-if="state.sortAscending.value" name="typcn:arrow-sorted-down" size="20" />
          <Icon v-else name="typcn:arrow-sorted-up" size="20" />
        </i>
        <i v-else-if="!isOnskeLista" class="unsorted">
          <Icon name="typcn:arrow-unsorted" size="16" />
        </i>
      </p>
    </client-only>
    <!-- <p v-if="props.isOnskeLista == false" class=""></p> -->
    <p class="hide-on-phone"></p>
    <p v-if="props.isOnskeLista == false" class="hide-on-phone">
      Höjd
      <!-- <i v-if="state.sortByWhat.value === 'Höjd' && !isOnskeLista">
        <Icon v-if="state.sortAscending.value" name="material-symbols:arrow-drop-down-rounded" size="26" />
        <Icon v-else name="material-symbols:arrow-drop-up-rounded" size="26" />
      </i> -->
    </p>
    <p v-if="props.isOnskeLista == false" class="hide-on-phone">
      Kruka
      <!-- <i v-if="state.sortByWhat.value === 'Kruka' && !isOnskeLista">
        <Icon v-if="state.sortAscending.value" name="material-symbols:arrow-drop-down-rounded" size="26" />
        <Icon v-else name="material-symbols:arrow-drop-up-rounded" size="26" />
      </i> -->
    </p>
    <p v-if="props.isOnskeLista == false" class="hide-on-phone clickable" title="minsta order">
      Min.
      <!-- <i v-if="state.sortByWhat.value === 'MinOrder' && !isOnskeLista">
        <Icon v-if="state.sortAscending.value" name="material-symbols:arrow-drop-down-rounded" size="26" />
        <Icon v-else name="material-symbols:arrow-drop-up-rounded" size="26" />
      </i> -->
    </p>
    <p v-if="props.isOnskeLista == true" class="hide-on-phone"></p>
    <p v-if="props.isOnskeLista == true" class="hide-on-phone">Antal</p>
    <p v-if="props.isOnskeLista == true" class="hide-on-phone"></p>
    <p @click="handleSort('Pris')" class="pris clickable">
      Pris
      <i v-if="state.sortByWhat.value === 'Pris' && !isOnskeLista">
        <Icon v-if="state.sortAscending.value" name="typcn:arrow-sorted-down" size="20" />
        <Icon v-else name="typcn:arrow-sorted-up" size="20" />
      </i>
      <i v-else-if="!isOnskeLista" class="unsorted">
        <Icon name="typcn:arrow-unsorted" size="16" />
      </i>
    </p>
    <div class="hide-on-phone"></div>
  </div>
</template>

<script setup>
const props = defineProps(['isOnskeLista']);
const state = useGlobalState();
const isAboveAverage = useMediaQuery('(min-width: 481px)');

const handleSort = (what) => {
  if (state.sortByWhat.value === what) {
    state.sortAscending.value = !state.sortAscending.value;
  } else {
    state.sortByWhat.value = what;
  }
};
</script>

<style>
.top-info {
  display: grid;
  /* grid-template-columns: 5% 50.5% 18% 9% 6% 9% 2%; */
  grid-template-columns: 4fr 45fr 13fr 19fr 10fr 8fr 8fr 5fr;
  place-items: center start;
  padding: 5px;
  padding-bottom: 8px;
  grid-column: 2/3;
}

.top-info.onskelist {
  grid-template-columns: 5fr 45fr 13fr 19fr 10fr 8fr 8fr 5fr;
}

.dark .top-info {
  color: var(--text-mute-dark);
  border-color: var(--border-color-dark);
}

.dark .top-info > p:hover {
  color: var(--text-dark);
}

@media screen and (max-width: 750px) {
  .top-info {
    grid-template-columns: 3fr 50fr 10fr !important;
  }

  .top-info > .pris {
    margin-right: 0.75rem;
  }

  .name {
    margin-left: 0.8rem;
  }
}

@media screen and (max-width: 481px) {
  .top-info {
    grid-template-columns: 3fr 40fr 10fr !important;
  }

  .name {
    /* margin-left: 1.4rem; */
  }
}

.top-info .unsorted {
  opacity: 0.6;
}

.clickable,
.clickable > * {
  cursor: pointer;
}

.clickable {
  position: relative;
}

.clickable > svg,
.clickable > i {
  position: absolute;
  right: -1.5rem;
}
</style>
