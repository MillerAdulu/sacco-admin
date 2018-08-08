<template>
  <v-container>
    <v-form>
      <v-card>
        <v-card-title>Payment Method</v-card-title>
        <v-card-text>
          <v-autocomplete
          item-text="paymentMethod"
          item-value="paymentMethodId"
          :items="paymentMethods"
          v-model="paymentMethod"
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
        <v-flex x12>
          <v-btn block color="success" @click="addPaymentDetail">Add Payment Details</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import HTTP from '../../config'
import Parsers from '../../parsers'

import queryString from 'querystring'

export default {
  data() {
    return {
      paymentMethod: null,
      paymentMethods: [],
      bankName: null,
      bankAccountNumber: null,
      bankCardNumber: null,
      provider:null,
      phoneNumber: null,
      viewBank: false,
      viewPhone: false,
    }
  },
  methods: {
    displayMethodForm(method) {
      if(method === 1) {
        this.viewBank = true
        this.viewPhone = false
      }

      if(method === 2) {
        this.viewPhone = true
        this.viewBank = false
        }
    },
    async addPaymentDetail() {
      let paymentDetails = await  Parsers.prepareDataObject({
        payment_method_id: this.paymentMethod,
        member_id: this.$store.getters.memberId,
        bank_name: this.bankName,
        bank_account_number: this.bankAccountNumber,
        card_number: this.bankCardNumber,
        provider: this.provider,
        phone_number: this.phoneNumber
      })
      HTTP.post(
        "paymentdetails",
        queryString.stringify(paymentDetails)
        )
        .then(response => {
          console.log(response)
          this.$store.commit('setStepperStatus', false)
        })
        .catch(error => {
          console.log(error)
        })
    },

    getPaymentMethods() {
      HTTP.get("paymentmethods")
    .then(response => {
      this.paymentMethods = response.data
    })
    .catch(error => {
      console.log(error)
    })
    }
  },
  created() {
    this.getPaymentMethods()
  }
}
</script>

