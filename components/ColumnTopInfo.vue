<template>
  <div class="top-info md:max-w-4xl xl:max-w-4xl">
    <p></p>
    <p>Vetenskapligt Namn</p>
    <p v-if="props.isOnskeLista == false" class="hide-on-phone">Storlek</p>
    <p v-if="props.isOnskeLista == false" class="hide-on-phone">Krukstorlek</p>
    <p v-if="props.isOnskeLista == true" class=""></p>
    <p v-if="props.isOnskeLista == true" class="">Antal</p>
    <p class="ml-14 pris">Pris</p>
    <div></div>
  </div>
</template>

<script setup>
const props = defineProps(['isOnskeLista'])
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
</style>