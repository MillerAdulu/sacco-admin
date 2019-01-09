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
          <td class="text-xs-left">
            <v-edit-dialog
              :return-value.sync="props.item.paymentMethod"
              lazy
              @save="save(props.item)"
              @cancel="cancel"
            >
              {{ props.item.paymentMethod }}
              <v-text-field
                slot="input"
                v-model="props.item.paymentMethod"
                :rules="[max10chars]"
                label="Edit"
                single-line
                counter
              ></v-text-field>
            </v-edit-dialog>
          </td>
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
      max10chars: v => v.length <= 10 || "Input too long!",
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
  methods: {
    save(paymentMethod) {
      if (this.$can(`update`, `PaymentMethod`)) {
        let updateData = Parsers.prepareDataObject({
          payment_method_name: paymentMethod.paymentMethod
        });

        SaccoAPI.put(
          `/paymentmethods/${paymentMethod.paymentMethodId}`,
          queryString.stringify(updateData)
        )
          .then(() => {
            this.$store.commit(`setSnackbar`, {
              msg: `Payment method updated!`,
              type: `success`
            });
          })
          .catch(error => {
            bugsnagClient.notify(error);
            this.$store.commit(`setSnackbar`, {
              msg: `Failed to update payment method!`,
              type: `error`
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to edit payment methods`,
          type: `error`
        });
      }
    },
    cancel() {
      this.$store.commit(`setSnackbar`, {
        msg: `Aborted`,
        type: `error`
      });
    },
    deleteItem(paymentMethod) {
      if (this.$can("delete", "PaymentMethod")) {
        const index = this.paymentMethods.indexOf(paymentMethod);
        if (confirm("Are you sure you want to delete this payment method?")) {
          SaccoAPI.delete(`/paymentmethods/${paymentMethod.paymentMethodId}`)
            .then(() => {
              this.$store.commit(`setSnackbar`, {
                msg: `Deleted`,
                type: `info`
              });
              this.desserts.splice(index, 1);
            })
            .catch(error => {
              bugsnagClient.notify(error);
              this.$store.commit(`setSnackbar`, {
                msg: `Failed to delete payment method!`,
                type: `error`
              });
            });
        }
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to delete payment methods`,
          type: `warning`
        });
      }
    },
    stopLoading() {
      this.dataLoading = false;
    }
  }
};
</script>
