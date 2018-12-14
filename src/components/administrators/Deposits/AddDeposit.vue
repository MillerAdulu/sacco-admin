<template>
  <v-form>
    <v-layout row>
      <v-flex xs6 mx-2>
        <v-autocomplete
            item-text="paymentMethod"
            item-value="paymentMethodId"
            label="Payment Method"
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
            label="Member ID"
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
  import bugsnagClient from '@/helpers/errorreporting'
  import SaccoAPI from '@/api'
  import queryString from "querystring";
  import fetchPaymentMethodsMixin from '@/components/administrators/mixins/paymentMethods'

  export default {
    data() {
      return {
        memberId: "",
        depositAmount: "",
        paymentMethodId: "",
        comment: "",
        btnLoading: false,

        members: [],
      };
    },
    mixins: [fetchPaymentMethodsMixin],

    methods: {
      addMemberDeposit() {
        if (this.$can(`create`, `MemberDeposit`)) {
        this.startLoading();

        SaccoAPI
          .post(
            `memberdeposits`,
            queryString.stringify({
              member_id: this.memberId,
              deposit_amount: this.depositAmount,
              payment_method_id: this.paymentMethodId,
              comment: this.comment
            })
          )
          .then(() => {
            this.$store.commit("setSnackbar", {
              msg: `Deposit added successfully`,
              type: `success`,
              model: true
            });

            this.stopLoading();
          })
          .catch(error => {
            bugsnagClient.notify(error)
            
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
        SaccoAPI
          .get(`members`)
          .then(response => {
            this.members = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error)

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

      startLoading() {
        this.btnLoading = true;
      },
      stopLoading() {
        this.btnLoading = false;
      }
    },
    created() {
      this.fetchMembers();
    }
  };
</script>
