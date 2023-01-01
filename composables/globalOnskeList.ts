import { createGlobalState, useStorage } from '@vueuse/core'

export const useGlobalOnskeList = createGlobalState(
  () => useStorage('vueuse-local-storage', {
    onskeList: [],
    onskeListFull: [],
  }),
)