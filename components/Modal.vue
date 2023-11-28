<template>
  <div class="modal-screen-cover">
    <div class="modal-container" ref="target">
      <button @click="$emit('closeModal')" class="modal-close">
        <Icon name="ic:round-close" size="25" />
      </button>
      <slot class="content" />
      <!-- <h1>Din lista är inskickad!</h1> -->
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['closeModal'])

const target = ref(null)

onClickOutside(target, (event) => {
  // console.log('outside');
  emit('closeModal')
})
</script>

<style>
.modal-screen-cover {
  display: grid;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  background: rgba(0, 0, 0, 0.2);
  place-items: center;
}

.dark .modal-screen-cover {
  background: rgba(0, 0, 0, 0.4);
}

.modal-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: fit-content;
  padding: 1rem 5rem;
  place-items: center;
  background: #fff;
  height: 30vh;
  border-radius: 1rem;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);

  /* position: absolute;
  left: 50%;
  top: 50%;

  width: 90vw;
  left: 50%;
  margin-left: -45vw;
  margin-top: -15vh; */
}

.dark .modal-container {
  background: #26292f;
  color: #ecf9fb;
}

.modal-container>* {
  text-align: center;
}

.modal-text {
  text-align: center;
}

.modal-sub-text {
  text-align: center;
}

.modal-code-block {
  background-color: #ebedf1;
  padding: 1.5rem;
  border-radius: 1rem;
}

.dark .modal-code-block {
  background: var(--bg-dark);
}

@media screen and (max-width: 500px) {
  .modal-container {
    padding: 1rem;
  }
}

@media screen and (max-width: 1200px) {}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;

  background: none;
  box-shadow: none;
}

.modal-close:hover {
  background: none;
  transform: scale(140%);
}
</style>