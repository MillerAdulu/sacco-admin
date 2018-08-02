<template>
  <div>
    <v-layout row v-for="address in addresses" :key="addresses.indexOf(address)">
    <v-flex xs3>
      <p>County: {{ address.county.countyName }}</p>
      <p>Constituency: {{ address.constituency.constituencyName }}</p>
      <p>Locality: {{ address.locality.localityName }}</p>
      <p>Street: {{ address.street }}</p>
    </v-flex>
    <v-flex xs3>
      <p>Building Name: {{ address.buildingName }}</p>
      <p>Floor: {{ address.floor}}</p>
      <p>House Number: {{ address.houseNumber }}</p>
    </v-flex>
    <v-flex xs3>
      <p>Post Office: {{address.postOffice.postOfficeName }}</p>
      <p>Postal Address: {{ address.postalAddress }}</p>
    </v-flex>
    <v-flex xs3>
      <v-icon medium>edit</v-icon>
      <v-icon medium @click="deleteAddress(address.addressDetailId)">delete</v-icon>
    </v-flex>
    </v-layout>
    <v-divider />
  </div>
</template>

<script>
import HTTP from "../../config";
export default {
  data() {
    return {};
  },
  props: {
    addresses: Array
  },
  methods: {
    deleteAddress(address) {
      HTTP.delete(`addressdetails/${address}`)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
