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

    <base-snackbar />

  </v-form>
</template>

<script>
  
  import Parsers from "../../../helpers/parsers";
  import queryString from "querystring";
  import { Validator } from "vee-validate";

  const dictionary = {
    en: {
      attributes: {
        identificationNumber: "ID/Passport Number",
        firstName: "first name",
        lastName: "last name",
        otherName: "other name",
        phoneNumber: "phone number",
        proposedMonthlyContribution: "proposed monthly contribution"
      }
    }
  };

  Validator.localize(dictionary);

  export default {
    $_veeValidate: {
      validator: "new"
    },
    name: `NomineeDetailsCapture`,
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
      async addNominee() {
        if (this.$can(`create`, `Nominee`)) {

          this.startLoading()

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
          });
          this.$http.post("nominees", queryString.stringify(nominee))
            .then(response => {
              this.$store.commit(`setSnackbar`, {
                msg: `${
                  this.lastName
                  } added successfully. You can add another one`,
                type: `success`,
                model: true
              });
              this.stopLoading();

              this.$store.commit("setStepperStatus", false);
              this.btnRegisterDisabled = true;
              this.clearNominee();
            })
            .catch(error => {
              this.$store.commit(`setSnackbar`, {
                msg: `Unable to add this nominee at this time`,
                type: `error`,
                model: true
              });
              this.stopLoading();
            });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to add nominees`,
            type: `error`,
            model: true
          });
        }
      },
      getRelationships() {
        if (this.$can(`read`, `Relationship`)) {
          this.$http.get(`relationships`)
            .then(response => {
              this.relationships = response.data;
            })
            .catch(error => {
              this.$store.commit(`setSnackbar`, {
                msg: `Unable to load member relationships at this time`,
                type: `error`,
                model: true
              });
            });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to view member relationships`,
            type: `error`,
            model: true
          });
        }
      },
      clearNominee() {
        this.identificationNumber = ``;
        this.relationshipId = ``;
        this.firstName = ``;
        this.lastName = ``;
        this.otherName = ``;
        this.phoneNumber = ``;
        this.email = ``;
      },
      startLoading() {
        this.btnLoading = true;
      },
      stopLoading() {
        this.btnLoading = false;
      }
    },
    created() {
      this.getRelationships();
    }
  };
</script>
