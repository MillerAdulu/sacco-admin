import SaccoAPI from '@/api';
import bugsnagClient from "@/helpers/errorreporting";

export default {
  methods: {
    logOut() {
      SaccoAPI.get('logout').then(() => {
        this.$store.commit("setLoggedInUser", {});
      localStorage.clear();
        window.location.href = process.env.VUE_APP_OAUTH_URL
      }).catch(error => {
        bugsnagClient.notify(error);
      })

    }
  }
}