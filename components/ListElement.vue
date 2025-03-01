<script setup>
// Define emits and props
const emit = defineEmits(['addToCart', 'handleDelete']);
const props = defineProps({
  plant: Object,
  isOnskeLista: Boolean,
  lignosdatabasen: Object,
});

// Reactive variables
const order = ref(1);
const expanded = ref(false);
const isAdded = ref(false);
const changeCount = ref(props.plant.Count);

// Global state
const state = useGlobalState();
const onskeList = useGlobalOnskeList();

// Check if the plant is already added to the list
const checkIfAdded = () => {
  isAdded.value = onskeList.onskeList.value.some((obj) => obj.id === props.plant.id);
};
checkIfAdded();

onUpdated(() => {
  checkIfAdded();
});

// Set initial order value
if (props.plant.MinOrder && !props.isOnskeLista) {
  order.value = props.plant.MinOrder;
}

// Validate the change count
const validate = () => {
  const { Lager, MinOrder } = props.plant;
  state.countError.value =
    (changeCount.value > Lager && Lager != null) ||
    (changeCount.value < MinOrder && MinOrder != null);
};

// Watch for changes in changeCount
watch(changeCount, () => {
  validate();
  onskeList.onskeList.value.forEach((obj) => {
    if (obj.id === props.plant.id) {
      obj.Count = changeCount.value;
    }
  });
});

// Validate the order value
const validateOrder = () => {
  const { Lager, MinOrder } = props.plant;
  state.countError.value =
    (order.value > Lager && Lager != null) || (order.value < MinOrder && MinOrder != null);
};

// Watch for changes in order
watch(order, () => {
  validateOrder();
});

// Handle expand/collapse of the list element
const handleExpand = () => {
  checkIfAdded();
  expanded.value = !expanded.value;
};

// Handle adding the plant to the cart
const handleAdd = () => {
  if (expanded.value) {
    emit('addToCart', props.plant, order.value);
    isAdded.value = true;
  } else {
    expanded.value = true;
  }
};

// Handle deleting the plant from the list
const handleDelete = () => {
  onskeList.onskeList.value = onskeList.onskeList.value.filter((b) => b.id !== props.plant.id);
  isAdded.value = false;
};

// Calculate tooltip based on plant type
const toolTipCalculator = (firstLetter) => {
  const tooltips = {
    T: 'Träd',
    B: 'Barrväxt',
    G: 'Gräs',
    K: 'Klätterväxt',
    O: 'Ormbunke',
    P: 'Perenner',
  };
  return tooltips[firstLetter];
};

// Handle icon click to perform Google search
const iconClick = async () => {
  if (!props.isOnskeLista) {
    state.showGoogleSearchResult.value = true;
    state.searchedPlant.value = props.plant.Namn;

    if (state.sidebarMode.value) {
      state.showImages.value = false;
    }

    const url = ref(
      `https://www.googleapis.com/customsearch/v1?cx=0114e20bfe1bc4e87&key=AIzaSyDCXzTT72V9WC44HefCRffYeK7o-sFwE0Y&num=10&start=1&searchType=image&q=${props.plant.Namn.replace(
        /\s+/g,
        '+'
      )}`
    );
    const { data, error } = await useFetch(url);

    if (data) {
      state.googleSearchResult.value = data.value;
      state.showImages.value = true;
    }
    if (error) {
      console.error(error);
    }
  }
};

