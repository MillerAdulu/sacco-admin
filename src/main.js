import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Vue from 'vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import { abilitiesPlugin, Can } from '@casl/vue'
import { Laue } from 'laue'

import ability from './casl/ability'
Vue.component('Can', Can)
Vue.use(abilitiesPlugin, ability)

import App from './components/App'
import router from './router'
import store from './store'

import BaseSnackBar from './components/authentication/components/BaseSnackbar'

Vue.component('base-snackbar', BaseSnackBar)

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: "#3F51B5",
    secondary: "#7986CB",
    accent: "#BA68C8",
    error: "#f44336",
    warning: "#ffeb3b",
    info: "#2196f3",
    success: "#4caf50"
  }
})

Vue.use(VeeValidate)
Vue.use(Laue)

new Vue({
  render: h => h(App),
  router,
  store,
  ability
}).$mount('#app')
