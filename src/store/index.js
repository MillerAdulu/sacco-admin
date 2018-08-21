import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const set = property => (store, payload) => (store[property] = payload)

export default new Vuex.Store({
  state: {
    administratorId: null,
    administratorLevel: null,
    newMemberRecordKey: null,
    stepperContinueEnabled: true,
    loggedInUser: null,
    
    isLoading: false,
    isReady: false,
    snackbar: {},
  },
  getters: {
    administratorId: state => state.administratorId,
    administratorLevel: state => state.administratorLevel,
    newMemberRecordKey: state => state.newMemberRecordKey,
    stepperContinueEnabled: state => state.stepperContinueEnabled,
    loggedInUser: state => state.loggedInUser,
  },
  mutations: {
    loadAdminId: (state, payload) => {
      state.administratorId = payload
    },
    loadAdminLevel: (state, payload) => {
      state.administratorLevel = payload
    },
    setNewMemberRecordKey: (state, payload) => {
      state.newMemberRecordKey = payload
    },
    setStepperStatus: (state, payload) => {
      state.stepperContinueEnabled = payload
    },
    setLoggedInUser: (state, payload) => {
      state.loggedInUser = payload
    },
    
    
    setIsReady: set('isReady'),
    setIsLoading: set('isLoading'),
    setUser: set('user'),
    setSnackbar: set('snackbar')
  },
})