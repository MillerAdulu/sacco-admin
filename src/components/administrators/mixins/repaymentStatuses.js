import SaccoAPI from '@/api'
import bugsnagClient from '@/helpers/errorreporting'

export default {
  data() {
    return {
      repaymentStatuses: [],
    }
  },
  methods: {
    getRepaymentStatuses() {
      if (this.$can(`read`, `LoanRepaymentStatus`)) {
        SaccoAPI.get(`loans/repaymentstatuses`)
          .then(response => {
            this.repaymentStatuses = response.data;
            this.stopLoading()
          })
          .catch(error => {
            bugsnagClient.notify(error)

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch loan repayment statuses at this time`,
              type: `error`,

            });
            this.stopLoading()
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view repayment statuses`,
          type: `error`,

        });
        this.stopLoading()
      }
    },
  },
  created() {
    this.getRepaymentStatuses()
  }
}