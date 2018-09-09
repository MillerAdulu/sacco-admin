import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import colors from 'vuetify/es5/util/colors'

import bugsnag from 'bugsnag-js'
import Vue from 'vue'
import bugsnagVue from 'bugsnag-vue'
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

const bugsnagClient = bugsnag('36dce60f50c734a61194e09802756103')
bugsnagClient.use(bugsnagVue(Vue))
Vue.component('base-snackbar', BaseSnackBar)

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.base,
    secondary: colors.indigo.lighten2,
    accent: colors.indigo.base,
    error: colors.red.base,
    warning: colors.yellow.base,
    info: colors.blue.base,
    success: colors.green.base
  }
})

Vue.use(VeeValidate)
Vue.use(Laue)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
