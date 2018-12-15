<template>
  <v-container>
    <v-card>
      <v-card-title>All Payment Methods
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
        <v-progress-linear slot="progress" color="blue" indeterminate/>
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.paymentMethodId }}</td>
          <td class="text-xs-left">{{ props.item.paymentMethod }}</td>
          <td
            class="text-xs-left"
          >{{ moment(props.item.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</td>
          <td class="justify-center">
            <v-icon medium @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <base-snackbar/>
  </v-container>
</template>

<script>
import moment from "moment";
import fetchPaymentMethodsMixin from "@/components/administrators/mixins/paymentMethods";
import SaccoAPI from "@/api";
import queryString from "querystring";
import Parsers from "@/helpers/parsers";
import bugsnagClient from "@/helpers/errorreporting";

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
          value: "paymentMethodId"
        },
        {
          text: "Payment Method",
          value: "paymentMethod"
        },
        {
          text: "Added On",
          value: "createdAt"
        },
        {
          text: "Actions"
        }
      ]
    };
  },
  mixins: [fetchPaymentMethodsMixin],
  methods: {deleteItem(paymentMethod) {
      if (this.$can("delete", "PaymentMethod")) {
        const index = this.paymentMethods.indexOf(paymentMethod);
        if (confirm("Are you sure you want to delete this payment method?")) {
          SaccoAPI.delete(`/paymentmethods/${paymentMethod.paymentMethodId}`)
            .then(() => {
              this.$store.commit(`setSnackbar`, {
                msg: `Deleted`,
                type: `info`,
                model: true
              });
              this.desserts.splice(index, 1);
            })
            .catch(error => {
              
              bugsnagClient.notify(error);
              this.$store.commit(`setSnackbar`, {
                msg: `Failed to delete payment method!`,
                type: `error`,
                model: true
              });
            });
        }
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to delete payment methods`,
          type: `warning`,
          model: true
        });
      }
    },
    stopLoading() {
      this.dataLoading = false;
    }
  }
};
</script>
