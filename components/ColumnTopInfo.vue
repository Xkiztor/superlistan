<template>
  <div class="top-info md:max-w-4xl xl:max-w-4xl">
    <p></p>
    <client-only placeholder="Namn">
      <p v-if="isAboveAverage" class="name">Vetenskapligt Namn</p>
      <p v-else class="name">Namn</p>
    </client-only>
    <!-- <p v-if="props.isOnskeLista == false" class=""></p> -->
    <p v-if="props.isOnskeLista == false" class="hide-on-phone">Storlek</p>
    <p v-if="props.isOnskeLista == false" class="hide-on-phone">Krukstorlek</p>
    <p v-if="props.isOnskeLista == true" class=""></p>
    <p v-if="props.isOnskeLista == true" class="hide-on-phone">Antal</p>
    <p class="ml-14 pris">Pris</p>
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
  grid-template-columns: 4fr 38fr 15fr 8fr 10fr 3fr;
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