<template>
  <!-- <div v-if="firstOfDate" class="first-of-date">
    <div class="first-of-date-flex">
      <h1>{{ props.el.created_at.substring(8, 10) }}</h1>
      <p>{{ currentDateCount }} st</p>
      <p>{{ totalCount }} st totalt</p>
      <p>{{ totalPrice }} kr</p>
      <p v-if="!isPersonPage">{{ peopleCount }} personer</p>
    </div>
    <div v-if="firstOfDate" class="spacer-line"></div>
  </div> -->
  <div class="slakte-list-element" :class="{ 'is-expanded': isExpanded }">
    <div class="slakte-the-element" @click="isExpanded = !isExpanded">
      <p>{{ el.Plantskola }}</p>
      <p>{{ el.Kruka }}</p>
      <p>{{ el.Höjd }}</p>
      <!-- <p>{{ el.created_at }}</p> -->
      <a
        :href="`https://www.google.com/search?q=${el.Namn.replace(/\s+/g, '+')}&tbm=isch&dpr=1`"
        target="_blank"
        >{{ el.Namn }}</a
      >
      <p>{{ el.Count }}</p>
      <nuxt-link
        :to="`/admin/${$route.params.year}/kund/${el.Person.replace(' ', '+')}`"
        class="no-link"
      >
        <p>{{ el.Person }}</p>
      </nuxt-link>
      <!-- <p>{{ el.Pris }}</p> -->
      <!-- <p>{{ el.Pris * el.Count }}</p> -->
    </div>
    <div v-if="isExpanded" class="expanded-info">
      <Icon
        v-if="el.Rekommenderas"
        class="rekommenderas-icon"
        name="ph:heart-straight-fill"
        size="20"
      />
      <a :href="`https://www.google.se/maps/search/${el.Adress}`" target="_blank">{{
        el.Adress
      }}</a>
      <p>{{ el.Phone }}</p>
      <p>{{ el.Mail }}</p>
      <p v-if="el.Comment">{{ el.Comment }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['el', 'index', 'userData', 'isPersonPage']);

const firstOfDate = computed(() => {
  if (listOfDates.indexOf(props.el.created_at.substring(5, 10)) === props.index) {
    return true;
  }
});

const isExpanded = ref(false);

const route = useRoute();

const listOfDates = props.userData.map((e) => e.created_at.substring(5, 10));

const listWithCurrentDate = props.userData.filter(
  (e) => e.created_at.substring(5, 10) === props.el.created_at.substring(5, 10)
);
// console.log(listWithCurrentDate);
const currentDateCount = computed(() => {
  return listWithCurrentDate.length;
});

const totalCount = computed(() =>
  listWithCurrentDate.map((e) => e.Count).reduce((a, b) => a + b, 0)
);
const totalPrice = computed(() =>
  listWithCurrentDate.map((e) => e.Pris * e.Count).reduce((a, b) => a + b, 0)
);
const peopleCount = computed(() => new Set(listWithCurrentDate.map((item) => item.Person)).size);
</script>

<style>
.slakte-the-element {
  display: grid;
  grid-template-columns: 1fr 1fr 3fr 10fr 1fr 3fr;
  white-space: nowrap;
  overflow: hidden;
  min-width: 80ch;
}

.slakte-list-element {
  border-radius: 0.5rem;
  padding: 0.05rem 0.5rem;
  margin: 0.1rem 0;
}

.slakte-the-element p,
.slakte-the-element a {
  width: fit-content;
  max-width: 100%;
}

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

.dark .slakte-list-element {
  color: var(--text-color);
  background-color: var(--element-bg);
}

.dark .slakte-list-element:hover {
  background-color: var(--element-top);
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
  background: var(--border-color);
  content: '';
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

.expanded-info > a {
  text-decoration: underline !important;
  color: #0645ad;
}

.dark .expanded-info > a {
  color: #3e7fe6;
}

.slakte-the-element > a {
  width: fit-content;
}

.dark .slakte-the-element > a:hover > p {
  color: #ffffff !important;
}

.slakte-list-element:hover ~ .spacer-line {
  display: none;
}
</style>
