<template>
  <div>
    <h1>Skapa Konto</h1>
    <!-- <p><input type="email" placeholder="Email" v-model="email"></p>
    <p><input type="password" placeholder="Lösenord" v-model="password"></p>
    <p><button @click="register">Skapa</button></p>
    <p><button @click="signInWithGoogle">Logga in med Google</button></p> -->
  </div>
</template>

<script setup lang="ts">
// import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
// // Import the functions you need from the SDKs you need



// const email = ref("")
// const password = ref("")

// const register = () => {
//   const auth = getAuth()
//   createUserWithEmailAndPassword(auth, email.value, password.value)
//     .then((data) => {
//       console.log("Kontot är skapat")
//       navigateTo('/')
//     })
//     .catch((error) => {
//       console.log(error.code)
//       alert(error.message)
//     })
// }

// const signInWithGoogle = () => {
//   const provider = new GoogleAuthProvider()
//   signInWithPopup(getAuth(), provider)
//     .then((result) => {
//       console.log(result.user)
//       navigateTo('/lista')
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// }
</script>