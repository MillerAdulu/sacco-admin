import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Vue from 'vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import {
  abilitiesPlugin,
  Can
} from '@casl/vue'

import ability from './casl/ability'
Vue.component('Can', Can)
Vue.use(abilitiesPlugin, ability)

import App from './components/App'
import router from './router'
import store from './store'

import BaseSnackBar from './components/authentication/BaseSnackbar'

Vue.component('base-snackbar', BaseSnackBar)

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: "#00457e",
    secondary: "#fbf5f5",
    accent: "#228cdb",
    error: "#b42025",
    warning: "#ffeb3b",
    info: "#2196f3",
    success: "#4caf50",
    button: "#d1a253",
    chips: "#3e3f43"
  }
})

Vue.use(VeeValidate)

new Vue({
  render: h => h(App),
  router,
  store,
  ability
}).$mount('#app')