<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app></v-navigation-drawer>
      <v-toolbar app></v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>


      </v-content>
      <v-footer app></v-footer>
    </v-app>
  </div>
</template>

<script>
import HelloWorld from './components/MemberRegistration.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>