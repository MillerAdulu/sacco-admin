import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Vue from 'vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import { abilitiesPlugin, Can } from '@casl/vue'
import { Laue } from 'laue'

import App from './components/App'
import router from './router'
import store from './store'
import ability from './casl/ability'
import BaseSnackBar from './components/authentication/components/BaseSnackbar'

Vue.component('base-snackbar', BaseSnackBar)
Vue.component('Can', Can)

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.use(Laue)
Vue.use(abilitiesPlugin, ability)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
