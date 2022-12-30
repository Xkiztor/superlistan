import { ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => {
    const countError = ref(false)

    const isNavOpen = ref(false)
    const isFilterOpen = ref(false)
    const isJumpOpen = ref(false)

    function openNav() {
      isNavOpen.value = !isNavOpen.value
    }
    function openFilter() {
      isFilterOpen.value = !isFilterOpen.value
    }
    function openJump() {
      isJumpOpen.value = !isJumpOpen.value
    }

    const typeFilter = ref('')
    const query = ref('')
    const sortBy = ref({ sortByWhat: 'Namn', ascending: true })

    function switchFilterDirection() {
      sortBy.value.ascending = !sortBy.value.ascending
    }

    return { countError, openNav, isNavOpen, openFilter, isFilterOpen, openJump, isJumpOpen, typeFilter, query, sortBy, switchFilterDirection }
  }
)