<template>
  <v-container>
  <v-data-table
    :headers="headers"
    :items="postOffices"
    :loading="dataLoading"
    hide-actions
    class="elevation-1"
  >
  <v-progress-linear slot="progress" color="blue" indeterminate />
  
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.postOfficeId }}</td>
      <td class="text-xs-left">{{ props.item.postOfficeCode }}</td>
      <td class="text-xs-left">{{ props.item.postOfficeName }}</td>
      <td class="text-xs-left">{{ moment(props.item.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</td>
    </template>
  </v-data-table>
  </v-container>
</template>

<script>
import moment from "moment";
import postofficesMixin from '@/components/administrators/mixins/postoffices'

export default {
  name: `PostOfficeList`,
  data() {
    return {
      moment,
      dataLoading: true,
      headers: [
        {
          text: "Post Office ID",
          value: "postOfficeId",
        },
        {
          text: "Post Office Code",
          value: "postOfficeCode",
        },
        {
          text: "Post Office Name",
          value: "postOfficeName",
        },
        {
          text: "Added On",
          value: "createdAt",
        },
      ]
    };
  },
  mixins: [
    postofficesMixin,
  ],
  methods: {
    stopLoading() {
      this.dataLoading = false
    }
  },
  created() {
    this.getPostOffices()
  }
};
</script>
