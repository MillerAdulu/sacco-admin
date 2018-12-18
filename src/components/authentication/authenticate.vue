<template>
  <v-container fluid>
    <v-layout column>
      <v-flex xs12>
        <div class="resultContainer">
          <v-layout>
            <div class="item elevation-5">
              You are being logged in ...
            </div>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
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
