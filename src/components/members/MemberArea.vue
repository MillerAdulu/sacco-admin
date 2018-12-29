<template>
  <v-app id="inspire">
    <v-navigation-drawer
        fixed
        v-model="drawer"
        app
    >
      <v-img v-if="loggedInUser.passportPhoto" :src="loggedInUser.passportPhoto"
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
            :to="{name: `ShareDepositProfile`}"
            append
        >
          <v-list-tile-action>
            <v-icon>monetization_on</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Share Deposits</v-list-tile-title>
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
            :to="{name: `AddressProfile`}"
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
            :to="{name: `PaymentMethodsProfile`}"
            append
        >
          <v-list-tile-action>
            <v-icon>account_balance_wallet</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Payment Methods</v-list-tile-title>
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
            color="button"
            dark
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
            color="error"
            flat
            @click="dialog = false"
          >
            Cancel
          </v-btn>

            <v-btn
                color="button darken-1"
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
    <v-footer fixed app class="secondary">
      <span class="white--text">&copy; Frog Technologies</span>
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
        loggedInUser: this.$store.getters.loggedInUser.member,
        addresses: [],
        paymentmethods: [],
        dialog: false,
        depositAmount: null,
        depositing: false,
      };
    },
    methods: {
      addDeposit() {
        let depositAmount = Number(this.depositAmount);

        if(depositAmount && Number.isInteger(depositAmount)) {

        this.depositing = true
        let data = {
          deposit_amount: this.depositAmount,
          phone_number: this.loggedInUser.phoneNumber,
          member_id: this.loggedInUser.memberId
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
        } else {
          this.$store.commit(`setSnackbar`, {
              msg: `Please enter a valid amount`,
              type: `error`,
              model: true
          });

          return
        }
      },
      finishDeposit() {
        this.dialog = false;
        this.depositing = false
      }
    },
    mixins: [
      logOutMixin,
    ],
  };
</script>

