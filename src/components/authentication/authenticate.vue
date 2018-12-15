<template>
  <div>You are being authenticated ...</div>
</template>

<script>
import SaccoAPI from "@/api";
import bugsnagClient from "@/helpers/errorreporting";

export default {
  data() {
    return {};
  },
  methods: {
    getUserInfo() {
      localStorage.setItem(`token`, this.access_token);
      SaccoAPI.get("user")
        .then(response => {
          this.$store.commit(`setLoggedInUser`, response.data);
          localStorage.setItem(`accessLevel`, response.data.accessLevel);
          this.redirectToDashboard(localStorage.getItem('accessLevel'));
        })
        .catch(error => {
          bugsnagClient.notify(error);
        });
    },
    redirectToDashboard(accessLevel) {
      if (accessLevel == `MEMBER`)
      window.location.href = process.env.VUE_APP_MEMBER_DASHBOARD
      else window.location.href = process.env.VUE_APP_ADMIN_DASHBOARD
    }
  },
  props: {access_token: String,},
  created() {
    this.getUserInfo();
  }
};
</script>
