<template>
  <div class="onske-list-bg total">
    <h1>Totalt</h1>
    <div>
      <p>
        <i class="main-value">{{ totalCount }}</i>
        stycken plantor
      </p>
    </div>
    <div>
      <p>
        <!-- <Icon name="material-symbols:table-rows-rounded" size="20" /> -->
        <i class="main-value">{{ onskeList.onskeListFull.length }}</i>
        olika växter
      </p>
    </div>
    <div class="spacer">

    </div>
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

  </div>
</template>

<script setup>
const onskeList = useGlobalOnskeList()
console.log(onskeList.value.onskeListFull);

const totalCount = computed(() => onskeList.value.onskeListFull.map(e => e.Count).reduce((a, b) => a + b, 0))
const totalPrice = computed(() => onskeList.value.onskeListFull.map(e => e.Pris * e.Count).reduce((a, b) => a + b, 0))
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
  margin-top: 2rem;
}
</style>