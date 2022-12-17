<template>
  <div class="onske-list">
    <!-- <h1 class="header" @click="handleClick">Önskelista</h1> -->
    <div class="list-bg">
      <ColumnTopInfo :isOnskeLista="true" />
      <div v-for="plant in onskeListFull" :key="plant.id">
        <ListElement :plant="plant" :isOnskeLista="true" @handle-delete="handleDelete" />
      </div>
    </div>
    <div class="bottom-section">
      <OnskeListaTotal :onskeListFull="onskeListFull" />
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

const list = ref([])
const onskeList = useStorage('onske-list', [])
const onskeListFull = useStorage('onske-list-full', [])
// onskeList.value = [{ id: 420, count: 2 }]


watch(onskeList, () => {
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

    // console.log(onskeListFull.value.length);
    if (onskeListFull.value.length == 0) {
      console.log('empty');
      onskeListFull.value.push(data[0])
      // console.log(onskeListFull.value.length);
    } else {
      // console.log(onskeListFull.value.map(e => e.id).indexOf(id));
      if (onskeListFull.value.map(e => e.id).indexOf(id) == -1) {
        onskeListFull.value.push(data[0])
      }
    }
  }
}

const handleClick = () => {
  fetchList(4269, 8)

  const test = [{ id: 69, count: 42 }]
  onskeList.value.push(test[0])
  console.log(onskeList.value);
}

const listFetcher = () => {
  onskeList.value.forEach(plant => {
    fetchList(plant.id, plant.count)
  })
}
listFetcher()

const handleDelete = (n) => {
  console.log(n)
  onskeList.value = onskeList.value.filter(b => b.id != n)
  onskeListFull.value = onskeListFull.value.filter(b => b.id != n)
  list.value = []
  // list.value = list.value.filter(a => a.id != n)
  console.log(onskeList.value);
}


</script>

<style>
.list-container {
  background-color: #fff;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2)
}

.list-bg {
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
    grid-template-rows: 1fr 1fr;
  }
}

.header {
  font-size: 2rem
}

.onske-list {
  place-self: start center;
}
</style>