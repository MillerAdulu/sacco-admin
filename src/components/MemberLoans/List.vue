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
        <td>{{ props.item.member.memberId }}</td>
        <td>{{ props.item.member.lastName }}</td>
        <td>{{ props.item.loanType.loanTypeName }}</td>
        <td>{{ props.item.loanPurpose }}</td>
        <td>{{ props.item.loanAmount }}</td>
        <td>{{ props.item.repaymentPeriod }}</td>
        <td>{{ props.item.loanRepaymentStatus.loanRepaymentStatus }}</td>
        <td>{{ moment(props.item.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</td>
        <td>
          <router-link :to='{name: `LoanDetails`, params: {
            memberLoanId: props.item.memberLoanId}
            }'>
          <v-icon>
          list
          </v-icon>
          </router-link>
          </td>
      </template>
      
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import moment from 'moment'
import HTTP from '../../config'

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
          text: `Member ID`,
          value: `member.memberId`
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
          text: `Purpose`,
          value: `loanPurpose`
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
          value: 'createdAt'
        },
        {
          text: `Actions`,
          value: `name`
        }
      ],
      search: '',
      memberLoans: [],
    }
  },
  methods: {
    fetchLoans() {
      this.dataLoading = true
      HTTP.get(`loans/memberloans`)
      .then(response => {
        this.memberLoans = response.data
        this.dataLoading = false
      })
      .catch(error => {
        console.log(error)
      })
    },
  },
  created() {
    this.fetchLoans()
  }
}
</script>

