<template>
  <v-container>
    <v-card>
      <v-card-title>All Marital Statuses
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
        :items="maritalStatuses"
        :loading="dataLoading"
        :search="search"
        hide-actions
        class="elevation-1"
      >
        <v-progress-linear slot="progress" color="blue" indeterminate/>
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.maritalStatusId }}</td>
          <td class="text-xs-left">
            <v-edit-dialog
              :return-value.sync="props.item.maritalStatus"
              lazy
              @save="save(props.item)"
              @cancel="cancel"
            >
              {{ props.item.maritalStatus }}
              <v-text-field
                slot="input"
                v-model="props.item.maritalStatus"
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
import maritalStatusMixin from "@/components/administrators/mixins/maritalStatuses";
import SaccoAPI from "@/api";
import queryString from "querystring";
import Parsers from "@/helpers/parsers";
import bugsnagClient from "@/helpers/errorreporting";

export default {
  name: `MaritalStatusesList`,
  data() {
    return {
      moment,
      dataLoading: true,
      search: ``,
      max15chars: v => v.length <= 15 || "Input too long!",
      headers: [
        {
          text: "Marital Status ID",
          value: "maritalStatusId"
        },
        {
          text: "Marital Status",
          value: "maritalStatus"
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
  mixins: [maritalStatusMixin],
  methods: {
    stopLoading() {
      this.dataLoading = false;
    },
    save(maritalStatus) {
      if (this.$can(`update`, `MaritalStatus`)) {
        let updateData = Parsers.prepareDataObject({
          marital_status: maritalStatus.maritalStatus
        });

        SaccoAPI.put(
          `/maritalstatuses/${maritalStatus.maritalStatusId}`,
          queryString.stringify(updateData)
        )
          .then(() => {
            this.$store.commit(`setSnackbar`, {
              msg: `Marital Status updated!`,
              type: `success`,
              model: true
            });
          })
          .catch(error => {
            bugsnagClient.notify(error);
            this.$store.commit(`setSnackbar`, {
              msg: `Failed to update marital status!`,
              type: `error`,
              model: true
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to edit marital statuses`,
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
    deleteItem(maritalStatus) {
      if (this.$can("delete", "MaritalStatus")) {
        const index = this.maritalStatuses.indexOf(maritalStatus);
        if (confirm("Are you sure you want to delete this maritalStatus?")) {
          SaccoAPI.delete(`/maritalstatuses/${maritalStatus.maritalStatusId}`)
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
                msg: `Failed to delete marital status!`,
                type: `error`,
                model: true
              });
            });
        }
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to delete marital status`,
          type: `warning`,
          model: true
        });
      }
    },
  }
};
</script>
