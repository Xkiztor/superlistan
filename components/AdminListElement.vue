<script setup>
const props = defineProps(['item', 'index', 'firstOfDate', 'isPersonPage']);

const isExpanded = ref(false);
</script>

<template>
  <div v-if="firstOfDate?.isFirstOfDate && !isPersonPage" class="first-of-date">
    <div class="first-of-date-flex">
      <div class="date">
        <h1>{{ item.created_at.substring(8, 10) }}</h1>
        <p>/{{ item.created_at.substring(5, 7) }}</p>
      </div>
      <p>{{ firstOfDate.currentDateCount }} st olika</p>
      <p>{{ firstOfDate.totalCount }} st totalt</p>
      <p>{{ firstOfDate.totalPrice }} kr</p>
      <!-- <p v-if="!isPersonPage">{{ peopleCount }} personer</p> -->
    </div>
    <div class="spacer-line"></div>
  </div>
  <div class="list-element" :class="{ 'is-expanded': isExpanded }">
    <div class="the-element" @click="isExpanded = !isExpanded">
      <p>{{ item.created_at }}</p>

      <NuxtLink
        :to="`/admin/${$route.params.year}/kund/${item.Person.replace(' ', '+')}`"
        class="no-link"
      >
        <p>{{ item.Person }}</p>
      </NuxtLink>

      <a
        :href="`https://www.google.com/search?q=${item.Namn.replace(/\s+/g, '+')}&tbm=isch&dpr=1`"
        target="_blank"
        >{{ item.Namn }}</a
      >

      <p>{{ item.Pris }}</p>
      <p>{{ item.Count }}</p>
      <p>{{ item.Pris * item.Count }}</p>
    </div>
    <div v-if="isExpanded" class="expanded-info">
      <Icon
        v-if="item.Rekommenderas"
        class="rekommenderas-icon"
        name="ph:heart-straight-fill"
        size="20"
      />
      <a :href="`https://www.google.se/maps/search/${item.Adress}`" target="_blank">{{
        item.Adress
      }}</a>
      <p>{{ item.Phone }}</p>
      <p>{{ item.Mail }}</p>
      <p v-if="item.Comment">{{ item.Comment }}</p>
      <p>Plantskola: {{ item.Plantskola }}</p>
      <nuxt-link :to="`/admin/${$route.params.year}/slakte/${item.Namn.split(' ')[0]}`"
        >Släkte: {{ item.Namn.split(' ')[0] }}</nuxt-link
      >
    </div>
  </div>
</template>

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

.dark .list-element {
  color: var(--text-mute);
}

.dark .list-element:hover {
  background-color: var(--element-top-hover);
}

.first-of-date h1 {
  font-size: 2.2rem;
  line-height: 1;
}

.dark .first-of-date h1,
.dark .admin-bg h1 {
  color: white;
}

.first-of-date-flex .date {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* gap: 0.5rem; */
}

.spacer-line {
  width: 100%;
  height: 1px;
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

.the-element > a {
  width: fit-content;
}

.dark .the-element > a:hover > p {
  color: #ffffff !important;
}

.list-element:hover ~ .spacer-line {
  display: none;
}
</style>
