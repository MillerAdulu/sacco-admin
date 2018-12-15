<template>
  <v-container>
    <v-card>
      <v-card-title>All Localities
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
        :items="localities"
        :loading="dataLoading"
        :search="search"
        hide-actions
        class="elevation-1"
      >
        <v-progress-linear slot="progress" color="blue" indeterminate/>

        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.localityId }}</td>
          <td class="text-xs-left">
            <v-edit-dialog
              :return-value.sync="props.item.localityName"
              lazy
              @save="save(props.item)"
              @cancel="cancel"
            >
              {{ props.item.localityName }}
              <v-text-field
                slot="input"
                v-model="props.item.localityName"
                :rules="[max15chars]"
                label="Edit"
                single-line
                counter
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class="text-xs-left">
            <v-edit-dialog
              :return-value.sync="props.item.constituency.constituencyId"
              lazy
              @save="save(props.item)"
              @cancel="cancel"
            >
              {{ props.item.constituency.constituencyName }}
              <v-autocomplete
                slot="input"
                @change="save(props.item)"
                item-text="constituencyName"
                item-value="constituencyId"
                :items="constituencies"
                label="Select a constituency"
                v-model="props.item.constituency.constituencyId"
              />
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
import localitiesMixin from "@/components/administrators/mixins/localities";
import SaccoAPI from "@/api";
import queryString from "querystring";
import Parsers from "@/helpers/parsers";
import bugsnagClient from "@/helpers/errorreporting";
import counstituenciesMixin from "@/components/administrators/mixins/constituencies";

export default {
  name: `LocalityList`,
  data() {
    return {
      moment,
      dataLoading: true,
      search: ``,
      max15chars: v => v.length <= 15 || "Input too long!",
      headers: [
        {
          text: "Locality ID",
          value: "localityId"
        },
        {
          text: "Locality Name",
          value: "localityName"
        },
        {
          text: "Constituency",
          value: "constituency.constituencyName"
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
  mixins: [localitiesMixin, counstituenciesMixin],
  methods: {
    save(locality) {
      if (this.$can(`update`, `Locality`)) {
        let updateData = Parsers.prepareDataObject({
          constituency_id: locality.constituency.constituencyId,
          locality_name: locality.localityName
        });

        SaccoAPI.put(
          `/localities/${locality.localityId}`,
          queryString.stringify(updateData)
        )
          .then(() => {
            this.$store.commit(`setSnackbar`, {
              msg: `Locality updated!`,
              type: `success`,
              model: true
            });
          })
          .catch(error => {
            bugsnagClient.notify(error);
            this.$store.commit(`setSnackbar`, {
              msg: `Failed to update locality!`,
              type: `error`,
              model: true
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to edit localities`,
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
    stopLoading() {
      this.dataLoading = false;
    },
    deleteItem(locality) {
      if (this.$can("delete", "Locality")) {
        const index = this.localities.indexOf(locality);
        if (confirm("Are you sure you want to delete this locality?")) {
          SaccoAPI.delete(`/localities/${locality.localityId}`)
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
                msg: `Failed to delete locality!`,
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
  },
  created() {
    this.getLocalities();
    this.getConstituencies();
  }
};
</script>
