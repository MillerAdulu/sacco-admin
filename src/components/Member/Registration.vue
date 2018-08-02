<template>

  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Basic Details</v-stepper-step>
      <v-divider/>
      <v-stepper-step :complete="e1 > 2" step="2">Address(es)</v-stepper-step>
      <v-divider/>
      <v-stepper-step :complete="e1 > 3" step="3">Payment Details</v-stepper-step>
      <v-divider/>
      <v-stepper-step step="4">Nominees</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <BasicDetails />
          <v-btn
          color="primary"
          @click="next(2)"
          :disabled="this.$store.getters.stepperContinueEnabled">
          Continue
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">

        <AddAddress />
        
        <v-btn
          color="primary"
          @click="next(3)"
          :disabled="this.$store.getters.stepperContinueEnabled">
          Continue
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        
        <AddPaymentDetails />

        <v-btn
          color="primary"
          @click="next(4)"
          :disabled="this.$store.getters.stepperContinueEnabled">
          Continue
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="4">

        <AddNominee />

        <v-btn
          color="primary"
          href="/memberlist"
          :disabled="this.$store.getters.stepperContinueEnabled">
          Finish
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import BasicDetails from '@/components/Member/Register'
import AddAddress from '@/components/AddressDetails/AddAddress'
import AddPaymentDetails from '@/components/PaymentDetails/AddPaymentDetail'
import AddNominee from '@/components/Nominees/AddNominee'

export default {
  data() {
    return {
      e1: 0
    };
  },
  name: "RegistrationStepper",
  props: {
    msg: String
  },
  components: {
    BasicDetails,
    AddAddress,
    AddPaymentDetails,
    AddNominee,
  },
  methods: {
    next(next) {
      this.e1 = next
      this.$store.commit('setStepperStatus', true)
    }
  }
};
</script>