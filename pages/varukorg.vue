<template>
  <div class="onske-list">
    <div class="onske-list-bg">
      <ColumnTopInfo :isOnskeLista="true" />
      <div v-for="plant in computedList" :key="plant.id">
        <ListElement :plant="plant" :isOnskeLista="true" @handle-delete="handleDelete" />
      </div>
    </div>
    <div class="bottom-section">
      <OnskeListaTotal />
      <OnskeListaOrder />
    </div>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4'
const supabase = createClient(supabaseUrl, supabaseKey)

const list = ref([])

const state = useGlobalState()
const onskeList = useGlobalOnskeList()

const computedList = computed(() => {
  var newList = onskeList.onskeList.value
  newList = newList.sort((a, b) => {
    if (a.Namn.toLowerCase() < b.Namn.toLowerCase()) {
      return -1
    }
    if (a.Namn.toLowerCase() > b.Namn.toLowerCase()) {
      return 1
    }
  })
  return newList
})

const handleDelete = (n) => {
  console.log(n)
  const index = onskeList.onskeList.value.findIndex(b => b.id === n)
  // const indexFull = onskeList.onskeListFull.value.findIndex(b => b.id === n)
  console.log(index);

  onskeList.onskeList.value = onskeList.onskeList.value.filter(b => b.id != n)
  // onskeList.onskeListFull.value = onskeList.onskeListFull.value.filter(b => b.id != n)
}
</script>

<style>
.main-layout {
  scrollbar-gutter: stable;
}

.list-container {
  /* background-color: #fff; */
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2)
}

.onske-list-bg {
  border-radius: 1rem;
  padding: 1rem;
  /* width: fit-content; */
  width: 100%;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.dark .onske-list-bg {
  background: #26292f;
  color: #b0bac5;
}

.dark .onske-list-bg h1 {
  color: #ecf9fb;
}

.bottom-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}


@media screen and (max-width:800px) {
  .bottom-section {
    grid-template-columns: 1fr;
    grid-template-rows: max-content max-content;
  }
}

.header {
  font-size: 2rem
}

.onske-list {
  place-self: start center;
  max-width: 56rem;
}
</style>
