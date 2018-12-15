<template>
  <v-container>
    <v-card>
      <v-card-title>All Post Offices
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
        :items="postOffices"
        :loading="dataLoading"
        :search="search"
        hide-actions
        class="elevation-1"
      >
        <v-progress-linear slot="progress" color="blue" indeterminate/>

        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.postOfficeId }}</td>
          <td class="text-xs-left">
            <v-edit-dialog
              :return-value.sync="props.item.postOfficeCode"
              lazy
              @save="save(props.item)"
              @cancel="cancel"
            >
              {{ props.item.postOfficeCode }}
              <v-text-field
                slot="input"
                v-model="props.item.postOfficeCode"
                :rules="[max15chars]"
                label="Edit"
                single-line
                counter
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class="text-xs-left">
            <v-edit-dialog
              :return-value.sync="props.item.postOfficeName"
              lazy
              @save="save(props.item)"
              @cancel="cancel"
            >
              {{ props.item.postOfficeName }}
              <v-text-field
                slot="input"
                v-model="props.item.postOfficeName"
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
import postofficesMixin from "@/components/administrators/mixins/postoffices";
import SaccoAPI from "@/api";
import queryString from "querystring";
import Parsers from "@/helpers/parsers";
import bugsnagClient from "@/helpers/errorreporting";

export default {
  name: `PostOfficeList`,
  data() {
    return {
      moment,
      dataLoading: true,
      search: ``,
      max15chars: v => v.length <= 15 || "Input too long!",
      headers: [
        {
          text: "Post Office ID",
          value: "postOfficeId"
        },
        {
          text: "Post Office Code",
          value: "postOfficeCode"
        },
        {
          text: "Post Office Name",
          value: "postOfficeName"
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
  mixins: [postofficesMixin],
  methods: {
    save(postOffice) {
      if (this.$can(`update`, `PostOffice`)) {
        let updateData = Parsers.prepareDataObject({
          post_office_code: postOffice.postOfficeCode,
          post_office_name: postOffice.postOfficeName,
        });
        
        SaccoAPI.put(
          `/postoffices/${postOffice.postOfficeId}`,
          queryString.stringify(updateData)
        )
          .then(() => {
            this.$store.commit(`setSnackbar`, {
              msg: `Post Office updated!`,
              type: `success`,
              model: true
            });
          })
          .catch(error => {
            bugsnagClient.notify(error);
            this.$store.commit(`setSnackbar`, {
              msg: `Failed to update post office!`,
              type: `error`,
              model: true
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to edit post offices`,
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
    deleteItem(postOffice) {
      if (this.$can("delete", "PostOffice")) {
        const index = this.postOffices.indexOf(postOffice);
        if (confirm("Are you sure you want to delete this post office?")) {
          SaccoAPI.delete(`/postoffices/${postOffice.postOfficeId}`)
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
                msg: `Failed to delete post office!`,
                type: `error`,
                model: true
              });
            });
        }
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to delete post offices`,
          type: `warning`,
          model: true
        });
      }
    },
    stopLoading() {
      this.dataLoading = false;
    }
  },
  created() {
    this.getPostOffices();
  }
};
</script>
