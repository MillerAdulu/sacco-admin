<template>
  <v-form>
    <v-card>
      <v-card-title>Residential Address</v-card-title>
      <v-card-text>
        <v-subheader>What county does the member reside in?</v-subheader>
        <v-autocomplete
            item-text="countyName"
            item-value="countyId"
            @input="getConstituencies(county)"
            :items="counties"
            label="Select County"
            v-model="county"/>
      </v-card-text>
      <v-card-text v-if="county">
        <v-subheader>What constituency does the member reside in?</v-subheader>
        <v-autocomplete
            item-text="constituencyName"
            item-value="constituencyId"
            @input="getLocalities(constituency)"
            :items="constituencies"
            label="Select Constituency"
            v-model="constituency"/>
      </v-card-text>
      <v-card-text v-if="constituency">
        <v-subheader>What locality does the member reside in?</v-subheader>
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
            <v-subheader>What is the member's post office?</v-subheader>
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
            <v-subheader>What is the member's postal address?</v-subheader>
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
      <v-btn color="button" @click="editAddress">Edit Address</v-btn>
      <v-btn color="error" @click="cancelEdit">Cancel</v-btn>
    </v-layout>

  </v-form>
</template>

<script>

  import SaccoAPI from '@/api'
  import {Validator} from "vee-validate";

  const dictionary = {
    en: {
      attributes: {
        buildingName: `building name`,
        houseNumber: `house number`,
        postalAddress: `postal address`
      }
    }
  };

  Validator.localize(dictionary);

  export default {
    $_veeValidate: {
      validator: `new`
    },
    name: `EditAddress`,
    data() {
      return {
        // address: {},
        // county: address.county,
        // constituency: address.constituency,
        // locality: address.locality,
        // street: address.street,
        // buildingName: address.buildingName,
        // floor: address.floor,
        // houseNumber: address.houseNumber,
        // postOfficeId: address.postOfficeId,
        // postalAddress: address.postalAddress,

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
          postalAddress: `numeric`
        }
      };
    },
    methods: {
      getCounties() {
        if (this.$can(`read`, `County`)) {
        SaccoAPI.get("counties")
          .then(response => {
            this.counties = response.data;
          })
          .catch(() => {
            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch counties at this time`,
              type: `error`,
              model: true
            });
          });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to view counties`,
            type: `error`,
            model: true
          });
        }
      },
      getConstituencies(county) {
        if (this.$can(`read`, `County`)) {
        SaccoAPI.get(`constituencies/county/${county}`)
          .then(response => {
            this.constituencies = response.data;
          })
          .catch(() => {
            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch constituencies at this time`,
              type: `error`,
              model: true
            });
          });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to view constituencies`,
            type: `error`,
            model: true
          });
        }
      },
      getLocalities(constituency) {
        if (this.$can(`read`, `Locality`)) {
        SaccoAPI.get(`localities/constituency/${constituency}`)
          .then(response => {
            this.localities = response.data;
          })
          .catch(() => {
            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch localities at this time`,
              type: `error`,
              model: true
            });
          });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to view localities`,
            type: `error`,
            model: true
          });
        }
      },
      getPostOffices() {
        if (this.$can(`read`, `PostOffice`)) {
        SaccoAPI.get(`postoffices`)
          .then(response => {
            this.postOffices = response.data;
          })
          .catch(() => {
            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch post offices at this time`,
              type: `error`,
              model: true
            });
          });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to view post offices`,
            type: `error`,
            model: true
          });
        }
      },
      getAddressToEdit() {
        if (this.$can(`update`, `AddressDetail`)) {
        SaccoAPI.get(`addressdetails/${this.$route.params.address}`)
          .then(response => {
            this.address = response.data;
          })
          .catch(() => {
            let snackbar = {
              msg: `Unable to fetch this address`,
              type: `error`,
              model: true
            };
            this.$store.commit(`setSnackbar`, snackbar);
          });
        } else {
          let snackbar = {
            msg: `You don't have permissions to edit this address`,
            type: `error`,
            model: true
          };
          this.$store.commit(`setSnackbar`, snackbar);
        }
      },
      editAddress() {},
      cancelEdit() {
        this.$router.go(-1);
      }
    },
    created() {
      this.getCounties();
      this.getPostOffices();
    }
  };
</script>
