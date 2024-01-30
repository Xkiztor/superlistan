<template>
  <li class="grid element-ex" :class="expanded ? 'if-expanded' : ''" ref="testRef">
    <!-- @click.stop="adding = !adding" -->
    <div class="plant-icon"
      :class="{ 't-green': plant.Typ == 'T', 'p-blue': plant.Typ == 'P', 'b-green': plant.Typ == 'B', 'o-yellow': plant.Typ == 'O', 'k-orange': plant.Typ == 'K', 'g-lime': plant.Typ == 'G' }"
      :title="toolTipCalculator(plant.Typ)" @click.stop="testClick" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
      <Icon name="noto:deciduous-tree" size="16" v-if="plant.Typ == 'T'" title="Träd" />
      <Icon name="noto:evergreen-tree" size="16" v-if="plant.Typ == 'B'" title="Barrträd" />
      <Icon name="fxemoji:rosette" size="16" v-if="plant.Typ == 'P'" title="Perenner" />
      <Icon name="noto:potted-plant" size="16" v-if="plant.Typ == 'O'" title="Ormbunke" />
      <Icon name="twemoji:sheaf-of-rice" size="16" v-if="plant.Typ == 'G'" title="Gräs" />
      <Icon name="noto:tanabata-tree" size="16" v-if="plant.Typ == 'K'" title="Klätterväxt" />
    </div>

    <p class="plant-name" :title="plant.Namn"><a
        :href="`https://www.google.com/search?q=${plant.Namn.replace(/\s+/g, '+')}&tbm=isch&dpr=1`" target="_blank">
        {{ plant.Namn }}</a>
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
    <p v-if="plant.MinOrder && !isOnskeLista" class="hide-on-phone red">{{ plant.MinOrder }} </p>
    <p v-else class="hide-on-phone"></p>
    <p v-if="isOnskeLista" class="on-right">{{ plant.Pris * changeCount }} kr</p>
    <p v-else class="on-right">{{ plant.Pris }} kr</p>



    <button class="on-right" aria-label="Expandera" @click="expanded = !expanded">
      <Icon v-if="!expanded" class="" name="material-symbols:keyboard-arrow-up-rounded" size="20" />
      <Icon v-else class="" name="material-symbols:keyboard-arrow-down-rounded" size="20" />
    </button>

    <!-- --- --- --- Expanded --- --- --- -->
    <div class="expanded" v-if="expanded">
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
          <input class="btn-input" type="number" min="0" v-model.number="count">
          <button class="add" @click="count++">+</button>
          <button class="subtract" @click="count -= 1">-</button>
        </div>
        <button @click="handleAdd">Lägg till i varukorg</button>
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
    <!-- <p class="bg-gray-100 rounded-full">Hello</p> -->

  </li>
</template>

<script setup>
import { useStorage } from '@vueuse/core'

const emit = defineEmits(['addToCart', 'handleDelete'])

const props = defineProps({
  plant: Object,
  isOnskeLista: Boolean,
})


const count = ref(1)
const expanded = ref(false)

const state = useGlobalState()

const onskeList = useGlobalOnskeList()

// const onskeList = useStorage('onske-list', [])
// const onskeListFull = useStorage('onske-list-full', [])
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
  for (let obj of onskeList.value.onskeList) {
    if (obj.id === props.plant.id) {
      // console.log('yee');
      obj.count = changeCount.value;
      break;
    }
  }
  for (let obj of onskeList.value.onskeListFull) {
    if (obj.id === props.plant.id) {
      // console.log('yee');
      obj.Count = changeCount.value;
      break;
    }
  }
  // console.log(onskeList.value);
})

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
  // console.log('enter');
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

<style></style>