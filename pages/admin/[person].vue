<template>
  <div class="admin-bg">
    <nuxt-link class="back" to="/admin/"><button>Tillbaka</button></nuxt-link>
    <h1 class="name-title">{{ personName }}</h1>
    <div class="statistik">
      <p>{{ filteredArray[0].Comment }}</p>
      <p>{{ filteredArray[0].Phone }}</p>
      <a :href="`https://www.google.se/maps/search/${filteredArray[0].Adress}`" target="_blank">{{
        filteredArray[0].Adress
      }}</a>

    </div>
    <ul class="list-container">
      <li v-for="(item, index) in filteredArray">
        <AdminListElement :el="item" :index="index" :userData="filteredArray" :isPersonPage="true" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core'

const rawUserData = useStorage('raw-user-data', [])

const { person } = useRoute().params

const personName = person.replace('+', ' ')

const filteredArray = computed(() => {
  return rawUserData.value.filter(e => e.Person.replace(/\s/g, "") === personName.replace(/\s/g, ""))
})

console.log(rawUserData.value);
console.log(personName.replace(' ', ''));

watchEffect(() => {
  console.log(filteredArray.value);
})
</script>

<style>
li {
  list-style: none;
}

.name-title {
  font-size: 4rem;
  text-align: center;
}
</style>