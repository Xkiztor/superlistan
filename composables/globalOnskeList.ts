import { ref, watch } from 'vue';
import { createGlobalState, useStorage } from '@vueuse/core';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4';
const supabase = createClient(supabaseUrl, supabaseKey);

export const useGlobalOnskeList = createGlobalState(() => {
  const onskeList = useStorage('onske-list-2024', []);

  function handleAdd(plant: object, order: number) {
    const arr = [{ ...plant, Count: order }];
    onskeList.value.push(arr[0]);
    console.log(onskeList.value);
  }

  return {
    onskeList,
    // onskeListFull,
    handleAdd,
  };
});
