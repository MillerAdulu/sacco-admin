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
          label="Relationship to the member"
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
          <v-btn color="success" @click="addNominee" :disabled="btnRegisterDisabled" :loading="btnLoading">Add Nominee</v-btn>
          <v-btn color="error" @click="clearNominee" :disabled="btnRegisterDisabled">Clear Nominee</v-btn>
      </v-layout>

      <v-snackbar
              v-model="relationshipProgress"
              :bottom="true"
      >
        {{ relationshipProgressText }}
        <v-progress-circular indeterminate v-if="relationshipProgress" />
        <v-btn
        v-if="success"
        color="pink"
        flat
        @click=" relationshipProgress = false"
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
      identificationNumber: 'ID/Passport Number',
        firstName: 'first name',
        lastName: 'last name',
        otherName: 'other name',
        phoneNumber: 'phone number',
        proposedMonthlyContribution: 'proposed monthly contribution'
    }
  }
}

Validator.localize(dictionary)

export default {
  $_veeValidate: {
    validator: "new"
  },
  name: `NomineeDetailsCapture`,
  data() {
    return {
      success: ``,
      relationshipProgress: ``,
      relationshipProgressText: ``,
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
    async addNominee() {
      this.relationshipProgress = true
      this.relationshipProgressText = `Adding ${ this.lastName } to nominees`
      this.$validator.validateAll();
      let nominee = await Parsers.prepareDataObject({
        member_id: this.$store.getters.newMemberRecordKey,
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
          this.success = true
          this.relationshipProgressText = `You can add another nominee`
          this.clearNominee()
        })
        .catch(error => {
          alert(error);
          this.apiErrors.push(error.response);
          this.btnLoading = false;
        });
    },
    getRelationships() {
      this.relationshipProgress = true
      this.relationshipProgressText = `Fetching relationships ...`
      HTTP.get(`relationships`)
        .then(response => {
          this.relationships = response.data;
          this.relationshipProgress = false
        })
        .catch(error => {
          console.log(error);
        });
    },
    clearNominee() {
      this.identificationNumber = ``
      this.relationshipId = ``
      this.firstName = ``
      this.lastName = ``
      this.otherName = ``
      this.phoneNumber = ``
      this.email = ``
    }
  },
  created() {
    this.getRelationships();
  }
};
</script>
