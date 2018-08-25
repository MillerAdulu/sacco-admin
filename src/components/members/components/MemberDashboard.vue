<template>
  <v-card>
    <v-img
    src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
    />
    <v-card-title>Welcome back, {{ member.lastName }}</v-card-title>
    <v-card-text>
      <v-layout row>
        <v-flex xs8>
          <p class="text-xs-left">
            Member ID:
          </p>
        </v-flex>
        <v-flex xs4>
          <p class="text-xs-right">
            {{ member.memberId }}
          </p>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs8>
          <p class="text-xs-left">
            Phone Number:
          </p>
        </v-flex>
        <v-flex xs4>
          <p>
            {{ member.phoneNumber }}
          </p>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs8>
          <p class="text-xs-left">
            Contributions this month
          </p>
        </v-flex>
        <v-flex xs4>
          <p class="text-xs-right">
            999 KES
          </p>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs8>
          <p class="text-xs-left">
            Total Contributions
          </p>
        </v-flex>
        <v-flex xs4>
          <p class="text-xs-right">
            999 KES
          </p>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs8>
          <p class="text-xs-left">
            Loans
          </p>
        </v-flex>
        <v-flex xs4>
          <p class="text-xs-right">
            999 KES
          </p>
        </v-flex>
      </v-layout>
    </v-card-text>
    <base-snackbar />
  </v-card>
</template>

<script>
import HTTP from "../../../config";

export default {
  name: `MemberDashboard`,
  data() {
    return {
      loggedInMember: JSON.parse(localStorage.getItem("loggedInUser")),
      member: null
    };
  },
  methods: {
    fetchMemberData() {
      if (this.$can(`read`, `Member`)) {
        HTTP.get(`members/${this.loggedInMember.memberId}`)
          .then(response => {
            this.member = response.data;
          })
          .catch(error => {
            this.$store.commit(`setSnackbar`, {
              msg: `Unable to load your data at this time`,
              type: `error`,
              model: true
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view member details`,
          type: `error`,
          model: true
        });
      }
    }
  },
  created() {
    this.fetchMemberData();
  }
};
</script>
