<template>
  <v-form v-if="loanTypes">
    <v-layout row>
      <v-flex xs6 mx-2>
        <v-autocomplete
          item-text="lastName"
          item-value="memberId"
          :items="members"
          label="Select a member"
          v-model="memberId"
        />
      </v-flex>
      <v-flex xs6 mx-2>
        <v-autocomplete
          item-text="loanTypeName"
          item-value="loanTypeId"
          :items="loanTypes"
          label="Select a loan type"
          v-model="loanType"
        />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs6 mx-2>
        <v-text-field required prepend-icon="text_format" label="Purpose" v-model="loanPurpose"/>
      </v-flex>
      <v-flex xs6 mx-2>
        <v-text-field
          required
          label="Requested Amount"
          v-model="requestedLoanAmount"
          prepend-icon="attach_money"
        />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6 mx-2>
        <v-text-field
          required
          label="Repayment Period"
          v-model="repaymentPeriod"
          prepend-icon="attach_money"
        />
      </v-flex>
      <v-flex xs6 mx-2></v-flex>
    </v-layout>
    <v-layout row>
      <v-btn
        color="button"
        @click="addLoan"
        :disabled="btnAddedDisabled"
        :loading="btnLoading"
      >Add Loan</v-btn>
      <!-- <v-btn color="error" @click="clearForm" :disabled="btnAddedDisabled">Clear</v-btn> -->
    </v-layout>
  </v-form>
</template>

<script>
import SaccoAPI from "@/api";
import bugsnagClient from "@/helpers/errorreporting";
import Parsers from "@/helpers/parsers";
import queryString from "querystring";

export default {
  name: `BasicLoanDetails`,
  data() {
    return {
      loanTypes: null,
      members: null,

      loanType: null,
      loanPurpose: null,
      requestedLoanAmount: null,
      repaymentPeriod: null,
      memberId: null,
      btnAddedDisabled: false,
      btnLoading: false
    };
  },
  methods: {
    async addLoan() {
      this.btnLoading = true;

      let newLoan = await Parsers.prepareDataObject({
        member_id: this.memberId,
        loan_type_id: this.loanType,
        loan_purpose: this.loanPurpose,
        loan_amount: this.requestedLoanAmount,
        repayment_period: this.repaymentPeriod,
        loan_repayment_status_id: 1,
        loan_issuing_status_id: 1
      });

      

      SaccoAPI.post("loans/memberloans", queryString.stringify(newLoan)).then(
        response => {
          this.$store.commit(`setSnackbar`, {
            msg: `This loans has been added successfully`,
            type: `success`,
            
          });

          this.$store.commit("setNewMemberRecordKey", response.data.memberLoanId);
          this.$store.commit("setStepperStatus", false);

          this.btnAddedDisabled = true;
          this.btnLoading = false;
        }
      ).catch(error => {
          this.btnLoading = false;
          bugsnagClient.notify(error)
          this.$store.commit(`setSnackbar`, {
            msg: `This there was an error adding this loan`,
            type: `error`,
            
          });
      });
    },
    getLoanTypes() {
      if (this.$can(`read`, `LoanType`)) {
        SaccoAPI.get("loans/types")
          .then(response => {
            this.loanTypes = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error);
            this.$store.commit(`setSnackbar`, {
              msg: `Unable to load loan types at this time`,
              type: `error`,
              
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view loan types`,
          type: `error`,
          
        });
      }
    },
    getMembers() {
      SaccoAPI.get("members")
        .then(response => {
          this.members = response.data;
        })
        .catch(error => {
          bugsnagClient.notify(error);
        });
    }
  },

  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },

  created() {
    this.getLoanTypes();
    this.getMembers();
  }
};
</script>
