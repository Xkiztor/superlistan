<template>
  <div>
    <h1>Create</h1>
    <form @submit.prevent="handleSubmit">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="title">

      <label for="method">Method:</label>
      <input type="text" id="method" v-model="method">

      <label for="rating">Rating:</label>
      <input type="number" id="rating" v-model="rating">

      <button class="bg-gray-100 m-2 p-2 rounded-full" type="submit">Submit</button>
    </form>
    <p v-if="formError" class="text-red-500">{{formError}}</p>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'

const title = ref("")
const method = ref("")
const rating = ref(null)
const formError = ref("")

const config = useRuntimeConfig()

const supabaseUrl = config.supabaseUrl
const supabaseKey = config.anonKey
const supabase = createClient(supabaseUrl, supabaseKey)


const handleSubmit = async (e) => {
  if(!title.value || !method.value || !rating.value) {
    formError.value = "Please fill in all feilds"
    return
  }
  // formError.value = ""

  console.log(title.value, method.value, rating.value);

  const { data, error } = await supabase
    .from('smoothies')
    .insert([{ title: title.value, method: method.value, rating: rating.value }])

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