import SaccoAPI from '@/api'
import bugsnagClient from '@/helpers/errorreporting'

export default {
  data() {
    return {
      counties: [],
    }
  },
  methods: {
    getCounties() {
      if (this.$can(`read`, `County`)) {
        SaccoAPI.get("counties")
          .then(response => {
            this.counties = response.data;
            this.stopLoading()
          })
          .catch(error => {
            bugsnagClient.notify(error)

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch counties at this time`,
              type: `error`,

            });
            this.stopLoading()
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view counties`,
          type: `error`,

        });
      }
    },
  }
}