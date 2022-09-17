<template>
  <div>
    <h1>Logga in</h1>
    <!-- <p><input type="email" placeholder="Email" v-model="email"></p>
    <p><input type="password" placeholder="Lösenord" v-model="password"></p>
    <p v-if="errMsg">{{errMsg}}</p>
    <p><button @click="register">Logga in</button></p>
    <p><button @click="signInWithGoogle">Logga in med Google</button></p> -->
  </div>
</template>

<script setup lang="ts">
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
// const email = ref("")
// const password = ref("")
// const errMsg = ref("")

// const register = () => {
//   signInWithEmailAndPassword(getAuth(), email.value, password.value)
//     .then((data) => {
//       console.log("Inloggad!")
//       navigateTo('/lista')
//     })
//     .catch((error) => {
//       console.log(error.code)
//       switch (error.code) {
//         case "auth/invalid-email":
//           errMsg.value = "Icke giltig email"
//           break
//         case "auth/user-not-found":
//           errMsg.value = "Inget konto hittades"
//           break
//         case "auth/wrong-password":
//           errMsg.value = "Fel lösenord"
//           break
//         default:
//           errMsg.value = "Email eller lösenord är fel."
//           break
//       }
//     })
// }

// const signInWithGoogle = () => {

// }
</script>