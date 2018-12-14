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
          console.log(response.data);
          this.$store.commit(`setLoggedInUser`, response.data);
          localStorage.setItem(`accessLevel`, response.data.accessLevel);
          this.redirectToDashboard(localStorage.getItem('accessLevel'));
        })
        .catch(error => {
          console.log(error)
          bugsnagClient.notify(error);
        });
    },
    redirectToDashboard(accessLevel) {
      if (accessLevel == `MEMBER`)
      this.$router.push(`/member`);
      else this.$router.push(`/admin`);
    }
  },
  props: {access_token: String,},
  created() {
    this.getUserInfo();
  }
};
</script>
