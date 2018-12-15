<template>
  <v-card v-if="loanDetails && loanDetails.member">
    <v-card-title><h4>Loan {{ loanDetails.memberLoanId }}</h4></v-card-title>
    <v-divider></v-divider>
    <v-list dense>
      <v-layout row>
        <v-flex xs6>
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
        </v-flex>
        <v-flex xs6>
          <v-list-tile>
            <v-list-tile-content>Repayment Period:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ loanDetails.repaymentPeriod }} months</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Contact:</v-list-tile-content>
            <v-list-tile-content class="align-end">+{{ loanDetails.member.phoneNumber }}</v-list-tile-content>
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
        </v-flex>
      </v-layout>
    </v-list>
    <v-divider />

    <v-divider />
    <h3>Guarantors</h3>
    <Guarantors />
    <base-snackbar />
  </v-card>
</template>

<script>
  import bugsnagClient from '@/helpers/errorreporting'
  import SaccoAPI from '@/api'
  import Guarantors from "@/components/administrators/MemberLoans/Guarantors";

  export default {
    name: `LoanDetails`,
    data() {
      return {
        loanDetails: {}
      };
    },
    components: {
      Guarantors
    },
    methods: {
      getLoanDetails() {
        if (this.$can(`read`, `MemberLoan`)) {
        SaccoAPI.get(`loans/memberloans/${this.$route.params.memberLoanId}`)
          .then(response => {
            this.loanDetails = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error)

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to load this member loan`,
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
    created() {
      this.getLoanDetails();
    }
  };
</script>

