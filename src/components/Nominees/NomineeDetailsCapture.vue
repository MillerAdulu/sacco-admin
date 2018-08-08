<template>
<v-form>
      <v-layout row>
        <v-flex xs6 mx-2>
          <v-text-field
            required
            label="ID/Passport Number"
            v-model="identificationNumber"
            v-validate="this.validations.identificationNumber"
            :error-messages="errors.collect('identificationNumber')"
            data-vv-name="identificationNumber"
            prepend-icon="text_format"
            autofocus />
        </v-flex>
        <v-flex xs6 mx-2>
          <v-autocomplete
          item-text="relationshipName"
          item-value="relationshipId"
          :items="relationships"
          v-model="relationshipId"
          />
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs4 mx-2>
          <v-text-field
            required
            v-validate="validations.firstName"
            data-vv-name="firstName"
            :error-messages="errors.collect('firstName')"
            prepend-icon="text_format"
            label="First Name"
            v-model="firstName" />
        </v-flex>
        <v-flex xs4 mx-2>
          <v-text-field
            required
            data-vv-name="lastName"
            :error-messages="errors.collect('lastName')"
            prepend-icon="text_format"
            label="Last Name"
            v-validate="validations.lastName"
            v-model="lastName" />
        </v-flex>
        <v-flex xs4 mx-2>
          <v-text-field
            data-vv-name="otherName"
            v-validate="validations.otherName"
            :error-messages="errors.collect('otherName')"
            label="Other Name"
            prepend-icon="text_format"
            v-model="otherName" />
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs6 mx-2>
          <v-text-field
            required
            data-vv-name="phoneNumber"
            label="Phone Number"
            :error-messages="errors.collect('phoneNumber')"
            v-validate="validations.phoneNumber"
            v-model="phoneNumber"
            prepend-icon="phone" />
        </v-flex>
        <v-flex xs6 mx-2>
          <v-text-field
            label="Email"
            data-vv-name="email"
            :error-messages="errors.collect('email')"
            v-validate="validations.email"
            v-model="email"
            prepend-icon="email"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12>
          <v-btn block color="success" @click="register" :disabled="btnRegisterDisabled" :loading="btnLoading">Register Member</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
</template>

<script>
import HTTP from '../../config'
import Parsers from '../../parsers'
import queryString from 'querystring'

export default {
  $_veeValidate: {
    validator: "new"
  },
  name: `NomineeDetails`,
  data() {
    return {
      relationships: [],
      identificationNumber: "",
      relationshipId: "",
      firstName: "",
      lastName: "",
      otherName: "",
      phoneNumber: "",
      email: "",
      apiErrors: [],
      validations: {
        identificationNumber: "required|alpha_num|min:5",
        relationshipId: "required",
        firstName: "required|alpha_num|min:3",
        lastName: "required|alpha_num|min:3",
        otherName: "alpha_num|min:3",
        phoneNumber: "required|numeric|min:9",
        email: "email"
      },
      btnLoading: false,
      btnRegisterDisabled: false
    };
  },
  methods: {
    async register() {
      this.btnLoading = true;
      this.$validator.validateAll();
      let nominee = await Parsers.prepareDataObject({
        member_id: this.$store.getters.newMemberId,
        identification_number: this.identificationNumber,
        relationship_id: this.relationshipId,
        first_name: this.firstName,
        last_name: this.lastName,
        other_name: this.otherName,
        phone_number: this.phoneNumber,
        email: this.email
      })
      HTTP.post(
        "nominees",
        queryString.stringify(nominee)
      )
        .then(response => {
          this.btnLoading = false;
          this.$store.commit("setStepperStatus", false);
          this.btnRegisterDisabled = true;
        })
        .catch(error => {
          alert(error);
          this.apiErrors.push(error.response);
          this.btnLoading = false;
        });
    },
    getRelationships() {
      HTTP.get(`relationships`)
        .then(response => {
          this.relationships = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getRelationships();
  }
};
</script>
