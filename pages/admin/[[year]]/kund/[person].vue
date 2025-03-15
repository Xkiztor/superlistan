<script setup>
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4';

useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Times+New+Roman',
      crossorigin: '',
    },
  ],
});

const route = useRoute();
const supabase = createClient(supabaseUrl, supabaseKey);
const { person } = useRoute().params;
const personName = person.replace('+', ' ');

// const personList = ref([]);

const { data: personList } = await useAsyncData('specific-plant-fetch', async () => {
  const { data, error } = await supabase
    .from(`user-data-${route.params.year}`)
    .select()
    .order('created_at');

  console.log('Fething user data');
  if (error) {
    console.error(error);
  }
  if (data) {
    // console.log(data);

    let workingData = data;

    workingData = workingData.filter(
      (e) => e.Person.replace(/\s/g, '') === personName.replace(/\s/g, '')
    );

    workingData = workingData.sort((a, b) => {
      if (a.Namn < b.Namn) return -1;
      else if (a.Namn > b.Namn) return 1;
      else return 0;
    });

    workingData = workingData.map((e) => {
      return {
        ...e,
        created_at: e.created_at.replace('T', ' | ').replace('.', '').substring(0, 18),
      };
    });

    return workingData;
  }
});

const rawDate = new Date();
console.log(rawDate.getDate().toString().length);
console.log(rawDate.getDate().toString().length === 2 ? '' : '0');
const date =
  rawDate.getFullYear() +
  '-' +
  (rawDate.getMonth() < 9 ? '0' : '') +
  (rawDate.getMonth() + 1) +
  '-' +
  `${rawDate.getDate().toString().length === 2 ? '' : '0'}` +
  rawDate.getDate();
console.log(date);
const förfallDate =
  rawDate.getFullYear() +
  '-' +
  '0' +
  (rawDate.getMonth() == 11 ? 1 : rawDate.getMonth() + 2) +
  '-' +
  `${rawDate.getDate().toString().length === 2 ? '' : '0'}` +
  rawDate.getDate();

const faktura = ref();
const showFaktura = ref(false);
const fakturaNummer = ref('');

const genFaktura = () => {
  showFaktura.value = true;
};
</script>

<template>
  <div class="admin-bg">
    <nuxt-link class="back" to="/admin/"><button>Tillbaka</button></nuxt-link>
    <h1 class="name-title">{{ personName }}</h1>
    <div class="statistik">
      <p v-if="personList[0].Comment">{{ personList[0].Comment }}</p>
      <p>{{ personList[0].Phone }}</p>
      <a
        class="link"
        :href="`https://www.google.se/maps/search/${personList[0].Adress}`"
        target="_blank"
        >{{ personList[0].Adress }}</a
      >
    </div>
    <ul class="list-container">
      <!-- <li v-for="(item, index) in personList" class="list-el">
        <AdminListElement :el="item" :index="index" :userData="personList" :isPersonPage="true" />
      </li> -->

      <AdminListElement
        class="list-el"
        v-for="(item, index) in personList"
        :item="item"
        :index="index"
        :isPersonPage="true"
      />
      <!-- :firstOfDate="firstOfDate(item, index)" -->
    </ul>
    <div class="faktura">
      <button @click="genFaktura">Generera Faktura</button>
      <input type="text" v-model="fakturaNummer" />
      <div v-if="showFaktura" class="the-faktura">
        <h1>Faktura</h1>
        <p>Peter Linder</p>
        <p>Linders Plantskola</p>
        <p>Organisationsnummer: 7308061956</p>
        <p>—————————————————————————————————————</p>
        <p>
          <b>Faktura nr: {{ fakturaNummer }}</b>
        </p>
        <p>Fakturaadress: {{ personName }} - {{ personList[0].Mail }}</p>
        <br />
        <p>Fakturadatum: {{ date }}</p>
        <p>
          <b>Förfallodatum: {{ förfallDate }}</b>
        </p>
        <br />
        <g>
          <p>Specifikation:</p>
          <p>
            Växter beställda från Linders Superlista. Att hämtas på Linders Plantskola i maj. Halva
            beloppet betalas nu och resterande när växterna hämtas och vi ser exakt vilka som
            kommit.
          </p>
        </g>
        <br />
        <table>
          <tbody class="tabell">
            <tr>
              <th>Vetenskapligt namn</th>
              <th>Kruka</th>
              <th>Höjd</th>
              <th>Antal</th>
              <th>À-pris</th>
              <th>Summa</th>
            </tr>
            <tr v-for="item in personList">
              <td>
                <p>{{ item.Namn }}</p>
              </td>
              <td>
                <p>{{ item.Kruka }}</p>
              </td>
              <td>
                <p>{{ item.Höjd }}</p>
              </td>
              <td>
                <p>{{ item.Count }}</p>
              </td>
              <td>
                <p>{{ item.Pris }}</p>
              </td>
              <td>
                <p>{{ item.Pris * item.Count }}</p>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <p>Totalt:</p>
              </td>
              <td>
                <p>{{ personList.map((e) => e.Pris * e.Count).reduce((a, b) => a + b, 0) }}</p>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <p>Halva:</p>
              </td>
              <td>
                <p>
                  {{
                    Math.round(
                      personList.map((e) => e.Pris * e.Count).reduce((a, b) => a + b, 0) / 2
                    )
                  }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <p class="underline">
          <b class="bigger"
            >Att betala:
            {{ Math.round(personList.map((e) => e.Pris * e.Count).reduce((a, b) => a + b, 0) / 2) }}
            kr</b
          >
        </p>
        <p>
          Moms ingår med
          {{
            Math.round(
              Math.round(personList.map((e) => e.Pris * e.Count).reduce((a, b) => a + b, 0) / 2) *
                0.2 *
                100
            ) / 100
          }}
          kr
        </p>
        <br />
        <g>
          <p>Betalningssätt:</p>
          <p class="indent"><b>Swish till 0733-518 716</b></p>
          <p class="indent"><b>Bankgiro (Linders Plantskola): 872-3934</b></p>
        </g>
        <p>—————————————————————————————————————</p>
        <p>Tack för beställningen! Med vänliga hälsningar/</p>
        <br />
        <g>
          <p>Peter Linder, Linders Plantskola</p>
          <p>Köinge 6902, 242 92 Hörby</p>
          <p>Mobil: 0733-518 716</p>
          <p>E-post: peter@lindersplantskola.se</p>
          <p><a href="http://lindersplantskola.se/">www.lindersplantskola.se</a></p>
          <p>Godkänd för F-skatt</p>
        </g>
      </div>
    </div>
  </div>
</template>

<style>
li {
  list-style: none;
}

.name-title {
  font-size: 4rem;
  text-align: center;
}

.list-container {
  margin-top: 1rem;
}

.list-el {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.faktura {
  margin-top: 1rem;
}

.the-faktura {
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  margin: 1rem auto;
  width: fit-content;
  padding: 1rem;
  line-height: 1.25;
  max-width: 800px;
}

.the-faktura * {
  color: black !important;
}

.the-faktura * {
  font-family: 'Times New Roman', Times, serif;
}

.the-faktura > h1 {
  font-size: 20pt;
}

.the-faktura > p {
  font-size: 12pt;
  border: none;
}

.tabell th,
.tabell td {
  padding: 0.08rem 0.2rem;
  padding-right: 1rem;
  border: 1px solid #4b4b4b;
  border-width: 1px;
}

.underline {
  text-decoration: underline;
}

.indent {
  text-indent: 1rem;
}

.bigger {
  font-size: 16pt;
}

g {
  line-height: 1.15;
}
</style>
