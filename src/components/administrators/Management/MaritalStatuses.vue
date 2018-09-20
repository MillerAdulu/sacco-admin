<template>
  <v-container>
  <v-data-table
    :headers="headers"
    :items="maritalStatuses"
    :loading="dataLoading"
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
