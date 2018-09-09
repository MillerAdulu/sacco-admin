<template>
  <v-card height="200px" flat>
    <div class="text-xs-center pa-0">
      <v-layout>
        <v-flex xs-4>{{ bottomNav }}</v-flex>
        <v-flex xs-8>
          <v-dialog
              v-model="dialog"
              width="500"
          >
            <v-btn
                slot="activator"
                small
            >
              Add Deposit
            </v-btn>

            <v-card>
              <v-card-title
                  class="headline grey lighten-2"
                  primary-title
              >
                Add Deposit
              </v-card-title>

              <v-card-text>
                This will allow you to add a deposit via mpesa <br>
                <v-text-field v-model="depositAmount" />
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    flat
                    @click="addDeposit"
                    small
                >
                  Add Deposit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn @click="logOut" small>Log Out</v-btn>
        </v-flex>
      </v-layout>
      <v-fade-transition appear>
        <router-view />
      </v-fade-transition>
    </div>

    <v-bottom-nav
        :active.sync="bottomNav"
        :value="true"
        fixed
        color="black"
        app
    >
      <v-btn
          color="teal"
          flat
          value="Dashboard"
          :to="{ name: `MemberDashboard`}"
      >
        <span>Profile</span>
        <v-icon>account_circle</v-icon>
      </v-btn>

      <v-btn
          color="teal"
          flat
          value="Deposits"
          :to="{name: `DepositProfile`}"
      >
        <span>Deposits</span>
        <v-icon>monetization_on</v-icon>
      </v-btn>

      <v-btn
          color="teal"
          flat
          value="loans"
          :to="{name: `LoanProfile`}"
      >
        <span>Loans</span>
        <v-icon>assignment_turned_in</v-icon>
      </v-btn>
      <v-btn
          color="teal"
          flat
          value="Addresses"
          :to="{name: `AddressProfile`, params: {addresses: addresses}}"
      >
        <span>Addresses</span>
        <v-icon>place</v-icon>
      </v-btn>
      <v-btn
          color="teal"
          flat
          value="Payment Methods"
          :to="{name: `PaymentMethodsProfile`, params: {
          paymentmethods: paymentMethods
        }}"
      >
        <span>Payment Info</span>
        <v-icon>account_balance_wallet</v-icon>
      </v-btn>
    </v-bottom-nav>
    <base-snackbar />
  </v-card>
</template>

<script>
  import HTTP from "../../api";
  import queryString from "querystring";

  export default {
    name: `MemberArea`,
    data() {
      return {
        bottomNav: "Dashboard",
        loggedInUser: this.$store.getters.loggedInUser,
        addresses: [],
        paymentMethods: [],
        dialog: false,
        depositAmount: null,
      };
    },
    methods: {
      addDeposit() {
        let data = {
          deposit_amount: this.depositAmount,
          phone_number: this.loggedInUser.phoneNumber,
          member_id: this.loggedInUser.member.memberId
        };

        HTTP.post(
          `memberdeposits/account/lipanampesa`,
          queryString.stringify(data)
        )
          .then(response => {
            this.$store.commit(`setSnackbar`, {
              msg: `Please wait to confirm your payment`,
              type: `success`,
              model: true
            });
          })
          .catch(error => {
            this.$store.commit(`setSnackbar`, {
              msg: `Unable to add deposits at this time`,
              type: `error`,
              model: true
            });
          });
        this.dialog = false;
      },
      fetchAddresses() {
        if (this.$can(`read`, `AddressDetails`)) {
          HTTP.get(`/addressdetails/members/${this.loggedInUser.member.memberId}`)
            .then(response => {
              this.addresses = response.data;
            })
            .catch(error => {
              this.$store.commit(`setSnackbar`, {
                msg: `Unable to load address details at this time`,
                type: `error`,
                model: true
              });
            });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to view address details`,
            type: `error`,
            model: true
          });
        }
      },
      fetchPaymentMethods() {
        if (this.$can(`read`, `PaymentMethods`)) {
          HTTP.get(`/paymentdetails/members/${this.loggedInUser.member.memberId}`)
            .then(response => {
              this.paymentMethods = response.data;
            })
            .catch(error => {
              this.$store.commit(`setSnackbar`, {
                msg: `Unable to load payment details at this time`,
                type: `error`,
                model: true
              });
            });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to view payment details`,
            type: `error`,
            model: true
          });
        }
      },
      fetchMemberData() {
        if (this.$can(`read`, `Member`)) {
          HTTP.get(`/members/${this.loggedInUser.member.memberId}`)
            .then(response => {
              this.member = response.data;
            })
            .catch(error => {
              this.$store.commit(`setSnackbar`, {
                msg: `Unable to load your details at this time`,
                type: `error`,
                model: true
              });
            });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to view member details`,
            type: `error`,
            model: true
          });
        }
      },
      logOut() {
        this.$store.commit("setLoggedInUser", {});
        this.$router.push(`/`);
      }
    },
    created() {
      this.fetchAddresses();
      this.fetchPaymentMethods();
      this.fetchMemberData();
    }
  };
</script>

