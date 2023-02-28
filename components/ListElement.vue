<template>
  <li class="grid element rounded-[1rem]" :class="expanded ? 'if-expanded' : ''" ref="testRef">
    <!-- @click.stop="expanded = !expanded" -->
    <div class="plant-icon rounded-full grid px-1 aspect-square place-items-center border-2"
      :class="{ 't-green': plant.Typ == 'T', 'p-blue': plant.Typ == 'P', 'b-green': plant.Typ == 'B', 'o-yellow': plant.Typ == 'O', 'k-orange': plant.Typ == 'K', 'g-lime': plant.Typ == 'G' }"
      :title="toolTipCalculator(plant.Typ)" @click.stop="testClick" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
      <Icon name="noto:deciduous-tree" size="16" v-if="plant.Typ == 'T'" title="Träd" />
      <Icon name="noto:evergreen-tree" size="16" v-if="plant.Typ == 'B'" title="Barrträd" />
      <Icon name="fxemoji:rosette" size="16" v-if="plant.Typ == 'P'" title="Perenner" />
      <Icon name="noto:potted-plant" size="16" v-if="plant.Typ == 'O'" title="Ormbunke" />
      <Icon name="twemoji:sheaf-of-rice" size="16" v-if="plant.Typ == 'G'" title="Gräs" />
      <Icon name="noto:tanabata-tree" size="16" v-if="plant.Typ == 'K'" title="Klätterväxt" />
    </div>

    <p class="plant-name mr-2 ml-3 overflow-hidden" :title="plant.Namn"><a
        :href="`https://www.google.com/search?q=${plant.Namn.replace(/\s+/g, '+')}&tbm=isch&dpr=1`" target="_blank">
        {{
          plant.Namn
        }}</a>
    </p>

    <div class="ikoner hide-on-phone">
      <Icon v-if="plant.Rekommenderas" title="Rekommenderas" class="rekommenderas-icon" name="ph:heart-straight-fill"
        size="20" />
      <Icon v-if="plant.Edible" title="Ätbar" class="edible-icon" name="twemoji:fork-and-knife" size="20" />
      <Icon v-if="plant.Kommentar" :title="plant.Kommentar" class="kommentar-icon" name="majesticons:comment-2-text"
        size="20" />
      <a :href="plant.Länk" :title="plant.Länk" target="_blank">
        <Icon v-if="plant.Länk" class="länk-icon" name="mdi:link-variant" size="20" />
        <!-- <Icon v-if="plant.Länk" class="länk-icon" name="iconoir:internet" size="20" /> -->
      </a>
    </div>

    <!-- --- --- --- List Item Text --- --- --- -->
    <p v-if="plant.Höjd && !isOnskeLista" :title="plant.Höjd" class="mr-2 hide-on-phone">{{ plant.Höjd }} cm</p>
    <p v-else class="mr-2 hide-on-phone"></p>
    <p v-if="!isOnskeLista" :title="plant.Kruka" class="mr-2 whitespace-nowrap hide-on-phone">{{ plant.Kruka }}</p>
    <p v-else class="mr-2 whitespace-nowrap hide-on-phone"
      :class="{ 'error-colorr': changeCount > plant.Lager && plant.Lager != null, 'error-colorrr': changeCount < plant.MinOrder && plant.MinOrder != null }">
      {{ changeCount }}</p>
    <p v-if="plant.MinOrder && !isOnskeLista" class="mr-2 hide-on-phone red">{{ plant.MinOrder }} </p>
    <p v-else class="mr-2 hide-on-phone"></p>
    <p v-if="isOnskeLista" class="mr-2 on-right">{{ plant.Pris * changeCount }} kr</p>
    <p v-else class="mr-2 on-right">{{ plant.Pris }} kr</p>


    <button class="on-right rounded-full grid px-2 aspect-square bg-gray-100" aria-label="Expandera"
      @click="expanded = !expanded">
      <Icon v-if="!expanded" class="my-auto mx-auto cursor-pointer" name="material-symbols:keyboard-arrow-up-rounded"
        size="20" />
      <Icon v-else class="my-auto mx-auto cursor-pointer" name="material-symbols:keyboard-arrow-down-rounded"
        size="20" />
    </button>

    <!-- --- --- --- Expanded --- --- --- -->
    <div class="border-t-rinth-200 border-t-2 p-2 mt-2 mx-0 w-full expanded h-14" v-if="expanded">
      <div class="info-container">
        <div class="ikoner hide-on-pc" :class="{ 'hide-on-phone': !plant.Rekommenderas || !plant.Edible }">
          <Icon v-if="plant.Rekommenderas" class="rekommenderas-icon" name="ph:heart-straight-fill" size="20" />
          <Icon v-if="plant.Edible" class="edible-icon" name="twemoji:fork-and-knife" size="20" />
        </div>
        <p v-if="isOnskeLista" class="hide-on-pc">Antal: {{ changeCount }}</p>
        <p v-if="plant.Höjd" class="hide-on-pc">Höjd: {{ plant.Höjd }}</p>
        <p v-if="plant.Kruka" class="hide-on-pc">Kruka: {{ plant.Kruka }}</p>
        <p v-if="plant.Höjd && isOnskeLista">Höjd: {{ plant.Höjd }}</p>
        <p v-if="plant.Kruka && isOnskeLista">Kruka: {{ plant.Kruka }}</p>
        <p v-if="plant.Lager"
          :class="{ 'error-borderr': changeCount > plant.Lager && plant.Lager != null, 'error-borderrr': count > plant.Lager && plant.Lager != null }">
          Lager: {{ plant.Lager }}</p>
        <p v-if="isOnskeLista">{{ plant.Pris }} kr/st</p>
        <p v-if="plant.MinOrder"
          :class="{ 'error-borderrr': changeCount < plant.MinOrder && changeCount != 0 && plant.MinOrder != null, 'error-borderr': count < plant.MinOrder && !isOnskeLista && plant.MinOrder != null }">
          Min. Order: {{ plant.MinOrder }}</p>
        <a v-if="plant.Länk" :href="plant.Länk" target="_blank" class="link-color underline">Länk</a>
        <p v-if="plant.Zon">Zon: {{ plant.Zon }}</p>
        <p v-if="plant.Storlekskommentar">{{ plant.Storlekskommentar }}</p>
        <p v-if="plant.Kommentar" class="kommentar">Kommentar: {{ plant.Kommentar }}</p>
      </div>
      <div v-if="!isOnskeLista" class="add-section">
        <div class="increment"
          :class="{ 'error-borderr': count > plant.Lager && plant.Lager != null, 'error-borderrr': count < plant.MinOrder && plant.MinOrder != null }">
          <input class="w-14 btn-input" type="number" min="0" v-model.number="count">
          <button class="add" @click="count++">+</button>
          <button class="subtract" @click="count -= 1">-</button>
        </div>
        <button @click="handleAdd">Lägg till i varukorg</button>
      </div>
      <div v-else class="add-section">
        <div class="increment"
          :class="{ 'error-borderr': changeCount > plant.Lager && plant.Lager != null, 'error-borderrr': changeCount < plant.MinOrder && plant.MinOrder != null }">
          <input class="w-14 mr-3 btn-input" type="number" min="0" v-model.number="changeCount">
          <button class="add" @click="changeCount++">+</button>
          <button class="subtract" @click="changeCount -= 1">-</button>
        </div>
        <button @click="handleDelete">Ta bort</button>
      </div>
    </div>

  </li>
