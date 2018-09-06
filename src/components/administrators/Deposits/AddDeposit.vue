<template>
  <v-form>
    <v-layout row>
      <v-flex xs6 mx-2>
        <v-autocomplete
            item-text="paymentMethod"
            item-value="paymentMethodId"
            :items="paymentMethods"
            v-model="paymentMethodId"
        />
      </v-flex>
      <v-flex xs6 mx-2>
        <v-autocomplete
            item-text="memberId"
            item-value="memberId"
            :items="members"
            v-model="memberId"
        />
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6 mx-2>
        <v-text-field
            label="Member Deposit"
            v-model="depositAmount"
        />
      </v-flex>
      <v-flex xs6 mx-2>
        <v-text-field
            label="Comment"
            v-model="comment"
        />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-btn block color="success" :loading="btnLoading" @click="addMemberDeposit">Add Member Deposit</v-btn>
    </v-layout>

    <base-snackbar />

  </v-form>
</template>

<script>
  import HTTP from "../../../api";
  import queryString from "querystring";

  export default {
    data() {
      return {
        memberId: "",
        depositAmount: "",
        paymentMethodId: "",
        comment: "",
        btnLoading: false,

        members: [],
        paymentMethods: []
      };
    },
    methods: {
      addMemberDeposit() {
        if (this.$can(`create`, `MemberDeposit`)) {
          this.startLoading();

          HTTP.post(
            `memberdeposits`,
            queryString.stringify({
              member_id: this.memberId,
              deposit_amount: this.depositAmount,
              payment_method_id: this.paymentMethodId,
              comment: this.comment
            })
          )
            .then(response => {                                                   
              console.log(response.data)
              this.$store.commit("snackbar", {
                msg: `Deposit added successfully`,
                type: `success`,
                model: true
              });

              this.stopLoading();
            })
            .catch(error => {
              this.$store.commit(`setSnackbar`, {
                msg: `Unable to add this deposit at this moment`,
                type: `error`,
                model: true
              });
              this.stopLoading();
            });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to add a deposit`,
            type: `error`,
            model: true
          });
        }
      },
      fetchMembers() {
        if (this.$can(`read`, `Member`)) {
          HTTP.get(`members`)
            .then(response => {
              this.members = response.data;
            })
            .catch(error => {
              this.$store.commit(`setSnackbar`, {
                msg: `Unable to fetch members at this time`,
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
      fetchPaymentMethods() {
        if (this.$can(`read`, `PaymentMethod`)) {
          HTTP.get(`paymentmethods`)
            .then(response => {
              this.paymentMethods = response.data;
            })
            .catch(error => {
              this.$store.commit(`setSnackbar`, {
                msg: `Unable to fetch payment methods at this time`,
                type: `error`,
                model: true
              });
            });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to view payment methods`,
            type: `error`,
            model: true
          });
        }
      },
      startLoading() {
        this.btnLoading = true;
      },
      stopLoading() {
        this.btnLoading = false;
      }
    },
    created() {
      this.fetchMembers();
      this.fetchPaymentMethods();
    }
  };
</script>
