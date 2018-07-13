<template>
  <v-container>
    <v-form>
      <v-card>
        <v-card-title>Residential Address</v-card-title>
        <v-card-text>
          <v-subheader> What county does the member reside in? </v-subheader>
          <v-autocomplete
            :items="counties.items"
            v-model="county"/>
        </v-card-text>
        <v-card-text>
          <v-subheader> What constituency does the member reside in? </v-subheader>
          <v-autocomplete
            :items="constituencies.items"
            v-model="county"/>
        </v-card-text>
        <v-card-text>
          <v-subheader> What locality does the member reside in? </v-subheader>
          <v-autocomplete
            :items="localities.items"
            v-model="county"/>
        </v-card-text>
      </v-card>
      <v-layout row>
        <v-flex xs6 mx-2>
          <v-text-field
            label="Street"
          v-model="street"/>
        </v-flex>
        <v-flex xs6 mx-2>
          <v-text-field
            label="Building Name"
            v-model="buildingName"/>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6 mx-2>
          <v-text-field
            label="Floor"
          v-model="floor"/>
        </v-flex>
        <v-flex xs6 mx-2>
          <v-text-field
            label="House Number"
            v-model="houseNumber"/>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
  import HTTP from '../../config'
  import collect from 'collect.js'
  import VTextField from "vuetify/src/components/VTextField/VTextField";

  export default {
    name: "Address",
    components: {VTextField},
    data() {
      return {
        county: '1',
        constituency: '',
        locality: '',
        street: '',
        buildingName: '',
        floor: '',
        houseNumber: '',

        counties: [],
        constituencies: [],
        localities: [],

        countyCollection: [],
        constituencyCollection: [],
        localityCollection: [],

        apiErrors: []
      }
    },
    created() {
      HTTP.get('counties')
        .then(response => {
          this.countyCollection = collect(response.data)
          this.counties = this.countyCollection.pluck('countyName')
        })
        .catch(error => {
          this.apiErrors.push(error)
        })
      HTTP.get('constituencies')
        .then(response => {
          this.constituencyCollection = collect(response.data)
          this.constituencies = this.constituencyCollection.pluck('constituencyName')
        })
        .catch(error => {
          this.apiErrors.push(error)
        })
      HTTP.get('localities')
        .then(response => {
          this.localityCollection = collect(response.data)
          this.localities = this.localityCollection.pluck('localityName')
        })
        .catch(error => {
          this.apiErrors.push(error)
        })
    }
  }
</script>

<style scoped>

</style>