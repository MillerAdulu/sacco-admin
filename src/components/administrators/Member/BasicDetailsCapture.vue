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
        <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            lazy transition="scale-transition"
            offset-y
            full-width
            min-width="290px">
          <v-text-field
              required
              slot="activator"
              data-vv-name="dateOfBirth"
              v-validate="validations.dateOfBirth"
              :error-messages="errors.collect('dateOfBirth')"
              v-model="dateOfBirth"
              label="Birthday date"
              prepend-icon="event"
              readonly />
          <v-date-picker ref="picker" v-model="dateOfBirth" :max="new Date().toISOString().substr(0, 10)" min="1950-01-01" @change="save"/>
        </v-menu>
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
      <v-flex xs4 mx-2>
        <v-text-field
            required
            data-vv-name="phoneNumber"
            label="Phone Number"
            :error-messages="errors.collect('phoneNumber')"
            v-validate="validations.phoneNumber"
            v-model="phoneNumber"
            prepend-icon="phone" />
      </v-flex>
      <v-flex xs4 mx-2>
        <v-text-field
            label="Email"
            data-vv-name="email"
            :error-messages="errors.collect('email')"
            v-validate="validations.email"
            v-model="email"
            prepend-icon="email"></v-text-field>
      </v-flex>

      <v-flex xs4 mx-2>
        <v-text-field
            required
            data-vv-name="proposedMonthlyDeposit"
            label="Proposed Monthly Deposit"
            :error-messages="errors.collect('proposedMonthlyDeposit')"
            v-validate="validations.proposedMonthlyDeposit"
            v-model="proposedMonthlyDeposit"
            prepend-icon="attach_money" />
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <v-text-field
            required
            data-vv-name="kraPin"
            label="KRA Pin"
            :error-messages="errors.collect('kraPin')"
            v-validate="validations.kraPin"
            v-model="kraPin"
            prepend-icon="code" />
      </v-flex>
      <v-flex xs4>
        <v-radio-group v-model="gender" :mandatory="true" row>
          <v-radio label="Male" :value="true" />
          <v-radio label="Female" :value="false" />
        </v-radio-group>
      </v-flex>
      <v-flex xs4>
        <v-autocomplete
            item-text="maritalStatus"
            item-value="maritalStatusId"
            :items="maritalStatuses"
            label="Select Marital Status"
            v-model="maritalStatus"/>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-btn  color="success" @click="registerMember" :disabled="btnRegisterDisabled" :loading="btnLoading">Register Member</v-btn>
      <v-btn color="error" @click="clearForm" :disabled="btnRegisterDisabled">Clear</v-btn>
    </v-layout>

    <base-snackbar />

  </v-form>
</template>

<script>
  import HTTP from "../../../api";
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
        proposedMonthlyDeposit: "proposed monthly deposit",
        kraPin: "KRA pin"
      }
    }
  };

  Validator.localize(dictionary);
  export default {
    $_veeValidate: {
      validator: `new`
    },

    name: `BasicDetailsCapture`,

    data() {
      return {
        basicDetailsProgress: false,
        basicDetailsSnackBarText: ``,
        identificationNumber: "",
        dateOfBirth: "",
        firstName: "",
        lastName: "",
        otherName: "",
        phoneNumber: "",
        proposedMonthlyDeposit: "",
        email: "",
        kraPin: ``,
        maritalStatus: ``,
        gender: ``,
        menu: false,
        maritalStatuses: [],
        apiErrors: [],
        validations: {
          identificationNumber: `required|alpha_num|min:5`,
          dateOfBirth: `required`,
          firstName: `required|alpha|min:3`,
          lastName: `required|alpha|min:3`,
          otherName: `alpha|min:3`,
          phoneNumber: `required|numeric|min:9`,
          proposedMonthlyDeposit: `required|numeric`,
          email: `email`,
          kraPin: `min:5`,
        },
        btnLoading: false,
        btnRegisterDisabled: false
      };
    },

    watch: {
      menu(val) {
        val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
      }
    },

    methods: {
      save(date) {
        this.$refs.menu.save(date);
      },

      async registerMember() {
        if (this.$can(`create`, `Member`)) {

          this.startLoading()

          await this.$validator.validateAll();

          let newMember = await Parsers.prepareDataObject({
            identification_number: this.identificationNumber,
            date_of_birth: this.dateOfBirth,
            first_name: this.firstName,
            last_name: this.lastName,
            other_name: this.otherName,
            phone_number: this.phoneNumber,
            proposed_monthly_deposit: this.proposedMonthlyDeposit,
            email: this.email,
            kra_pin: this.kraPin,
            marital_status_id: this.maritalStatus,
            gender: this.gender
          });

          HTTP.post("members", queryString.stringify(newMember))
            .then(response => {
              this.$store.commit(`setSnackbar`, {
                msg: `${this.lastName} has been added successfully`,
                type: `success`,
                model: true
              });

              this.$store.commit("setNewMemberRecordKey", response.data.memberId);
              this.$store.commit("setStepperStatus", false);
              this.clearForm();
              this.btnRegisterDisabled = true;
              this.stopLoading()
            })
            .catch(error => {
              this.$store.commit(`setSnackbar`, {
                msg: `You are unable to add this member at this time`,
                type: `error`,
                model: true
              });

              this.stopLoading();
            });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to add members`,
            type: `error`,
            model: true
          });
        }
      },
      clearForm() {
        this.identificationNumber = ``;
        this.dateOfBirth = ``;
        this.firstName = ``;
        this.lastName = ``;
        this.otherName = ``;
        this.phoneNumber = ``;
        this.email = ``;
        this.proposedMonthlyDeposit = ``;
        this.maritalStatus = ``;
        this.gender = ``;
        this.kraPin = ``;
        this.$validator.reset();
      },
      getMaritalStatuses() {
        if (this.$can(`read`, `MaritalStatus`)) {
          HTTP.get(`maritalstatuses`)
            .then(response => {
              this.maritalStatuses = response.data;
            })
            .catch(error => {
              this.$store.commit(`setSnackbar`, {
                msg: `Unable to fetch marriage statuses at this time`,
                type: `error`,
                model: true
              });
            });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to view marital statuses`,
            type: `error`,
            model: true
          });
        }
      },
      startLoading() {
        this.btnLoading = true;
      },
      stopLoading() {
        this.btnLoading = false;
      }
    },
    created() {
      this.getMaritalStatuses();
    }
  };
</script>

