<template>

  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Basic Details</v-stepper-step>
      <v-divider/>
      <v-stepper-step :complete="e1 > 2" step="2">Address(es)</v-stepper-step>
      <v-divider/>
      <v-stepper-step :complete="e1 > 3" step="3">Payment Details</v-stepper-step>
      <v-divider/>
      <v-stepper-step :complete="e1 > 4" step="4">Passport Photo</v-stepper-step>
      <v-divider/>
      <v-stepper-step step="5">Nominees</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <BasicDetailsCapture />
        <v-btn
            color="primary"
            @click="next(2)"
            :disabled="this.$store.getters.stepperContinueEnabled">
          Continue
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">

        <AddressDetailsCapture />

        <v-btn
            color="primary"
            @click="next(3)"
            :disabled="this.$store.getters.stepperContinueEnabled">
          Continue
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">

        <PaymentDetailsCapture />

        <v-btn
            color="primary"
            @click="next(4)"
            :disabled="this.$store.getters.stepperContinueEnabled">
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">

        <UploadPassportPhoto />

        <v-btn
            color="primary"
            @click="next(5)"
            :disabled="this.$store.getters.stepperContinueEnabled">
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="5">

        <NomineeDetailsCapture />

        <v-btn
            color="primary"
            :to='{name: `Member`, params: {
            memberId: this.$store.getters.newMemberRecordKey }
            }'
            :disabled="this.$store.getters.stepperContinueEnabled">
          Finish
        </v-btn>

        <v-btn
            color="green"
            to="/admin/register"
            :disabled="this.$store.getters.stepperContinueEnabled">
          Add New Member
        </v-btn>

      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import BasicDetailsCapture from '@/components/administrators/Member/BasicDetailsCapture'
  import AddressDetailsCapture from '@/components/administrators/AddressDetails/AddressDetailsCapture'
  import PaymentDetailsCapture from '@/components/administrators/PaymentDetails/PaymentDetailsCapture'
  import NomineeDetailsCapture from '@/components/administrators/Nominees/NomineeDetailsCapture'
  import UploadPassportPhoto from '@/components/administrators/Member/UploadPassportPhoto'

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
      BasicDetailsCapture,
      AddressDetailsCapture,
      PaymentDetailsCapture,
      NomineeDetailsCapture,
      UploadPassportPhoto
    },
    methods: {
      next(next) {
        this.e1 = next
        this.$store.commit('setStepperStatus', true)
      }
    }
  };
</script>