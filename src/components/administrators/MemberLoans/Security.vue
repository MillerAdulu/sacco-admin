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
          autofocus
        />
      </v-flex>
      <v-flex xs6 mx-2>
        <v-text-field
          label="Email"
          data-vv-name="email"
          :error-messages="errors.collect('email')"
          v-validate="validations.email"
          v-model="email"
          prepend-icon="email"
        ></v-text-field>
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
          v-model="firstName"
        />
      </v-flex>
      <v-flex xs4 mx-2>
        <v-text-field
          required
          data-vv-name="lastName"
          :error-messages="errors.collect('lastName')"
          prepend-icon="text_format"
          label="Last Name"
          v-validate="validations.lastName"
          v-model="lastName"
        />
      </v-flex>
      <v-flex xs4 mx-2>
        <v-text-field
          data-vv-name="otherName"
          v-validate="validations.otherName"
          :error-messages="errors.collect('otherName')"
          label="Other Name"
          prepend-icon="text_format"
          v-model="otherName"
        />
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
          prepend-icon="phone"
        />
      </v-flex>
      <v-flex xs6 mx-2></v-flex>
    </v-layout>

    <v-layout row>
      <v-btn color="button" @click="addGuarantor" :loading="btnLoading">Add Guarantor</v-btn>
      <v-btn color="error" @click="clearGuarantor">Clear Guarantor</v-btn>
    </v-layout>

    <base-snackbar/>
  </v-form>
</template>

<script>
import bugsnagClient from "@/helpers/errorreporting";
import SaccoAPI from "@/api";
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
      phoneNumber: "phone number"
    }
  }
};

Validator.localize(dictionary);

export default {
  $_veeValidate: {
    validator: "new"
  },
  name: `LoanSecurity`,
  data() {
    return {
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
      btnLoading: false
    };
  },
  methods: {
    async addGuarantor() {
      if (this.$can(`create`, `LoanGuarantor`)) {
        this.startLoading();

        this.$validator.validateAll();
        let guarantor = await Parsers.prepareDataObject({
          member_loan_id: this.$store.getters.newMemberRecordKey,
          identification_number: this.identificationNumber,
          first_name: this.firstName,
          last_name: this.lastName,
          other_name: this.otherName,
          phone_number: this.phoneNumber,
          email: this.email
        });
        SaccoAPI.post("loans/guarantors", queryString.stringify(guarantor))
          .then(() => {
            this.$store.commit(`setSnackbar`, {
              msg: `${
                this.lastName
              } has been added successfully. You can add another guarantor`,
              type: `success`
            });
            this.stopLoading();

            this.$store.commit("setStepperStatus", false);
            this.btnRegisterDisabled = true;
            this.clearGuarantor();
          })
          .catch(error => {
            bugsnagClient.notify(error);

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to add this guarantor at this time`,
              type: `error`
            });
            this.stopLoading();
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to add guarantors`,
          type: `error`
        });
      }
    },
    clearGuarantor() {
      this.identificationNumber = ``;
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
  created() {}
};
</script>
