import Vue from 'vue'
import bugsnag from 'bugsnag-js'
import bugsnagVue from 'bugsnag-vue'

const bugsnagClient = bugsnag(
  process.env.VUE_APP_BUGSNAG_API_KEY
)

bugsnagClient.use(bugsnagVue(Vue))

export default bugsnagClient