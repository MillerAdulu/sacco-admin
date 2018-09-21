import SaccoAPI from '@/api'
import bugsnagClient from '@/helpers/errorreporting'

export default {
  data() {
    return {
      postOffices: [],
    }
  },
  methods: {
    getPostOffices() {
      // if (this.$can(`read`, `PostOffice`)) {
      SaccoAPI.get(`postoffices`)
        .then(response => {
          this.postOffices = response.data;
          this.stopLoading()
        })
        .catch(error => {
          bugsnagClient.notify(error)
          
          this.$store.commit(`setSnackbar`, {
            msg: `Unable to fetch post offices at this time`,
            type: `error`,
            model: true
          });
          this.stopLoading()
        });
      // } else {
      //   this.$store.commit(`setSnackbar`, {
      //     msg: `You don't have permissions to view post offices`,
      //     type: `error`,
      //     model: true
      //   });
      // }
    },
  }
}