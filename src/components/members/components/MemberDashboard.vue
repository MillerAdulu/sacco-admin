<template>
  <v-card>
    <v-img
        :src="loggedInMember.member.passportPhoto"
    />
    <v-card-title>Welcome back, {{ loggedInMember.member.lastName }}</v-card-title>
    <v-card-text>
      <v-layout row>
        <v-flex xs8>
          <p class="text-xs-left">
            Member ID:
          </p>
        </v-flex>
        <v-flex xs4>
          <p class="text-xs-right">
            {{ loggedInMember.member.memberId }}
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
            {{ loggedInMember.member.phoneNumber }}
          </p>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs8>
          <p class="text-xs-left">
            Deposits this month
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
            Total Deposits
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
  import HTTP from "../../../api";

  export default {
    name: `MemberDashboard`,
    data() {
      return {
        loggedInMember: this.$store.getters.loggedInUser,
        member: null
      };
    },
    methods: {
      fetchMemberData() {
        if (this.$can(`read`, `Member`)) {
          HTTP.get(`members/${this.loggedInMember.member.memberId}`)
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
