import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Vue from 'vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'

import App from './App.vue'



Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VeeValidate)

new Vue({
  render: h => h(App)
}).$mount('#app')
