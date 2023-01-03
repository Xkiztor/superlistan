<template>
  <div class="onske-list">
    <!-- <h1 class="header" @click="handleClick">Önskelista</h1> -->
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
import { useStorage } from '@vueuse/core'

const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4'
const supabase = createClient(supabaseUrl, supabaseKey)

definePageMeta({
  // keepalive: true
})



const list = ref([])

const state = useGlobalState()

const onskeList = useGlobalOnskeList()

const computedList = computed(() => {
  var newList = onskeList.value.onskeListFull
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

// const onskeList = useStorage('onske-list', [])
// const onskeListFull = useStorage('onske-list-full', [])

watch(onskeList.value.onskeList, () => {
  listFetcher()
})

const fetchList = async (id, count) => {
  const { data, error } = await supabase
    .from('superlista')
    .select()
    .eq('id', `${id}`)
    .order(`Namn`, { ascending: true })
  if (error) {
    console.error(error)
    getList.value = null
  }
  if (data) {
    // console.log(data)
    data[0].Count = count
    list.value.push(data[0])
    // console.log(list.value)

    // console.log(onskeList.value.onskeListFull.length);
    if (onskeList.value.onskeListFull.length == 0) {
      console.log('empty');
      onskeList.value.onskeListFull.push(data[0])
      // console.log(onskeList.value.onskeListFull.length);
    } else {
      // console.log(onskeList.value.onskeListFull.map(e => e.id).indexOf(id));
      if (onskeList.value.onskeListFull.map(e => e.id).indexOf(id) == -1) {
        onskeList.value.onskeListFull.push(data[0])
      }
    }
  }
}

const listFetcher = () => {
  onskeList.value.onskeList.forEach(plant => {
    fetchList(plant.id, plant.count)
  })
}
listFetcher()

const handleDelete = (n) => {
  console.log(n)
  onskeList.value.onskeList = onskeList.value.onskeList.filter(b => b.id != n)
  onskeList.value.onskeListFull = onskeList.value.onskeListFull.filter(b => b.id != n)
  list.value = []
  // list.value = list.value.filter(a => a.id != n)
  console.log(onskeList.value.onskeList);
}


</script>

<style>
.main-layout {
  scrollbar-gutter: stable;
}

.list-container {
  background-color: #fff;
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