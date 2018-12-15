import SaccoAPI from '@/api'
import bugsnagClient from '@/helpers/errorreporting'

export default {
  data() {
    return {
      issuingStatuses: [],
    }
  },
  methods: {
    getIssuingStatuses() {
      if (this.$can(`read`, `LoanIssuingStatus`)) {
      SaccoAPI.get(`loans/issuingstatuses`)
        .then(response => {
          this.issuingStatuses = response.data;
          this.stopLoading()
        })
        .catch(error => {
          bugsnagClient.notify(error)
          
          this.$store.commit(`setSnackbar`, {
            msg: `Unable to fetch loan issuing statuses at this time`,
            type: `error`,
            model: true
          });
          this.stopLoading()
        });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view issuing statuses`,
          type: `error`,
          model: true
        });
        this.stopLoading()
      }
    },
  },
  created() {
    this.getIssuingStatuses()
  }
}