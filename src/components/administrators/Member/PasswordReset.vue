<template>
  <v-form>
    <v-layout row>
      <v-text-field
          required
          label="Phone or Email"
          v-model="username"
          prepend-icon="text_format"
          autofocus />
    </v-layout>
    <v-layout row>
      <v-btn color="success" @click="resetMemberPassword" :loading="btnLoading">Reset</v-btn>
    </v-layout>
    <base-snackbar />
  </v-form>
</template>

<script>
  import queryString from "querystring";
  import SaccoAPI from '@/api'
  import bugsnagClient from '@/helpers/errorreporting'

  export default {
    data() {
      return {
        username: ``,
        btnLoading: false
      }
    },
    methods: {
      resetMemberPassword() {
        this.btnLoading = true
        SaccoAPI.post(`members/accounts/reset`, queryString.stringify({
          username: this.username,
        }))
          .then(response => {
            this.btnLoading = false
            if(response.data == null) {
              this.$store.commit(`setSnackbar`, {
                msg: `${this.username} cannot be found`,
                type: `error`,
                model: true
              });
            }
            if(response.data) {
              this.$store.commit(`setSnackbar`, {
                msg: `${this.username} will receive their password shortly`,
                type: `success`,
                model: true
              });
            }
          })
          .catch(error => {
            this.btnLoading = false
            bugsnagClient.notify(error)
            this.$store.commit(`setSnackbar`, {
              msg: `Cannot reset password at this time`,
              type: `error`,
              model: true
            });
          })
      }
    }
  }
</script>

