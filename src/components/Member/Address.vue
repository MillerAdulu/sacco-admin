<template>
  <v-container>
    <v-form>
      <v-card>
        <v-card-title>Residential Address</v-card-title>
        <v-card-text>
          <v-subheader> What county does the member reside in? </v-subheader>
          <v-autocomplete
          item-text="countyName"
          item-value="countyId"
            :items="counties.items"
            v-model="county"/>
        </v-card-text>
        <v-card-text>
          <v-subheader> What constituency does the member reside in? </v-subheader>
          <v-autocomplete
          item-text="constituencyName"
          item-value="constituencyId"
            :items="constituencies.items"
            v-model="constituency"/>
        </v-card-text>
        <v-card-text>
          <v-subheader> What locality does the member reside in? </v-subheader>
          <v-autocomplete
          item-text="localityName"
          item-value="localityId"
            :items="localities.items"
            v-model="locality"/>
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
      <v-layout row>
        <v-flex xs12>
          <v-btn block color="success" @click="addAddress">Add Address</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
  import HTTP from '../../config'
  import collect from 'collect.js'

  export default {
    name: "Address",
    data() {
      return {
        county: null,
        constituency: null,
        locality: null,
        street: null,
        buildingName: null,
        floor: null,
        houseNumber: null,

        counties: [],
        constituencies: [],
        localities: [],

        apiErrors: []
      }
    },
    created() {
      HTTP.get('counties')
        .then(response => {
          this.counties = collect(response.data)
        })
        .catch(error => {
          this.apiErrors.push(error)
        })

        HTTP.get('constituencies')
        .then(response => {
          this.constituencies = collect(response.data)
        })
        .catch(error => {
          this.apiErrors.push(error)
        })
        
        HTTP.get('localities')
        .then(response => {
          this.localities = collect(response.data)
        })
        .catch(error => {
          this.apiErrors.push(error)
        })
    
    },
    methods: {
      addAddress() {
        
      }
    }
  }
</script>

<style scoped>

</style>