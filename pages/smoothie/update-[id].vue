<template>
  <div>
    <h1 class="text-3xl">Update</h1>
    <!-- {{ $route.params.id }} -->
    <!-- <div class="m-2 p-2">
      <h1 class="text-xl font-bold">{{smoothie.title}}</h1>
      <p>{{smoothie.method}}</p>
      <p>{{smoothie.rating}}</p>
    </div> -->
    <form @submit.prevent="handleSubmit" class="mt-5 m-2">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="smoothie.title">

      <label for="method">Method:</label>
      <input type="text" id="method" v-model="smoothie.method">

      <label for="rating">Rating:</label>
      <input type="number" id="rating" v-model="smoothie.rating">

      <button class="bg-gray-100 m-2 p-2 rounded-full" type="submit">Update</button>
      <p v-if="formError" class="text-red-500">{{formError}}</p>
    </form>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'
const config = useRuntimeConfig()
const supabaseUrl = config.supabaseUrl
const supabaseKey = config.anonKey
const supabase = createClient(supabaseUrl, supabaseKey)

const route = useRoute()
const id = ref(route.params.id)

const smoothie = ref({})

const formError = ref("")

const fetchSmoothie = async () => {
  const { data, error } = await supabase
    .from('smoothies')
    .select()
    .eq('id', id.value)
    .single()

    if(error) {
      console.log(error)
    }
    if(data) {
      // console.log(data);
      smoothie.value = data
    }
}
fetchSmoothie()

const handleSubmit = async () => {
  if(!smoothie.value.title || !smoothie.value.method || !smoothie.value.rating) {
    formError.value = "Please fill in all feilds"
    return
  }
  // formError.value = ""

  // console.log(title.value, method.value, rating.value);

  const { data, error } = await supabase
    .from('smoothies')
    .update({ title: smoothie.value.title, method: smoothie.value.method, rating: smoothie.value.rating })
    .eq('id', id.value)

    if(error) {
      console.log(error)
      formError.value = error
    }
    if(data) {
      console.log(data)
      formError.value = ""
      navigateTo('/smoothie/')
    }
 }





</script>

<style scoped>
  input {
    width: 100%;
    background: rgb(243, 243, 243);
    border: 1px solid rgb(224, 224, 224)
  }
</style>