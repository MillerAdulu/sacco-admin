import SaccoAPI from '@/api'

export default {
  data() {
    return {
      constituencies: [],
    }
  },
  methods: {
    getConstituencies() {
      // if (this.$can(`read`, `County`)) {
        SaccoAPI.get(`constituencies`)
          .then(response => {
            this.constituencies = response.data;
            this.stopLoading()
          })
          .catch(error => {
            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch constituencies at this time`,
              type: `error`,
              model: true
            });
            this.stopLoading()
          });
      // } else {
      //   this.$store.commit(`setSnackbar`, {
      //     msg: `You don't have permissions to view constituencies`,
      //     type: `error`,
      //     model: true
      //   });
      // }
    }
  }
}