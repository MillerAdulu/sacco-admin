<template>
  <v-form>
    <v-card>
      <v-card-title>Payment Method</v-card-title>
      <v-card-text>
        <v-autocomplete
            item-text="paymentMethod"
            item-value="paymentMethodId"
            :items="paymentMethods"
            v-model="paymentMethod"
            label="Payment Method"
            @input="displayMethodForm(paymentMethod)"
        />
      </v-card-text>

      <v-card-text v-if="viewBank">
        <v-text-field
            label="Bank Name"
            v-model="bankName"/>

        <v-text-field
            label="Bank Account Number"
            v-model="bankAccountNumber"/>

        <v-text-field
            label="Bank Card Number"
            v-model="bankCardNumber"/>
      </v-card-text>
      <v-card-text v-if="viewPhone">
        <v-text-field
            label="Service Provider"
            v-model="provider"
        />

        <v-text-field
            label="Phone Number"
            v-model="phoneNumber"
        />
      </v-card-text>
      <v-card-text>
      </v-card-text>
    </v-card>
    <v-layout>
      <v-btn color="button" :loading="btnLoading" @click="addPaymentDetails">Add Payment Details</v-btn>
      <v-btn color="error" @click="clearPaymentDetails">Clear Payment Details</v-btn>
    </v-layout>

    <base-snackbar />

  </v-form>

</template>

<script>

  import bugsnagClient from '@/helpers/errorreporting'
  import SaccoAPI from '@/api'
  import Parsers from "../../../helpers/parsers";

  import queryString from "querystring";

  export default {
    name: `PaymentMethodsCaputure`,
    data() {
      return {
        success: ``,
        paymentMethod: null,
        paymentMethods: [],
        bankName: null,
        bankAccountNumber: null,
        bankCardNumber: null,
        provider: null,
        phoneNumber: null,
        viewBank: false,
        viewPhone: false,
        btnLoading: false,
      };
    },
    methods: {
      displayMethodForm(method) {
        if (method === 1) {
          this.viewBank = true;
          this.viewPhone = false;
        }

        if (method === 2) {
          this.viewPhone = true;
          this.viewBank = false;
        }
      },
      async addPaymentDetails() {
        if (this.$can(`create`, `PaymentMethod`)) {

        this.startLoading()

        let paymentDetails = await Parsers.prepareDataObject({
          payment_method_id: this.paymentMethod,
          member_id: this.$store.getters.newMemberRecordKey,
          bank_name: this.bankName,
          bank_account_number: this.bankAccountNumber,
          card_number: this.bankCardNumber,
          provider: this.provider,
          phone_number: this.phoneNumber
        });
        SaccoAPI.post("paymentdetails", queryString.stringify(paymentDetails))
          .then(() => {
            this.$store.commit("setStepperStatus", false);
            this.clearPaymentDetails();
            this.$store.commit(`setSnackbar`, {
              msg: `Added! You can add other payment details`,
              type: `success`,
              model: true
            });

            this.stopLoading()

          })
          .catch(error => {
            bugsnagClient.notify(error)

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to add payment details at this time`,
              type: `error`,
              model: true
            });

            this.stopLoading()

          });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to add payment details`,
            type: `error`,
            model: true
          });
        }
      },

      clearPaymentDetails() {
        (this.paymentMethod = null), (this.bankName = null);
        this.bankAccountNumber = null;
        this.bankCardNumber = null;
        this.provider = null;
        this.phoneNumber = null;
      },

      getPaymentMethods() {
        if (this.$can(`read`, `PaymentMethod`)) {
        SaccoAPI.get("paymentmethods")
          .then(response => {
            this.paymentMethods = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error)

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch payment methods at this time`,
              type: `error`,
              model: true
            });
          });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to view payment methods`,
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
      this.getPaymentMethods();
    }
  };
</script>

