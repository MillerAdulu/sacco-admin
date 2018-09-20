export default {
  data() {
    return {
      paymentMethods: []
    }
  },
  methods: {
    fetchPaymentMethods() {
      
      // if (this.$can(`read`, `PaymentMethods`)) {
        
        SaccoAPI
          .get(`paymentmethods`)
          .then(response => {
            
            this.paymentMethods = response.data;
            this.stopLoading();
          })
          .catch(error => {
            this.stopLoading();
            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch payment methods at this time`,
              type: `error`,
              model: true
            });
          });
      // } else {
      //   this.stopLoading();
      //   this.$store.commit(`setSnackbar`, {
      //     msg: `You don't have permissions to view payment methods`,
      //     type: `error`,
      //     model: true
      //   });
      // }
    },
  },
  created() {
    this.fetchPaymentMethods()
  }
}