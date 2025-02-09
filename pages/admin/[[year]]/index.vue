<script setup>
import { createClient } from '@supabase/supabase-js';
import { useStorage } from '@vueuse/core';
const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4';

const isLoggedIn = useStorage('is-logged-in', false);

const password = ref('Smurf999');
const typedPassword = ref('');

const showTable = ref(false);
const showTopTen = ref(false);

const userData = ref([]);

const route = useRoute();

if (!route.params.year) {
  navigateTo('/admin/2025');
}

const loggIn = () => {
  if (typedPassword.value === password.value) {
    isLoggedIn.value = true;
  } else {
    typedPassword.value = '';
  }
};

const config = useRuntimeConfig();
const supabase = createClient(supabaseUrl, supabaseKey);

const fetchUserData = async () => {
  const { data, error } = await supabase
    .from(`user-data-${route.params.year}`)
    .select()
    .order('created_at');

  console.log('Fething user data');
  if (error) {
    console.error(error);
  }
  if (data) {
    userData.value = data;
  }
};

const computedUserData = computed(() => {
  let list = userData.value || [];

  list = list.map((e) => {
    return {
      ...e,
      created_at: e.created_at.replace('T', ' | ').replace('.', '').substring(0, 18),
    };
  });
  // list = list.map((e) => (e.created_at = e.created_at.replace('T', ' | ')));
  // list = list.map((e) => (e.created_at = e.created_at.replace('.', '')));
  // list = list.map((e) => (e.created_at = e.created_at.substring(0, 18)));

  // list = rawUserData.value.sort((a, b) => {
  //   if (a.Namn > b.Namn) return 1
  //   if (a.Namn < b.Namn) return -1
  //   else return 0
  // })
  list.sort((a, b) => {
    if (a.Namn > b.Namn) return 1;
    else if (a.Namn < b.Namn) return -1;
    else return 0;
  });
  // list = list.sort((a, b) => {
  //   if (a.Person > b.Person) return 1
  //   if (a.Person < b.Person) return -1
  //   else return 0
  // })
  list.sort((a, b) => {
    if (a.created_at > b.created_at) return 1;
    if (a.created_at < b.created_at) return -1;
    else return 0;
  });
  // console.log(list);
  const totalCount = list.map((e) => e.Count).reduce((a, b) => a + b, 0);
  const totalPrice = list.map((e) => e.Pris * e.Count).reduce((a, b) => a + b, 0);
  const peopleCount = new Set(list.map((item) => item.Person)).size;
  const recomendedCount =
    Math.round(
      (list.map((e) => e.Rekommenderas).reduce((a, b) => a + b, 0) / list.length) * 100 * 100
    ) / 100;

  // console.log(list);

  return {
    list: list,
    totalCount: totalCount,
    totalPrice: totalPrice,
    peopleCount: peopleCount,
    recomendedCount: recomendedCount,
  };
});

fetchUserData();

const topCount = ref(20);
const topTen = ref();

