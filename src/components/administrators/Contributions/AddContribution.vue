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
            label="Member Contribution"
            v-model="contributionAmount"
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
      <v-btn block color="success" :loading="btnLoading" @click="addMemberContribution">Add Member Contribution</v-btn>
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
        contributionAmount: "",
        paymentMethodId: "",
        comment: "",
        btnLoading: false,

        members: [],
        paymentMethods: []
      };
    },
    methods: {
      addMemberContribution() {
        if (this.$can(`create`, `MemberContribution`)) {
          this.startLoading();

          HTTP.post(
            `membercontributions`,
            queryString.stringify({
              member_id: this.memberId,
              contribution_amount: this.contributionAmount,
              payment_method_id: this.paymentMethodId,
              comment: this.comment
            })
          )
            .then(response => {
              this.$store.commit("snackbar", {
                msg: `Contribution added successfully`,
                type: `success`,
                model: true
              });

              this.stopLoading();
            })
            .catch(error => {
              this.$store.commit(`setSnackbar`, {
                msg: `Unable to add this contribution at this moment`,
                type: `error`,
                model: true
              });
              this.stopLoading();
            });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to add a contribution`,
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
