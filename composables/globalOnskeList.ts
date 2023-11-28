import { ref, watch } from 'vue';
import { createGlobalState, useStorage } from '@vueuse/core';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4';
const supabase = createClient(supabaseUrl, supabaseKey);

export const useGlobalOnskeList = createGlobalState(() => {
  const onskeList = useStorage('onske-list', []);
  // const onskeListFull = useStorage('onske-list-full', []);

  function handleAdd(plant: object, count: number) {
    const arr = [{ ...plant, count: count }];
    onskeList.value.push(arr[0]);
    console.log(onskeList.value);
    // fetchList(id, count)
  }

  // const fetchList = async (id: number, count: number) => {
  //   console.log(' ');
  //   console.log('fetching!');
  //   console.log(' ');
  //   const { data, error } = await supabase
  //     .from('superlista')
  //     .select()
  //     .eq('id', `${id}`)
  //     .order(`Namn`, { ascending: true });
  //   if (error) {
  //     console.error(error);
  //   }
  //   if (data) {
  //     data[0].Count = count;
  //     onskeListFull.value.push(data[0]);
  //   }
  // };

  return {
    onskeList,
    // onskeListFull,
    handleAdd,
  };
});
