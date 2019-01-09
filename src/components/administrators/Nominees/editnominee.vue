<template>
  <v-form>
    <v-layout row>
      <v-flex xs6 mx-2>
        <v-text-field
          required
          label="ID/Passport Number"
          v-model="currentIdentificationNumber"
          v-validate="this.validations.currentIdentificationNumber"
          :error-messages="errors.collect('currentIdentificationNumber')"
          data-vv-name="currentIdentificationNumber"
          prepend-icon="text_format"
          autofocus
        />
      </v-flex>
      <v-flex xs6 mx-2>
        <v-autocomplete
          item-text="relationshipName"
          item-value="relationshipId"
          :items="relationships"
          v-model="currentRelationshipId"
          label="Relationship to the member"
        />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs4 mx-2>
        <v-text-field
          required
          v-validate="validations.currentFirstName"
          data-vv-name="currentFirstName"
          :error-messages="errors.collect('currentFirstName')"
          prepend-icon="text_format"
          label="First Name"
          v-model="currentFirstName"
        />
      </v-flex>
      <v-flex xs4 mx-2>
        <v-text-field
          required
          data-vv-name="currentLastName"
          :error-messages="errors.collect('currentLastName')"
          prepend-icon="text_format"
          label="Last Name"
          v-validate="validations.currentLastName"
          v-model="currentLastName"
        />
      </v-flex>
      <v-flex xs4 mx-2>
        <v-text-field
          data-vv-name="currentOtherName"
          v-validate="validations.currentOtherName"
          :error-messages="errors.collect('currentOtherName')"
          label="Other Name"
          prepend-icon="text_format"
          v-model="currentOtherName"
        />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs6 mx-2>
        <v-text-field
          required
          data-vv-name="currentPhoneNumber"
          label="Phone Number"
          :error-messages="errors.collect('currentPhoneNumber')"
          v-validate="validations.currentPhoneNumber"
          v-model="currentPhoneNumber"
          prepend-icon="phone"
        />
      </v-flex>
      <v-flex xs6 mx-2>
        <v-text-field
          label="Email"
          data-vv-name="currentEmail"
          :error-messages="errors.collect('currentEmail')"
          v-validate="validations.currentEmail"
          v-model="currentEmail"
          prepend-icon="email"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-btn color="button" @click="updateNominee" :loading="btnLoading">Update Nominee</v-btn>
      <v-btn color="error" @click="cancelUpdate">Cancel</v-btn>
    </v-layout>

    <base-snackbar/>
  </v-form>
</template>

<script>
import bugsnagClient from "@/helpers/errorreporting";
import SaccoAPI from "@/api";
import fetchMemberRelationshipsMixin from "@/components/administrators/mixins/memberrelationships";
import Parsers from "../../../helpers/parsers";
import queryString from "querystring";
import { Validator } from "vee-validate";

const dictionary = {
  en: {
    attributes: {
      currentIdentificationNumber: "ID/Passport Number",
      currentFirstName: "first name",
      lastName: "last name",
      currentOtherName: "other name",
      currentPhoneNumber: "phone number"
    }
  }
};

Validator.localize(dictionary);

export default {
  $_veeValidate: {
    validator: "new"
  },
  name: `EditNominee`,
  data() {
    return {
      currentIdentificationNumber: this.identificationNumber,
      currentRelationshipId: this.relationship,
      currentFirstName: this.firstName,
      currentLastName: this.lastName,
      currentOtherName: this.otherName,
      currentPhoneNumber: this.phoneNumber,
      currentEmail: this.email,
      apiErrors: [],
      validations: {
        currentIdentificationNumber: "required|alpha_num|min:5",
        currentRelationshipId: "required",
        currentFirstName: "required|alpha_num|min:3",
        currentLastName: "required|alpha_num|min:3",
        currentOtherName: "alpha_num|min:3",
        currentPhoneNumber: "required|numeric|min:9",
        currentEmail: "email"
      },
      btnLoading: false
    };
  },
  props: {
    nomineeId: Number,
    identificationNumber: String,
    relationship: String,
    firstName: String,
    lastName: String,
    otherName: String,
    phoneNumber: String,
    email: String
  },
  methods: {
    async updateNominee() {
      if (this.$can(`update`, `Nominee`)) {
        this.startLoading();
        this.$validator.validateAll();

        let nominee = await Parsers.prepareDataObject({
          identification_number: this.currentIdentificationNumber,
          relationship_id: this.currentRelationshipId,
          first_name: this.currentFirstName,
          last_name: this.currentLastName,
          other_name: this.currentOtherName,
          phone_number: this.currentPhoneNumber,
          email: this.currentEmail
        });
        SaccoAPI.put(
          `nominees/${this.nomineeId}`,
          queryString.stringify(nominee)
        )
          .then(() => {
            this.$store.commit(`setSnackbar`, {
              msg: `${this.lastName} has been updated successfully.`,
              type: `success`,
              
            });
            this.stopLoading();
          })
          .catch(error => {
            bugsnagClient.notify(error);

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to update this nominee at this time`,
              type: `error`,
              
            });
            this.stopLoading();
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to update nominees`,
          type: `error`,
          
        });
      }
    },
    cancelUpdate() {
      this.$router.go(-1);
    },
    startLoading() {
      this.btnLoading = true;
    },
    stopLoading() {
      this.btnLoading = false;
    }
  },
  mixins: [fetchMemberRelationshipsMixin],
  created() {
    this.getRelationships();
  }
};
</script>
