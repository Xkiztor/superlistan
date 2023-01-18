<template>
  <div v-if="firstOfDate" class="first-of-date">
    <div class="first-of-date-flex">
      <h1>{{ props.el.created_at.substring(3, 5) }}</h1>
      <p>{{ currentDateCount }} st</p>
      <p>{{ totalCount }} st totalt</p>
      <p>{{ totalPrice }} kr</p>
      <p v-if="!isPersonPage">{{ peopleCount }} personer</p>
    </div>
    <!-- <p>asd</p>
    <p>asd</p>
    <p>asd</p>
    <p>asd</p> -->
    <div v-if="firstOfDate" class="spacer-line"></div>
  </div>
  <div class="list-element" :class="{ 'is-expanded': isExpanded }">
    <div class="the-element" @click="isExpanded = !isExpanded">
      <p>{{ el.created_at }}</p>
      <nuxt-link :to="`/admin/${el.Person.replace(' ', '+')}`">
        <p>{{ el.Person }}</p>
      </nuxt-link>
      <p>{{ el.Namn }}</p>
      <!-- <p :title="`${el.Pris} kr  ${el.Count} st`">{{ el.Pris * el.Count }}</p> -->
      <p>{{ el.Pris }}</p>
      <p>{{ el.Count }}</p>
      <p>{{ el.Pris * el.Count }}</p>
    </div>
    <div v-if="isExpanded" class="expanded-info">
      <Icon v-if="el.Rekommenderas" class="rekommenderas-icon" name="ph:heart-straight-fill" size="20" />
      <a :href="`https://www.google.se/maps/search/${el.Adress}`" target="_blank">{{ el.Adress }}</a>
      <p>{{ el.Phone }}</p>
      <p>{{ el.Mail }}</p>
      <p v-if="el.Comment">{{ el.Comment }}</p>
      <p>platnskola: {{ el.Plantskola }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['el', 'index', 'userData', 'isPersonPage'])

const firstOfDate = ref(false)

const isExpanded = ref(false)

// console.log(props.el.created_at.substring(3, 5));

const listOfDates = props.userData.map(e => e.created_at.substring(3, 5))
if (listOfDates.indexOf(props.el.created_at.substring(3, 5)) === props.index) {
  firstOfDate.value = true
}

const listWithCurrentDate = props.userData.filter(e => e.created_at.substring(3, 5) === props.el.created_at.substring(3, 5))
const currentDateCount = computed(() => {
  return listWithCurrentDate.length
})

const totalCount = computed(() => listWithCurrentDate.map(e => e.Count).reduce((a, b) => a + b, 0))
const totalPrice = computed(() => listWithCurrentDate.map(e => e.Pris * e.Count).reduce((a, b) => a + b, 0))
const peopleCount = computed(() => new Set(listWithCurrentDate.map(item => item.Person)).size)
</script>

<style>
.first-of-date {
  margin-left: 0.5rem;
  margin-top: 1rem;
  width: 100%;
}

.first-of-date-flex {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  width: fit-content;
}

.first-of-date h1 {
  font-size: 2.2rem;
  line-height: 1;
}

.spacer-line {
  width: 100%;
  height: 4px;
  /* margin-top: -0.2rem; */
  border-radius: 1000rem;
  background: #e5e7eb;
  content: "";
  float: left;
  /* position: absolute; */
  position: static;
}


.expanded-info {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.expanded-info>a {
  text-decoration: underline !important;
  color: #0645AD;
}

.the-element>a {
  width: fit-content;
}

.the-element>a:hover {
  text-decoration: underline;
  color: #0645AD;
}

.list-element:hover~.spacer-line {
  display: none;
}
</style>