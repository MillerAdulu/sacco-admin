<template>

  <v-container fluid>
    <v-form>
      <v-layout row>
        <v-flex xs4>
          <v-text-field></v-text-field>
        </v-flex>
        <v-flex xs4></v-flex>
        <v-flex xs4></v-flex>
      </v-layout>
    </v-form>
  </v-container>

</template>

<script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    }
  }
</script>