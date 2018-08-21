<template>
  <v-data-table
      :headers="headers"
      :items="contributions"
      :rows-per-page-items="rowsPerPageItems"
      content-tag="v-layout"
      row
      wrap
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.memberContributionId }}</td>
      <td>{{ props.item.paymentMethod.paymentMethod }}</td>
      <td>{{ props.item.contributionAmount }}</td>
      <td>{{ props.item.comment }}</td>
      <td>{{ moment(props.item.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</td>
    </template>
  </v-data-table>
</template>
<script>
  import moment from 'moment'

  export default {
    data() {
      return {
        width: 600,
        height: 300,
        moment,
        headers: [
          {
            text: `Contribution ID`,
            value: `memberContributionId`
          },
          {
            text: `Payment Method`,
            value: `paymentMethod.paymentMethod`
          },
          {
            text: `Contribution Amount`,
            value: `contributionAmount`
          },
          {
            text: `Comment`,
            value: `comment`
          },
          {
            text: `Date`,
            value: `createdAt`
          }
        ],
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 3
        },
      };
    },
    props: {
      contributions: Array
    },
    methods: {
    }
  };
</script>
