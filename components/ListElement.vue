<template>
  <li class="element"
    :class="expanded ? 'if-expanded' : '', { 'sidebar-selected': plant.Namn === state.searchedPlant.value && state.sidebarMode.value && state.showGoogleSearchResult.value }"
    ref="testRef">
    <!-- @click.stop="expanded = !expanded" -->
    <div class="plant-icon"
      :class="{ 't-green': plant.Typ == 'T', 'p-blue': plant.Typ == 'P', 'b-green': plant.Typ == 'B', 'o-lime': plant.Typ == 'O', 'k-orange': plant.Typ == 'K', 'g-yellow': plant.Typ == 'G' }"
      :title="toolTipCalculator(plant.Typ)" @click.stop="iconClick()">
      <Icon name="noto:deciduous-tree" size="14" v-if="plant.Typ == 'T'" title="Träd" />
      <Icon name="noto:evergreen-tree" size="14" v-if="plant.Typ == 'B'" title="Barrträd" />
      <Icon name="fxemoji:rosette" size="14" v-if="plant.Typ == 'P'" title="Perenner" />
      <Icon name="game-icons:fern" size="14" v-if="plant.Typ == 'O'" title="Ormbunke" class="ormbunke-icon" />
      <Icon name="game-icons:high-grass" size="14" v-if="plant.Typ == 'G'" title="Gräs" class="grass-icon" />
      <Icon name="game-icons:curling-vines" size="14" v-if="plant.Typ == 'K'" title="Klätterväxt"
        class="klattervaxt-icon" />
    </div>

    <p class="plant-name" :title="plant.Namn">
      <a :href="`https://www.google.com/search?q=${plant.Namn.replace(/\s+/g, '+')}&tbm=isch&dpr=1`" target="_blank">
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
    <p v-if="plant.Höjd && !isOnskeLista" :title="plant.Höjd" class="hide-on-phone">{{ plant.Höjd }} cm</p>
    <p v-else class="hide-on-phone"></p>
    <p v-if="!isOnskeLista" :title="plant.Kruka" class="nowrap hide-on-phone">{{ plant.Kruka }}</p>
    <p v-else class="nowrap hide-on-phone"
      :class="{ 'error-colorr': changeCount > plant.Lager && plant.Lager != null, 'error-colorrr': changeCount < plant.MinOrder && plant.MinOrder != null }">
      {{ changeCount }}</p>
    <p v-if="plant.MinOrder && !isOnskeLista" class="hide-on-phone">{{ plant.MinOrder }} </p>
    <p v-else class="hide-on-phone"></p>
    <p v-if="isOnskeLista" class="on-right">{{ plant.Pris * changeCount }} kr</p>
    <p v-else class="on-right">{{ plant.Pris }} kr</p>


    <button class="on-right expand-button" aria-label="Expandera" @click="handleExpand()">
      <Icon v-if="!expanded" class="" name="material-symbols:keyboard-arrow-up-rounded" size="23" />
      <Icon v-else class="" name="material-symbols:keyboard-arrow-down-rounded" size="23" />
    </button>

    <!-- --- --- --- Expanded --- --- --- -->
    <Transition name="expand">
      <div class="expanded" v-if="expanded">
        <div class="info-container">
          <div class="ikoner hide-on-pc" :class="{ 'hide-on-phone': !plant.Rekommenderas }">
            <Icon v-if="plant.Rekommenderas" class="rekommenderas-icon" name="ph:heart-straight-fill" size="20" />
          </div>
          <div class="ikoner hide-on-pc" :class="{ 'hide-on-phone': !plant.Edible }">
            <Icon v-if="plant.Edible" class="" name="twemoji:fork-and-knife" size="20" />
          </div>
          <p v-if="isOnskeLista" class="hide-on-pc">Antal: {{ changeCount }}</p>
          <p v-if="plant.Höjd" class="hide-on-pc">Höjd: {{ plant.Höjd }}</p>
          <p v-if="plant.Kruka" class="hide-on-pc">Kruka: {{ plant.Kruka }}</p>
          <p v-if="plant.Höjd && isOnskeLista">Höjd: {{ plant.Höjd }}</p>
          <p v-if="plant.Kruka && isOnskeLista">Kruka: {{ plant.Kruka }}</p>
          <p v-if="plant.Lager"
            :class="{ 'error-borderr': changeCount > plant.Lager && plant.Lager != null, 'error-borderrr': order > plant.Lager && plant.Lager != null }">
            Lager: {{ plant.Lager }}</p>
          <p v-if="isOnskeLista">{{ plant.Pris }} kr/st</p>
          <p v-if="plant.MinOrder"
            :class="{ 'error-borderrr': changeCount < plant.MinOrder && changeCount != 0 && plant.MinOrder != null, 'error-borderr': order < plant.MinOrder && !isOnskeLista && plant.MinOrder != null }">
            Min. Order: {{ plant.MinOrder }}</p>
          <a v-if="plant.Länk" :href="plant.Länk" target="_blank" class="link-color underline">Länk</a>
          <p v-if="plant.Zon">Zon: {{ plant.Zon }}</p>
          <p v-if="plant.Storlekskommentar">{{ plant.Storlekskommentar }}</p>
          <p v-if="plant.Kommentar" class="kommentar">Kommentar: {{ plant.Kommentar }}</p>
        </div>
        <div v-if="!isOnskeLista" class="add-section">
          <div v-if="!isAdded" class="increment"
            :class="{ 'error-borderr': order > plant.Lager && plant.Lager != null, 'error-borderrr': order < plant.MinOrder && plant.MinOrder != null }">
            <input class="btn-input" type="number" min="0" v-model.number="order">
            <button class="add" @click="order++">+</button>
            <button class="subtract" @click="order -= 1">-</button>
          </div>
          <button v-else @click="handleDelete">
            <Icon class="red" name="material-symbols:delete-forever-outline-rounded" size="24" />
          </button>
          <button v-if="!isAdded" :class="{ 'disabled': state.countError.value }" :disabled="state.countError.value"
            @click="handleAdd">Lägg till i varukorg</button>
          <button v-else class="muted-button tillagd">
            <Icon class="check-icon" aria-label="Tillagt i varukorgen" name="material-symbols:check-circle-rounded" />
            Tillagd i varukorg
          </button>
          <!-- <button v-if="state.countError.value" disabled class="disabled">Lägg till i varukorg</button>
          <button v-else-if="!isAdded" @click="handleAdd">Lägg till i varukorg</button>
          <button v-else class="muted-button tillagd">
            <Icon class="check-icon" aria-label="Tillagt i varukorgen" name="material-symbols:check-circle-rounded" />
            Tillagd i varukorg
          </button> -->

        </div>
        <div v-else class="add-section">
          <div class="increment"
            :class="{ 'error-borderr': changeCount > plant.Lager && plant.Lager != null, 'error-borderrr': changeCount < plant.MinOrder && plant.MinOrder != null }">
            <input class="btn-input" type="number" min="0" v-model.number="changeCount">
            <button class="add" @click="changeCount++">+</button>
            <button class="subtract" @click="changeCount -= 1">-</button>
          </div>
          <button @click="handleDelete">Ta bort</button>
        </div>
      </div>
    </Transition>
  </li>
