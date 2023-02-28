import { createGlobalState, useStorage } from '@vueuse/core'

export const useGlobalOnskeListOld = createGlobalState(
  () => useStorage('vueuse-local-storage', {
    onskeList: [],
    onskeListFull: [],
  }),
)