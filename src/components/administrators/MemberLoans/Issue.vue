<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Basic Details</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Loan Security</v-stepper-step>

      <v-divider></v-divider>

    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <BasicDetailsCapture />
        <v-btn
          color="button"
          @click="next(2)"
          :disabled="this.$store.getters.stepperContinueEnabled"
        >Continue</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">

        <LoanSecurity />

        <v-btn
            color="button"
            :to='{name: `LoanDetails`, params: {
            memberLoanId: this.$store.getters.memberLoanId }
            }'
            :disabled="this.$store.getters.stepperContinueEnabled">
          Finish
        </v-btn>

        <v-btn
            color="button"
            to="/admin/memberloans/issue"
            :disabled="this.$store.getters.stepperContinueEnabled">
          Add New Loan
        </v-btn>

      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import BasicDetailsCapture from './BasicDetailsCapture';
import LoanSecurity from './Security';

export default {
  name: `IssueMemberLoan`,
  data() {
    return {
      e1: 0
    };
  },
  methods: {
    next(next) {
      this.e1 = next;
      this.$store.commit("setStepperStatus", true);
    }
  },
  components: {
    BasicDetailsCapture,
    LoanSecurity,
  },
  created() {
    this.$store.commit("setStepperStatus", true);
  }
};
</script>
