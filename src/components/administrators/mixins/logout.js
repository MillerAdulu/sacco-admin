export default {
  methods: {
    logOut() {
      this.$store.commit("setLoggedInUser", {});
      localStorage.clear();
      this.$router.push(`/`);
    }
  }
}