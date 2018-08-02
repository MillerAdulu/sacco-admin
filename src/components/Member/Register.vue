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
            data-vv-name="proposedMonthlyContribution"
            label="Proposed Monthly Contribution"
            :error-messages="errors.collect('proposedMonthlyContribution')"
            v-validate="validations.proposedMonthlyContribution"
            v-model="proposedMonthlyContribution"
            prepend-icon="attach_money" />
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
import HTTP from "../../config"
import queryString from "querystring"

export default {
  $_veeValidate: {
    validator: "new"
  },

  name: "MemberRegistration",

  data() {
    return {
      identificationNumber: "",
      dateOfBirth: "",
      firstName: "",
      lastName: "",
      otherName: "",
      phoneNumber: "",
      proposedMonthlyContribution: "",
      email: "",
      menu: false,
      apiErrors: [],
      validations: {
        identificationNumber: "required|alpha_num|min:5",
        dateOfBirth: "required",
        firstName: "required|alpha_num|min:3",
        lastName: "required|alpha_num|min:3",
        otherName: "alpha_num|min:3",
        phoneNumber: "required|numeric|min:9",
        proposedMonthlyContribution: "required|numeric",
        email: "email"
      },
      btnLoading: false,
      btnRegisterDisabled: false,
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
    register() {
      this.btnLoading = true;
      this.$validator.validateAll();

      HTTP.post(
        "members",
        queryString.stringify({
          identification_number: this.identificationNumber,
          date_of_birth: this.dateOfBirth,
          first_name: this.firstName,
          last_name: this.lastName,
          other_name: this.otherName,
          phone_number: this.phoneNumber,
          proposed_monthly_contribution: this.proposedMonthlyContribution,
          email: this.email
        })
      )
        .then(response => {
          this.$store.commit("setMemberId", response.data.memberId);
          this.btnLoading = false;
          this.$store.commit('setStepperStatus', false)
          this.btnRegisterDisabled = true;
        })
        .catch(error => {
          alert(error);
          this.apiErrors.push(error.response);
          this.btnLoading = false;
        });
    }
  }
};
</script>

