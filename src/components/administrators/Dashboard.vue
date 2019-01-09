<template>
  <v-container>
    <v-layout row>
      <v-flex xs4>
        <v-card>
          <v-card-title>Total Members
            <v-spacer/>
            <v-btn to="/admin/memberlist" small color="button">View All</v-btn>
          </v-card-title>
          <v-card-text>
            <v-chip color="chips">{{ totalMembers }}</v-chip>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card>
          <v-card-title>Total Member Deposits
            <v-spacer/>
            <v-btn to="/admin/memberdeposits" small color="button">View All</v-btn>
          </v-card-title>
          <v-card-text>
            <v-chip color="chips">{{ totalDeposits }} KES</v-chip>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card>
          <v-card-title>Total Member Loans
            <v-spacer/>
            <v-btn to="/admin/memberloans" small color="button">View All</v-btn>
          </v-card-title>
          <v-card-text>
            <v-chip color="chips">{{ totalMemberLoans }} KES</v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <base-snackbar/>
  </v-container>
</template>

<script>
import bugsnagClient from "@/helpers/errorreporting";
import SaccoAPI from "@/api";

export default {
  name: `Dashboard`,
  data() {
    return {
      totalMembers: null,
      totalDeposits: null,
      totalMemberLoans: null
    };
  },
  methods: {
    fetchMembers() {
      if (this.$can(`read`, `Member`)) {
        SaccoAPI.get(`/dashboard/members`)
          .then(response => {
            this.totalMembers = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error);

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch members`,
              type: `error`
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view members`,
          type: `error`
        });
      }
    },
    fetchDeposits() {
      if (this.$can(`read`, `MemberDeposit`)) {
        SaccoAPI.get(`/dashboard/deposits`)
          .then(response => {
            this.totalDeposits = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error);

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch deposits`,
              type: `error`
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view deposits`,
          type: `error`
        });
      }
    },
    fetchMemberLoans() {
      if (this.$can(`read`, `MemberLoan`)) {
        SaccoAPI.get(`/dashboard/memberloans`)
          .then(response => {
            this.totalMemberLoans = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error);

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch loans`,
              type: `error`
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view member loans`,
          type: `error`
        });
      }
    }
  },
  mounted() {
    this.fetchMembers();
    this.fetchDeposits();
    this.fetchMemberLoans();
  }
};
</script>
