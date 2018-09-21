<template>
  <v-container>
        <v-card>
      <v-card-title>
        All Counties
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
  <v-progress-linear slot="progress" color="blue" indeterminate />
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.countyCode }}</td>
      <td class="text-xs-left">{{ props.item.countyName }}</td>
      <td class="text-xs-left">{{ moment(props.item.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</td>
    </template>
  </v-data-table>
        </v-card>
        <base-snackbar />
  </v-container>
</template>

<script>
import moment from "moment";
import countiesMixin from '@/components/administrators/mixins/counties'

export default {
  name: `CountiesList`,
  data() {
    return {
      moment,
      dataLoading: true,
      search: ``,
      headers: [
        {
          text: "County Code",
          value: "countyCode",
        },
        {
          text: "County Name",
          value: "countyName",
        },
        {
          text: "Added On",
          value: "createdAt",
        },
      ]
    };
  },
  mixins: [
    countiesMixin,
  ],
  methods: {
    stopLoading() {
      this.dataLoading = false
    }
  },
  created() {
    this.getCounties()
  }
};
</script>
