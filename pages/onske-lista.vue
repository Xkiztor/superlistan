<template>
  <div>
    <h1 class="text-5xl font-bold mb-2 ml-2" @click="handleClick">Önskelista</h1>
    <div v-for="plant in list" :key="plant.id">
      <CartListElement :plant="plant" />
    </div>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4'
const supabase = createClient(supabaseUrl, supabaseKey)

const list = ref([])

const fetchList = async (id, count) => {
  const { data, error } = await supabase
    .from('superlista')
    .select()
    .eq('id', `${id}`)
  if (error) {
    console.error(error)
    getList.value = null
  }
  if (data) {
    console.log(data)
    data[0].Count = count
    list.value.push(data[0])
    // getList.value = data
  }
}

const handleClick = () => {
  console.log(JSON.parse(localStorage.getItem('cart')))
  fetchList(420)
}


if (typeof window !== 'undefined') {
  if (JSON.parse(localStorage.getItem('cart'))) {
    for (let i = 0; i < JSON.parse(localStorage.getItem('cart')).length; i++) {
      console.log(JSON.parse(localStorage.getItem('cart'))[i])
      fetchList(JSON.parse(localStorage.getItem('cart'))[i].id, JSON.parse(localStorage.getItem('cart'))[i].count)
    }
  } else {
    console.warn('cart is empty!');
  }
}
</script>