</template>

<script setup>
const emit = defineEmits(['addToCart', 'handleDelete'])

const props = defineProps({
  plant: Object,
  isOnskeLista: Boolean,
})


const order = ref(1)
const expanded = ref(false)
const isAdded = ref(false)

const state = useGlobalState()
const onskeList = useGlobalOnskeList()

// console.log(onskeList.onskeList.value);

const checkIfAdded = () => {
  if (onskeList.onskeList.value.some(obj => obj.id === props.plant.id)) {
    isAdded.value = true
    // console.log(`Has added, id: ${props.plant.id}`);
  } else {
    isAdded.value = false
  }
}
checkIfAdded()

onUpdated(() => {
  checkIfAdded()
})

const changeCount = ref(props.plant.Count)

if (props.plant.MinOrder && !props.isOnskeLista) {
  order.value = props.plant.MinOrder
}

const validate = () => {
  if (changeCount.value > props.plant.Lager && props.plant.Lager != null || changeCount.value < props.plant.MinOrder && props.plant.MinOrder != null) {
    state.countError.value = true
    console.log('count erroorrr');
  } else {
    state.countError.value = false
  }
}
// validate()

watch(changeCount, () => {
  validate()
  for (let obj of onskeList.onskeList.value) {
    if (obj.id === props.plant.id) {
      obj.Count = changeCount.value;
      break;
    }
  }
})

const validateOrder = () => {
  if (order.value > props.plant.Lager && props.plant.Lager != null || order.value < props.plant.MinOrder && props.plant.MinOrder != null) {
    state.countError.value = true
    console.log('count erroorrr');
  } else {
    state.countError.value = false
  }
}


watch(order, () => {
  console.log('order changed');
  validateOrder()
})

const handleExpand = () => {
  checkIfAdded()
  expanded.value = !expanded.value
}


