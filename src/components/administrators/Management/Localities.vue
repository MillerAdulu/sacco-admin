<template>
  <v-container>
    <v-card>
      <v-card-title>
        All Localities
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
  <v-progress-linear slot="progress" color="blue" indeterminate />
  
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.localityId }}</td>
      <td class="text-xs-left">{{ props.item.localityName }}</td>
      <td class="text-xs-left">{{ props.item.constituency.constituencyName }}</td>
      <td class="text-xs-left">{{ moment(props.item.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</td>
    </template>
  </v-data-table>
    </v-card>
    <base-snackbar />
  </v-container>
</template>

<script>
import moment from "moment";
import localitiesMixin from '@/components/administrators/mixins/localities'

export default {
  name: `LocalityList`,
  data() {
    return {
      moment,
      dataLoading: true,
      search: ``,
      headers: [
        {
          text: "Locality ID",
          value: "localityId",
        },
        {
          text: "Locality Name",
          value: "localityName",
        },
        {
          text: "Constituency",
          value: "constituency.constituencyName",
        },
        {
          text: "Added On",
          value: "createdAt",
        },
      ]
    };
  },
  mixins: [
    localitiesMixin,
  ],
  methods: {
    stopLoading() {
      this.dataLoading = false
    }
  },
  created() {
    this.getLocalities()
  }
};
</script>
