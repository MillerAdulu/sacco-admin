<template>
  <div>
    <v-layout row v-for="contribution in contributions" :key="contributions.indexOf(contribution)">
    <v-flex xs12>
      <p>Contribution ID: {{ contribution.memberContributionId }}</p>
      <p>Payment Method: {{ contribution.paymentMethod.paymentMethod }}</p>
      <p>Contribution Amount: {{ contribution.contributionAmount}}</p>
      <p>Date: {{ contribution.createdAt }}</p>
      <v-divider />
    </v-flex>
    </v-layout>
  </div>
</template>

<script>
import HTTP from "../../config";
export default {
  data() {
    return {};
  },
  props: {
    contributions: Array
  },
  methods: {
  }
};
</script>
