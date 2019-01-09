import SaccoAPI from '@/api'
import bugsnagClient from '@/helpers/errorreporting'

export default {
  data() {
    return {
      loanTypes: [],
    }
  },
  methods: {
    getLoanTypes() {
      if (this.$can(`read`, `LoanType`)) {
      SaccoAPI.get("loans/types")
        .then(response => {
          this.loanTypes = response.data;
          this.stopLoading()
        })
        .catch(error => {
          bugsnagClient.notify(error)
          
          this.$store.commit(`setSnackbar`, {
            msg: `Unable to fetch loan types at this time`,
            type: `error`,
            
          });
          this.stopLoading()
        });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view loan types`,
          type: `error`,
          
        });
        this.stopLoading()
      }
    },
  }
}