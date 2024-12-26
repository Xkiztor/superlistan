<script setup>
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4';
const supabase = createClient(supabaseUrl, supabaseKey);

const list = ref();
const personerList = ref();

const fetchBestallningar = async () => {
  let search = supabase.from('kundpapper-2024').select();
  const { data, error } = await search;

  if (error) {
    console.error(error);
  }
  if (data) {
    console.log(data);
    // list.value = data
    list.value = data.sort((a, b) => {
      if (a.Namn < b.Namn) {
        return -1;
      }
      if (a.Namn > b.Namn) {
        return 1;
      }
      return 0;
    });
    const uniqueValues = [];
    const seenValues = new Set();
    list.value.forEach((item) => {
      const value = item.Förnamn;
      if (!seenValues.has(value)) {
        uniqueValues.push(value);
        seenValues.add(value);
      }
    });
    personerList.value = uniqueValues.sort();
  }
};

fetchBestallningar();

// const personerList = () => {
//   const uniqueValues = [];
//   const seenValues = new Set();
//   list.value.forEach(item => {
//     const value = item.Person;
//     if (!seenValues.has(value)) {
//       uniqueValues.push(value);
//       seenValues.add(value);
//     }
//   });
//   return uniqueValues.sort();
// }

const getPlantsFromPerson = (person) => {
  // console.log(list.value);
  if (!Array.isArray(list.value)) {
    console.error('Input is not an array.');
    return [];
  }
  let newArray = list.value.filter((obj) => obj.Förnamn === person);
  // console.log(newArray);
  // return list.value
  // return sortedList.filter(true)
  return newArray;
};

// getPlantsFromPerson('Agnes Cederholm')
</script>

<template>
  <div class="print-bg">
    <div v-for="person in personerList">
      <h1>
        Superlistan 2025<span v-if="person !== getPlantsFromPerson(person)[0].Person">
          - {{ person }}</span
        >
        - {{ getPlantsFromPerson(person)[0].Person }}
      </h1>
      <p class="info">
        0{{ getPlantsFromPerson(person)[0].Phone }}, {{ getPlantsFromPerson(person)[0].Mail }},
        {{ getPlantsFromPerson(person)[0].Adress }}
      </p>
      <table>
        <tbody class="tabell">
          <tr>
            <th>B</th>
            <th>C</th>
            <th>Namn</th>
            <th>Kruka</th>
            <th>Höjd</th>
            <th></th>
            <th>Pris</th>
            <th></th>
          </tr>
          <tr v-for="planta in getPlantsFromPerson(person)">
            <td>
              <p>{{ planta.Best }}</p>
            </td>
            <td>
              <p>{{ planta.Conf }}</p>
            </td>
            <td>
              <p
                :class="{
                  red: planta.Status === 'R',
                  green: planta.Status === 'G',
                  purple: planta.Status === 'L',
                }"
              >
                {{ planta.Namn }}
              </p>
            </td>
            <td>
              <p>{{ planta.Kruka }}</p>
            </td>
            <td>
              <p>{{ planta.Höjd }}</p>
            </td>
            <td>
              <p>{{ planta.Kommentar }}</p>
            </td>
            <td>
              <p>{{ planta.Pris }}</p>
            </td>
            <td>
              <p>{{ planta.Pris * planta.Conf }}</p>
            </td>
          </tr>
        </tbody>
        <!-- <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <p>Summa:</p>
          </td>
          <td>
            <p> {{ getPlantsFromPerson(person).map(e => e.Pris * e.Conf).reduce((a, b) => a + b, 0) }}</p>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <p>Redan betalt:</p>
          </td>
          <td>
            <p> {{ Math.round(getPlantsFromPerson(person).map(e => e.Pris * e.Conf).reduce((a, b) => a + b, 0) / 2) }}
            </p>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <p>Kvar att betala:</p>
          </td>
          <td>
            <p> {{ Math.round(getPlantsFromPerson(person).map(e => e.Pris * e.Conf).reduce((a, b) => a + b, 0) / 2) }}
            </p>
          </td>
        </tr> -->
      </table>
      <div class="sum">
        <p>
          Summa:
          {{
            getPlantsFromPerson(person)
              .map((e) => e.Pris * e.Conf)
              .reduce((a, b) => a + b, 0)
          }}
        </p>
        <p>Redan betalt: {{ getPlantsFromPerson(person)[0].RedanBetalt }}</p>
        <p>
          Kvar att betala:
          {{
            getPlantsFromPerson(person)
              .map((e) => e.Pris * e.Conf)
              .reduce((a, b) => a + b, 0) - getPlantsFromPerson(person)[0].RedanBetalt
          }}
        </p>
      </div>
      <div class="page-break"></div>
    </div>
  </div>
</template>

<style>
.print-bg {
  padding: 1rem;
  width: 100%;
  max-width: 70rem;
  height: fit-content;
  margin: 1rem auto;
  background: white;
  color: black;
  font-size: 14pt;
  font-family: Arial, Helvetica, sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.print-bg h1 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.print-bg .info {
  margin-bottom: 0.5rem;
}

.print-bg table * {
  border-color: #e2e2e2;
}

.print-bg table th {
  padding-right: 0.5rem;
}

.print-bg .sum p {
  margin: 0.2rem 0;
}

.print-bg .sum {
  margin-top: 0.5rem;
}

.page-break {
  page-break-after: always;
  margin: 2rem 0;
}

@media print {
}

@page {
  size: A4;
  size: portrait;
}

.print-bg table {
  border-collapse: collapse;
}

.print-bg .red {
  color: #ea4335;
}

.print-bg .green {
  color: #34a853;
}

.print-bg .purple {
  color: #9900ff;
}
</style>
