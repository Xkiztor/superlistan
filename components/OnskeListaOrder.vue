<template>
  <div class="onske-list-bg order">
    <h1 class="title">Beställ</h1>
    <div class="sent-in-badge" v-if="hasSent">
      <Icon name="material-symbols:check-circle-rounded" size="20" />
      <h1>Du har redan skickat in!</h1>
    </div>
    <div class="input-layout">
      <label for="user-name">Ditt fulla namn: </label>
      <input v-model="orderName" id="user-name" type="text" placeholder="Ex. Peter Linder">
    </div>
    <div class="input-layout">
      <label for="user-mail">Din mailadress: </label>
      <input v-model="orderMail" id="user-mail" type="text" placeholder="Ex. peter@lindersplantskola.se">
    </div>
    <div class="input-layout">
      <label for="user-adress">Din adress: </label>
      <input v-model="orderAdress" id="user-adress" type="text" placeholder="Köinge 6902, 242 92 Hörby">
    </div>
    <div class="input-layout">
      <label for="user-phone">Telefonnummer: </label>
      <input v-model="orderPhone" id="user-phone" type="tel" placeholder="0733518716">
    </div>
    <button @click="handleSend" :class="hasSent ? 'grayed' : ''" class="send">Skicka in</button>
  </div>
  <div class="modals">
    <Modal v-if="showModal" @close-modal="showModal = false">
      <h1 class="modal-text">
        Din lista är inskickad!
      </h1>
    </Modal>
    <Modal v-if="showModalError" @close-modal="showModalError = false">
      <div>
        <h1 class="modal-text">Det blev ett litet fel</h1>
        <h1>Försök igen</h1>
        <p>Om problemet kvarstår, kontakta peter@lindersplantskola.se</p>
      </div>
      <div class="modal-code-block">
        <p class="modal-sub-text">
          {{ errorMessage.code }}
        </p>
        <p class="modal-sub-text">
          {{ errorMessage.message }}
        </p>
      </div>
    </Modal>
    <Modal v-if="showConfirmModal" @close-modal="showConfirmModal = false">
      <h1 class="modal-text">
        Är du säker?
      </h1>
    </Modal>
    <Modal v-if="showModalNoName" @close-modal="showModalNoName = false">
      <h1 class="modal-text">
        Vänligen fyll i alla fält!
      </h1>
    </Modal>
  </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4'
const supabase = createClient(supabaseUrl, supabaseKey)

const showModal = ref(false)
const showModalError = ref(false)
const showModalNoName = ref(false)
const showConfirmModal = ref(false)

const errorMessage = ref({})

const orderName = ref('')
const orderMail = ref('')
const orderAdress = ref('')
const orderPhone = ref('')

const onskeListFull = useStorage('onske-list-full', [])
// const hasSent = ref(false)
const hasSent = useStorage('has-sent', false)

watchEffect(() => {
  // console.log(orderName.value);
})

const handleSend = () => {
  if (hasSent.value == true) { }
  if (orderName.value == '' || orderMail.value == '' || orderAdress.value == '' || orderPhone.value == '') {
    console.log('no name');
    showModalNoName.value = true
    return
  }
  console.log(orderName.value);

  const listWithName = onskeListFull.value.map((e) => {
    e.Person = orderName.value
    e.Mail = orderMail.value
    e.Adress = orderAdress.value
    e.Phone = orderPhone.value
    delete e.count
    return e
  })
  console.log(listWithName);

  // showModal.value = true
  // hasSent.value = true
  // return

  const sendList = async (index) => {
    const { error, data } = await supabase
      .from('user-data')
      .insert(listWithName[index])

    if (error) {
      console.error(error);
      showModalError.value = true
      errorMessage.value = error
    }

    if (data) {
      console.log(data);
      hasSent.value = true
      showModal.value = true
    }
  }

  for (let i = 0; i < listWithName.length; i++) {
    sendList(i)
  }
}


</script>

<style>
.order:is(div) {
  margin-top: 1rem;
}

@media screen and (max-width:800px) {
  .order:is(div) {
    margin-top: 0;
  }
}

.title {
  font-size: 1.4rem;
  font-weight: 800;
}

.send {
  width: 100%;
  margin-left: 0;
}

.modal-text {
  font-size: 1.7rem;
}

.input-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  place-items: center start;
  padding-right: 0.5rem;
}

.input-layout>input {
  width: 100%;
  cursor: text;
}

/* .grayed { */

/* color: #9ca3af; */
/* } */

.sent-in-badge {
  background: #ebedf1;
  padding: 0.3rem 1rem 0.3rem 0.6rem;
  width: fit-content;
  border-radius: 10000rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #32a748;
  /* box-shadow: inset 0 -0.5px 3px #cfd1d6; */
}

.sent-in-badge>svg {
  color: #32a748;
}
</style>