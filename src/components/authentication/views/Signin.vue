<template>
  <div style="max-width: 500px;">
    <base-card>
      <v-card-text class="pa-5">
        <div class="text-xs-center mb-5">
          <v-img
            :src="require('@/assets/logo.svg')"
            class="mb-3 mx-auto"
            style="width: 40px"
          />
          <h1 class="headline font-weight-regular mb-3">
            {{ tab ? 'Welcome' : 'Sign in' }}
          </h1>

          <div style="height: 40px;">
            <v-slide-y-transition mode="out-in">
              <v-chip
                v-if="tab"
                outline
                @click.native="tab = 0"
              >
                <v-icon
                  color="primary"
                  left
                >account_circle</v-icon>
                <span
                  v-text="username"
                  class="body-2"
                />
                <v-icon
                  color="black"
                  right
                >
                  keyboard_arrow_down
                </v-icon>
              </v-chip>

              <div
                v-else
                class="subheading"
              >
                with your Sacco Account
              </div>
            </v-slide-y-transition>
          </div>
        </div>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <partial-email
              v-model="username"
              @next="tab = 1"
            />
          </v-tab-item>
          <v-tab-item>
            <partial-password
              v-model="password"
              @next="submit"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </base-card>

    <base-footer />
  </div>
</template>

<script>
import BaseCard from "@/components/authentication/components/BaseCard";
import BaseFooter from "@/components/authentication/components/BaseFooter";
import PartialEmail from "@/components/authentication/components/PartialEmail";
import PartialPassword from "@/components/authentication/components/PartialPassword";

import { mapMutations } from "vuex"
import axios from "axios"
import queryString from "querystring"

export default {
  components: {
    BaseCard,
    BaseFooter,
    PartialEmail,
    PartialPassword
  },

  data: () => ({
    username: undefined,
    password: undefined,
    tab: 0
  }),

  methods: {
    ...mapMutations(["setIsLoading", "setSnackbar"]),
    submit() {
      this.hasError = false;
      this.setIsLoading(true);

      axios({
        method: `post`,
        url: `${process.env.VUE_APP_API_BASE_URL_DEV}/login`,
        data: queryString.stringify({
          username: this.username,
          password: this.password
        })
      })
        .then(response => {
          const user = response.data
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          this.$store.commit('loggedInUser', response.data)
          this.setSnackbar({
            type: "success",
            msg: `Successfully signed in user ${this.username}`
          });
          if(user.accessLevel == `MEMBER`) this.$router.push(`/member/dashboard`)
          else this.$router.push(`/admin/dashboard`)
        })
        .catch(error => {
          console.log(error);
          this.setSnackbar({
            type: "error",
            msg: error.message
          });
        })
        .finally(this.setIsLoading);
    }
  }
};
</script>
