<template>
  <v-container>
    <v-card>
      <v-card-title>
        All Marital Statuses
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
        <v-progress-linear slot="progress" color="blue" indeterminate />
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.maritalStatusId }}</td>
          <td class="text-xs-left">{{ props.item.maritalStatus }}</td>
          <td class="text-xs-left">{{ moment(props.item.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</td>
        </template>
      </v-data-table>
    </v-card>
    <base-snackbar />
  </v-container>
</template>

<script>
  import moment from "moment";
  import maritalStatusMixin from '@/components/administrators/mixins/maritalStatuses'

  export default {
    name: `MaritalStatusesList`,
    data() {
      return {
        moment,
        dataLoading: true,
        search: ``,
        headers: [
          {
            text: "Marital Status ID",
            value: "maritalStatusId",
          },
          {
            text: "Marital Status",
            value: "maritalStatus",
          },
          {
            text: "Added On",
            value: "createdAt",
          },
        ]
      };
    },
    mixins: [maritalStatusMixin],
    methods: {
      stopLoading() {
        this.dataLoading = false
      }
    },
  };
</script>
