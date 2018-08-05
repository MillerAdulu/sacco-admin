import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Vue from 'vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import Vuex from 'vuex'
import { Laue } from 'laue'

import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.use(Vuex)
Vue.use(Laue)

const vuexStore = new Vuex.Store({
  state: {
    administratorId: null,
    administratorLevel: null,
    memberId: 1,
    stepperContinueEnabled: true,
  },
  getters: {    
    administratorId: state => state.administratorId,
    administratorLevel: state => state.administratorLevel,
    memberId: state => state.memberId,
    stepperContinueEnabled: state => state.stepperContinueEnabled,
  },
  mutations: {
    loadAdminId: (state, payload) => {
      state.administratorId = payload
    },
    loadAdminLevel: (state, payload) => {
      state.administratorLevel = payload
    },
    setMemberId: (state, payload) => {
      state.memberId = payload
    },
    setStepperStatus: (state, payload) => {
      state.stepperContinueEnabled = payload
    }
  },
})

new Vue({
  render: h => h(App),
  router,
  store: vuexStore
}).$mount('#app')
