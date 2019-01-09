import SaccoAPI from '@/api';
import bugsnagClient from "@/helpers/errorreporting";

export default {
  methods: {
    logOut() {
      this.btnLoading = true;
      SaccoAPI.get('logout').then(() => {
        this.btnLoading = false;
        this.$store.commit("setLoggedInUser", {});
        localStorage.clear();
        window.location.href = process.env.VUE_APP_HOME
      }).catch(error => {
        this.btnLoading = false;
        bugsnagClient.notify(error);
      })

    }
  }
}