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
          @input="getConstituencies(county)"
            :items="counties.items"
            v-model="county"/>
        </v-card-text>
        <v-card-text>
          <v-subheader> What constituency does the member reside in? </v-subheader>
          <v-autocomplete
          item-text="constituencyName"
          item-value="constituencyId"
          @input="getLocalities(constituency)"
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
        <v-layout row>
          <v-flex xs6>
            <v-card-text>
          <v-subheader> What is the member's post office? </v-subheader>
          <v-autocomplete
          item-text="postOfficeName"
          item-value="postOfficeId"
            :items="postOffices.items"
            v-model="postOfficeId"/>
        </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-text-field
            label="Post Office Address"
            v-model="postalAddress"/>
          </v-flex>
        </v-layout>
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
  import queryString from 'querystring'
  import collect from 'collect.js'

  export default {
    name: "AddAddress",
    data() {
      return {
        memberId: '',
        county: '',
        constituency: '',
        locality: '',
        street: null,
        buildingName: null,
        floor: null,
        houseNumber: null,
        postOfficeId: null,
        postalAddress: null,

        counties: [],
        constituencies: [],
        localities: [],
        postOffices: [],

        apiErrors: []
      }
    },
    created() {
      this.getCounties();
      this.getPostOffices();
    },
    methods: {
      getCounties() {
        HTTP.get('counties')
        .then(response => {
          this.counties = collect(response.data)
        })
        .catch(error => {
          this.apiErrors.push(error)
        })
      },
      getConstituencies(county) {
        HTTP.get(`constituencies/county/${county}`)
        .then(response => {
          this.constituencies = collect(response.data)
        })
        .catch(error => {
          this.apiErrors.push(error)
        })
      },
      getLocalities(constituency) {
        HTTP.get(`localities/constituency/${constituency}`)
        .then(response => {
          this.localities = collect(response.data)
        })
        .catch(error => {
          this.apiErrors.push(error)
        })
      },
      getPostOffices(){
        HTTP.get(`postoffices`)
        .then(response => {
          this.postOffices = collect(response.data)
        })
        .catch(error => {
          console.log(error)
        }) 
      },
      addAddress() {
        HTTP.post(
          "addressdetails",
          queryString.stringify({
            member_id: this.$store.getters.memberId,
            county_id: this.county,
            constituency_id: this.constituency,
            locality_id: this.locality,
            street: this.street,
            building_name: this.buildingName,
            floor: this.floor,
            house_number: this.houseNumber,
            post_office_id: this.postOfficeId,
            postal_address: this.postalAddress
          })
          )
          .then(response => {
            console.log(response)
            this.$store.commit('setStepperStatus', false)
          })
          .then(error => {
            console.log(error)
          })
      }
    }
  }
</script>