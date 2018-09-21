<template>
  <v-container>
    <v-card>
      <v-card-title>
        All Constituencies
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
  <v-progress-linear slot="progress" color="blue" indeterminate />
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.constituencyId }}</td>
      <td class="text-xs-left">{{ props.item.constituencyName }}</td>
      <td class="text-xs-left">{{ props.item.county.countyName }}</td>
      <td class="text-xs-left">{{ moment(props.item.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</td>
    </template>
  </v-data-table>
  </v-card>
    <base-snackbar />
  </v-container>
</template>

<script>
import moment from "moment";
import constituenciesMixin from '@/components/administrators/mixins/constituencies'

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
          value: "constituencyId",
        },
        {
          text: "Constituency Name",
          value: "constituencyName",
        },
        {
          text: "County",
          value: "county.countyName",
        },
        {
          text: "Added On",
          value: "createdAt",
        },
      ]
    };
  },
  mixins: [
    constituenciesMixin,
  ],
  methods: {
    stopLoading() {
      this.dataLoading = false
    }
  },
  created() {
    this.getConstituencies()
  }
};
</script>