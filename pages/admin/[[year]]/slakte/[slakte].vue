<script setup>
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4'

const supabase = createClient(supabaseUrl, supabaseKey)

const route = useRoute()

const rawUserData = ref([])

onMounted(() => {
  fetchUserData()
})


const fetchUserData = async () => {
  const { data, error } = await supabase
    .from(`user-data-${route.params.year}`)
    .select()
    .order('created_at')

  console.log('Fething user data');
  if (error) {
    console.error(error)
  }
  if (data) {
    rawUserData.value = data
    rawUserData.value.map(e => e.created_at = e.created_at.replace('T', ' | '))
    rawUserData.value.map(e => e.created_at = e.created_at.replace('.', ''))
    rawUserData.value.map(e => e.created_at = e.created_at.substring(0, 18))

    console.log(rawUserData.value);
  }
}

const userData = computed(() => {
  let list = rawUserData.value
  list.sort((a, b) => {
    if (a.Namn > b.Namn) return 1
    else if (a.Namn < b.Namn) return -1
    else return 0
  })
  list.sort((a, b) => {
    if (a.created_at > b.created_at) return 1
    if (a.created_at < b.created_at) return -1
    else return 0
  })
  list = list.filter(item => item.Namn.toLowerCase().includes(route.params.slakte.toLowerCase()))
  console.log(list);
  return list
})
</script>


<template>
  <div class="slakte list-bg">
    <h1>Släktet: {{ route.params.slakte }}</h1>
    <ul class="admin-list-container" v-if="!showTable">
      <li v-for="(item, index) in userData" class="list-el">
        <SlakteAdminListElement :el="item" :index="index" :userData="userData" :isPersonPage="false" />
      </li>
    </ul>
  </div>
</template>


<style>
.slakte h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
}
</style>