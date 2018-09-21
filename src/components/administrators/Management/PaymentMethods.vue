<template>
  <v-container>
  <v-data-table
    :headers="headers"
    :items="paymentMethods"
    :loading="dataLoading"
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
