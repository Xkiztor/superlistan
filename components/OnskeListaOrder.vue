<template>
  <div class="onske-list-bg order">
    <h1 class="title">Beställ</h1>
    <!-- <div class="sent-in-badge" v-if="hasSent">
      <Icon name="material-symbols:check-circle-rounded" size="20" />
      <h1>Du har redan skickat in!</h1>
    </div> -->
    <div class="input-layout">
      <label for="user-name">Namn: </label>
      <input v-model="orderName" id="user-name" type="text" placeholder="Ex. Peter Linder">
    </div>
    <div class="input-layout">
      <label for="user-mail">Mailadress: </label>
      <input v-model="orderMail" id="user-mail" type="text" placeholder="Ex. peter@lindersplantskola.se">
    </div>
    <div class="input-layout">
      <label for="user-adress">Adress: </label>
      <input v-model="orderAdress" id="user-adress" type="text" placeholder="Ex. Köinge 6902, 242 92 Hörby">
    </div>
    <div class="input-layout">
      <label for="user-phone">Telefonnummer: </label>
      <input v-model="orderPhone" id="user-phone" type="tel" placeholder="Ex. 0733518716">
    </div>
    <div class="input-layout">
      <label for="user-comment">Kommentar: </label>
      <input v-model="orderComment" id="user-comment" type="text" placeholder="(Frivilligt)">
    </div>
    <button @click="handleSend" :class="hasSent ? 'grayed' : ''" class="send">Skicka in</button>
    <!-- <button @click="mailjsSend()">Skicka mailjs test</button> -->
  </div>
  <div class="modals">
    <Modal v-if="showModal" @close-modal="showModal = false">
      <div>
        <h1 class="modal-text">
          Tack!
        </h1>
        <h1 class="modal-text">
          Din lista är inskickad!
        </h1>
      </div>
    </Modal>
    <Modal v-if="showModalError" @close-modal="showModalError = false">
      <div>
        <Icon class="warning" name="mi:warning" size="60" />
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
    <Modal v-if="showModalCountError" @close-modal="showModalCountError = false">
      <div>
        <Icon class="warning" name="mi:warning" size="60" />
        <h1 class="modal-text">
          Vänligen ange korrekt antal växter!
        </h1>
      </div>
    </Modal>
    <Modal v-if="showModalPriceError" @close-modal="showModalPriceError = false">
      <div>
        <Icon class="warning" name="mi:warning" size="60" />
        <h1 class="modal-text">
          Lägsta ordersumman är 2000kr
        </h1>
      </div>
    </Modal>
    <Modal v-if="showModalNoName" @close-modal="showModalNoName = false">
      <div>
        <Icon class="warning" name="mi:warning" size="60" />
        <h1 class="modal-text">
          Vänligen fyll i alla fält!
        </h1>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oykwqfkocubjvrixrunf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3dxZmtvY3VianZyaXhydW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNjMxMjUsImV4cCI6MTk3ODkzOTEyNX0.fthY1hbpesNps0RFKQxVA8Z10PLWD-3M_LJmkubhVF4'
const supabase = createClient(supabaseUrl, supabaseKey)

const onskeList = useGlobalOnskeList()

const showModal = ref(false)
const showModalError = ref(false)
const showModalNoName = ref(false)
const showModalCountError = ref(false)
const showModalPriceError = ref(false)
const showConfirmModal = ref(false)

const errorMessage = ref({})

const orderName = ref('')
const orderMail = ref('')
const orderAdress = ref('')
const orderPhone = ref('')
const orderComment = ref('')

// const hasSent = ref(false)
const hasSent = useStorage('has-sent', false)

const state = useGlobalState()


const handleSend = () => {
  let hasError = false

  // if (hasSent.value == true) { }
  if (onskeList.onskeList.value.map(e => e.Pris * e.Count).reduce((a, b) => a + b, 0) < 2000 && hasSent.value === false) {
    showModalPriceError.value = true
    return
  }
  if (orderName.value == '' || orderMail.value == '' || orderAdress.value == '' || orderPhone.value == '') {
    console.log('no name');
    showModalNoName.value = true
    return
  }
  if (state.countError.value == true) {
    showModalCountError.value = true
    return
  }



  const listWithName = onskeList.onskeList.value.map((e) => {
    e.Person = orderName.value
    e.Mail = orderMail.value
    e.Adress = orderAdress.value
    e.Phone = orderPhone.value
    e.Comment = orderComment.value
    // delete e.Count
    return e
  })
  console.log(listWithName);

  const sendList = async (index) => {
    const { error, data } = await supabase
      .from('user-data-2024')
      .insert(listWithName[index])

    if (error) {
      console.error(error);
      hasError = true
      showModalError.value = true
      errorMessage.value = error
    }

    if (data) {
      hasError = false
      console.log(data);
      hasSent.value = true
      showModal.value = true
    }
  }


  for (let i = 0; i < listWithName.length; i++) {
    sendList(i)
  }

  if (!hasError) {
    // mailjsSend()
    sendNuxtMail()
  }
}
import emailjs from '@emailjs/browser';

var templateParams = {
  email: `${orderMail.value}`
  // to: orderMail.value
}

const mailjsSend = () => {
  emailjs.send('service_wqm24rb', 'template_1dpj2ax', templateParams, 'KOZ_38k0rE7nZmhIm')
    .then((result) => {
      console.log('SUCCESS!', result.text);
    }, (error) => {
      console.log('FAILED...', error.text);
    });
}


const mail = useMail()

const sendNuxtMail = () => {
  console.log('sending mail');

  const plantList = []
  onskeList.onskeList.value.forEach((obj) => plantList.push(obj.Namn))
  console.log(plantList);
  mail.send({
    from: 'Superlistan',
    subject: `Lista från ${orderName.value} inskickad`,
    // text: `Hej ${orderName.value}! Tack för din beställning! Din lista är nu inskickad.`,
    text: `${orderName.value} har skickat in sin lista!\n\nBeställning: \n${'- ' + plantList.join('\n')} \n \nEpost: ${orderMail.value}\nTelefonnummer: ${orderPhone.value}\nAdress: ${orderAdress.value}\nKommentar: ${orderComment.value}`,
  })
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

.dark .send {
  color: #ecf9fb;
}

.modal-text {
  font-size: 1.7rem;
}

.input-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  place-items: center start;
  padding-right: 0.5rem;
  margin: 0.3rem 0;
}

.input-layout>input {
  width: 100%;
  cursor: text;
}

.input-layout>input::placeholder {
  color: #8f8f8f;
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

.dark .sent-in-badge {
  background: #30343b;
  color: #9ea8b2;
}

.sent-in-badge>svg {
  color: #32a748;
}

.warning {
  color: rgb(240, 93, 67);
}
</style>