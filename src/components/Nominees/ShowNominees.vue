<template>
<div>
    <v-layout row v-for="nominee in nominees" :key="nominees.indexOf(nominee)">
      <v-flex xs6>
        <p>Passport/ID Number: {{ nominee.identificationNumber }}</p>
        <p>Names: {{ nominee.lastName }}, {{ nominee.firstName }} {{ nominee.otherName }}</p>
        <p>Relationship: {{ nominee.relationship }}</p>
        <p>Phone Number: {{ nominee.phoneNumber }}</p>
        <p>Email: {{ nominee.email }}</p>
        <v-divider />
      </v-flex>
      
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {},
  props: {
    nominees: Array
  }
}
</script>

