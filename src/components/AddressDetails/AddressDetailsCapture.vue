<template>
    <v-form>
      <v-card>
        <v-card-title>Residential Address</v-card-title>
        <v-card-text>
          <v-subheader>What county does the member reside in? </v-subheader>
          <v-autocomplete
                  item-text="countyName"
                  item-value="countyId"
                  @input="getConstituencies(county)"
                  :items="counties"
                  label="Select County"
                  v-model="county"/>
        </v-card-text>
        <v-card-text v-if="county">
          <v-subheader>What constituency does the member reside in? </v-subheader>
          <v-autocomplete
                  item-text="constituencyName"
                  item-value="constituencyId"
                  @input="getLocalities(constituency)"
                  :items="constituencies"
                  label="Select Constituency"
                  v-model="constituency"/>
        </v-card-text>
        <v-card-text v-if="constituency">
          <v-subheader>What locality does the member reside in? </v-subheader>
          <v-autocomplete
                  item-text="localityName"
                  item-value="localityId"
                  label="Select Locality"
                  :items="localities"
                  v-model="locality"/>
        </v-card-text>
        <v-layout row>
          <v-flex xs6>
            <v-card-text>
              <v-subheader>What is the member's post office? </v-subheader>
              <v-autocomplete
              label="Select Post Office"
                      item-text="postOfficeName"
                      item-value="postOfficeId"
                      :items="postOffices"
                      v-model="postOfficeId"/>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text>
              <v-subheader>What is the member's postal address? </v-subheader>
            <v-text-field
                    label="Post Office Address"
                    data-vv-name="postalAddress"
                    :error-messages="errors.collect('postalAddress')"
                    v-validate="validations.postalAddress"
                    v-model="postalAddress"/>
            </v-card-text>
          </v-flex>
        </v-layout><v-layout row>
        <v-flex xs6 mx-2>
          <v-text-field
                  label="Street"
                  v-model="street"
                  data-vv-name="street"
                  v-validate="validations.street"
                  :error-messages="errors.collect('street')"
          />
        </v-flex>
        <v-flex xs6 mx-2>
          <v-text-field
                  data-vv-name="buildingName"
                  v-validate="validations.buildingName"
                  :error-messages="errors.collect('buildingName')"
                  label="Building Name"
                  v-model="buildingName"/>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6 mx-2>
          <v-text-field
                  required
                  label="Floor"
                  v-model="floor"
                  data-vv-name="floor"
                  v-validate="validations.floor"
                  :error-messages="errors.collect('floor')"
          />
        </v-flex>
        <v-flex xs6 mx-2>
          <v-text-field
                  label="House Number"
                  v-model="houseNumber"
                  data-vv-name="houseNumber"
                  v-validate="validations.houseNumber"
                  :error-messages="errors.collect('houseNumber')"
          />
        </v-flex>
      </v-layout>
      </v-card>

      <v-layout row>
          <v-btn color="success" @click="addAddress">Add Address</v-btn>
        <v-btn color="error" @click="clearAddress">Clear Address</v-btn>
      </v-layout>

      <v-snackbar
              v-model="addressDetailsProgress"
              :bottom="true"
      >
        {{ addressDetailsProgressText }}
        <v-progress-circular indeterminate v-if="addressDetailsProgress" />
        <v-btn
        v-if="success"
        color="pink"
        flat
        @click=" addressDetailsProgress = false"
      >
        Close
      </v-btn>
      </v-snackbar>

    </v-form>
</template>

<script>
  import HTTP from '../../config'
  import Parsers from '../../parsers'
  import queryString from 'querystring'
  import { Validator } from 'vee-validate'

  const dictionary = {
    en: {
      attributes: {
        buildingName: `building name`,
        houseNumber: `house number`,
        postalAddress: `postal address`
      }
    }
  }

  Validator.localize(dictionary)

  export default {
    $_veeValidate: {
      validator: `new`
    },
    name: `AddressDetailsCapture`,
    data() {
      return {
        success: false,
        addressDetailsProgress: ``,
        addressDetailsProgressText: ``,
        county: ``,
        constituency: ``,
        locality: ``,
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

        apiErrors: [],
        validations: {
          street: `required|alpha_num|min:3`,
          buildingName: `required|alpha_num|min:3`,
          floor: `required|numeric`,
          houseNumber: `required|alpha_num|min:1`,
          postalAddress: `numeric`,
        }
      }
    },
    created() {
      this.getCounties();
      this.getPostOffices();
    },
    methods: {
      getCounties() {
        this.addressDetailsProgress = true
        this.addressDetailsProgressText = `Fetching counties ...`
        HTTP.get('counties')
          .then(response => {
            this.counties = response.data
            this.addressDetailsProgressText = `Counties fetched!`
            this.addressDetailsProgress = false
          })
          .catch(error => {
            this.apiErrors.push(error)
          })
      },
      getConstituencies(county) {
        this.addressDetailsProgress = true
        this.addressDetailsProgressText = `Fetching constituencies ...`
        HTTP.get(`constituencies/county/${county}`)
          .then(response => {
            this.constituencies = response.data
            this.addressDetailsProgressText = `Constituencies fetched!`
            this.addressDetailsProgress = false
          })
          .catch(error => {
            this.apiErrors.push(error)
          })
      },
      getLocalities(constituency) {
        this.addressDetailsProgress = true
        this.addressDetailsProgressText = `Fetching localities ...`
        HTTP.get(`localities/constituency/${constituency}`)
          .then(response => {
            this.localities = response.data
            this.addressDetailsProgressText = `Localities fetched`
            this.addressDetailsProgress = false
          })
          .catch(error => {
            this.apiErrors.push(error)
          })
      },
      getPostOffices(){
        this.addressDetailsProgress = true
        this.addressDetailsProgressText = `Fetching post offices`
        HTTP.get(`postoffices`)
          .then(response => {
            this.postOffices = response.data
            this.addressDetailsProgressText = `Fetched post offices`
            this.addressDetailsProgress = false
          })
          .catch(error => {
            console.log(error)
          })
      },
      async addAddress() {
        this.addressDetailsProgress = true
        this.addressDetailsProgressText = `Adding this address ...`
        let address = await Parsers.prepareDataObject({
          member_id: this.$store.getters.newMemberRecordKey,
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
        HTTP.post(
          "addressdetails",
          queryString.stringify(address)
        )
          .then(response => {
            this.addressDetailsProgressText = `Added the address successfully!`
            this.success = true
            this.$store.commit('setStepperStatus', false)
            this.clearAddress()
          })
          .then(error => {
            console.log(error)
          })
      },
      clearAddress() {
        this.county = ``
        this.constituency = ``
        this.locality = ``
        this.street = null
        this.buildingName = null
        this.floor = null
        this.houseNumber = null
        this.postOfficeId = null
        this.postalAddress = null
      }
    }
  }
</script>