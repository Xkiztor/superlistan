<template>
  <div class="admin-bg">

    <div class="login" v-if="isLoggedIn == false">
      <h1>Admin Lösenord</h1>
      <input type="password" v-model="typedPassword">
      <button @click="loggIn">Logga in</button>
    </div>

    <div v-if="isLoggedIn == true" class="admin-panel">
      <div class="log-out">
        <p>Du är inloggad</p>
        <button @click="isLoggedIn = false">Logga ut</button>
      </div>
      <div class="admin-layout">
        <div class="statistik">
          <h1>Statistik:</h1>
          <div>
            <p>{{ totalCount }} stycken växter</p>
            <p>{{ userData.length }} stycken rader</p>
            <div></div>
            <p>{{ totalPrice }} kr totalt</p>
            <p>{{ Math.round(totalPrice * 0.8) }} kr utan moms</p>
            <p>{{ peopleCount }} personer</p>
            <p>{{ Math.round(totalCount / peopleCount * 100) / 100 }} plantor per person</p>
            <div></div>
            <p>{{ recomendedCount }}% hjärtan (7.8% på hela listan)</p>
            <p>{{ Math.round(totalPrice / peopleCount * 100) / 100 }} kr/person</p>
          </div>
        </div>
        <div class="show-sidebar">
          <button @click="showTable = !showTable">
            <v-if v-if="!showTable">Visa tabell</v-if>
            <v-if v-if="showTable">Visa formulerad</v-if>
          </button>
          <button @click="showTopTen = !showTopTen">
            <v-if v-if="!showTopTen">Visa vanligaste växterna</v-if>
            <v-if v-if="showTopTen">Dölj top växterna</v-if>
          </button>
        </div>
        <div class="top-ten" v-if="showTopTen">
          <h1>Top <input type="text" v-model="topCount"> växter:</h1>
          <li v-for="(plant, index) in topTen">
            <p>{{ index + 1 }}</p>
            <a :href="`https://www.google.com/search?q=${plant.string.replace(/\s+/g, '+')}&tbm=isch&dpr=1`"
              target="_blank">{{ plant.string }}</a>
            <p>{{ plant.count }} st.</p>
          </li>
        </div>
        <!-- <button @click="fetchUserData()">Ladda in data</button> -->
      </div>

      <div class="list-header" v-if="!showTable">
        <p>Datum</p>
        <p>Vem?</p>
        <p>Växt</p>
        <p>Pris</p>
        <p>Antal</p>
        <p>Total</p>
      </div>
      <ul class="admin-list-container" v-if="!showTable">
        <li v-for="(item, index) in userData" class="list-el">
          <AdminListElement :el="item" :index="index" :userData="userData" :isPersonPage="false" />
        </li>
      </ul>
      <table v-if="showTable">
        <tr v-for="item in userData">
          <th>
            <p>{{ item.created_at }}</p>
          </th>
          <th>
            <p>{{ item.Person }}</p>
          </th>
          <th>
            <p>{{ item.Plantskola }}</p>
          </th>
          <th>
            <p>{{ item.Count }}</p>
          </th>
          <th>
            <p>{{ item.Namn }}</p>
          </th>
          <th>
            <p>{{ item.Pris }}</p>
          </th>
          <th>
            <p>{{ item.Pris * item.Count }}</p>
          </th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'
import { useStorage } from '@vueuse/core'
const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4'

const isLoggedIn = useStorage('is-logged-in', false)

const password = ref('smurf999')
const typedPassword = ref('')

const showTable = ref(false)
const showTopTen = ref(false)

const rawUserData = useStorage('raw-user-data', [])

const route = useRoute()

if (!route.params.year) {
  navigateTo('/admin/2024')
}

const loggIn = () => {
  if (typedPassword.value === password.value) {
    isLoggedIn.value = true
  }
  else {
    typedPassword.value = ''
  }
}

const config = useRuntimeConfig()
const supabase = createClient(supabaseUrl, supabaseKey)