// Compute article data from lignosdatabasen
const databasArtikel = computed(() => {
  const artikelObject = {
    text: '',
    images: [],
    compressedImages: [],
    url: '',
    svensktNamn: '',
    finns: false,
    ingress: '',
  };

  const unformattedSuperlistName = props.plant.Namn.toLowerCase()
    .replace(/'/g, '')
    .replace(/ /g, '');
  const artikelSameSortnamn = props.lignosdatabasen.find(
    (e) =>
      `${e.slakte.toLowerCase().replace(/ /g, '')}${
        e.art === '-' ? '' : e.art.toLowerCase().replace(/ /g, '')
      }${e.sortnamn.toLowerCase().replace(/'/g, '').replace(/ /g, '')}` === unformattedSuperlistName
  );
  const artikelWithoutSortnamn = props.lignosdatabasen.find(
    (e) =>
      `${e.slakte.toLowerCase().replace(/ /g, '')}${e.art.toLowerCase().replace(/ /g, '')}` ===
      unformattedSuperlistName
  );

  const artikel = artikelSameSortnamn || artikelWithoutSortnamn;
  if (!artikel) return false;

  artikelObject.finns = true;
  artikelObject.images = artikel.text
    .split(/!\[(?!.*omslag)[^\]]*\]\(([^)]+)\)/g)
    .filter((str) => str.includes('http') && !str.includes('['));
  artikelObject.compressedImages = artikelObject.images.map((e) =>
    e.replace(
      '/upload/',
      artikelObject.images.length > 2 ? '/upload/t_700bred/' : '/upload/t_2000bred/'
    )
  );
  artikelObject.text = artikel.text
    .replace(/::Fifty|<div>|<\/div>|::/g, '') // Remove specific substrings "::Fifty", "<div>", "</div>", and "::"
    .replace(/!\[.*?\]\(.*?\)|\{.*?\}/g, '') // Remove markdown image syntax and curly braces content
    .replace(/---/g, '') // Remove horizontal rule markdown syntax "---"
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Replace markdown link syntax with just the link text
    .replace(/Kolumner2|Kolumner3/g, '') // Remove specific substrings "Kolumner2" and "Kolumner3"
    .replace(/## /g, '') // Remove markdown header syntax "## "
    .replace(/>/g, '') // Remove ">" characters
    .replace(/\*([^*]+)\*/g, '$1'); // Replace italic markdown syntax with just the text;
  artikelObject.url = `https://lignosdatabasen.se/planta/${artikel.slakte}/${artikel.art}${
    artikel.sortnamn ? '/' : ''
  }${artikel.sortnamn}/`;
  artikelObject.svensktNamn = artikel.svensktnamn;
  artikelObject.ingress = artikel.ingress;

  return artikelObject;
});

// Open image modal
const openImage = (index) => {
  state.currentImageIndex.value = index;
  state.showImageModal.value = true;
  state.currentImages.value = databasArtikel.value.images;
};
</script>

