import SaccoAPI from '@/api'
import bugsnagClient from '@/helpers/errorreporting'

export default {
  data() {
    return {
      localities: [],
    }
  },
  methods: {
    getLocalities() {
      // if (this.$can(`read`, `Locality`)) {
      SaccoAPI.get(`localities`)
        .then(response => {
          this.localities = response.data;
          this.stopLoading()
        })
        .catch(error => {
          bugsnagClient.notify(error)
          
          this.$store.commit(`setSnackbar`, {
            msg: `Unable to fetch localities at this time`,
            type: `error`,
            model: true
          });
          this.stopLoading()
        });
      // } else {
      //   this.$store.commit(`setSnackbar`, {
      //     msg: `You don't have permissions to view localities`,
      //     type: `error`,
      //     model: true
      //   });
      // }
    },
  }
}