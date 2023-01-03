<template>
  <div class="filters w-fit h-fit shadow-md rounded-[1rem]">
    <div class="filter-div first-one">
      <input type="text" placeholder=" Sök" v-model.prevent="state.query.value" class="m-2" title="Sök">
    </div>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.favoriteFilter.value">
      <div class="icon-align">
        <Icon class="grayed rekommenderas-icon" name="ph:heart-straight-fill" size="20" />
        <p>Favorit</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.edibleFilter.value">
      <div class="icon-align">
        <Icon class="grayed edible-icon" name="twemoji:fork-and-knife" size="20" />
        <p>Ätlig</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.commentFilter.value">
      <div class="icon-align">
        <Icon class="grayed kommentar-icon" name="majesticons:comment-2-text" size="20" />
        <p>Kommentar</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.linkFilter.value">
      <div class="icon-align">
        <Icon class="grayed länk-icon" name="mdi:link-variant" size="20" />
        <p>Länk</p>
      </div>
    </form>

    <!-------------  ----------------->

    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.typeFilter.value.T">
      <div class="icon-align">
        <Icon name="noto:deciduous-tree" size="16" title="Träd" />
        <p>Träd</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.typeFilter.value.B">
      <div class="icon-align">
        <Icon name="noto:evergreen-tree" size="16" title="Barrträd" />
        <p>Barrträd</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.typeFilter.value.P">
      <div class="icon-align">
        <Icon name="fxemoji:rosette" size="16" title="Perenner" />
        <p>Perenner</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.typeFilter.value.K">
      <div class="icon-align">
        <Icon name="noto:tanabata-tree" size="16" title="Klätterväxt" />
        <p>Klätterväxter</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.typeFilter.value.O">
      <div class="icon-align">
        <Icon name="noto:potted-plant" size="16" title="Ormbunke" />
        <p>Ormbunke</p>
      </div>
    </form>
    <form class="check-filter-div">
      <input type="checkbox" checked="checked" class="checkboxer" v-model="state.typeFilter.value.G">
      <div class="icon-align">
        <Icon name="twemoji:sheaf-of-rice" size="16" title="Gräs" />
        <p>Gräs</p>
      </div>
    </form>
  </div>
</template>

<script setup>
defineEmits(['fetchList', 'handleClick'])
const state = useGlobalState()

console.log(state.typeFilter.value.G);

function handleTest() {
  console.log('chicken');
}
</script>

<style>
@media screen and (max-width: 1200px) {
  .filters {
    max-width: 50rem;
    margin: 1rem auto;
  }

  .filter-div {
    gap: 1rem;
  }

}

@media screen and (max-width: 750px) {
  .hide-on-phone {
    display: none !important;
  }

  .element {
    grid-template-columns: 1fr 40fr 15fr 3fr !important;
  }
}


@media screen and (min-width: 1200px) {
  .filters {
    margin-right: 1rem;
  }

  .bottom-one {
    grid-template-columns: 1fr !important;
    grid-template-rows: 1fr 1fr !important;
  }
}

div.bottom-one {
  grid-template-columns: 1fr;
}

.filters {
  display: grid;
  padding: 1rem;
  width: auto;
  /* position: sticky; */
  top: 6rem;
  z-index: 10;
  background-color: #fff;
}

.grayed {
  color: #454545;
}

.icon-align {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.filter-div {
  /* padding: 0.5rem; */
  padding: 0.5rem 0;
  padding-top: 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: 11fr 10fr;
  place-items: center start;

}

.first-one {
  grid-template-columns: 1fr;
}

.filter-div>p {
  height: fit-content;
}

.filter-div>button,
.filter-div>select {
  width: 100%;
}

.filter-div>button,
.filter-div>select,
.filter-div>input {
  margin: 0.5rem 0;
  width: 100%;
}

.filter-div>select {
  text-align: center;
}

.disabled-btn {
  color: #9ca3af;
}

input.checkboxer {
  /* height: 1rem; */
  width: 1.2rem;
  height: 1.2rem;
  margin: 0.2rem;
  border-radius: 0.5rem;
  /* margin-right: 1rem; */
  /* appearance: none; */
}

.check-filter-div {
  display: grid;
  margin: 0.2rem;
  grid-template-columns: 10% 90%;
  place-items: center start;
  margin-left: 0;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.filter-tags:has(+ div) {
  margin-top: 1rem;
}

.filter-tags>div {
  padding: 0.3rem 0.6rem;
  background-color: #ebedf1;
  margin: 0.1rem;
  width: fit-content;
  border-radius: 10000rem;
}

/* .filter-div>div:nth-child(-n + 1) {
  margin-top: 1rem;
} */

.filter-tags>div>button {
  background: none;
  border: none;
  box-shadow: none;
  padding: 0;
  margin: 0;
}

.filter-tags>div>div {
  display: inline;
}

.tags-move,
.tags-enter-active,
.tags-leave-active {
  transition: all 0.5s ease;
}

.tags-enter-from,
.tags-leave-to {
  opacity: 0;
  transform: translateX(-1rem);
}


.tags-leave-active {
  position: absolute;
}
</style>