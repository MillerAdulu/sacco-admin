<template>
  <v-container>
    <v-card>
      <v-card-title>All Repayment Statuses
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
        :items="repaymentStatuses"
        :loading="dataLoading"
        :search="search"
        hide-actions
        class="elevation-1"
      >
        <v-progress-linear slot="progress" color="blue" indeterminate/>
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.loanRepaymentStatusId }}</td>
          <td class="text-xs-left">
            <v-edit-dialog
              :return-value.sync="props.item.loanRepaymentStatus"
              lazy
              @save="save(props.item)"
              @cancel="cancel"
            >
              {{ props.item.loanRepaymentStatus }}
              <v-text-field
                slot="input"
                v-model="props.item.loanRepaymentStatus"
                :rules="[max15chars]"
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
import repaymentStatusMixin from "@/components/administrators/mixins/repaymentStatuses";
import SaccoAPI from "@/api";
import queryString from "querystring";
import Parsers from "@/helpers/parsers";
import bugsnagClient from "@/helpers/errorreporting";

export default {
  name: `RepaymentStatusesList`,
  data() {
    return {
      moment,
      dataLoading: true,
      search: ``,
      max15chars: v => v.length <= 15 || "Input too long!",
      headers: [
        {
          text: "Repayment Status ID",
          value: "loanRepaymentStatusId"
        },
        {
          text: "Repayment Status",
          value: "loanRepaymentStatus"
        },
        {
          text: "Added On",
          value: "createdAt"
        },
        {
          text: 'Actions',
        }
      ]
    };
  },
  mixins: [repaymentStatusMixin],
  methods: {
    stopLoading() {
      this.dataLoading = false;
    },
    save(repaymentStatus) {
      if (this.$can(`update`, `MaritalStatus`)) {
        let updateData = Parsers.prepareDataObject({
          loan_repayment_status: repaymentStatus.loanRepaymentStatus
        });

        SaccoAPI.put(
          `/loans/repaymentstatuses/${repaymentStatus.loanRepaymentStatusId}`,
          queryString.stringify(updateData)
        )
          .then(() => {
            this.$store.commit(`setSnackbar`, {
              msg: `Repayment Status updated!`,
              type: `success`,
              model: true
            });
          })
          .catch(error => {
            bugsnagClient.notify(error);
            this.$store.commit(`setSnackbar`, {
              msg: `Failed to update repayment status!`,
              type: `error`,
              model: true
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to edit repayment statuses`,
          type: `error`,
          model: true
        });
      }
    },
    cancel() {
      this.$store.commit(`setSnackbar`, {
        msg: `Aborted`,
        type: `error`,
        model: true
      });
    },
    deleteItem(repaymentStatus) {
      if (this.$can("delete", "MaritalStatus")) {
        const index = this.repaymentStatuses.indexOf(repaymentStatus);
        if (confirm("Are you sure you want to delete this repayment status?")) {
          SaccoAPI.delete(`/loans/repaymentstatuses/${repaymentStatus.loanRepaymentStatusId}`)
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
                msg: `Failed to delete repayment status!`,
                type: `error`,
                model: true
              });
            });
        }
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to delete repayment status`,
          type: `warning`,
          model: true
        });
      }
    },
  }
};
</script>
