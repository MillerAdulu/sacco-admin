import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Vue from 'vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import Vuex from 'vuex'

import App from './App.vue'
import router from './router'



Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.use(Vuex)

const vuexStore = new Vuex.Store({
  state: {
    currentTab: 'List',
    administratorId: null,
    administratorLevel: null,
    newMemberId: null
  },
  getters: {
    currentTab: state => state.currentTab,
    
    administratorId: state => state.administratorId,
    
    administratorLevel: state => state.administratorLevel,
    
    newMemberId: state => state.newMemberId
  },
  mutations: {
    setCurrentTab: (state, payload) => {
      state.currentTab = payload
    },
    loadAdminId: (state, payload) => {
      state.administratorId = payload
    },
    loadAdminLevel: (state, payload) => {
      state.administratorLevel = payload
    },
    loadNewMemberId: (state, payload) => {
      state.newMemberId = payload
    },
  },
})

new Vue({
  render: h => h(App),
  router,
  store: vuexStore
}).$mount('#app')
