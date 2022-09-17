<template>
  <div>
    <nav>
      <nuxt-link to="/smoothie/create">Create</nuxt-link>
    </nav>
    <!-- Smoothie -->
    <div>
      <p>Order by:</p>
      <button @click="orderBy = 'created_at'" class="m-2">Time created</button>
      <button @click="orderBy = 'title'" class="m-2">Title</button>
      <button @click="orderBy = 'rating'" class="m-2">Rating</button>
      {{orderBy}}
      <span class="text-lg">ascending:</span>
      <button @click="ascending = !ascending" class="ascending">{{ascending}}</button>
    </div>
    <div v-for="smoothie in smoothies" class="m-4 bg-gray-100 p-2 rounded-xl" :key="smoothie.id">
      <SmoothieCard :smoothie="smoothie" @delete-smoothie="deleteSmoothie"/>
    </div>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'

// .env veriables
const config = useRuntimeConfig()
  
// supabase
// const supabaseUrl = config.supabaseUrl
// const supabaseKey = config.anonKey
const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4'
const supabase = createClient(supabaseUrl, supabaseKey)

// console.log(supabase)

const fetchError = ref(null)
const smoothies = ref([])
const orderBy = ref('created_at')
const ascending = ref(true)



const fetchSmoothies = async () => {
  const { data, error } = await supabase
    .from('smoothies')
    .select()
    .order(orderBy.value, {ascending: ascending.value})

    if(error) {
      fetchError.value = error
      console.log(error)
      smoothies.value = null
    }
    if(data) {
      fetchError.value = null
      console.log(data);
      smoothies.value = data
    }
}
fetchSmoothies()

watch(orderBy, () => {
  console.log('Changed!')
  fetchSmoothies()
})
watch(ascending, () => {
  console.log('Changed!')
  fetchSmoothies()
})


const deleteSmoothie = (id) => {
  smoothies.value = smoothies.value.filter(sm => sm.id == id)
}


</script>

<style scoped>
button {
  background-color: rgb(234, 234, 234);
  padding: 0.35rem;
  border-radius: 0.5rem;
}
.ascending {
  border: 1px solid rgb(215, 215, 215);
}

</style>