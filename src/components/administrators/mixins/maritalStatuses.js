import SaccoAPI from '@/api'
import bugsnagClient from '@/helpers/errorreporting'

export default {
  data() {
    return {
      maritalStatuses: [],
    }
  },
  methods: {
    getMaritalStatuses() {
      if (this.$can(`read`, `MaritalStatus`)) {
        SaccoAPI.get(`maritalstatuses`)
          .then(response => {
            this.maritalStatuses = response.data;
            this.stopLoading()
          })
          .catch(error => {
            bugsnagClient.notify(error)

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch marriage statuses at this time`,
              type: `error`,

            });
            this.stopLoading()
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view marital statuses`,
          type: `error`,

        });
      }
    },
  },
  created() {
    this.getMaritalStatuses()
  }
}