import SaccoAPI from '@/api'
export default {
  data() {
    return {
      maritalStatuses: [],
    }
  },
  methods: {
    getMaritalStatuses() {
      // if (this.$can(`read`, `MaritalStatus`)) {
        SaccoAPI.get(`maritalstatuses`)
          .then(response => {
            this.maritalStatuses = response.data;
            this.stopLoading()
          })
          .catch(error => {
            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch marriage statuses at this time`,
              type: `error`,
              model: true
            });
            this.stopLoading()
          });
      // } else {
      //   this.$store.commit(`setSnackbar`, {
      //     msg: `You don't have permissions to view marital statuses`,
      //     type: `error`,
      //     model: true
      //   });
      // }
    },
  },
  created() {
    this.getMaritalStatuses()
  }
}