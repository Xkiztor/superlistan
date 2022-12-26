import { ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => {
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

    return { openNav, isNavOpen, openFilter, isFilterOpen, openJump, isJumpOpen }
  }
)