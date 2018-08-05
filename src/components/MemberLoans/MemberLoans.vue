<template>
  <v-data-iterator
  :items="memberLoans"
  :rows-per-page-items="rowsPerPageItems"
  content-tag="v-layout"
  row
  wrap>
  <v-flex
    slot="item"
    slot-scope="props"
    xs6>
  <v-card>
    <v-card-title>
      <h4>Loan {{ props.item.memberLoanId }}</h4>
      <v-spacer />
      <v-btn color="primary" small :to="`/memberloans/${ props.item.memberLoanId }`">View</v-btn>
      </v-card-title>
    <v-divider />
    <v-list dense>
      <v-list-tile>
        <v-list-tile-content>Type:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ props.item.loanType.loanTypeName }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>Purpose:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ props.item.loanPurpose }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>Amount:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ props.item.loanAmount }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>Repayment Status:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ props.item.loanRepaymentStatus.loanRepaymentStatus }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>Repayment Period:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ props.item.repaymentPeriod }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>Date:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ moment(props.item.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
  </v-flex>
  </v-data-iterator>
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
        rowsPerPage: 3
      },
    }
  },
  props: {
    memberLoans: Array,
  }
}
</script>