<template>
  <li
    class="element"
    :class="{
      'sidebar-selected':
        plant.Namn === state.searchedPlant.value &&
        state.sidebarMode.value &&
        state.showGoogleSearchResult.value,
      'has-images': databasArtikel.images,
      'if-expanded': expanded,
      'on-onske-list': isOnskeLista,
    }"
    ref="testRef"
  >
    <!-- List Item Text -->
    <div class="text-row" @click.stop="handleExpand()">
      <div
        class="plant-icon"
        :class="{
          't-green': plant.Typ == 'T',
          'p-blue': plant.Typ == 'P',
          'b-green': plant.Typ == 'B',
          'o-lime': plant.Typ == 'O',
          'k-orange': plant.Typ == 'K',
          'g-yellow': plant.Typ == 'G',
        }"
        :title="toolTipCalculator(plant.Typ)"
        @click.stop="iconClick()"
      >
        <Icon name="noto:deciduous-tree" size="14" v-if="plant.Typ == 'T'" title="Träd" />
        <Icon name="noto:evergreen-tree" size="14" v-if="plant.Typ == 'B'" title="Barrträd" />
        <Icon name="fxemoji:rosette" size="14" v-if="plant.Typ == 'P'" title="Perenner" />
        <Icon
          name="game-icons:fern"
          size="14"
          v-if="plant.Typ == 'O'"
          title="Ormbunke"
          class="ormbunke-icon"
        />
        <Icon
          name="game-icons:high-grass"
          size="14"
          v-if="plant.Typ == 'G'"
          title="Gräs"
          class="grass-icon"
        />
        <Icon
          name="game-icons:curling-vines"
          size="14"
          v-if="plant.Typ == 'K'"
          title="Klätterväxt"
          class="klattervaxt-icon"
        />
      </div>
      <p class="plant-name" :title="plant.Namn">
        <a
          :href="`https://www.google.com/search?q=${plant.Namn.replace(
            /\s+/g,
            '+'
          )}&tbm=isch&dpr=1`"
          target="_blank"
          >{{ plant.Namn }}</a
        >
      </p>
      <div class="ikoner hide-on-phone">
        <Icon
          v-if="plant.Rekommenderas"
          title="Rekommenderas"
          class="rekommenderas-icon"
          name="ph:heart-straight-fill"
          size="20"
        />
        <Icon
          v-if="plant.Edible"
          title="Ätbar"
          class="edible-icon"
          name="twemoji:fork-and-knife"
          size="20"
        />
        <Icon
          v-if="databasArtikel.finns"
          title="lignosdatabasen"
          class="kommentar-icon"
          name="ooui:articles-ltr"
          size="20"
        />
        <a :href="plant.Länk" :title="plant.Länk" target="_blank">
          <Icon v-if="plant.Länk" class="länk-icon" name="mdi:link-variant" size="20" />
        </a>
      </div>
      <p v-if="plant.Höjd && !isOnskeLista" :title="plant.Höjd" class="hide-on-phone">
        {{ plant.Höjd }} cm
      </p>
      <p v-else class="hide-on-phone"></p>
      <p v-if="!isOnskeLista" :title="plant.Kruka" class="nowrap hide-on-phone">
        {{ plant.Kruka }}
      </p>
      <p
        v-else
        class="nowrap hide-on-phone"
        :class="{
          'error-colorr': changeCount > plant.Lager && plant.Lager != null,
          'error-colorrr': changeCount < plant.MinOrder && plant.MinOrder != null,
        }"
      >
        {{ changeCount }}
      </p>
      <p v-if="plant.MinOrder && !isOnskeLista" class="hide-on-phone">{{ plant.MinOrder }}</p>
      <p v-else class="hide-on-phone"></p>
      <p v-if="isOnskeLista" class="on-right">{{ plant.Pris * changeCount }} kr</p>
      <p v-else class="on-right pris">{{ plant.Pris }} kr</p>
      <button class="on-right expand-button" aria-label="Expandera">
        <Icon v-if="!expanded" name="material-symbols:keyboard-arrow-down-rounded" size="23" />
        <!-- <Icon
          v-if="!expanded"
          name="material-symbols:expand-circle-down-outline-rounded"
          size="23"
        /> -->
        <Icon v-else name="material-symbols:keyboard-arrow-up-rounded" size="23" />
        <!-- <Icon v-else name="material-symbols:expand-circle-up-outline-rounded" size="23" /> -->
      </button>
    </div>

    <!-- Expanded Section -->
    <Transition name="expand">
      <div class="expanded" v-if="expanded">
        <div
          class="image-container"
          v-if="databasArtikel.images"
          :style="{
            'grid-template-columns':
              databasArtikel.images.length > 8
                ? ``
                : `repeat(${databasArtikel.images.length}, 1fr)`,
            display: databasArtikel.images.length > 8 ? 'flex' : 'grid',
          }"
          :class="{ 'above-8': databasArtikel.images.length > 8 }"
        >
          <img
            v-for="(image, index) in databasArtikel.compressedImages"
            :src="image"
            alt=""
            :key="image"
            @click="openImage(index)"
          />
        </div>

        <div class="info-container">
          <article class="article" v-if="databasArtikel.text">
            <p class="ingress" v-if="databasArtikel.ingress">{{ databasArtikel.ingress }}</p>
            <p>{{ databasArtikel.text }}</p>
          </article>
          <a
            v-if="databasArtikel.url"
            :href="databasArtikel.url"
            target="_blank"
            class="link-color underline"
            >Mer info på Lignosdatabasen</a
          >
          <p v-if="databasArtikel.svensktNamn">Svenskt namn: {{ databasArtikel.svensktNamn }}</p>

          <div class="ikoner hide-on-pc" :class="{ 'hide-on-phone': !plant.Rekommenderas }">
            <Icon
              v-if="plant.Rekommenderas"
              class="rekommenderas-icon"
              name="ph:heart-straight-fill"
              size="20"
            />
          </div>
          <div class="ikoner hide-on-pc" :class="{ 'hide-on-phone': !plant.Edible }">
            <Icon v-if="plant.Edible" name="twemoji:fork-and-knife" size="20" />
          </div>
          <p v-if="isOnskeLista" class="hide-on-pc">Antal: {{ changeCount }}</p>
          <p v-if="plant.Höjd" class="hide-on-pc">Höjd: {{ plant.Höjd }}</p>
          <p v-if="plant.Kruka" class="hide-on-pc">Kruka: {{ plant.Kruka }}</p>
          <p v-if="plant.Höjd && isOnskeLista">Höjd: {{ plant.Höjd }}</p>
          <p v-if="plant.Kruka && isOnskeLista">Kruka: {{ plant.Kruka }}</p>
          <p
            v-if="plant.Lager"
            :class="{
              'error-borderr': changeCount > plant.Lager && plant.Lager != null,
              'error-borderrr': order > plant.Lager && plant.Lager != null,
            }"
          >
            Lager: {{ plant.Lager }} st
          </p>
          <p v-if="isOnskeLista">{{ plant.Pris }} kr/st</p>
          <p
            v-if="plant.MinOrder"
            :class="{
              'error-borderrr':
                changeCount < plant.MinOrder && changeCount != 0 && plant.MinOrder != null,
              'error-borderr': order < plant.MinOrder && !isOnskeLista && plant.MinOrder != null,
            }"
          >
            Minsta Order: {{ plant.MinOrder }} st
          </p>
          <a v-if="plant.Länk" :href="plant.Länk" target="_blank" class="link-color underline"
            >Länk{{ plant.ExtraLänk ? ' 1' : '' }}</a
          >
          <a
            v-if="plant.ExtraLänk"
            :href="plant.ExtraLänk"
            target="_blank"
            class="link-color underline"
            >Länk 2</a
          >
          <p v-if="plant.Storlekskommentar">{{ plant.Storlekskommentar }}</p>
          <p v-if="plant.Kommentar" class="kommentar">Kommentar: {{ plant.Kommentar }}</p>
        </div>

        <!-- Add to Cart Section -->
        <form v-if="!isOnskeLista" class="add-section inte-önskelista">
          <div
            v-if="!isAdded"
            class="increment"
            :class="{
              'error-borderr': order > plant.Lager && plant.Lager != null,
              'error-borderrr': order < plant.MinOrder && plant.MinOrder != null,
            }"
          >
            <input class="btn-input" type="number" min="0" v-model.number="order" />
            <button type="button" class="add" @click="order++">+</button>
            <button type="button" class="subtract" @click="order -= 1">-</button>
          </div>
          <button v-else @click="handleDelete">
            <Icon class="red" name="material-symbols:delete-forever-outline-rounded" size="24" />
          </button>
          <button
            v-if="!isAdded"
            :class="{ disabled: state.countError.value }"
            :disabled="state.countError.value"
            @click="handleAdd"
            type="submit"
            @submit.prevent="handleAdd"
          >
            Lägg till i varukorg
          </button>
          <button v-else @click.prevent="" class="muted-button tillagd">
            <Icon
              class="check-icon"
              aria-label="Tillagt i varukorgen"
              name="material-symbols:check-circle-rounded"
            />
            Tillagd i varukorg
          </button>
        </form>

        <!-- Wishlist Section -->
        <div v-else class="add-section önskelista">
          <div
            class="increment"
            :class="{
              'error-borderr': changeCount > plant.Lager && plant.Lager != null,
              'error-borderrr': changeCount < plant.MinOrder && plant.MinOrder != null,
            }"
          >
            <input class="btn-input" type="number" min="0" v-model.number="changeCount" />
            <button class="add" @click="changeCount++">+</button>
            <button class="subtract" @click="changeCount -= 1">-</button>
          </div>
          <button @click="handleDelete">Ta bort</button>
        </div>
      </div>
    </Transition>
  </li>
</template>

<style>
/* Error styles */
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

/* Button styles */
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
  transition: all 250ms ease-in-out;
  min-height: 33px;
  z-index: 2;
  position: relative;
  border: 1px solid transparent;
  background: var(--element-bg);
  /* border-bottom: 1px solid var(--border-color); */
  border-bottom: 1px solid var(--bg);

  --current-icon-color: 0, 0, 0;
}

.dark .element:not(.on-onske-list) {
  /* border-color: var(--border-color); */
  /* border-color: rgb(31, 31, 34); */
  border-bottom: 1px solid var(--element-top);
  /* border-color: transparent; */
}

.element.on-onske-list {
  border-color: transparent;
}

.element .text-row {
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 33fr 10fr 15fr 8fr 2fr 6fr 5fr;
  place-items: center start;
  width: 100%;
  cursor: pointer;
}

.element p:not(.pris) {
  margin-right: 0.5rem;
}

.if-expanded:not(:first-child) {
  padding-top: 0.5rem;
}

.element.if-expanded {
  /* padding-bottom: 2rem; */
  padding-bottom: 0.5rem;
  border: 1px solid var(--border-color);
  /* border-top: 1px solid var(--border-color); */
  /* border-bottom: 1px solid var(--border-color); */
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.1);
}

.dark .element.if-expanded {
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
}

.onske-list .element.if-expanded {
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.05);
}
.dark .onske-list .element.if-expanded {
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
}

.element.if-expanded:not(.sidebar-selected) {
  margin: 1rem 0;
  border-radius: 1rem;
}

.text-row > p {
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 0px;
  white-space: nowrap;
}

.text-row > p:not(.pris) {
  max-width: 90%;
}

.element:first-of-type {
  border-radius: 1rem 1rem 0 0;
  /* padding-top: 0.4rem; */
}

.if-expanded > div > p {
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

  .text-row {
    grid-template-columns: 1fr 40fr 8fr 1fr !important;
  }
}

.expanded {
  /* grid-column: 1 / 9; */
  place-items: center;
  height: fit-content;
  width: 100%;
  /* border-top: 1px solid var(--border-color); */
  margin-top: 0.5rem;
  /* padding-top: 0.5rem; */
}

@media screen and (min-width: 600px) {
  .expanded {
    display: grid;
    grid-template-columns: 12fr 5fr;
    padding: 0 1rem;
  }
}

:not(.dark) .expand-button:hover {
  opacity: 0.3;
  background: none;
}

.on-right.expand-button {
  /* color: var(--text-mute); */
  opacity: 0.6;
  transition: opacity 0.2s;
}

.plant-name {
  margin-left: 0.75rem;
}

@media screen and (min-width: 600px) {
  .plant-name:hover {
    text-decoration: underline var(--text-mute);
  }

  .dark .plant-name:hover {
    text-decoration: underline #5d5242;
  }
}

/* Alla med .sidebar-selected */
.element.sidebar-selected {
  border-right: 2px solid rgb(var(--current-icon-color));
  border-left: 2px solid rgb(var(--current-icon-color));
}

/* Första med .sidebar-selected */
.sidebar-selected:first-child,
.element:not(.sidebar-selected) + .sidebar-selected {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  border-top: 2px solid rgb(var(--current-icon-color));
}

/* Sista med .sidebar-selected */
.element.sidebar-selected:not(:has(~ .sidebar-selected)) {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-bottom: 2px solid rgb(var(--current-icon-color));
}

.element {
  /* transition: border-color 0.5s, border-radius 0.5s; */
}

.element:has(.t-green) {
  --current-icon-color: 153, 196, 103;
}

.element:has(.p-blue) {
  --current-icon-color: 255, 146, 157;
}

.element:has(.b-green) {
  --current-icon-color: 89, 161, 79;
}

.element:has(.k-orange) {
  --current-icon-color: 130, 203, 130;
}

.element:has(.o-lime) {
  --current-icon-color: 152, 189, 43;
}

.element:has(.g-yellow) {
  --current-icon-color: 236, 226, 117;
}

.dark .element:has(.b-green) {
  --current-icon-color: 25, 89, 45;
}

.dark .element:has(.p-blue) {
  --current-icon-color: 255, 146, 157;
}

.dark .element:has(.k-orange) {
  --current-icon-color: 89, 161, 79;
}

.ikoner {
  color: rgb(128, 128, 128);
  place-self: center start;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;
  gap: 4px;
}

.ikoner > a {
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
  padding: 0.17rem;
  /* padding-left: 0.17rem; */
  /* padding-right: 0.17rem; */
  transition: background 0.1s;
}

.plant-icon:hover {
  background: rgba(var(--current-icon-color), 0.3);
  /* transform: rotate(50deg); */
  /* box-shadow: 0 0 1px 1px var(--current-icon-color); */
}

.rekommenderas-icon {
  color: #ff5e5e;
}

.element .rekommenderas-icon {
  grid-column: 1;
}

.element .edible-icon {
  grid-column: 2;
}

.kommentar-icon {
  color: var(--text-mute);
  /* color: rgb(128, 128, 128); */
}

.element .kommentar-icon {
  grid-column: 3;
}

.länk-icon {
  color: rgb(128, 128, 128);
}

.element .länk-icon {
  grid-column: 4;
}

.expanded p,
.expanded a,
.expanded .ikoner {
  padding: 0.4rem 0.9rem;
  border-radius: 10rem;
}

.expanded .article {
  background: none;
  border: none;
  padding: 0 0.1rem;
  margin: 0;
  margin-bottom: 1rem;
}

@media screen and (min-width: 700px) {
  .expanded .article {
    /* padding: 0 0.6rem; */
  }
}

.expanded .article p {
  padding: 0;
}

.expanded .article .ingress {
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.add-section {
  display: grid;
  grid-column: 5;
  margin-left: auto;
  grid-column: 2 / 3;
  /* margin-right: 0.5rem; */
  /* width: 100%; */
  height: min-content;
  gap: 0.5rem;
  grid-template-columns: max-content max-content;
}

.add-section > button {
  height: 100%;
  /* padding: 1rem; */
  margin: 0;
  /* flex-grow: 1; */
}

.expanded .add-section button.tillagd {
  color: var(--primary-green);
}

@media screen and (max-width: 600px) {
  .add-section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    /* width: fit-content; */
    margin: 0 auto;
    border-top: 1px solid var(--border-color);
    padding-top: 0.5rem;
    margin-top: 0.5rem;
  }

  .add-section > button {
    height: 100%;
  }
}

@media screen and (min-width: 600px) {
  .has-images .add-section {
    place-self: start;
    /* margin-right: 1rem; */
  }
}

.check-icon {
  color: var(--primary-green);
  font-size: 1.5rem;
  margin: auto 0;
}

.expanded .image-container {
  grid-column: 1/3;
  display: grid;
  padding-bottom: 0.5rem;
  /* padding: 0.5rem 0.5rem 0.5rem 0.1rem; */
  /* padding: 0.5rem calc(0.4rem + 0.5rem) 0.5rem 0.5rem; */
  /* grid-template-columns: repeat(5, 1fr); */
  /* height: 5rem; */
  width: 100%;
  gap: 0.25rem;
}

@media screen and (min-width: 500px) {
  .expanded .image-container {
    gap: 1rem;
  }
}

@media screen and (min-width: 700px) {
  .expanded .image-container {
    /* padding: 0.5rem 1rem 1rem 0.6rem; */
  }
}

.expanded .image-container.above-8 {
  display: flex;
  /* gap: 0.25rem; */
  overflow-x: auto;
  /* border-radius: 1rem; */
  padding: 0;
  padding-bottom: 0.25rem;
  margin: 1rem 1rem;
  /* padding: 0.5rem 0.5rem 0.5rem 0.1rem; */
}

/* Firefox specific styles */
@-moz-document url-prefix() {
  .expanded .image-container.above-8 {
    padding-bottom: 1rem;
  }
}

.expanded .image-container.above-8 img {
  max-height: 12rem;
  border-radius: 0.5rem;
  height: 100%;
  width: auto;
  object-fit: cover;
}

@media screen and (max-width: 499px) {
  .expanded div.image-container img {
    border-radius: 0.25rem;
  }
  .expanded div.image-container img:first-child {
    border-radius: 1rem 0.25rem 0.25rem 1rem;
  }
  .expanded div.image-container img:last-child {
    border-radius: 0.25rem 1rem 1rem 0.25rem;
  }
  .expanded div.image-container img:only-child {
    border-radius: 1rem;
  }
}

.expanded .image-container a {
  padding: 0;
}

.expanded .image-container img {
  max-height: 15rem;
  border-radius: 1rem;
  height: 100%;
  width: 100%;
  object-fit: cover;
  /* aspect-ratio: 1/1; */
}

.list-layout .expanded .image-container img {
  cursor: pointer;
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

@media screen and (max-width: 600px) {
  .info-container {
    padding-top: 0.5rem;
  }
}

.info-container > p {
  cursor: text;
}

.info-container a.link-color {
  text-decoration: underline;
  color: var(--link);
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
    font-size: 0.9rem;
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
.increment > input {
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
  /* box-shadow: var(--box-shadow-inset); */
  background: var(--element-top-hover);
}

.dark .increment input:focus {
  /* box-shadow: var(--box-shadow-inset-dark); */
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
  transition: all 0.2s ease-out;
}

.expand-leave-active {
  transition: all 0.2s ease-in;
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
