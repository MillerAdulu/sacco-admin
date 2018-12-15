<template>
  <v-container>
    <v-card>
      <v-card-title>All Loan Types
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
        :items="loanTypes"
        :loading="dataLoading"
        :search="search"
        hide-actions
        class="elevation-1"
      >
        <v-progress-linear slot="progress" color="blue" indeterminate/>
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.loanTypeId }}</td>
          <td class="text-xs-left">
            <v-edit-dialog
              :return-value.sync="props.item.loanTypeName"
              lazy
              @save="save(props.item)"
              @cancel="cancel"
            >
              {{ props.item.loanTypeName }}
              <v-text-field
                slot="input"
                v-model="props.item.loanTypeName"
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
import loanTypeMixin from "@/components/administrators/mixins/loanTypes";
import SaccoAPI from "@/api";
import queryString from "querystring";
import Parsers from "@/helpers/parsers";
import bugsnagClient from "@/helpers/errorreporting";

export default {
  name: `LoanTypesList`,
  data() {
    return {
      moment,
      dataLoading: true,
      search: ``,
      max15chars: v => v.length <= 15 || "Input too long!",
      headers: [
        {
          text: "Loan Type ID",
          value: "loanTypeId"
        },
        {
          text: "Loan Type",
          value: "loanTypeName"
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
  mixins: [loanTypeMixin],
  methods: {
    stopLoading() {
      this.dataLoading = false;
    },
    save(loanType) {
      if (this.$can(`update`, `LoanType`)) {
        let updateData = Parsers.prepareDataObject({
          loan_type_name: loanType.loanTypeName
        });

        SaccoAPI.put(
          `/loans/types/${loanType.loanTypeId}`,
          queryString.stringify(updateData)
        )
          .then(() => {
            this.$store.commit(`setSnackbar`, {
              msg: `Loan type updated!`,
              type: `success`,
              model: true
            });
          })
          .catch(error => {
            bugsnagClient.notify(error);
            this.$store.commit(`setSnackbar`, {
              msg: `Failed to update loan type!`,
              type: `error`,
              model: true
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to edit loan types`,
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
    deleteItem(loanType) {
      if (this.$can("delete", "LoanType")) {
        const index = this.loanTypes.indexOf(loanType);
        if (confirm("Are you sure you want to delete this loan type?")) {
          SaccoAPI.delete(`/loans/types/${loanType.loanTypeId}`)
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
                msg: `Failed to delete loan type!`,
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
  },
  created() {
      this.getLoanTypes();
  }
  
};
</script>
