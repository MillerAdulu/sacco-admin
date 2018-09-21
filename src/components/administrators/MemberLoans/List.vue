<template>
  <v-container>
    <v-card>
      <v-card-title>
        All Loans
        <v-spacer />
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
        />
      </v-card-title>
      <v-data-table
          :loading="dataLoading"
          :rows-per-page-items="[20, 30, 40]"
          :headers="headers"
          :search="search"
          item-key="memberLoanId"
          expand
          :items="memberLoans"
      >
        <v-progress-linear slot="progress" color="blue" indeterminate />

        <template slot="items" slot-scope="props">
          <td>{{ props.item.memberLoanId }}</td>
          <td>{{ props.item.member.lastName }}</td>
          <td>{{ props.item.loanType.loanTypeName }}</td>
          <td>{{ props.item.loanAmount }}</td>
          <td>{{ props.item.repaymentPeriod }}</td>
          <td>{{ props.item.loanRepaymentStatus.loanRepaymentStatus }}</td>
          <td>{{ moment(props.item.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</td>
          <td>
            <Can I="read" a="Member">
              <router-link :to='{name: `LoanDetails`, params: {
            memberLoanId: props.item.memberLoanId}
            }'>
                <v-icon>
                  list
                </v-icon>
              </router-link>
            </Can>
          </td>
        </template>

      </v-data-table>
    </v-card>
    <base-snackbar />
  </v-container>
</template>

<script>
  import bugsnagClient from '@/helpers/errorreporting'
  import SaccoAPI from '@/api'
  import moment from "moment";
  export default {
    name: `MemberLoans`,
    data() {
      return {
        moment,
        dataLoading: true,
        headers: [
          {
            text: `Loan ID`,
            value: `memberLoanId`
          },
          {
            text: `Last Name`,
            value: `member.lastName`
          },
          {
            text: `Loan Type`,
            value: `loanType.loanTypeName`
          },
          {
            text: `Loan Amount`,
            value: `loanAmount`
          },
          {
            text: `Repayment Period`,
            value: `loanRepaymentPeriod`
          },
          {
            text: `Repayment Status`,
            value: `loanRepaymentStatus.loanRepaymentStatus`
          },
          {
            text: `Date`,
            value: "createdAt"
          },
          {
            text: `Actions`,
            value: `name`
          }
        ],
        search: "",
        memberLoans: []
      };
    },
    methods: {
      fetchLoans() {
        // if (this.$can(`read`, `MemberLoan`)) {
          SaccoAPI.get(`loans/memberloans`)
            .then(response => {
              this.memberLoans = response.data;
              this.dataLoading = false;
            })
            .catch(error => {
              bugsnagClient.notify(error)
              
              this.$store.commit(`setSnackbar`, {
                msg: `Unable to load members loans at this time`,
                type: `error`,
                model: true
              });
            });
        // } else {
        //   this.$store.commit(`setSnackbar`, {
        //     msg: `You don't have permissions to view members loans`,
        //     type: `error`,
        //     model: true
        //   });
        // }
      },
      startLoading() {
        this.dataLoading = true;
      },
      stopLoading() {
        this.dataLoading = false;
      }
    },
    created() {
      this.fetchLoans();
    }
  };
</script>

