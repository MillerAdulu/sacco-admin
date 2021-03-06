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
          item-text="lastName"
          item-value="memberId"
          :items="members"
          v-model="memberId"
          label="Member"
        />
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6 mx-2>
        <v-text-field label="Member Deposit" v-model="depositAmount"/>
      </v-flex>
      <v-flex xs6 mx-2>
        <v-text-field label="Comment" v-model="comment"/>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-btn
        block
        color="button"
        :loading="btnLoading"
        @click="addMemberShareDeposit"
      >Add Member Share Deposit</v-btn>
    </v-layout>

    <base-snackbar/>
  </v-form>
</template>

<script>
import bugsnagClient from "@/helpers/errorreporting";
import SaccoAPI from "@/api";
import queryString from "querystring";
import fetchPaymentMethodsMixin from "@/components/administrators/mixins/paymentMethods";

export default {
  data() {
    return {
      memberId: "",
      depositAmount: "",
      paymentMethodId: "",
      comment: "",
      btnLoading: false,

      members: []
    };
  },
  mixins: [fetchPaymentMethodsMixin],

  methods: {
    addMemberShareDeposit() {
      if (this.$can(`create`, `MemberShare`)) {
        this.startLoading();

        SaccoAPI.post(
          `membershares`,
          queryString.stringify({
            member_id: this.memberId,
            deposit_amount: this.depositAmount,
            payment_method_id: this.paymentMethodId,
            comment: this.comment
          })
        )
          .then(() => {
            this.$store.commit("setSnackbar", {
              msg: `Share Deposit added successfully`,
              type: `success`
            });

            this.stopLoading();
          })
          .catch(error => {
            bugsnagClient.notify(error);

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to add this share deposit at this moment`,
              type: `error`
            });
            this.stopLoading();
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to add a share deposit`,
          type: `error`
        });
      }
    },
    fetchMembers() {
      if (this.$can(`read`, `Member`)) {
        SaccoAPI.get(`members`)
          .then(response => {
            this.members = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error);

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch members at this time`,
              type: `error`
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view members`,
          type: `error`
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
