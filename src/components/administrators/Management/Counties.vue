<template>
  <v-container>
    <v-card>
      <v-card-title>All Counties
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
        :items="counties"
        :loading="dataLoading"
        :search="search"
        hide-actions
        class="elevation-1"
      >
        <v-progress-linear slot="progress" color="blue" indeterminate/>
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">
            <v-edit-dialog
              :return-value.sync="props.item.countyCode"
              lazy
              @save="save(props.item)"
              @cancel="cancel"
            >
              {{ props.item.countyCode }}
              <v-text-field
                slot="input"
                v-model="props.item.countyCode"
                :rules="[max3chars]"
                label="Edit"
                single-line
                counter
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class="text-xs-left">
            <v-edit-dialog
              :return-value.sync="props.item.countyName"
              lazy
              @save="save(props.item)"
              @cancel="cancel"
            >
              {{ props.item.countyName }}
              <v-text-field
                slot="input"
                v-model="props.item.countyName"
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
import countiesMixin from "@/components/administrators/mixins/counties";
import SaccoAPI from "@/api";
import queryString from "querystring";
import Parsers from "@/helpers/parsers";
import bugsnagClient from "@/helpers/errorreporting";

export default {
  name: `CountiesList`,
  data() {
    return {
      moment,
      dataLoading: true,
      search: ``,
      max15chars: v => v.length <= 15 || "Input too long!",
      max3chars: v => v.length <= 3 || "Input too long!",
      headers: [
        {
          text: "County Code",
          value: "countyCode"
        },
        {
          text: "County Name",
          value: "countyName"
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
  mixins: [countiesMixin],
  methods: {
    stopLoading() {
      this.dataLoading = false;
    },
    save(county) {
      if (this.$can(`update`, `County`)) {
        let updateData = Parsers.prepareDataObject({
          county_code: county.countyCode,
          county_name: county.countyName
        });

        SaccoAPI.put(
          `/counties/${county.countyId}`,
          queryString.stringify(updateData)
        )
          .then(() => {
            this.$store.commit(`setSnackbar`, {
              msg: `County updated!`,
              type: `success`,
              
            });
          })
          .catch(error => {
            bugsnagClient.notify(error);
            this.$store.commit(`setSnackbar`, {
              msg: `Failed to update county!`,
              type: `error`,
              
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to edit counties`,
          type: `error`,
          
        });
      }
    },
    cancel() {
      this.$store.commit(`setSnackbar`, {
        msg: `Aborted`,
        type: `error`,
        
      });
    },
    deleteItem(county) {
      if (this.$can("delete", "County")) {
        const index = this.counties.indexOf(county);
        if (confirm("Are you sure you want to delete this county?")) {
          SaccoAPI.delete(`/counties/${county.countyId}`)
            .then(() => {
              this.$store.commit(`setSnackbar`, {
                msg: `Deleted`,
                type: `info`,
                
              });
              this.desserts.splice(index, 1);
            })
            .catch(error => {
              
              bugsnagClient.notify(error);
              this.$store.commit(`setSnackbar`, {
                msg: `Failed to delete county!`,
                type: `error`,
                
              });
            });
        }
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to delete counties`,
          type: `warning`,
          
        });
      }
    },
  },
  created() {
    this.getCounties();
  }
};
</script>