</template>

<script setup>
const emit = defineEmits(['addToCart', 'handleDelete'])

const props = defineProps({
  plant: Object,
  isOnskeLista: Boolean,
})


const count = ref(1)
const expanded = ref(false)

const state = useGlobalState()
const onskeList = useGlobalOnskeList()

const changeCount = ref(props.plant.Count)

if (props.plant.MinOrder && !props.isOnskeLista) {
  count.value = props.plant.MinOrder
}

const validate = () => {
  if (changeCount.value > props.plant.Lager && props.plant.Lager != null || changeCount.value < props.plant.MinOrder && props.plant.MinOrder != null) {
    state.countError.value = true
    console.log('count erroorrr');
  } else {
    state.countError.value = false
  }
}
validate()

watch(changeCount, () => {
  validate()
  for (let obj of onskeList.onskeList.value) {
    if (obj.id === props.plant.id) {
      obj.count = changeCount.value;
      break;
    }
  }
  for (let obj of onskeList.onskeListFull.value) {
    if (obj.id === props.plant.id) {
      obj.Count = changeCount.value;
      break;
    }
  }
})


const handleAdd = () => {
  if (expanded) {
    console.log(props.plant.id);
    console.log(count.value);
    console.log(props.plant);
    emit('addToCart', props.plant.id, count.value)
    expanded.value = false
  } else {
    expanded.value = true
  }
}



const handleDelete = () => {
  console.log(props.plant.id)
  emit('handleDelete', props.plant.id)
}

const toolTipCalculator = (firstLetter) => {
  if (firstLetter === 'T') return 'Träd'
  if (firstLetter === 'B') return 'Barrväxt'
  if (firstLetter === 'G') return 'Gräs'
  if (firstLetter === 'K') return 'Klätterväxt'
  if (firstLetter === 'O') return 'Ormbunke'
  if (firstLetter === 'P') return 'Perenner'
}

const testClick = () => {
  console.log('Clicked');
  window.open(
    `https://www.google.com/search?q=${props.plant.Namn.replace(/\s+/g, '+')}&tbm=isch&dpr=1`,
    'newwindow',
    'width=1000, height=2000'
  );
  return false;
}

var timeout

