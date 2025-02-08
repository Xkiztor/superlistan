<template>
  <div class="onske-list">
    <div class="onske-list-bg">
      <ColumnTopInfo :isOnskeLista="true" />
      <div v-for="plant in computedList" :key="plant.id">
        <ListElement :plant="plant" :isOnskeLista="true" :lignosdatabasen="lignosdatabasen" />
      </div>
    </div>
    <div class="bottom-section">
      <OnskeListaTotal />
      <OnskeListaOrder />
    </div>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4';
const supabase = createClient(supabaseUrl, supabaseKey);

const list = ref([]);

const state = useGlobalState();
const onskeList = useGlobalOnskeList();

const computedList = computed(() => {
  var newList = onskeList.onskeList.value;
  newList = newList.sort((a, b) => {
    if (a.Namn.toLowerCase() < b.Namn.toLowerCase()) {
      return -1;
    }
    if (a.Namn.toLowerCase() > b.Namn.toLowerCase()) {
      return 1;
    }
  });
  return newList;
});

const { data: lignosdatabasen } = await useAsyncData('lignosdatabasen-fetch', async () => {
  const { data, error } = await supabase
    .from('lignosdatabasen')
    .select()
    .neq('art', 'slakte')
    .eq('hidden', false)
    .neq('text', 'Ingen info');
  // const { data, error } = await client.from('lignosdatabasen').select().eq('slakte', `${planta}`).single()
  if (error) {
    console.error(error);
  }
  console.log(data);
  return data;
});
</script>

<style>
.onske-list {
  /* padding-top: 1rem; */
  padding: 1rem 0.25rem;
}

.list-container {
  padding: 1rem;
  border-radius: 1rem;
}

.onske-list-bg {
  border-radius: 1rem;
  padding: 1rem;
  /* width: fit-content; */
  width: 100%;
  margin: 0 auto;
  background: var(--element-bg);
  color: var(--text);
  border: 1px solid var(--border-color);
}

.dark .onske-list-bg {
  color: var(--text-mute);
}

.dark .onske-list-bg h1 {
  color: var(--text-dark);
}

.bottom-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media screen and (max-width: 800px) {
  .bottom-section {
    grid-template-columns: 1fr;
    grid-template-rows: max-content max-content;
  }
}

.header {
  font-size: 2rem;
}

.onske-list {
  place-self: start center;
  max-width: 56rem;
}
</style>
