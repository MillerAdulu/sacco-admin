<template>
  <v-app>
    <div class="headline text-xs-center pa-1">
      <v-layout>
        <v-flex xs8>Your {{ bottomNav }}</v-flex>
        <v-flex xs-4>
          <v-btn @click="logOut">Log Out</v-btn>
          </v-flex>
      </v-layout>
        <v-fade-transition appear>
          <router-view />
        </v-fade-transition>
    </div>
    
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      color="filled"
      fixed      
    >
      <v-btn
        color="teal"
        flat
        value="dashboard"
        :to="{ name: `MemberDashboard`}"
      >
        <span>Profile</span>
        <v-icon>account_circle</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="contributions"
        :to="{name: `ContributionProfile`}"
      >
        <span>Contributions</span>
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
        value="addresses"
        :to="{name: `AddressProfile`, params: {addresses: addresses}}"
      >
        <span>Addresses</span>
        <v-icon>place</v-icon>
      </v-btn>
      <v-btn
        color="teal"
        flat
        value="payment details"
        :to="{name: `PaymentDetailsProfile`, params: {
          paymentdetails: paymentDetails
        }}"
      >
        <span>Payment Details</span>
        <v-icon>account_balance_wallet</v-icon>
      </v-btn>
    </v-bottom-nav>
    <base-snackbar />
  </v-app>
</template>

<script>
import HTTP from "../../api";

export default {
  name: `MemberArea`,
  data() {
    return {
      bottomNav: "Dashboard",
      member: JSON.parse(localStorage.getItem("loggedInUser")),
      addresses: [],
      paymentDetails: []
    };
  },
  methods: {
    fetchAddresses() {
      if (this.$can(`read`, `AddressDetails`)) {
        HTTP.get(`/addressdetails/members/${this.member.memberId}`)
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
    fetchPaymentDetails() {
      if (this.$can(`read`, `PaymentDetails`)) {
        HTTP.get(`/paymentdetails/members/${this.member.memberId}`)
          .then(response => {
            this.paymentDetails = response.data;
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
    logOut() {
      localStorage.removeItem("loggedInUser");
      this.$router.push(`/`);
    }
  },
  created() {
    this.fetchAddresses();
    this.fetchPaymentDetails();
  }
};
</script>

