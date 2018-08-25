<template>
  <v-container>
    <v-layout row>
      <v-flex xs4>
        <v-card>
          <v-card-title>
            Total Members
            <v-spacer />
            <v-btn to="memberlist">View All</v-btn>
          </v-card-title>
          <v-card-text>
            <v-chip>{{ totalMembers }}</v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card>
          <v-card-title>
            Total Member Contributions
            <v-spacer />
            <v-btn to="membercontributions">View All</v-btn>
          </v-card-title>
          <v-card-text>
            <v-chip>{{ totalContributions }} KES</v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card>
          <v-card-title>
            Total Member Loans
            <v-spacer />
            <v-btn to="memberloans">View All</v-btn>
          </v-card-title>
          <v-card-text>
            <v-chip>{{ totalMemberLoans }} KES</v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <base-snackbar />
  </v-container>
</template>

<script>
import HTTP from "../../config";
export default {
  name: `Dashboard`,
  data() {
    return {
      totalMembers: null,
      totalContributions: null,
      totalMemberLoans: null
    };
  },
  methods: {
    fetchMembers() {
      if (this.$can(`read`, `Member`)) {
        HTTP.get(`/dashboard/members`)
          .then(response => {
            this.totalMembers = response.data;
          })
          .catch(error => {
            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch members`,
              type: `error`,
              model: true
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view members`,
          type: `error`,
          model: true
        });
      }
    },
    fetchContributions() {
      if (this.$can(`read`, `MemberContribution`)) {
        HTTP.get(`/dashboard/contributions`)
          .then(response => {
            this.totalContributions = response.data;
          })
          .catch(error => {
            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch contributions`,
              type: `error`,
              model: true
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view contributions`,
          type: `error`,
          model: true
        });
      }
    },
    fetchMemberLoans() {
      if (this.$can(`read`, `MemberLoan`)) {
        HTTP.get(`/dashboard/memberloans`)
          .then(response => {
            this.totalMemberLoans = response.data;
          })
          .catch(error => {
            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch loans`,
              type: `error`,
              model: true
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view member loans`,
          type: `error`,
          model: true
        });
      }
    }
  },
  mounted() {
    this.fetchMembers();
    this.fetchContributions();
    this.fetchMemberLoans();
  }
};
</script>
