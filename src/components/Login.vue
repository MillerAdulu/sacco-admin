<template>
       <v-container fluid fill-height class="loginOverlay">
          <v-layout flex align-center justify-center>
            <v-flex xs12 sm4 elevation-6>
              <v-toolbar class="pt-5 blue darken-4">
                <v-toolbar-title class="white--text"><h4>Welcome Back</h4></v-toolbar-title>
                <!-- </v-toolbar-items> -->
              </v-toolbar>
              <v-card>
                <v-card-text class="pt-4">
                  <div>
                      <v-form v-model="valid" ref="form">
                        <v-text-field
                          label="Enter your phone number or e-mail address"
                          v-model="username"                        
                          required
                        ></v-text-field>
                        <v-text-field
                          label="Enter your password"
                          v-model="password"
                          min="8"
                          :append-icon="e1 ? 'visibility' : 'visibility_off'"
                          :append="() => (e1 = !e1)"
                          :type="e1 ? 'password' : 'text'"
                          :rules="passwordRules"
                          counter
                          required
                        ></v-text-field>
                        <v-layout justify-space-between>
                            <v-btn @click="login" :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }">Login</v-btn>
                            <a href="">Forgot Password</a>
                        </v-layout>
                      </v-form>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
       </v-container>
</template>

<script>
import axios from 'axios'
import queryString from 'querystring'

export default {
  name: `Login`,
  data() {
    return {
      e1: false,
      valid: false,
      password: null,
      username: null,
      passwordRules: [
              (v) => !!v || 'Password is required',
            ],
    }
  },
  methods: {
    login() {

      axios({
        method: `post`,
        url: `${process.env.VUE_APP_API_BASE_URL_DEV}/login`,
        data: queryString.stringify({
          username: this.username,
          password: this.password,
        })
      })
      .then(response => {        
        localStorage.setItem('loggedInUser', JSON.stringify(response.data))
        this.$router.push('/')             
      })
      .catch(error => {
        console.log(error)
      })

    },
    clear() {
      this.$refs.form.$el.reset()
    }
  }
}
</script>


<style>
#login {
  background-image: url("https://images.unsplash.com/photo-1497733942558-e74c87ef89db?dpr=1&auto=compress,format&fit=crop&w=1650&h=&q=80&cs=tinysrgb&crop=");
  background-size: cover;
  overflow:hidden;
}

.loginOverlay {
  background:rgba(33,150,243,0.3);
}

.photoCredit{
  position: absolute;
  bottom: 15px;
  right: 15px;
}
</style>
