<template>
  <v-container>
    <v-card>
      <v-card-title>All Issuing Statuses
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
        :items="issuingStatuses"
        :loading="dataLoading"
        :search="search"
        hide-actions
        class="elevation-1"
      >
        <v-progress-linear slot="progress" color="blue" indeterminate/>
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.loanIssuingStatusId }}</td>
          <td class="text-xs-left">
            <v-edit-dialog
              :return-value.sync="props.item.loanIssuingStatus"
              lazy
              @save="save(props.item)"
              @cancel="cancel"
            >
              {{ props.item.loanIssuingStatus }}
              <v-text-field
                slot="input"
                v-model="props.item.loanIssuingStatus"
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
import issuingStatusMixin from "@/components/administrators/mixins/issuingStatuses";
import SaccoAPI from "@/api";
import queryString from "querystring";
import Parsers from "@/helpers/parsers";
import bugsnagClient from "@/helpers/errorreporting";

export default {
  name: `IssuingStatusesList`,
  data() {
    return {
      moment,
      dataLoading: true,
      search: ``,
      max15chars: v => v.length <= 15 || "Input too long!",
      headers: [
        {
          text: "Issuing Status ID",
          value: "loanIssuingStatusId"
        },
        {
          text: "Issuing Status",
          value: "loanIssuingStatus"
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
  mixins: [issuingStatusMixin],
  methods: {
    stopLoading() {
      this.dataLoading = false;
    },
    save(issuingStatus) {
      if (this.$can(`update`, `MaritalStatus`)) {
        let updateData = Parsers.prepareDataObject({
          loan_issuing_status: issuingStatus.loanIssuingStatus
        });

        SaccoAPI.put(
          `/loans/issuingstatuses/${issuingStatus.loanIssuingStatusId}`,
          queryString.stringify(updateData)
        )
          .then(() => {
            this.$store.commit(`setSnackbar`, {
              msg: `Issuing Status updated!`,
              type: `success`
            });
          })
          .catch(error => {
            bugsnagClient.notify(error);
            this.$store.commit(`setSnackbar`, {
              msg: `Failed to update issuing status!`,
              type: `error`
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to edit issuing statuses`,
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
    deleteItem(issuingStatus) {
      if (this.$can("delete", "MaritalStatus")) {
        const index = this.issuingStatuses.indexOf(issuingStatus);
        if (confirm("Are you sure you want to delete this issuing status?")) {
          SaccoAPI.delete(
            `/loans/issuingstatuses/${issuingStatus.loanIssuingStatusId}`
          )
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
                msg: `Failed to delete issuing status!`,
                type: `error`
              });
            });
        }
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to delete issuing status`,
          type: `warning`
        });
      }
    }
  }
};
</script>
