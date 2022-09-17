<template>
  <div>
    <nav>
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/lista">Lista</nuxt-link>
      <!-- <NuxtLink to="/loggain" v-if="!isLoggedIn">Logga in</NuxtLink>
      <NuxtLink to="/registrera" v-if="!isLoggedIn">Registera dig</NuxtLink>
      <button @click="handleSignOut" v-if="isLoggedIn">Logga ut</button> -->
    </nav>
    <NuxtPage />
  </div>
</template>

<script setup>
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"



// const isLoggedIn = ref(false)

// let auth
// onMounted(() => {
//   auth = getAuth()
//   onAuthStateChanged(auth, (user) => {
//     if(user) {
//       isLoggedIn.value = true
//     } else {
//       isLoggedIn.value = false
//     }
//   })
// })

// const handleSignOut = () => {
//   signOut(auth).then(() => {
//     navigateTo('/')
//   })
// }


</script>