const fetchUserData = async () => {
  const { data, error } = await supabase
    .from(`user-data-${route.params.year}`)
    .select()
    .order('created_at')

  console.log('Fething user data');
  if (error) {
    console.error(error)
  }
  if (data) {
    rawUserData.value = data
    // console.log(data);

    // rawUserData.value.map(e => e.created_at = e.created_at.replace('2023-', ''))
    // rawUserData.value.map(e => e.created_at = e.created_at.replace('2024-', ''))
    rawUserData.value.map(e => e.created_at = e.created_at.replace('T', ' | '))
    // rawUserData.value.map(e => e.created_at = e.created_at.slice(0, -6))
    rawUserData.value.map(e => e.created_at = e.created_at.replace('.', ''))
    rawUserData.value.map(e => e.created_at = e.created_at.substring(0, 18))

    console.log(rawUserData.value);
  }
}

const userData = computed(() => {
  let list = rawUserData.value
  // list = rawUserData.value.sort((a, b) => {
  //   if (a.Namn > b.Namn) return 1
  //   if (a.Namn < b.Namn) return -1
  //   else return 0
  // })
  list.sort((a, b) => {
    if (a.Namn > b.Namn) return 1
    else if (a.Namn < b.Namn) return -1
    else return 0
  })
  // list = list.sort((a, b) => {
  //   if (a.Person > b.Person) return 1
  //   if (a.Person < b.Person) return -1
  //   else return 0
  // })
  list.sort((a, b) => {
    if (a.created_at > b.created_at) return 1
    if (a.created_at < b.created_at) return -1
    else return 0
  })
  console.log(list);
  return list
})

const totalCount = computed(() => userData.value.map(e => e.Count).reduce((a, b) => a + b, 0))
const totalPrice = computed(() => userData.value.map(e => e.Pris * e.Count).reduce((a, b) => a + b, 0))
const peopleCount = computed(() => new Set(userData.value.map(item => item.Person)).size)
const recomendedCount = computed(() => Math.round(userData.value.map(e => e.Rekommenderas).reduce((a, b) => a + b, 0) / userData.value.length * 100 * 100) / 100)

fetchUserData()


const topCount = ref(20)

const topTen = computed(() => {
  let stringCount = {};
  userData.value.forEach(obj => {
    if (obj.hasOwnProperty('Namn')) {
      let str = obj.Namn;
      if (stringCount.hasOwnProperty(str)) {
        stringCount[str]++;
      } else {
        stringCount[str] = 1;
      }
    }
  });
  let sortedStrings = Object.keys(stringCount).sort((a, b) => stringCount[b] - stringCount[a]);
  let top10Strings = sortedStrings.slice(0, topCount.value).map(str => ({ string: str, count: stringCount[str] }));
  return top10Strings;
})

console.log(topTen);

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>


<style>
.admin-bg {
  border-radius: 1rem;
  padding: 1rem;
  width: 100%;
  max-width: 70rem;
  height: fit-content;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

/* #16181c */

.dark .admin-bg {
  background-color: #26292f;
  color: #ecf9fb;
}

.dark .admin-bg p {
  color: #b0bac5;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login>h1 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.login>button {
  width: auto;
}

.list-el {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.list-header {
  display: grid;
  grid-template-columns: 20% 20% 42% 6% 6% 6%;
  border-bottom: 1px solid rgb(213, 213, 213);
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding-left: 0.5rem;
}

.admin-panel {
  display: grid;
}

.list-element {
  padding: 0.1rem;
  background: #ffffff;
  padding-left: 0.5rem;
  border-radius: 1rem;
}

.the-element {
  display: grid;
  grid-template-columns: 20% 20% 42% 6% 6% 6%;
  cursor: pointer;
}

.list-element:hover,
.is-expanded {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 2;
}

.is-expanded {
  margin: 1rem 0;
}

.list-element>* {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


.log-out {
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  width: fit-content;
  margin-left: auto;
}

.admin-layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin-bottom: 2rem;
}

.admin-layout>button {
  max-height: 3rem;
}

.statistik>div {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 0.3fr 1fr 1fr;
  grid-auto-flow: column;
}

.statistik>h1 {
  font-size: 1.4rem;
}

.show-sidebar button {
  width: 100%;
}

.top-ten {
  margin: 1rem 0;
}

.top-ten li {
  display: grid;
  grid-template-columns: 1.2rem 1fr 1fr;
  gap: 1rem;
  margin-top: 0.1rem;
}

.top-ten a {
  color: var(--text-light);
}

.dark .top-ten a {
  color: var(--text-mute-dark);
}

.top-ten input {
  width: 3.5rem;
}



table {
  text-align: left;
  font-weight: 400;
}

th p,
td p {
  font-weight: 400;
}

th,
td {
  border: 1px solid #cacaca;
}
</style>
