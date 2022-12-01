<template>
  <div @click="handleClick" class="bg-slate-50 md:max-w-3xl xl:max-w-4xl grid element">
    <div class="rounded-full grid px-2 aspect-square mr-6"
      :class="{'t-green': plant.Typ == 'T', 'p-blue': plant.Typ == 'P', 'b-green': plant.Typ == 'B', 'o-yellow': plant.Typ == 'O', 'k-orange': plant.Typ == 'K', 'g-pink': plant.Typ == 'G'}">
      <p class="my-auto mx-auto">{{ plant.Typ }}</p>
    </div>
    <!-- <p>{{ plant.id }}</p> -->
    <p class="mr-2 overflow-hidden"><a
        :href="`https://www.google.com/search?q=${plant.Namn.replace(/\s+/g, '+')}&tbm=isch&dpr=1`" target="_blank">{{
        plant.Namn }}</a></p>
    <p class="mr-2 on-right">{{ plant.Pris }} kr</p>
    <!-- <button class="bg-gray-100 rounded-full text-center btn-add p-2">+</button> -->
    <!-- <div class="bg-gray-100 rounded-full p-2 w-10 aspect-square"><p class="text-center">+</p></div> -->
    <div class="on-right rounded-full grid px-2 aspect-square bg-gray-100">
      <p class="my-auto mx-auto">{{ plant.Count }}</p>
      <!-- <p class="my-auto mx-auto" @click="handleAdd">+</p> -->
    </div>
    <!-- <p class="bg-gray-100 rounded-full">Hello</p> -->

  </div>
</template>

<script setup>
const props = defineProps({
  plant: Object,
  rowHeight: Number,
  textSize: Number,

})

// console.log(props.rowHeight)

const handleClick = () => {
}

// const handleAdd = () => {
//   if (typeof window !== 'undefined') {
//     localStorage.setItem('cart', `${'test'}`);
//     console.log(localStorage.getItem('cart'));
//   }
// }


</script>

<style>
/* .btn-add {
  border: 1px solid rgb(235, 235, 235);
  aspect-ratio: 1;
}

.element {
  padding: 5px;
  border: 1px solid rgb(238, 238, 238);
  margin-left: 0.75rem;
  grid-template-columns: 8fr 78fr 13fr 1fr;
  place-items: center start;
  min-width: 30rem;

  height: v-bind(rowHeight + 'px');
  font-size: v-bind(textSize + 'px');


} */

/* @media only screen and (max-width: 600px) {
  .element {
    font-size: 0.9rem
  }
}

.on-right {
  place-self: center end;
} */

/* .t-green {
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
} */
</style>