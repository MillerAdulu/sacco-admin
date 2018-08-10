import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Vue from 'vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import { Laue } from 'laue'

import App from './App.vue'
import router from './router'
import vuexStore from './store'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.use(Laue)

new Vue({
  render: h => h(App),
  router,
  store: vuexStore
}).$mount('#app')
