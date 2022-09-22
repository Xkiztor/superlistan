<template>
  <div @click="handleClick" class="bg-slate-50 w-[40rem] flex relative element">
    <div class="rounded-full grid px-2 aspect-square mr-6" :class="{'t-green': plant.Typ == 'T', 'p-blue': plant.Typ == 'P', 'b-green': plant.Typ == 'B', 'o-yellow': plant.Typ == 'O', 'k-orange': plant.Typ == 'K', 'g-pink': plant.Typ == 'G'}"> 
      <p class="my-auto mx-auto" >{{ plant.Typ }}</p>
    </div>
    <!-- <p>{{ plant.id }}</p> -->
    <p class="mr-2"><a :href="`https://www.google.com/search?q=${plant.Namn.replace(/\s+/g, '+')}&tbm=isch&dpr=1`" target="_blank">{{ plant.Namn }}</a></p>
    <p class="mr-2 absolute right-2">{{ plant.Pris }} kr</p>
  </div>
</template>

<script setup>
const props = defineProps({
  plant: Object
})

const handleClick = () => {
  console.log(props.plant.VetenskapligtNamn)
}



</script>

<style>

  .element {
    padding: 5px;
    border: 1px solid rgb(238, 238, 238);
    margin-left: 0.75rem;
  }

  .t-green {
    background-color: rgb(117, 236, 117);
  }
  .p-blue {
    background-color: rgb(117, 208, 236);
  }
  .b-green {
    background-color: rgb(89, 161, 79);
  }
  .k-orange {
    background-color: rgb(236, 143, 117);
  }
  .o-yellow {
    background-color: rgb(236, 226, 117);
  }
  .g-pink {
    background-color: rgb(246, 168, 255);
  }

</style>