<template>
  <v-container>
  <v-data-table
    :headers="headers"
    :items="counties"
    :loading="dataLoading"
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
