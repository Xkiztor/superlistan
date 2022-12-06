<template>
  <div @click="handleClick" class="md:max-w-4xl xl:max-w-4xl grid element rounded-[1rem]"
    :class="adding ? 'if-adding' : ''">
    <div class="plant-icon rounded-full grid px-1 aspect-square place-items-center border-2"
      :class="{ 't-green': plant.Typ == 'T', 'p-blue': plant.Typ == 'P', 'b-green': plant.Typ == 'B', 'o-yellow': plant.Typ == 'O', 'k-orange': plant.Typ == 'K', 'g-lime': plant.Typ == 'G' }"
      :title="toolTipCalculator(plant.Typ)">
      <Icon name="noto:deciduous-tree" size="16" v-if="plant.Typ == 'T'" title="Träd" />
      <Icon name="noto:evergreen-tree" size="16" v-if="plant.Typ == 'B'" />
      <Icon name="noto:tulip" size="16" v-if="plant.Typ == 'P'" />
      <Icon name="noto:potted-plant" size="16" v-if="plant.Typ == 'O'" />
      <Icon name="noto:herb" size="16" v-if="plant.Typ == 'G'" />
      <Icon name="noto:tanabata-tree" size="16" v-if="plant.Typ == 'K'" />
    </div>

    <p class="mr-2 ml-4 overflow-hidden"><a
        :href="`https://www.google.com/search?q=${plant.Namn.replace(/\s+/g, '+')}&tbm=isch&dpr=1`" target="_blank">{{
            plant.Namn
        }}</a></p>

    <p v-if="plant.Höjd && !isOnskeLista" class="mr-2 hide-on-phone">{{ plant.Höjd }} cm</p>
    <p v-else class="mr-2 hide-on-phone"></p>
    <p v-if="!isOnskeLista" class="mr-2 whitespace-nowrap hide-on-phone">{{ plant.Kruka }}</p>
    <p v-else class="mr-2 whitespace-nowrap hide-on-phone">{{ plant.Count }}</p>
    <p v-if="isOnskeLista" class="mr-2 on-right">{{ formatNumber(plant.Pris * plant.Count) }} kr</p>
    <p v-else class="mr-2 on-right">{{ formatNumber(plant.Pris) }} kr</p>
    <!-- <button class="bg-gray-100 rounded-full text-center btn-add p-2">+</button> -->
    <!-- <div class="bg-gray-100 rounded-full p-2 w-10 aspect-square"><p class="text-center">+</p></div> -->
    <button class="on-right rounded-full grid px-2 aspect-square bg-gray-100" @click="adding = !adding">
      <Icon v-if="!adding" class="my-auto mx-auto cursor-pointer" name="material-symbols:keyboard-arrow-up-rounded"
        size="20" />
      <Icon v-else class="my-auto mx-auto cursor-pointer" name="material-symbols:keyboard-arrow-down-rounded"
        size="20" />
    </button>
    <div class="border-t-rinth-200 border-t-2 p-2 mt-2 mx-0 w-full adding h-14" v-if="adding">
      <div class="info-container">
        <p v-if="plant.Höjd" class="hide-on-pc">Höjd: {{ plant.Höjd }}</p>
        <p v-if="plant.Kruka" class="hide-on-pc">Kruka: {{ plant.Kruka }}</p>
        <p v-if="plant.Lager">Lager: {{ plant.Lager }}</p>
        <p v-if="isOnskeLista">{{ plant.Pris }} kr/st</p>
        <p v-if="plant.MinOrder">Min. Order: {{ plant.MinOrder }}</p>
        <a v-if="plant.Länk" :href="plant.Länk" target="_blank" class="link-color underline">Länk</a>
        <p v-if="plant.Storlekskommentar">{{ plant.Storlekskommentar }}</p>
        <p v-if="plant.Kommentar" class="kommentar">Kommentar: {{ plant.Kommentar }}</p>
        <p v-if="plant.Zon">Zon: {{ plant.Zon }}</p>
      </div>
      <div v-if="!isOnskeLista" class="add-section">
        <input class="w-14 mr-3 btn-input" type="number" min="0" v-model.number="count">
        <button @click="handleAdd">Lägg till</button>
      </div>
      <div v-else class="add-section">
        <input class="w-14 mr-3 btn-input" type="number" v-model.number="count">
        <button @click="handleDelete">Ta bort</button>
      </div>
    </div>
    <!-- <p class="bg-gray-100 rounded-full">Hello</p> -->

  </div>
</template>

<script setup>
const emit = defineEmits(['addToCart', 'handleDelete'])

const props = defineProps({
  plant: Object,
  rowHeight: Number,
  textSize: Number,
  isOnskeLista: Boolean,
})


