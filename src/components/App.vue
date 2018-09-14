<template>
  <v-app>
    <v-fade-transition appear>
      <router-view />
    </v-fade-transition>
  </v-app>
</template>

<script>
  export default {
    name: `App`
  }
</script>