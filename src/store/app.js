import { defineStore } from "pinia"

export const useAppStore = defineStore('app', { //name Store as app
    state: () => ({
      client:null,
      commandsActionMap: null,
    }),
    getters: {},
    actions: {},
  })