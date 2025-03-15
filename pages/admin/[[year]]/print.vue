<script setup>
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4';
const supabase = createClient(supabaseUrl, supabaseKey);

const list = ref();
const personerList = ref();

// !-------------------
const year = '2024';
// !-------------------

const fetchBestallningar = async () => {
  let search = supabase.from(`kundpapper-${year}`).select();
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

const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US', {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(number)
    .replace(/,/g, ' ');
};

const lengthMellis = ref(0);
const lengthLilla = ref(0);

const depthMellis = ref(0);
const depthLilla = ref(0);

const mellisAvailableArea = computed(() => {
  return lengthMellis.value * 100 * depthMellis.value * 100;
});
const lillaAvailableArea = computed(() => {
  return lengthLilla.value * 100 * depthLilla.value * 100;
});
const totalAvailableArea = computed(() => {
  return (
    lengthMellis.value * 100 * depthMellis.value * 100 +
    lengthLilla.value * 100 * depthLilla.value * 100
  );
});

const pot = ref('');
const result = ref(0);
watch(pot, (newValue) => {
  result.value = getAreaFromPot(newValue, 0);
});

const getAreaFromPot = (pot, height) => {
  const kruka = pot.replace(/\/.*/, '').replace(/\s+/g, '').replace(/Pa/g, '');
  // Högre än 160 cm åker bort
  // Högre än C10 åker bort
  if (height) {
    if (Number(height.substring(0, 3)) > 160) {
      // console.log('Error: Plant too high: "' + pot + '"');
      return 0;
    }
  }
  if (kruka[0] === 'P') {
    return kruka[1] * kruka[1];
  } else if (kruka[0] === 'C') {
    let volumeLiters = parseFloat(kruka.replace(/C/, '').replace(/,/g, '.'));
    if (volumeLiters > 10) {
      // console.log('Error: Pot size too large: "' + pot + '"');
      return 0;
    }
    let volumeCm3 = parseFloat(kruka.replace(/C/, '').replace(/,/g, '.')) * 1000;
    let k = volumeLiters < 5 ? 0.6 : 0.85;
    return Math.round(
      Math.cbrt((4 * volumeCm3) / (Math.PI * k)) * Math.cbrt((4 * volumeCm3) / (Math.PI * k))
    );
  } else {
    console.log('Error: No valid pot size: "' + pot + '"');
  }
};

const totalAreaPlant = computed(() => {
  if (list.value === undefined) {
    return 0;
  }
  return list.value.reduce((total, plant) => {
    if (plant.Förnamn.startsWith('x')) {
      return total;
    }
    const area = getAreaFromPot(plant.Kruka, plant.Höjd);
    return total + area * plant.Conf;
  }, 0);
});

const calculatePlantProperties = (plants) => {
  const totalArea = plants.reduce((total, plant) => {
    const area = getAreaFromPot(plant.Kruka, plant.Höjd);
    return total + area * plant.Conf;
  }, 0);

  const totalAvailable = totalAvailableArea.value;

  const percentage = totalAvailable ? (totalArea / totalAvailable) * 100 : 0;

  const highestPlant = plants.reduce((max, plant) => {
    if (!plant.Höjd) return max;
    return parseInt(plant.Höjd.substring(0, 3)) >
      (max.Höjd ? parseInt(max.Höjd.substring(0, 3)) : 0)
      ? plant
      : max;
  }, plants[0]);

  const highestPlantUnderC10And160 = plants.reduce((max, plant) => {
    if (!plant.Höjd || !plant.Kruka) return max;
    const height = parseInt(plant.Höjd.substring(0, 3));
    const potSize = parseFloat(plant.Kruka.replace(/C/, '').replace(/,/g, '.'));
    if (height < 160 && potSize <= 10) {
      return height > (max.Höjd ? parseInt(max.Höjd.substring(0, 3)) : 0) ? plant : max;
    }
    return max;
  }, plants[0]);

  const countUtomhus = plants.reduce((count, plant) => {
    // if (!plant.Höjd || !plant.Kruka) return count;
    const height = plant.Höjd ? parseInt(plant.Höjd.substring(0, 3)) : 0;
    const potSize = parseFloat(plant.Kruka.replace(/C/, '').replace(/,/g, '.'));
    if (height > 160 || potSize > 10) {
      return count + 1;
    }
    return count;
  }, 0);

  const lengthMellis = totalArea / (depthMellis.value * 100);
  const lengthLilla = totalArea / (depthLilla.value * 100);

  return {
    totalArea,
    percentage,
    highestPlant,
    highestPlantUnderC10And160,
    countUtomhus,
    lengthMellis,
    lengthLilla,
  };
};
</script>