const topTenCalc = () => {
  let stringCount = {};
  computedUserData.value.list.forEach((obj) => {
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
  let top10Strings = sortedStrings
    .slice(0, topCount.value)
    .map((str) => ({ string: str, count: stringCount[str] }));
  topTen.value = top10Strings;
};

const topTenArt = ref();
const topTenArtCalc = () => {
  let stringCount = {};
  computedUserData.value.list.forEach((obj) => {
    if (obj.hasOwnProperty('Namn')) {
      let str = obj.Namn.split(' ')[0] + ' ' + obj.Namn.split(' ')[1];
      if (stringCount.hasOwnProperty(str)) {
        stringCount[str]++;
      } else {
        stringCount[str] = 1;
      }
    }
  });
  let sortedStrings = Object.keys(stringCount).sort((a, b) => stringCount[b] - stringCount[a]);
  let top10Strings = sortedStrings
    .slice(0, topCount.value)
    .map((str) => ({ string: str, count: stringCount[str] }));
  topTenArt.value = top10Strings;
};

const topTenSlakte = ref();
const topTenSlakteCalc = () => {
  let stringCount = {};
  computedUserData.value.list.forEach((obj) => {
    if (obj.hasOwnProperty('Namn')) {
      let str = obj.Namn.split(' ')[0];
      if (stringCount.hasOwnProperty(str)) {
        stringCount[str]++;
      } else {
        stringCount[str] = 1;
      }
    }
  });
  let sortedStrings = Object.keys(stringCount).sort((a, b) => stringCount[b] - stringCount[a]);
  let top10Strings = sortedStrings
    .slice(0, topCount.value)
    .map((str) => ({ string: str, count: stringCount[str] }));
  topTenSlakte.value = top10Strings;
};

const listOfDates = computed(() => {
  let dateList = computedUserData.value.list.map((e) => e.created_at.substring(5, 10));
  // console.log(dateList);

  return dateList;
});
// console.log(listOfDates.value);
// const listOfDates = computedUserData.value;
// const listOfDates = computedUserData.value.list.map((e) => e.created_at.substring(5, 10));

const firstOfDate = (item, index) => {
  const isFirstOfDate =
    listOfDates.value.indexOf(item.created_at.substring(5, 10)) === index ? true : false;

  const listWithCurrentDate = computedUserData.value.list.filter(
    (e) => e.created_at.substring(5, 10) === item.created_at.substring(5, 10)
  );
  const currentDateCount = listWithCurrentDate.length;
  const totalCount = listWithCurrentDate.map((e) => e.Count).reduce((a, b) => a + b, 0);
  const totalPrice = listWithCurrentDate.map((e) => e.Pris * e.Count).reduce((a, b) => a + b, 0);
  const peopleCount = new Set(listWithCurrentDate.map((item) => item.Person)).size;

  return {
    isFirstOfDate: isFirstOfDate,
    listWithCurrentDate: listWithCurrentDate,
    currentDateCount: currentDateCount,
    totalCount: totalCount,
    totalPrice: totalPrice,
    peopleCount: peopleCount,
  };
  return 'chicken nuggets';
};

// console.log(topTen);

const isDark = useDark();
const toggleDark = useToggle(isDark);

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
</script>

<template>
  <div class="admin-bg">
    <div class="login" v-if="isLoggedIn == false">
      <h1>Admin Lösenord</h1>
      <input type="password" v-model="typedPassword" />
      <button @click="loggIn">Logga in</button>
    </div>

    <div v-if="isLoggedIn == true" class="admin-panel">
      <div class="admin-layout">
        <div class="statistik">
          <h1>Statistik:</h1>
          <div>
            <p>
              <strong>{{ computedUserData.totalCount }}</strong> stycken växter
            </p>
            <p>
              <strong>{{ computedUserData.list.length }}</strong> stycken rader
            </p>
            <div></div>
            <p>
              <strong>{{ formatNumber(computedUserData.totalPrice) }}</strong> kr totalt
            </p>
            <p>
              <strong>{{ formatNumber(Math.round(computedUserData.totalPrice * 0.8)) }}</strong> kr
              utan moms
            </p>
            <p>
              <strong>{{ computedUserData.peopleCount }}</strong> personer
            </p>
            <p>
              <strong>{{
                Math.round((computedUserData.totalCount / computedUserData.peopleCount) * 100) / 100
              }}</strong>
              plantor per person
            </p>
            <div></div>
            <p>
              <strong>{{ computedUserData.recomendedCount }}</strong
              >% hjärtan (7.8% på hela listan)
            </p>
            <p>
              <strong>{{
                Math.round((computedUserData.totalPrice / computedUserData.peopleCount) * 100) / 100
              }}</strong>
              kr/person
            </p>
          </div>
        </div>
        <div class="sidebar">
          <div class="log-out">
            <p>Du är inloggad</p>
            <button @click="isLoggedIn = false">Logga ut</button>
          </div>
          <button class="show-table" @click="showTable = !showTable">
            <span v-if="!showTable">Visa tabell</span>
            <span v-if="showTable">Visa formulerad</span>
          </button>
          <button
            @click="(showTopTen = !showTopTen), topTenCalc(), topTenSlakteCalc(), topTenArtCalc()"
          >
            <span v-if="!showTopTen">Visa vanligaste växterna</span>
            <span v-if="showTopTen">Dölj top växterna</span>
          </button>
          <nuxt-link to="/admin/print"><button>Printa personlistor</button></nuxt-link>
        </div>
        <div class="topplistor">
          <div class="top-ten" v-if="showTopTen">
            <h1>Top <input type="text" v-model="topCount" /> växter:</h1>
            <li v-for="(plant, index) in topTen">
              <p>{{ index + 1 }}</p>
              <a
                :href="`https://www.google.com/search?q=${plant.string.replace(
                  /\s+/g,
                  '+'
                )}&tbm=isch&dpr=1`"
                target="_blank"
                >{{ plant.string }}</a
              >
              <p>{{ plant.count }} st.</p>
            </li>
          </div>
          <div class="top-ten art" v-if="showTopTen">
            <h1>Top <input type="text" v-model="topCount" /> släkten:</h1>
            <li v-for="(plant, index) in topTenArt">
              <p>{{ index + 1 }}</p>
              <a
                :href="`https://www.google.com/search?q=${plant.string.replace(
                  /\s+/g,
                  '+'
                )}&tbm=isch&dpr=1`"
                target="_blank"
                >{{ plant.string }}</a
              >
              <p>{{ plant.count }} st.</p>
            </li>
          </div>
          <div class="top-ten slakte" v-if="showTopTen">
            <h1>Top <input type="text" v-model="topCount" /> släkten:</h1>
            <li v-for="(plant, index) in topTenSlakte">
              <p>{{ index + 1 }}</p>
              <a
                :href="`https://www.google.com/search?q=${plant.string.replace(
                  /\s+/g,
                  '+'
                )}&tbm=isch&dpr=1`"
                target="_blank"
                >{{ plant.string }}</a
              >
              <p>{{ plant.count }} st.</p>
            </li>
          </div>
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

      <ul v-if="!showTable">
        <AdminListElement
          v-for="(item, index) in computedUserData.list"
          :item="item"
          :index="index"
          :firstOfDate="firstOfDate(item, index)"
          :isPersonPage="false"
        />
        <!-- <AdminListElement
          v-for="{ index, data } in computedUserData.list"
          :el="data"
          :index="index"
          :userData="computedUserData.list"
          :isPersonPage="false"
        /> -->
      </ul>
      <!-- {{userData}} -->
      <!-- <div v-bind="containerProps" class="admin-container-props" v-if="!showTable">
        <ul v-bind="wrapperProps" class="admin-list-container admin-wrapper-props">
          <li v-for="{ index, data } in list" class="list-el">
            <AdminListElement
              :el="data"
              :index="index"
              :userData="userData"
              :isPersonPage="false"
            />
          </li>
        </ul>
      </div> -->

      <table>
        <tbody v-if="showTable">
          <tr v-for="item in computedUserData.list">
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
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.admin-bg {
  border-radius: 1rem;
  padding: 1rem;
  width: 100%;
  max-width: 70rem;
  height: fit-content;
  margin: 1rem auto;
  background: var(--element-bg);
  border: 1px solid var(--border-color);
}

.dark .admin-bg p {
  color: var(--text-mute);
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login > h1 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.login > button {
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
  border: 1px solid var(--border-color);
  border-radius: 0.5rem 0.5rem 0 0;
  /* padding-left: 0.5rem; */
  padding: 0.25rem 0 0.25rem 0.5rem;
}

.admin-container-props {
  transition: none;
  border: 1px solid var(--border-color);
  background: var(--element-bg);
  height: 80vh;
  border-radius: 0 0 1rem 1rem;
  width: auto;
  max-height: 100vh !important;
  overflow-x: hidden;
}

.admin-wrapper-props {
  transition: none;
  position: relative;
  /* padding-bottom: 5rem; */
}

.list-element {
  padding: 0.1rem;
  /* background: #ffffff; */
  padding-left: 0.5rem;
  border-radius: 1rem;
  transition: all 0.1s ease;
}

.the-element {
  display: grid;
  grid-template-columns: 20% 20% 42% 6% 6% 6%;
  cursor: pointer;
}

.list-element:hover,
.is-expanded {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 2;
}

.is-expanded {
  margin: 1rem 0;
}

.list-element > * {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.admin-bg .sidebar {
  display: grid;
  place-items: start right;
}

.admin-bg .sidebar .show-table {
  width: 90%;
}

.log-out {
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  width: fit-content;
}

.admin-layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin-bottom: 2rem;
}

.admin-layout > button {
  max-height: 3rem;
}

.statistik > div {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 0.3fr 1fr 1fr;
  grid-auto-flow: column;
}

.statistik > h1 {
  font-size: 1.4rem;
}

.statistik p {
  font-size: 1.1rem;
  line-height: 1.5rem;
}

.show-sidebar button {
  width: 100%;
}

.admin-panel .topplistor {
  grid-column: 1/4;
  display: grid;
  gap: 3rem;
  grid-template-columns: 1fr 1fr 1fr;
}

.top-ten {
  margin: 1rem 0;
}

.top-ten li {
  display: grid;
  grid-template-columns: 1.2rem 1fr max-content;
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