const count = ref(1)
const adding = ref(false)

// console.log(props.rowHeight)

const handleAdd = () => {
  if (adding) {
    console.log(props.plant.id);
    console.log(count.value);
    emit('addToCart', props.plant.id, count.value)
    adding.value = false
  } else {
    adding.value = true
  }
}

const formatNumber = (x) => {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
    x = x.replace(pattern, "$1,$2");
  return x;
}

const handleDelete = () => {
  console.log(props.plant.id)
  emit('handleDelete', props.plant.id)
}

const handleClick = () => {
}

const toolTipCalculator = (firstLetter) => {
  if (firstLetter === 'T') return 'Träd'
  if (firstLetter === 'B') return 'Barrväxt'
  if (firstLetter === 'G') return 'Gräs'
  if (firstLetter === 'K') return 'Klätterväxt'
  if (firstLetter === 'O') return 'Ormbunke'
  if (firstLetter === 'P') return 'Perenner'
}

// const handleAdd = () => {
//   if (typeof window !== 'undefined') {
//     localStorage.setItem('cart', `${'test'}`);
//     console.log(localStorage.getItem('cart'));
//   }
// }


</script>

<style>
.btn-add {
  /* border: 1px solid rgb(235, 235, 235); */
  aspect-ratio: 1;
}

.element {
  padding: 3px;
  padding-left: 7px;
  width: fit-content;
  /* border: 1px solid rgb(225, 225, 225); */
  /* margin-left: 0.75rem; */
  grid-template-columns: 1fr 40fr 15fr 8fr 10fr 3fr;
  /* grid-template-rows: 1fr 1fr; */
  place-items: center start;
  /* min-width: 30rem; */
  font-size: v-bind(textSize + 'px');
  transition: all 100ms;
  height: fit-content;
}

.element:not(.if-adding) {
  border-radius: 2rem;
}

.element:hover:not(.if-adding) {
  /* border-color: rgb(173, 173, 173);
  border-width: 2px; */
  /* border: 1px solid rgb(173, 173, 173); */
  /* margin: 0 1.5rem; */
  translate: 7px 0;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);

}

.adding {
  display: grid;
  grid-template-columns: 4fr 1fr;
  /* grid-template-columns: 10fr 10fr 10fr 10fr 7fr;
  place-items: center; */
  grid-column: 1 / 7;
  /* box-shadow: 0 -5px 3px rgba(0, 0, 0, 0.1); */
  place-items: center;
  height: fit-content;
  /* justify-content: space-evenly; */
}

.if-adding {
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  margin: 1rem 0;
}

/* .adding>*:not(:nth-last-child(1)) {
  margin-right: 1rem;
} */

.adding p,
.adding a {
  /* border: 1px solid rgb(223, 223, 223); */
  padding: 0.4rem 0.9rem;
  border-radius: 10rem;
  /* background-color: rgb(236, 236, 236); */
}

.add-section {
  grid-column: 5;
  /* margin-left: auto; */
  display: grid;
  place-items: center end;
  grid-column: 2 / 3;
  width: 100%;
}

.info-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  height: 100%;
  margin: 0;
  place-items: center;
  grid-column: 1 / 2;
}

.kommentar {
  grid-column: 1 / 3;
  text-align: center;
}

.link-color {
  color: #0000EE;
}

@media only screen and (max-width: 600px) {
  .element {
    font-size: 0.9rem
  }

  .kommentar {
    grid-column: span 3;
  }
}

@media only screen and (min-width: 900px) {
  .add-section {
    display: flex;
    justify-content: flex-end;
  }
}

@media only screen and (min-width: 750px) {
  .hide-on-pc {
    display: none;
  }
}

.on-right {
  place-self: center end;
  background-color: transparent;
  box-shadow: none;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  place-items: center;
}


.t-green {
  border-color: rgb(117, 236, 117);
}

.p-blue {
  border-color: rgb(117, 208, 236);
}

.b-green {
  border-color: rgb(89, 161, 79);
}

.k-orange {
  border-color: rgb(236, 127, 117);
}

.o-yellow {
  border-color: rgb(236, 226, 117);
}

.g-lime {
  border-color: rgb(137, 189, 43);
}

/* .t-green {
  background-color: rgb(117, 236, 117);
}

.p-blue {
  background-color: rgb(117, 208, 236);
}

.b-green {
  background-color: rgb(89, 161, 79);
}

.k-orange {
  background-color: rgb(236, 143, 117);
}

.o-yellow {
  background-color: rgb(236, 226, 117);
}

.g-pink {
  background-color: rgb(246, 168, 255);
} */
</style>