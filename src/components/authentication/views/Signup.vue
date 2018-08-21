<template>
  <div style="max-width: 700px;">
    <v-card
      class="v-card--auth pa-5"
      color="white"
    >
      <v-container
        pa-0
        grid-list-xl
      >
        <v-layout>
          <v-flex xs8>
            <h2 class="headline font-weight-black primary--text">Vuetify</h2>
            <h1 class="headline font-weight-regular mb-5">Create your Vuetify Account</h1>
            <v-form
              v-model="form"
              class="mb-5"
              ref="form"
            >
              <v-container pa-0>
                <v-layout wrap>
                  <v-flex xs6>
                    <v-text-field
                      v-model="firstName"
                      :rules="[rules.required('Enter first name')]"
                      label="First name"
                    />
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      v-model="lastName"
                      :rules="[rules.required('Enter last name')]"
                      label="Last name"
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="email"
                      :rules="[rules.required('Enter your email address')]"
                      label="Email"
                      hint="You can use letters, numbers & periods"
                      persistent-hint
                    />
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      v-model="password"
                      :rules="[rules.required('Enter a password')]"
                      label="Password"
                      type="password"
                    />
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      v-model="confirmPassword"
                      :rules="[rules.required('Confirm you password'), rules.confirm]"
                      append-outer-icon="remove_red_eye"
                      label="Confirm password"
                      type="password"
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-messages
                      :value="['Use 8 or more characters with a mix of letters, numbers & symbols']"
                    />
                  </v-flex>
                </v-layout>
                <v-layout
                  align-center
                  justify-space-between
                  pt-3
                >
                  <v-flex grow>
                    <router-link to="/signin">
                      <base-link>
                        Sign in instead
                      </base-link>
                    </router-link>
                    </v-flex>
                  <v-flex shrink>
                    <base-btn
                      :disabled="!form"
                      :loading="isLoading"
                      prominent
                      @click="submit"
                    >
                      Next
                    </base-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-flex>
          <v-flex
            align-center
            column
            layout
            justify-center
            xs4
          >
            <v-img
              :src="require('@/assets/logo.svg')"
              class="mb-3"
              height="100"
              max-height="100"
              style="width: 100%;"
              contain
            />
            <div class="flex-grow subheading font-weight-regular text-xs-center">
              One account. All of Vuetify working for you.
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <base-footer />
  </div>
</template>

<script>
  // Utilities
  import {
    mapActions,
    mapMutations
  } from 'vuex'

  export default {
    data () {
      const data = {
        isLoading: false,
        form: false,
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        confirmPassword: undefined,
        rules: {
          required: msg => v => !!v || msg,
          confirm: v => !!v && v === this.password || 'Passwords do not match'
        }
      }

      return data
    },

    methods: {
      ...mapActions('cognito', ['registerUser']),
      ...mapMutations(['setSnackbar']),
      submit () {
        if (!this.$refs.form.validate()) return

        this.isLoading = true

        this.registerUser({
          username: this.email,
          password: this.password,
          attributes: {
            name: `${this.firstName} ${this.lastName}`,
            email: this.email
          }
        })
        .then(() => {
          this.setSnackbar({
            type: 'success',
            msg: 'Account created. Check your email for verification'
          })

          this.$router.push('/signin')
        })
        .catch(err => {
          this.setSnackbar({
            type: 'error',
            msg: err.message,
            timeout: 10000
          })
        })
        .finally(() => (this.isLoading = false))
      }
    }
  }
</script>