<template>
  <div class="admin settings">
    <div class="side">
      Test krukstorlek:
      <div class="kruk-test">
        <input type="text" v-model="pot" />
        <p>{{ result }}</p>
      </div>
    </div>
    <div class="inputs">
      <div class="input-group">
        <label for="lengthMellis">Längd Mellis (m):</label>
        <input type="number" id="lengthMellis" v-model="lengthMellis" />
      </div>
      <div class="input-group">
        <label for="depthMellis">Djup Mellis (m):</label>
        <input type="number" id="depthMellis" v-model="depthMellis" />
      </div>
      <div class="input-group">
        <label for="lengthLilla">Längd Lilla (m):</label>
        <input type="number" id="lengthLilla" v-model="lengthLilla" />
      </div>
      <div class="input-group">
        <label for="depthLilla">Djup Lilla (m):</label>
        <input type="number" id="depthLilla" v-model="depthLilla" />
      </div>
    </div>
    <div class="stats">
      <p>Mellis area: {{ Math.round(mellisAvailableArea / 1000) / 10 }} m<sup>2</sup></p>
      <p>Lilla area: {{ Math.round(lillaAvailableArea / 1000) / 10 }} m<sup>2</sup></p>
      <p>Total area: {{ Math.round(totalAvailableArea / 1000) / 10 }} m<sup>2</sup></p>
      <p>Totalt: {{ Math.round(totalAreaPlant / 1000) / 10 }} m<sup>2</sup> plantor</p>
    </div>
  </div>
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
      <p class="info area">
        Totalt:
        {{
          Math.round(calculatePlantProperties(getPlantsFromPerson(person)).totalArea / 100) / 100
        }}
        m<sup>2</sup> ({{
          calculatePlantProperties(getPlantsFromPerson(person)).percentage.toFixed(2)
        }}%) - Mellis längd:
        {{ calculatePlantProperties(getPlantsFromPerson(person)).lengthMellis.toFixed(0) }} cm -
        Lilla längd:
        {{ calculatePlantProperties(getPlantsFromPerson(person)).lengthLilla.toFixed(0) }} cm
      </p>
      <p class="info">
        Högsta planta:
        {{ calculatePlantProperties(getPlantsFromPerson(person)).highestPlant.Höjd }} cm - Högsta
        inomhus:
        {{ calculatePlantProperties(getPlantsFromPerson(person)).highestPlantUnderC10And160.Höjd }}
        cm - Antal utomhus:
        {{ calculatePlantProperties(getPlantsFromPerson(person)).countUtomhus }} st
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

.admin.settings {
  display: grid;
  grid-template-columns: 1fr 3fr 2fr;
  gap: 4rem;
  max-width: 70rem;
  padding: 1rem 0 1rem;
}

.admin.settings .kruk-test {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}
.admin.settings .kruk-test input {
  margin: 0;
  height: fit-content;
}

.admin.settings .inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.admin.settings .input-group {
  display: grid;
  grid-template-columns: 1fr 2fr;
  place-items: center start;
}

.admin.settings input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
}

.admin.settings .stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
