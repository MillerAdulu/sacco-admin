<template>
  <v-container>
    <v-card>
      <v-card-title>All Constituencies
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
        :items="constituencies"
        :loading="dataLoading"
        :search="search"
        hide-actions
        class="elevation-1"
      >
        <v-progress-linear slot="progress" color="blue" indeterminate/>
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.constituencyId }}</td>
          <td class="text-xs-left">
            <v-edit-dialog
              :return-value.sync="props.item.constituencyName"
              lazy
              @save="save(props.item)"
              @cancel="cancel"
            >
              {{ props.item.constituencyName }}
              <v-text-field
                slot="input"
                v-model="props.item.constituencyName"
                :rules="[max15chars]"
                label="Edit"
                single-line
                counter
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class="text-xs-left">
            <v-edit-dialog
              :return-value.sync="props.item.county.countyId"
              lazy
              @save="save(props.item)"
              @cancel="cancel"
            >
              {{ props.item.county.countyName }}
              <v-autocomplete
                slot="input"
                @change="save(props.item)"
                item-text="countyName"
                item-value="countyId"
                :items="counties"
                label="Select a county"
                v-model="props.item.county.countyId"
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
import constituenciesMixin from "@/components/administrators/mixins/constituencies";
import SaccoAPI from "@/api";
import queryString from "querystring";
import Parsers from "@/helpers/parsers";
import bugsnagClient from "@/helpers/errorreporting";
import countiesMixin from "@/components/administrators/mixins/counties";

export default {
  name: `ConstituencyList`,
  data() {
    return {
      moment,
      dataLoading: true,
      search: ``,
      headers: [
        {
          text: "Constituency ID",
          value: "constituencyId"
        },
        {
          text: "Constituency Name",
          value: "constituencyName"
        },
        {
          text: "County",
          value: "county.countyName"
        },
        {
          text: "Added On",
          value: "createdAt"
        },
        {
          text: "Actions"
        }
      ],
      max15chars: v => v.length <= 15 || "Input too long!"
    };
  },
  mixins: [constituenciesMixin, countiesMixin],
  methods: {
    stopLoading() {
      this.dataLoading = false;
    },
    save(constituency) {
      if (this.$can(`update`, `Constituency`)) {
        let updateData = Parsers.prepareDataObject({
          county_id: constituency.county.countyId,
          constituency_name: constituency.constituencyName
        });

        SaccoAPI.put(
          `/constituencies/${constituency.constituencyId}`,
          queryString.stringify(updateData)
        )
          .then(() => {
            this.$store.commit(`setSnackbar`, {
              msg: `Constituency updated!`,
              type: `success`
            });
          })
          .catch(error => {
            bugsnagClient.notify(error);
            this.$store.commit(`setSnackbar`, {
              msg: `Failed to update constituency!`,
              type: `error`
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to edit constituencies`,
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
    deleteItem(constituency) {
      if (this.$can("delete", "Constituency")) {
        const index = this.constituencies.indexOf(constituency);
        if (confirm("Are you sure you want to delete this constituency?")) {
          SaccoAPI.delete(`/constituencies/${constituency.constituencyId}`)
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
                msg: `Failed to delete constituency!`,
                type: `error`
              });
            });
        }
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to delete post offices`,
          type: `warning`
        });
      }
    }
  },
  created() {
    this.getConstituencies();
    this.getCounties();
  }
};
</script>