function mouseEnter() {
  timeout = setTimeout(() => {
    window.open(
      `https://www.google.com/search?q=${props.plant.Namn.replace(/\s+/g, '+')}&tbm=isch&dpr=1`,
      'newwindow',
      'width=1000, height=1000'
    );
    return false;
  }, 300)
}

function mouseLeave() {
  // console.log('leave');
  clearTimeout(timeout);
}

</script>

<style>
.btn-add {
  aspect-ratio: 1;
}

.error-border {
  outline: 3px solid #ff5e5e;
}

.error-borderr {
  outline: 3px solid #ff5e5e;
}

.error-borderrr {
  outline: 3px solid #ff5e5e;
}

.error-color {
  color: #ff5e5e;
  font-weight: bold;
}

.error-colorr {
  color: #ff5e5e;
  font-weight: bold;
}

.error-colorrr {
  color: #ff5e5e;
  font-weight: bold;
}

.element {
  max-width: 90rem;
  overflow: hidden;
  min-width: 0px;
  padding-left: 7px;
  width: fit-content;
  background-color: white;
  grid-template-columns: 1fr 33fr 10fr 15fr 8fr 2fr 8fr 3fr;
  place-items: center start;
  transition: all 100ms;
  min-height: 32px;
  z-index: 2;
  position: relative;
}

.dark .element {
  background: #26292f;
  color: #d7dae0;
}

.dark .element:hover:not(.if-expanded) {
  translate: none;
  background: #2f3239;
}

.dark .element.if-expanded {
  background: #272a30
}

.dark .element>button {
  background: none;
  box-shadow: none;
}

.element>p {
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 0px;
  white-space: nowrap;
  max-width: 90%;
}

.element:not(.if-expanded) {
  border-radius: 2rem;
}

.if-expanded>p {
  white-space: normal;
  overflow: visible;
}

.element:hover:not(.if-expanded) {
  translate: 7px 0;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  z-index: 3;

}

.expanded {
  display: grid;
  grid-template-columns: 15fr 4fr;
  grid-column: 1 / 9;
  place-items: center;
  height: fit-content;
}

.dark .expanded {
  border-color: #373c46;
}

.if-expanded {
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  margin: 1rem 0;
}

.ikoner {
  color: rgb(128, 128, 128);
  place-self: center start;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;
  gap: 4px;
}

.ikoner>a {
  grid-column: 4;
  /* height: 20px; */
  overflow: hidden;
  font-size: 0;
}

.rekommenderas-icon {
  color: #ff5e5e;
  grid-column: 1;
}

.edible-icon {
  grid-column: 2;
  color: rgb(128, 128, 128);
}

.kommentar-icon {
  grid-column: 3;
  color: rgb(128, 128, 128);
}

.länk-icon {
  grid-column: 4;
  color: rgb(128, 128, 128);
}


.expanded p,
.expanded a {
  padding: 0.4rem 0.9rem;
  border-radius: 10rem;
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
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  place-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.info-container>p {
  cursor: text;
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

  .plant-name {
    margin-left: 0.6rem;
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
    display: none !important;
  }
}

.increment {
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 1fr 1fr;
  /* height: 3rem; */
  border-radius: 0.5rem;
  margin: 0.5rem 0;
}

.increment *,
.increment>input {
  margin: 0;
  box-shadow: none;
}

.increment button {
  padding: 0 0.2rem;
}

.increment input {
  border-radius: 0.5rem 0 0 0.5rem;
  width: 2.5rem;
  outline-width: 0;
  outline: none;
  grid-row: 1/3;
  border-right: 1px solid rgb(219, 219, 219);
  text-align: center;
  -moz-appearance: textfield;
  appearance: textfield;
}

.increment input::-webkit-outer-spin-button,
.increment input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}


.increment input:focus {
  box-shadow: inset 0 -0.5px 3px 1px #cfd1d6;
}

.dark .increment input:focus {
  box-shadow: inset 0 -0.5px 0px 2px #434a54;
}

.dark .increment input {
  border-color: #3b3f47;
}

.increment .add {
  border-radius: 0 0.5rem 0 0;
}

.increment .subtract {
  border-radius: 0 0 0.5rem 0;
}



.on-right {
  place-self: center end;
  background-color: transparent;
  box-shadow: none;
  /* height: 100%; */
  max-height: 32px;
  width: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  place-items: center;
}

.t-green {
  border-color: rgb(130, 203, 130);
}

.p-blue {
  border-color: rgb(255, 146, 157);
}

.b-green {
  border-color: rgb(89, 161, 79);
}

.k-orange {
  border-color: rgb(253, 50, 44);
}

.o-yellow {
  border-color: rgb(236, 226, 117);
}

.g-lime {
  border-color: rgb(137, 189, 43);
}

.dark .b-green {
  border-color: rgb(25, 89, 45);
}

.dark .p-blue {
  border-color: rgb(255, 146, 157);
}

.dark .k-orange {
  border-color: rgb(238, 100, 88);
}
</style>