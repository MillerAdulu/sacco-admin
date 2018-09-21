<template>
  <v-app id="inspire">
    <v-navigation-drawer
        fixed
        v-model="drawer"
        app
    >
      <v-img :src="member.passportPhoto"
             contain
      />
      <v-list dense class="pt-0">

        <v-list-tile
            :to="{name: `MemberDashboard`}"
            append
        >
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
            :to="{name: `DepositProfile`}"
            append
        >
          <v-list-tile-action>
            <v-icon>monetization_on</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Deposits</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
            :to="{name: `LoanProfile`}"
            append
        >
          <v-list-tile-action>
            <v-icon>assignment_turned_in</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Loans</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
            :to="{name: `AddressProfile`, params: {addresses: addresses}}"
            append
        >
          <v-list-tile-action>
            <v-icon>place</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Addresses</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
            :to="{name: `PaymentMethodsProfile`, params: {paymentmethods: paymentmethods}}"
            append
        >
          <v-list-tile-action>
            <v-icon>account_balance_wallet</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Payment Methods`</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="logOut">
          <v-list-tile-action>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Sacco</v-toolbar-title>
      <v-divider />
      <v-dialog
          v-model="dialog"
          width="500"
      >
        <v-btn
            slot="activator"
            color="success"
            dark
        >
          Add Deposit
        </v-btn>

        <v-card>
          <v-card-title
              class="headline grey lighten-2"
              primary-title
          >
            Privacy Policy
          </v-card-title>

          <v-card-text>
            This will allow you to add a deposit via mpesa <br>
            <v-text-field v-model="depositAmount" />
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="error"
                flat
                :loading="depositing"
                @click="addDeposit"
            >
              Deposit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-content>
      <v-layout>
        <v-container fluid grid-list-md>
          <router-view />
        </v-container>
      </v-layout>
    </v-content>
    <v-footer color="indigo" app inset>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import bugsnagClient from '@/helpers/errorreporting'
  import SaccoAPI from '@/api'
  import queryString from "querystring";
  import logOutMixin from '@/components/administrators/mixins/logout'


  export default {
    name: `MemberArea`,
    data() {
      return {
        drawer: null,
        right: null,
        bottomNav: "Dashboard",
        member: {},
        loggedInUser: this.$store.getters.loggedInUser,
        addresses: [],
        paymentmethods: [],
        dialog: false,
        depositAmount: null,
        depositing: false,
      };
    },
    methods: {
      addDeposit() {
        this.depositing = true
        let data = {
          deposit_amount: this.depositAmount,
          phone_number: this.loggedInUser.phoneNumber,
          member_id: this.loggedInUser.member.memberId
        };

        SaccoAPI.post(
          `memberdeposits/account/lipanampesa`,
          queryString.stringify(data)
        )
          .then(() => {
            this.$store.commit(`setSnackbar`, {
              msg: `Please wait to confirm your payment`,
              type: `success`,
              model: true
            });
            this.finishDeposit()
          })
          .catch(error => {
            bugsnagClient.notify(error)

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to add deposits at this time`,
              type: `error`,
              model: true
            });

            this.finishDeposit()
          });
      },
      fetchAddresses() {
        // if (this.$can(`read`, `AddressDetails`)) {
        SaccoAPI.get(`/addressdetails/members/${this.loggedInUser.member.memberId}`)
          .then(response => {
            this.addresses = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error)

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to load address details at this time`,
              type: `error`,
              model: true
            });
          });
        // } else {
        //   this.$store.commit(`setSnackbar`, {
        //     msg: `You don't have permissions to view address details`,
        //     type: `error`,
        //     model: true
        //   });
        // }
      },
      fetchPaymentMethods() {
        // if (this.$can(`read`, `PaymentMethods`)) {
        SaccoAPI.get(`/paymentdetails/members/${this.loggedInUser.member.memberId}`)
          .then(response => {
            this.paymentmethods = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error)

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to load payment details at this time`,
              type: `error`,
              model: true
            });
          });
        // } else {
        //   this.$store.commit(`setSnackbar`, {
        //     msg: `You don't have permissions to view payment details`,
        //     type: `error`,
        //     model: true
        //   });
        // }
      },
      fetchMemberData() {
        // if (this.$can(`read`, `Member`)) {
        SaccoAPI.get(`/members/${this.loggedInUser.member.memberId}`)
          .then(response => {
            this.member = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error)

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to load your details at this time`,
              type: `error`,
              model: true
            });
          });
        // } else {
        //   this.$store.commit(`setSnackbar`, {
        //     msg: `You don't have permissions to view member details`,
        //     type: `error`,
        //     model: true
        //   });
        // }
      },
      finishDeposit() {
        this.dialog = false;
        this.depositing = false
      }
    },
    mixins: [
      logOutMixin,
    ],
    created() {
      this.fetchAddresses();
      this.fetchPaymentMethods();
      this.fetchMemberData();
    }
  };
</script>

