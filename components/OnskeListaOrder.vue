<template>
  <div class="list-bg order">
    <p class="test-five"></p>
  </div>
</template>

<style>
.test-five {
  width: 100%;
}

.order:is(div) {
  margin-top: 1rem;
}

@media screen and (max-width:800px) {
  .order:is(div) {
    margin-top: 0;
  }
}
</style>