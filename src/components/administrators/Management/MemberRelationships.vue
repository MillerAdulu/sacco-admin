<template>
  <v-container>
    <v-card>
      <v-card-title>All Member Relationships
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
        :items="relationships"
        :loading="dataLoading"
        :search="search"
        hide-actions
        class="elevation-1"
      >
        <v-progress-linear slot="progress" color="blue" indeterminate/>
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.relationshipId }}</td>
          <td class="text-xs-left">
            <v-edit-dialog
              :return-value.sync="props.item.relationshipName"
              lazy
              @save="save(props.item)"
              @cancel="cancel"
            >
              {{ props.item.relationshipName }}
              <v-text-field
                slot="input"
                v-model="props.item.relationshipName"
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
import fetchMemberRelationshipsMixin from "@/components/administrators/mixins/memberrelationships";
import SaccoAPI from "@/api";
import queryString from "querystring";
import Parsers from "@/helpers/parsers";
import bugsnagClient from "@/helpers/errorreporting";

export default {
  name: `ConstituencyList`,
  data() {
    return {
      moment,
      dataLoading: true,
      search: ``,
      max15chars: v => v.length <= 15 || "Input too long!",
      headers: [
        {
          text: "Relationship ID",
          value: "relationshipId"
        },
        {
          text: "Relationship",
          value: "relationshipName"
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
  mixins: [fetchMemberRelationshipsMixin],
  methods: {
    save(memberRelationship) {
      if (this.$can(`update`, `Relationship`)) {
        let updateData = Parsers.prepareDataObject({
          relationship_name: memberRelationship.relationshipName
        });

        SaccoAPI.put(
          `/relationships/${memberRelationship.relationshipId}`,
          queryString.stringify(updateData)
        )
          .then(() => {
            this.$store.commit(`setSnackbar`, {
              msg: `Member Relationship updated!`,
              type: `success`
            });
          })
          .catch(error => {
            bugsnagClient.notify(error);
            this.$store.commit(`setSnackbar`, {
              msg: `Failed to update member relationship!`,
              type: `error`
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to edit member relationships`,
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
    deleteItem(relationship) {
      if (this.$can("delete", "Relationship")) {
        const index = this.relationships.indexOf(relationship);
        if (confirm("Are you sure you want to delete this relationship?")) {
          SaccoAPI.delete(`/relationships/${relationship.relationshipId}`)
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
                msg: `Failed to delete relationship!`,
                type: `error`
              });
            });
        }
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to delete relationships`,
          type: `warning`
        });
      }
    },
    stopLoading() {
      this.dataLoading = false;
    }
  },
  created() {
    this.getRelationships();
  }
};
</script>
