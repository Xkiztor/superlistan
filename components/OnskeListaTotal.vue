<template>
  <div class="list-bg total">
    <h1>Totalt:</h1>
    <div>
      <p>
        <i class="main-value">{{ totalCount }}</i>
        stycken växter
      </p>
    </div>
    <div>
      <p>
        <!-- <Icon name="material-symbols:table-rows-rounded" size="20" /> -->
        <i class="main-value">{{ props.onskeListFull.length }}</i>
        rader
      </p>
    </div>
    <div>
      <p>
        <i class="main-value">{{ totalPrice }}</i>
        kr
      </p>
    </div>

  </div>
</template>

<script setup>
const props = defineProps(['onskeListFull'])

const totalCount = computed(() => props.onskeListFull.map(e => e.Count).reduce((a, b) => a + b, 0))
const totalPrice = computed(() => props.onskeListFull.map(e => e.Pris * e.Count).reduce((a, b) => a + b, 0))
// const totalPrice = computed(() => props.onskeListFull.reduce((a, b) => a + b.Pris, 0))
</script>

<style>
div .total {
  width: 100%;
  margin-top: 1rem;
}

.main-value {
  font-weight: 600;
}

.total>div>p {
  display: inline;
}

.total>div {
  margin-top: 0.3rem;
}

i {
  font-style: normal;
}

h1 {
  font-size: 2rem;
  font-weight: 800;
}
</style>