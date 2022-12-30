<template>
  <div class="top-info">
    <p></p>
    <client-only placeholder="Namn">
      <p v-if="isAboveAverage" class="name">Vetenskapligt Namn</p>
      <p v-else class="name">Namn</p>
    </client-only>
    <!-- <p v-if="props.isOnskeLista == false" class=""></p> -->
    <p v-if="props.isOnskeLista == false" class="hide-on-phone">Höjd</p>
    <p v-if="props.isOnskeLista == false" class="hide-on-phone">Kruka</p>
    <p v-if="props.isOnskeLista == false" class="hide-on-phone" title="minsta order">Min.</p>
    <p v-if="props.isOnskeLista == true" class=""></p>
    <p v-if="props.isOnskeLista == true" class="hide-on-phone">Antal</p>
    <p class="pris">Pris</p>
    <div></div>
  </div>
</template>

<script setup>
const props = defineProps(['isOnskeLista'])

const isAboveAverage = useMediaQuery('(min-width: 481px)')

</script>

<style>
.top-info {
  display: grid;
  /* max-width: 30rem; */
  /* grid-template-columns: 5fr 40fr 6fr 10fr 7fr 2fr 5fr; */
  grid-template-columns: 6% 50% 17% 8% 7% 5% 5%;
  place-items: center start;
  padding: 5px;
  /* margin-left: 0.75rem; */
  border-bottom: 1px solid #e5e7eb;
  color: rgb(63, 63, 63);
}

@media screen and (max-width: 750px) {
  .top-info {
    grid-template-columns: 3fr 40fr 15fr 8fr !important;
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
    grid-template-columns: 7fr 40fr 15fr 8fr !important;
  }

  .name {
    margin-left: 1.4rem;
  }
}
</style>