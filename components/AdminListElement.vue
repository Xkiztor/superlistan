<template>
  <div v-if="firstOfDate" class="first-of-date">
    <h1>{{ props.el.created_at.substring(3, 5) }}</h1>
    <p>{{ currentDateCount }} st</p>
    <p>{{ totalCount }} st totalt</p>
    <p>{{ totalPrice }} kr</p>
    <p>{{ peopleCount }} personer</p>
    <!-- <p>asd</p>
    <p>asd</p>
    <p>asd</p>
    <p>asd</p> -->
  </div>
  <div v-if="firstOfDate" class="spacer-line"></div>
  <div class="list-element">
    <div class="the-element" @click="isExpanded = !isExpanded">
      <p>{{ el.created_at }}</p>
      <p>{{ el.Person }}</p>
      <p>{{ el.Namn }}</p>
      <!-- <p :title="`${el.Pris} kr  ${el.Count} st`">{{ el.Pris * el.Count }}</p> -->
      <p>{{ el.Pris }}</p>
      <p>{{ el.Count }}</p>
      <p>{{ el.Pris * el.Count }}</p>
    </div>
    <div v-if="isExpanded" class="expanded-info">
      <p>{{ el.Adress }}</p>
      <p>{{ el.Phone }}</p>
      <p>{{ el.Mail }}</p>
      <p v-if="el.Comment">{{ el.Comment }}</p>
      <p>platnskola: {{ el.Plantskola }}</p>
      <Icon v-if="el.Rekommenderas" class="rekommenderas-icon" name="ph:heart-straight-fill" size="20" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['el', 'index', 'userData'])

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
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  width: fit-content;
}

.spacer-line {
  width: 100%;
  height: 4px;
  /* margin-top: -0.2rem; */
  border-radius: 1000rem;
  background: #e5e7eb;
  content: "";
  float: left;
}

.first-of-date>h1 {
  font-size: 2.2rem;
  line-height: 1;
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
</style>