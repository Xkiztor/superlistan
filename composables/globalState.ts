import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { createGlobalState, useStorage } from '@vueuse/core';

export const useGlobalState = createGlobalState(() => {
  const route = useRoute();

  const countError = ref(false);

  const isNavOpen = ref(false);
  const isFilterOpen = ref(false);
  const isJumpOpen = ref(false);

  function openNav() {
    isNavOpen.value = !isNavOpen.value;
  }
  function openFilter() {
    isFilterOpen.value = !isFilterOpen.value;
  }
  function openJump() {
    isJumpOpen.value = !isJumpOpen.value;
  }

  const typeFilter = ref({
    T: false,
    B: false,
    P: false,
    K: false,
    O: false,
    G: false,
  });
  const favoriteFilter = ref(false);
  const edibleFilter = ref(false);
  const lignosdatabasenFilter = ref(false);
  const linkFilter = ref(false);
  const query = ref(route.query.s || '');

  const sortByWhat = ref('Namn');
  const sortAscending = ref(true);

  function switchFilterDirection() {
    sortAscending.value = !sortAscending.value;
  }

  const rawUserData = ref([]);

  const googleSearchResult = ref();
  const showGoogleSearchResult = ref(false);
  const showImages = ref(false);
  const searchedPlant = ref('');

  const sidebarMode = ref(false);

  const currentImageIndex = ref(0);
  const currentImages = ref([]);
  const showImageModal = ref(false);

  return {
    countError,
    openNav,
    isNavOpen,
    openFilter,
    isFilterOpen,
    openJump,
    isJumpOpen,
    typeFilter,
    favoriteFilter,
    edibleFilter,
    lignosdatabasenFilter,
    linkFilter,
    query,
    switchFilterDirection,
    sortByWhat,
    sortAscending,
    rawUserData,
    googleSearchResult,
    showGoogleSearchResult,
    showImages,
    searchedPlant,
    sidebarMode,
    currentImageIndex,
    currentImages,
    showImageModal
  };
});
