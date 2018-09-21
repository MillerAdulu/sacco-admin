<template>
  <v-container>
    <v-card>
      <v-card-title>
        All Payment Methods
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
        />
      </v-card-title>
  <v-data-table
    :headers="headers"
    :items="paymentMethods"
    :loading="dataLoading"
    :search="search"
    hide-actions
    class="elevation-1"
  >
  <v-progress-linear slot="progress" color="blue" indeterminate />
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.paymentMethodId }}</td>
      <td class="text-xs-left">{{ props.item.paymentMethod }}</td>
      <td class="text-xs-left">{{ moment(props.item.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</td>
    </template>
  </v-data-table>
    </v-card>
    <base-snackbar />
  </v-container>
</template>

<script>
import moment from "moment";
import fetchPaymentMethodsMixin from '@/components/administrators/mixins/paymentMethods'

export default {
  name: `PaymentMethodsList`,
  data() {
    return {
      moment,
      dataLoading: true,
      search: ``,
      headers: [
        {
          text: "Payment Method ID",
          value: "paymentMethodId",
        },
        {
          text: "Payment Method",
          value: "paymentMethod",
        },
        {
          text: "Added On",
          value: "createdAt",
        },
      ]
    };
  },
  mixins: [fetchPaymentMethodsMixin],
  methods: {
    stopLoading() {
      this.dataLoading = false
    }
  }
};
</script>