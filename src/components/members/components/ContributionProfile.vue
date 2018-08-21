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
        xs12
        sm6
        md4
        lg3
      >
  <v-card>
    <v-card-title><h5>Contribution ID: {{ props.item.memberContributionId }}</h5></v-card-title>
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
        <v-list-tile-content>Contribution Amount:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ moment(props.item.createdAt).format('MMMM Do YYYY') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="props.item.comment">
        <v-list-tile-content>Comment</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ props.item.comment }}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
  </v-flex>
   </v-data-iterator>  
</template>

<script>
import moment from 'moment'

import HTTP from '../../../config'

export default {
  name: `ContributionProfile`,

  data() {
    return {
        moment,
        member: JSON.parse(localStorage.getItem('loggedInUser')),
        contributions: [],
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 3
        },
      }
  },
  methods: {
    fetchContributions() {
      HTTP.get(`membercontributions/members/${this.member.memberId}`)
      .then(response => {
        this.contributions = response.data
      })
      .catch(error => {
        console.log(error.message)
      })
    }
  },

  created() {
    this.fetchContributions()
  }

}
</script>
