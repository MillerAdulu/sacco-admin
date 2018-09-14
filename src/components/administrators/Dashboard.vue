<template>
  <v-container>
    <v-layout row>

      <v-flex xs4>
        <v-card>
          <v-card-title>
            Total Members
            <v-spacer />
            <v-btn to="admin/memberlist" small>View All</v-btn>
          </v-card-title>
          <v-card-text>
            <v-chip>{{ totalMembers }}</v-chip>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card>
          <v-card-title>
            Total Member Deposits
            <v-spacer />
            <v-btn to="admin/memberdeposits" small> View All</v-btn>
          </v-card-title>
          <v-card-text>
            <v-chip>{{ totalDeposits }} KES</v-chip>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card>
          <v-card-title>
            Total Member Loans
            <v-spacer />
            <v-btn to="admin/memberloans" small>View All</v-btn>
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
        // if (this.$can(`read`, `Member`)) {
          this.$http.get(`/dashboard/members`)
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
        // } else {
        //   this.$store.commit(`setSnackbar`, {
        //     msg: `You don't have permissions to view members`,
        //     type: `error`,
        //     model: true
        //   });
        // }
      },
      fetchDeposits() {
        // if (this.$can(`read`, `MemberDeposit`)) {
          this.$http.get(`/dashboard/deposits`)
            .then(response => {
              this.totalDeposits = response.data;
            })
            .catch(error => {
              this.$store.commit(`setSnackbar`, {
                msg: `Unable to fetch deposits`,
                type: `error`,
                model: true
              });
            });
        // } else {
        //   this.$store.commit(`setSnackbar`, {
        //     msg: `You don't have permissions to view deposits`,
        //     type: `error`,
        //     model: true
        //   });
        // }
      },
      fetchMemberLoans() {
        // if (this.$can(`read`, `MemberLoan`)) {
          this.$http.get(`/dashboard/memberloans`)
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
        // } else {
        //   this.$store.commit(`setSnackbar`, {
        //     msg: `You don't have permissions to view member loans`,
        //     type: `error`,
        //     model: true
        //   });
        // }
      }
    },
    mounted() {
      this.fetchMembers();
      this.fetchDeposits();
      this.fetchMemberLoans();
    }
  };
</script>
