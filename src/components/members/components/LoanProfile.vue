<template>
  <v-data-iterator
      :items="memberloans"
      :rows-per-page-items="rowsPerPageItems"
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
        <v-card-title>Loan ID: {{ props.item.memberLoanId }}</v-card-title>
        <v-divider />
        <v-list dense>
          <v-list-tile>
            <v-list-tile-content>Loan Type</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.loanType.loanTypeName }}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Loan Amount</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.loanAmount}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Loan Repayment Status</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.loanRepaymentStatus.loanRepaymentStatus}}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Loan Repayment Status</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.repaymentPeriod }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Loan Date</v-list-tile-content>
            <v-list-tile-content class="align-end">
              {{ moment(props.item.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <router-link :to="`/memberloans/${ props.item.memberLoanId }`"><v-icon>list</v-icon></router-link>    
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
  </v-flex>
  <base-snackbar />
  </v-data-iterator>
</template>

<script>
import moment from "moment";

export default {
  name: `MemberLoansProfile`,
  data() {
    return {
      moment,
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      memberloans: [],
      loggedInUser: JSON.parse(localStorage.getItem("loggedInUser"))
    };
  },
  methods: {
    fetchLoans() {
      if (this.$can(`read`, `MemberLoan`)) {
        HTTP.get(`loans/member/${this.loggedInUser.member.memberId}`)
          .then(response => {
            this.memberloans = response.data;
          })
          .catch(error => {
            this.$store.commit(`setSnackbar`, {
              msg: `Unable to display your loans at this time`,
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
  }
};
</script>

