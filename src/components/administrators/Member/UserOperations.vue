<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-list>
          <v-list-tile two-line @click="resetMemberPassword">
            <v-list-tile-avatar>
              <v-icon>build</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Reset Password</v-list-tile-title>
              <v-list-tile-sub-title>Click here to reset this member's password</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <base-snackbar/>
  </v-layout>
</template>

<script>
import queryString from "querystring";
import SaccoAPI from "@/api";
import bugsnagClient from "@/helpers/errorreporting";

export default {
  name: `UserOperations`,
  data() {
    return {
      btnLoading: false
    };
  },
  props: {
    memberId: Number
  },
  methods: {
    resetMemberPassword() {
      this.btnLoading = true;
      SaccoAPI.post(
        `members/accounts/reset`,
        queryString.stringify({
          member_id: this.memberId
        })
      )
        .then(response => {
          this.btnLoading = false;
          if (response.data == null) {
            this.$store.commit(`setSnackbar`, {
              msg: `This member cannot be found`,
              type: `error`
            });
          }
          if (response.data) {
            this.$store.commit(`setSnackbar`, {
              msg: `This member will receive their new password shortly`,
              type: `success`
            });
          }
        })
        .catch(error => {
          this.btnLoading = false;
          bugsnagClient.notify(error);
          this.$store.commit(`setSnackbar`, {
            msg: `Cannot reset password at this time`,
            type: `error`
          });
        });
    }
  }
};
</script>

