<template>
  <v-card>
    <v-card-title>Welcome back, {{ loggedInMember.lastName }}</v-card-title>
    <v-card-text>
      <v-layout row>
        <v-flex xs8>
          <p class="text-xs-left">Member ID:</p>
        </v-flex>
        <v-flex xs4>
          <p class="text-xs-right">{{ loggedInMember.memberId }}</p>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs8>
          <p class="text-xs-left">Phone Number:</p>
        </v-flex>
        <v-flex xs4>
          <p class="text-xs-right">{{ loggedInMember.phoneNumber }}</p>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs8>
          <p class="text-xs-left">Deposits this month</p>
        </v-flex>
        <v-flex xs4>
          <p class="text-xs-right">999 KES</p>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs8>
          <p class="text-xs-left">Total Deposits</p>
        </v-flex>
        <v-flex xs4>
          <p class="text-xs-right">999 KES</p>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs8>
          <p class="text-xs-left">Loans</p>
        </v-flex>
        <v-flex xs4>
          <p class="text-xs-right">999 KES</p>
        </v-flex>
      </v-layout>
    </v-card-text>
    <base-snackbar/>
  </v-card>
</template>

<script>
export default {
  name: `MemberDashboard`,
  data() {
    return {
      loggedInMember: this.$store.getters.loggedInUser.member
    };
  }
};
</script>
