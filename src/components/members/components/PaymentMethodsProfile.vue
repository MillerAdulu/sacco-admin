<template>
  <v-data-iterator
      :items="paymentmethods"
      :rows-per-page-items="rowsPerPageItems"
      content-tag="v-layout"
      row
      wrap
  >
    <v-flex
        slot="item"
        slot-scope="props"
        xs12
        md6
        lg6
        xl6
    >
      <v-card>
        <v-card-title><h4>Payment Method: {{ props.item.paymentMethodName }}</h4></v-card-title>
        <v-divider />
        <v-list dense>
          <v-list-tile v-if="props.item.bankName">
            <v-list-tile-content >Bank Name:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.bankName }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="props.item.bankAccountNumber">
            <v-list-tile-content >Bank Account:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.bankAccountNumber }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="props.item.cardNumber">
            <v-list-tile-content >Bank Card Number:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.cardNumber }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="props.item.serviceProvider">
            <v-list-tile-content >Service Provider:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.serviceProvider }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="props.item.phoneNumber">
            <v-list-tile-content>Phone Number:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.phoneNumber }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-data-iterator>
</template>

<script>
  import SaccoAPI from '@/api'
  import bugsnagClient from '@/helpers/errorreporting'
  export default {
    data() {
      return {
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 3
        },
        paymentmethods: [],
      }
    },
    methods: {
      fetchPaymentMethods() {
        // if (this.$can(`read`, `PaymentMethods`)) {
        SaccoAPI.get(`/paymentdetails/members/${this.$store.getters.loggedInUser.member.memberId}`)
          .then(response => {
            this.paymentmethods = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error)

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to load payment details at this time`,
              type: `error`,
              model: true
            });
          });
        // } else {
        //   this.$store.commit(`setSnackbar`, {
        //     msg: `You don't have permissions to view payment details`,
        //     type: `error`,
        //     model: true
        //   });
        // }
      },
    },
    created() {
      this.fetchPaymentMethods();
    }
  }
</script>
      