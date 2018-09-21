import SaccoAPI from '@/api'

export default {
  data() {
    return {
      relationships: [],
    }
  },
  methods: {
    getRelationships() {
      // if (this.$can(`read`, `Relationship`)) {
        SaccoAPI.get(`relationships`)
          .then(response => {
            this.relationships = response.data;
            this.stopLoading()
          })
          .catch(error => {
            this.$store.commit(`setSnackbar`, {
              msg: `Unable to load member relationships at this time`,
              type: `error`,
              model: true
            });
            this.stopLoading()
          });
      // } else {
      //   this.$store.commit(`setSnackbar`, {
      //     msg: `You don't have permissions to view member relationships`,
      //     type: `error`,
      //     model: true
      //   });
      // }
    },
  }
}