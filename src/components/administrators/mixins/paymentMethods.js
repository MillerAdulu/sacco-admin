import SaccoAPI from '@/api'
import bugsnagClient from '@/helpers/errorreporting'

export default {
  data() {
    return {
      paymentMethods: []
    }
  },
  methods: {
    fetchPaymentMethods() {

      if (this.$can(`read`, `PaymentMethod`)) {

        SaccoAPI
          .get(`paymentmethods`)
          .then(response => {

            this.paymentMethods = response.data;
            this.stopLoading();
          })
          .catch(error => {
            bugsnagClient.notify(error)

            this.stopLoading();
            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch payment methods at this time`,
              type: `error`,

            });
          });
      } else {
        this.stopLoading();
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view payment methods`,
          type: `error`,

        });
      }
    },
  },
  created() {
    this.fetchPaymentMethods()
  }
}