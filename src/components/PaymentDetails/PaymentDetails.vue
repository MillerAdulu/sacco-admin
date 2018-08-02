<template>
  <div>
    <v-layout row v-for="paymentdetail in paymentdetails" :key="paymentdetails.indexOf(paymentdetail)">
      <v-flex xs12>
        <p>PaymentMethod: {{ paymentdetail.paymentMethodName }}</p>
        <div v-if="paymentdetail.paymentMethodId == 1">
        <p>Bank Name: {{ paymentdetail.bankName }}</p>
        <p>Bank Account: {{ paymentdetail.bankAccountNumber }}</p>
        <p>Card: {{ paymentdetail.cardNumber }}</p>
        </div>
        <div v-if="paymentdetail.paymentMethodId == 2">
          <p>Service Provider: {{ paymentdetail.serviceProvider }}</p>
          <p>Phone Number: {{ paymentdetail.phoneNumber }}</p>
        </div>
        <v-divider />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  },
  props: {
    paymentdetails: Array
  }
}
</script>
