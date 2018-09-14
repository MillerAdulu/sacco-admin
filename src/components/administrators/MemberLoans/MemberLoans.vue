<template>
  <v-data-table
      :headers="headers"
      :items="memberLoans"
      :rows-per-page-items="rowsPerPageItems"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.memberLoanId }}</td>
      <td>{{ props.item.loanType.loanTypeName }}</td>
      <td>{{ props.item.loanAmount }}</td>
      <td>{{ props.item.loanRepaymentStatus.loanRepaymentStatus }}</td>
      <td>{{ moment(props.item.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</td>
      <td>
        <router-link :to="`/admin/memberloans/${ props.item.memberLoanId }`"><v-icon>list</v-icon></router-link>
      </td>
    </template>
  </v-data-table>
</template>

<script>
  import moment from 'moment'

  export default {
    name: `MemberLoans`,
    data() {
      return {
        moment,
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 4
        },
        headers: [
          {
            text: `Loan ID`,
            value: `memberLoanId`
          },
          {
            text: `Loan Type`,
            value: `loanType.loanTypeName`
          },
          {
            text: `Amount`,
            value: `loanAmount`
          },
          {
            text: `Repayment Status`,
            value: `loanRepaymentStatus.loanRepaymentStatus`,
          },
          {
            text: `Date Taken`,
            value: `createdAt`
          },
          {
            text: `Actions`,
            value: `name`
          }
        ]
      }
    },
    props: {
      memberLoans: Array,
    }
  }
</script>

