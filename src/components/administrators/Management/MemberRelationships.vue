<template>
  <v-container>
  <v-data-table
    :headers="headers"
    :items="relationships"
    :loading="dataLoading"
    hide-actions
    class="elevation-1"
  >
  <v-progress-linear slot="progress" color="blue" indeterminate />
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.relationshipId }}</td>
      <td class="text-xs-left">{{ props.item.relationshipName }}</td>
      <td class="text-xs-left">{{ moment(props.item.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</td>
    </template>
  </v-data-table>
  </v-container>
</template>

<script>
import moment from "moment";
import fetchMemberRelationshipsMixin from '@/components/administrators/mixins/memberrelationships'

export default {
  name: `ConstituencyList`,
  data() {
    return {
      moment,
      dataLoading: true,
      headers: [
        {
          text: "Relationship ID",
          value: "relationshipId",
        },
        {
          text: "Relationship",
          value: "relationshipName",
        },
        {
          text: "Added On",
          value: "createdAt",
        },
      ]
    };
  },
  mixins: [
    fetchMemberRelationshipsMixin,
  ],
  methods: {
    stopLoading() {
      this.dataLoading = false
    }
  },
  created() {
    this.getRelationships()
  }
};
</script>
