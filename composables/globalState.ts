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
    const favoriteFilter = ref(false)
    const edibleFilter = ref(false)
    const commentFilter = ref(false)
    const linkFilter = ref(false)
    const query = ref('')

    const sortByWhat = ref('Namn')
    const sortAscending = ref(true)

    function switchFilterDirection() {
      sortAscending.value = !sortAscending.value
    }

    return {
      countError, openNav, isNavOpen, openFilter, isFilterOpen, openJump, isJumpOpen,
      typeFilter, favoriteFilter, edibleFilter, commentFilter, linkFilter, query, switchFilterDirection, sortByWhat, sortAscending,
    }
  }
)