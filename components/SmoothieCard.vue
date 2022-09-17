<template>
  <div>
    <h1 class="text-xl font-bold">{{smoothie.title}}</h1>
    <p class="my-2"><span class="bg-red-500 p-2 rounded-full font-bold">{{smoothie.rating}}</span></p>
    <p>{{smoothie.method}}</p>
    <p @click="handleClick(smoothie)">Edit</p>
    <p @click="$emit('delete-smoothie', smoothie.id), handleDelete(smoothie)">Delete</p>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'
const config = useRuntimeConfig()
const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4'
// const supabaseUrl = config.supabaseUrl
// const supabaseKey = config.anonKey
const supabase = createClient(supabaseUrl, supabaseKey)

const props = defineProps([
  'smoothie'
])

const handleClick = (smoothie) => {
  navigateTo(`./update-${smoothie.id}`)
}

const handleDelete = async (smoothie) => {
  const { data, error } = await supabase
    .from('smoothies')
    .delete()
    .eq('id', smoothie.id)

    if(error) {
      console.log(error)
    }
    if(data) {
      // console.log(data);
      // navigateTo('/smoothie/create')
      // navigateTo('/smoothie/')
    }
}

</script>