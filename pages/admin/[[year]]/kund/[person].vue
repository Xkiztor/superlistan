<template>
  <div class="admin-bg">
    <nuxt-link class="back" to="/admin/"><button>Tillbaka</button></nuxt-link>
    <h1 class="name-title">{{ personName }}</h1>
    <div class="statistik">
      <p v-if="filteredArray[0].Comment">{{ filteredArray[0].Comment }}</p>
      <p>{{ filteredArray[0].Phone }}</p>
      <a :href="`https://www.google.se/maps/search/${filteredArray[0].Adress}`" target="_blank">{{
        filteredArray[0].Adress
      }}</a>

    </div>
    <ul class="list-container">
      <li v-for="(item, index) in filteredArray" class="list-el">
        <AdminListElement :el="item" :index="index" :userData="filteredArray" :isPersonPage="true" />
      </li>
    </ul>
    <div class="faktura">
      <button @click="genFaktura">Generera Faktura</button>
      <input type="text" v-model="fakturaNummer">
      <div v-if="showFaktura" class="the-faktura">
        <h1>Faktura</h1>
        <p>Peter Linder</p>
        <p>Linders Plantskola</p>
        <p>Organisationsnummer: 7308061956</p>
        <p>—————————————————————————————————————</p>
        <!-- <br> -->
        <p><b>Faktura nr: {{ fakturaNummer }}</b></p>
        <p>Fakturaadress: {{ personName }} - {{ filteredArray[0].Mail }}</p>
        <br />
        <p>Fakturadatum: {{ date }}</p>
        <p><b>Förfallodatum: {{ förfallDate }}</b></p>
        <br />
        <g>
          <p>Specifikation:</p>
          <p>
            Växter beställda från Linders Superlista. Att hämtas på Linders Plantskola i maj.
            Halva beloppet betalas nu och resterande när växterna hämtas och vi ser exakt vilka som kommit.
          </p>
        </g>
        <br>
        <table class="tabell">
          <tr>
            <th>Vetenskapligt namn</th>
            <th>Kruka</th>
            <th>Höjd</th>
            <th>Antal</th>
            <th>À-pris</th>
            <th>Summa</th>
          </tr>
          <tr v-for="item in filteredArray">
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
              <p> {{ filteredArray.map(e => e.Pris * e.Count).reduce((a, b) => a + b, 0) }}</p>
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
              <p> {{ Math.round(filteredArray.map(e => e.Pris * e.Count).reduce((a, b) => a + b, 0) / 2) }}</p>
            </td>
          </tr>
        </table>
        <br>
        <p class="underline"><b class="bigger">Att betala: {{
          Math.round(filteredArray.map(e => e.Pris * e.Count).reduce((a, b) => a +
            b, 0) / 2)
        }} kr</b></p>
        <p>
          Moms ingår med
          {{
            Math.round((filteredArray.map(e => e.Pris * e.Count).reduce((a, b) => a + b, 0) / 2 * 100) * 0.2) / 100
          }}
          kr
        </p>
        <br>
        <g>
          <p>Betalningssätt:</p>
          <p class="indent"><b>Swish till 0733-518 716</b></p>
          <p class="indent"><b>Bankgiro (Linders Plantskola): 872-3934</b></p>
          <!-- <p class="indent">Märk betalningen med "Li-" samt fakturanummer.</p> -->
        </g>
        <p>—————————————————————————————————————</p>
        <!-- <br> -->
        <p>Tack för beställningen! Med vänliga hälsningar/</p>
        <br>
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

<script setup>
import { useStorage } from '@vueuse/core'

const rawUserData = useStorage('raw-user-data', [])

const { person } = useRoute().params
const personName = person.replace('+', ' ')


const filteredArray = computed(() => {
  let list = rawUserData.value.filter(e => e.Person.replace(/\s/g, "") === personName.replace(/\s/g, ""))
  list.sort((a, b) => {
    if (a.Namn < b.Namn) return -1
    else if (a.Namn > b.Namn) return 1
    else return 0
  })
  return list
})

const rawDate = new Date()
console.log(rawDate.getDate().toString().length);
console.log(rawDate.getDate().toString().length === 2 ? '' : '0');
const date = rawDate.getFullYear() + '-' + '0' + (rawDate.getMonth() + 1) + '-' + `${rawDate.getDate().toString().length === 2 ? '' : '0'}` + rawDate.getDate()
console.log(date);
const förfallDate = rawDate.getFullYear() + '-' + '0' + (rawDate.getMonth() + 2) + '-' + `${rawDate.getDate().toString().length === 2 ? '' : '0'}` + rawDate.getDate()


useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Times+New+Roman',
      crossorigin: ''
    }
  ]
})

const faktura = ref()
const showFaktura = ref(false)
const fakturaNummer = ref('')

const genFaktura = () => {
  showFaktura.value = true
}

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

.the-faktura>h1 {
  font-size: 20pt;
}

.the-faktura>p {
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
