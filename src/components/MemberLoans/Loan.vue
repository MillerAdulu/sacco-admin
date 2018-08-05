<template>
  <v-card>
    <v-card-title><h4>Loan {{ loanDetails.memberLoanId }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Member:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ loanDetails.member.lastName }}, {{ loanDetails.member.firstName }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Loan Type:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ loanDetails.loanType.loanTypeName }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Loan Purpose:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ loanDetails.loanPurpose }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Loan Amount:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ loanDetails.loanAmount }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Repayment Method:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ loanDetails.repaymentPeriod }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Contact:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ loanDetails.member.phoneNumber }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Repayment Status:</v-list-tile-content>
              <v-list-tile-content class="align-end">
                <v-chip color="red" text-color="white">
                  {{ loanDetails.loanRepaymentStatus.loanRepaymentStatus }}
                </v-chip>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Issuing Status:</v-list-tile-content>
              <v-list-tile-content class="align-end">
                <v-chip color="red" text-color="white">
                  {{ loanDetails.loanIssuingStatus.loanIssuingStatus }}
                </v-chip>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
  </v-card>
</template>

<script>
import HTTP from '../../config'

export default {
  name: `LoanDetails`,
  data() {
    return {
      loanDetails: null,
    }
  },
  methods: {
    getLoanDetails() {
      HTTP.get(`loans/memberloans/${this.$route.params.memberLoanId}`)
      .then(response => {
        this.loanDetails = response.data
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  created() {
    this.getLoanDetails()
  },
}
</script>