const handleAdd = () => {
  if (expanded) {
    console.log(`Added plant id: ${props.plant.id}`);
    console.log(`Added count: ${order.value}`);
    console.log(props.plant);
    emit('addToCart', props.plant, order.value)
    useGlobalOnskeList()
    isAdded.value = true
    // expanded.value = false
  } else {
    expanded.value = true
  }
}

const handleDelete = () => {
  const index = onskeList.onskeList.value.findIndex(b => b.id === props.plant.id)
  console.log(index);
  onskeList.onskeList.value = onskeList.onskeList.value.filter(b => b.id != props.plant.id)
  isAdded.value = false
}

const toolTipCalculator = (firstLetter) => {
  if (firstLetter === 'T') return 'Träd'
  if (firstLetter === 'B') return 'Barrväxt'
  if (firstLetter === 'G') return 'Gräs'
  if (firstLetter === 'K') return 'Klätterväxt'
  if (firstLetter === 'O') return 'Ormbunke'
  if (firstLetter === 'P') return 'Perenner'
}

const iconClick = async () => {
  // console.log('Clicked');
  // window.open(
  //   `https://www.google.com/search?q=${props.plant.Namn.replace(/\s+/g, '+')}&tbm=isch&dpr=1`,
  //   'newwindow',
  //   'width=1000, height=2000'
  // );
  // return false;
  state.showGoogleSearchResult.value = true
  state.searchedPlant.value = props.plant.Namn

  if (state.sidebarMode.value === true) {
    state.showImages.value = false
  }

  const url = ref(`https://www.googleapis.com/customsearch/v1?cx=0114e20bfe1bc4e87&key=AIzaSyDCXzTT72V9WC44HefCRffYeK7o-sFwE0Y&num=10&start=1&searchType=image&q=${props.plant.Namn.replace(/\s+/g, '+')}`)

  const { data, error } = await useFetch(url)

  if (data) {
    console.log(data);
    state.googleSearchResult.value = data.value
    state.showImages.value = true
  }
  if (error) {
    console.error(error);
  }
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

.muted-button {
  color: var(--text-mute);
}


.muted-button:hover {
  background: var(--element-top);
  cursor: default;
}


.element {
  display: grid;
  /* border-radius: 1rem; */
  padding: 0.235rem 0 0.235rem 0.4rem;
  max-width: 90rem;
  overflow: hidden;
  min-width: 0px;
  /* padding-left: 7px; */
  width: fit-content;
  /* background-color: var(--element-bg); */
  grid-template-columns: 1fr 33fr 10fr 15fr 8fr 2fr 8fr 3fr;
  place-items: center start;
  transition: all 100ms;
  min-height: 32px;
  z-index: 2;
  position: relative;
  border: 1px solid transparent;
  background: var(--element-bg);
  /* border-bottom: 1px solid var(--border-color); */
  border-bottom: 1px solid var(--bg);

  --current-icon-color: #000000;
}

.dark .element {
  /* border-color: var(--border-color); */
  /* border-color: rgb(31, 31, 34); */
  border-color: transparent;
}

.element p {
  margin-right: 0.5rem;
}

.if-expanded {
  /* box-shadow: var(--box-shadow); */
  /* border: 1px solid var(--border-color); */
  /* margin: 1rem 0 0; */
  padding-bottom: 2rem;
  padding-top: 0.5rem;
  /* padding-left: 0.25rem; */
}

.element>p {
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 0px;
  white-space: nowrap;
  max-width: 90%;
}


.element:first-of-type {
  border-radius: 1rem 1rem 0 0;
  /* padding-top: 0.4rem; */
}

.if-expanded>p {
  white-space: normal;
  overflow: visible;
}

.element:hover:not(.if-expanded) {
  /* translate: 7px 0; */
  /* box-shadow: var(--box-shadow); */
  z-index: 3;

}

@media screen and (max-width: 750px) {
  .hide-on-phone {
    display: none !important;
  }

  .element {
    grid-template-columns: 1fr 40fr 8fr 1fr !important;
  }
}

.expanded {
  grid-column: 1 / 9;
  place-items: center;
  height: fit-content;
  width: 100%;
  /* border-top: 1px solid var(--border-color); */
  margin-top: 0.5rem;
  /* padding-top: 0.5rem; */
}


@media screen and (min-width: 500px) {
  .expanded {
    display: grid;
    grid-template-columns: 12fr 5fr;
  }
}

:not(.dark) .expand-button:hover {
  opacity: 0.5;
  background: none;
}

.dark .expand-button:hover {
  color: #fff;
}

.plant-name {
  margin-left: 0.75rem;
}

/* Alla med .sidebar-selected */
.element.sidebar-selected {
  border-right: 2px solid var(--current-icon-color);
  border-left: 2px solid var(--current-icon-color);
}

/* Första med .sidebar-selected */
.sidebar-selected:first-child,
.element:not(.sidebar-selected)+.sidebar-selected {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  border-top: 2px solid var(--current-icon-color)
}

/* Sista med .sidebar-selected */
.element.sidebar-selected:not(:has(~ .sidebar-selected)) {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-bottom: 2px solid var(--current-icon-color)
}

.element {
  transition: border-color 0.5s, border-radius 0.5s;
}

.element:has(.t-green) {
  --current-icon-color: rgb(153, 196, 103);
}

.element:has(.p-blue) {
  --current-icon-color: rgb(255, 146, 157);
}

.element:has(.b-green) {
  --current-icon-color: rgb(89, 161, 79);
}

.element:has(.k-orange) {
  --current-icon-color: rgb(130, 203, 130);
}

.element:has(.o-lime) {
  --current-icon-color: rgb(152, 189, 43);
}

.element:has(.g-yellow) {
  --current-icon-color: rgb(236, 226, 117);
}

.dark .element:has(.b-green) {
  --current-icon-color: rgb(25, 89, 45);
}

.dark .element:has(.p-blue) {
  --current-icon-color: rgb(255, 146, 157);
}

.dark .element:has(.k-orange) {
  --current-icon-color: rgb(89, 161, 79);
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

.info-container .ikoner {
  grid-template-columns: auto;
}

.plant-icon {
  display: grid;
  cursor: pointer;
  /* cursor: alias; */
  place-items: center;
  border-width: 2px;
  aspect-ratio: 1 / 1;
  border-radius: 10000rem;
  padding-left: 0.17rem;
  padding-right: 0.17rem;
}

.rekommenderas-icon {
  color: #ff5e5e;
  grid-column: 1;
}

.edible-icon {
  grid-column: 2;
}

.kommentar-icon {
  grid-column: 3;
  color: var(--text-mute);
  /* color: rgb(128, 128, 128); */
}

.länk-icon {
  grid-column: 4;
  color: rgb(128, 128, 128);
}


.expanded p,
.expanded a,
.expanded .ikoner {
  padding: 0.4rem 0.9rem;
  border-radius: 10rem;
}

.add-section {
  display: grid;
  grid-column: 5;
  margin-left: auto;
  grid-column: 2 / 3;
  margin-right: 0.5rem;
  /* width: 100%; */
  height: min-content;
  gap: 0.5rem;
  grid-template-columns: max-content max-content;
}

.add-section>button {
  height: 100%;
  /* padding: 1rem; */
  margin: 0;
  flex-grow: 1;
}

.expanded .add-section button.tillagd {
  color: var(--primary-green)
}


@media screen and (max-width: 500px) {
  .add-section {
    width: 100%;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    width: fit-content;
    margin: 0 auto;
    border-top: 1px solid var(--border-color);
    padding-top: 0.5rem;
    margin-top: 0.5rem;
  }

}

.check-icon {
  color: var(--primary-green);
  font-size: 1.5rem;
  margin: auto 0;
}


.info-container {
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  place-items: center;
  gap: 0 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 500px) {
  .info-container {
    padding-top: 0.5rem;
  }
}

.info-container>p {
  cursor: text;
}

.info-container a.link-color {
  text-decoration: underline;
  color: var(--link)
}

.kommentar {
  grid-column: 1 / 3;
  text-align: center;
}

.link-color {
  color: var(--link);
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
  /* margin: 0.5rem 0; */
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
  border-right: 1px solid transparent;
  text-align: center;
  -moz-appearance: textfield;
  appearance: textfield;
}

.increment input::-webkit-outer-spin-button,
.increment input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}


.increment input:focus,
.increment input:hover {
  box-shadow: var(--box-shadow-inset);
}

.dark .increment input:focus {
  box-shadow: var(--box-shadow-inset-dark);
}

.dark .increment input {
  border-color: var(--border-color-dark);
}

.increment .add {
  border-radius: 0 0.5rem 0 0;
}

.increment .subtract {
  border-radius: 0 0 0.5rem 0;
}

.no-wrap {
  white-space: nowrap;
}

button.disabled {
  color: var(--text-mute);
}

.dark button.disabled {
  color: var(--text-mute-dark);
}

button.disabled:hover,
button.tillagd:hover {
  cursor: default;
  background: var(--element-top);
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

.expand-enter-active {
  transition: all 0.2s ease;
}

.expand-leave-active {
  transition: all 0.2s ease;
}

.expand-enter-from {
  position: absolute;
  translate: 0 -30px;
  opacity: 0;
}

.expand-leave-to {
  margin: 0;
  height: 0;
  opacity: 0;
}
</style>