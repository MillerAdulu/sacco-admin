<template>
<v-data-iterator
:items="contributions"
:rows-per-page-items="rowsPerPageItems"
content-tag="v-layout"
row
wrap
>
<v-flex
slot="item"
slot-scope="props"
xs6
>
<v-card>
  <v-card-title><h4>Contribution {{ props.item.memberContributionId}}</h4></v-card-title>
  <v-divider />
  <v-list dense>
    <v-list-tile>
      <v-list-tile-content>Payment Method:</v-list-tile-content>
      <v-list-tile-content class="align-end">{{ props.item.paymentMethod.paymentMethod }}</v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>Contribution Amount:</v-list-tile-content>
      <v-list-tile-content class="align-end">{{ props.item.contributionAmount }}</v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>Date:</v-list-tile-content>
      <v-list-tile-content class="align-end">{{ moment(props.item.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</v-list-tile-content>
    </v-list-tile>
  </v-list>
</v-card>
</v-flex>
</v-data-iterator>
</template>
<script>
import moment from 'moment'

export default {
  data() {
    return {
      moment,
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 3
      }
    };
  },
  props: {
    contributions: Array
  },
  methods: {
  }
};
</script>
