<template>
  <div class="onske-list-bg total">
    <h1>Totalt</h1>
    <!--<div>
      <p>
        <i class="main-value">{{ totalCount }}</i>
        stycken plantor
      </p>
    </div>-->
    <div>
      <p>
        <!-- <Icon name="material-symbols:table-rows-rounded" size="20" /> -->
        <i class="main-value">{{ onskeList.onskeListFull.length }}</i>
        olika växter
      </p>
    </div>
    <!-- <div class="spacer">

    </div> -->
    <div>
      <p>
        <i class="main-value">{{ totalPrice }}</i>
        kr totalt
      </p>
      <p v-if="totalPrice < 2000" class="disclaimer"><strong>OBS</strong> Lägsta ordersumman är 2000kr</p>
    </div>
    <div class="lite-mer-plats-där-uppe">
      <p>Beställningen gör du senast 26 februari 2023</p>
      <p>Dina beställda växter hämtar du på Linders plantskola under Maj 2023.</p>
      <p>Betalningen sker i två steg, se under <nuxt-link class="link" to="/">hem</nuxt-link>.</p>
    </div>
    <div>
      <p>Vill du beställa fler växter?</p>
      <p>Gör en ny order genom att ta bort dom växter du redan skickat in, lägg till nya och lägg till en 2:a efter ditt
        namn och skicka in igen.</p>
    </div>
    <div>
      <p>Blir det några
        problem kan du alltid maila mig.</p>
      <p>peter@lindersplantskola.se</p>
    </div>
    <div class="clear">
      <button @click="showModal = !showModal">Nollställ Varukorg</button>
      <Icon size="22" name="ic:round-help-outline" ref="helpRef" />
      <p class="help-text" v-if="showHelp">Nollställ om det blir något problem eller om du vill rensa din varukorg och
        börja om.</p>
      <Modal v-if="showModal" @close-modal="showModal = false">
        <div>
          <h1>Är du säker du vill nollställa varukorgen?</h1>
          <p>Detta kan inte ångras.</p>
        </div>
        <div>
          <button @click="nollställ">Nollställ</button>
          <button @click="showModal = false">Avbryt</button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script setup>
const onskeList = useGlobalOnskeList()
console.log(onskeList.value.onskeListFull);

const totalCount = computed(() => onskeList.value.onskeListFull.map(e => e.Count).reduce((a, b) => a + b, 0))
const totalPrice = computed(() => onskeList.value.onskeListFull.map(e => e.Pris * e.Count).reduce((a, b) => a + b, 0))


const helpRef = ref(null)
const isHovered = useElementHover(helpRef)
const showModal = ref(false)
const showHelp = ref(false)

const nollställ = () => {
  console.log('nollställd');
  showModal.value = false
  onskeList.value.onskeList = []
  onskeList.value.onskeListFull = []
}

var timeout

watch(isHovered, () => {
  if (isHovered.value === true) {
    timeout = setTimeout(() => {
      showHelp.value = true
    }, 300)
  }
  if (isHovered.value === false) {
    clearTimeout(timeout);
    showHelp.value = false
  }
})

watchEffect(() => {
  console.log(showHelp.value);
  console.log(isHovered.value);
})
</script>

<style>
div .total {
  width: 100%;
  margin-top: 1rem;
}

.main-value {
  font-weight: 600;
}

.total>div {
  margin-top: 0.3rem;
}

.spacer {
  height: 0.2rem;
}

i {
  font-style: normal;
}

.total h1 {
  font-size: 1.4rem;
  font-weight: 800;
}

.disclaimer {
  display: block;
}

div.lite-mer-plats-där-uppe {
  margin-top: 1rem;
}

.total button {
  margin-left: 0;
}

.clear {
  display: grid;
  place-items: center start;
  grid-template-rows: max-content max-content;
  grid-template-columns: max-content 1fr;
}

.clear svg {
  color: rgb(80, 80, 80);
  cursor: pointer;
}

.help-text {
  position: relative;
  grid-column: 1/3;
}
</style>
