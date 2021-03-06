<template>
  <v-container>
    <v-card v-if="member && member.maritalStatusInfo" color="nested">
      <v-layout row>
        <v-card-title primary-title>
          <div>
            <div
              class="display-1"
            >{{ member.lastName }}, {{ member.firstName }} {{ member.otherName }}</div>
            <div class="title">Phone Number:
              <a tel="`${member.phoneNumber}`">{{ member.phoneNumber }}</a>
            </div>
            <div>Email: {{ member.email }}</div>
            <v-divider light/>
            <div class="subheading">Member ID: {{ member.memberId }}</div>
            <div class="subheading">Gender: {{ member.gender ? `Male` : `Female` }}</div>
            <div
              class="subheading"
              v-if="member.maritalStatusInfo.maritalStatus"
            >Marital Status: {{ member.maritalStatusInfo.maritalStatus }}</div>
          </div>
        </v-card-title>
        <v-spacer/>
        <img :src="member.passportPhoto">
        <v-progress-circular indeterminate color="grey lighten-5"/>
      </v-layout>
      <v-divider light></v-divider>
      <v-card-actions class="pa-3">
        <v-tabs grow v-model="activeTab">
          <v-tab v-for="tab in tabs" :key="tabs.indexOf(tab)">{{ tab }}</v-tab>
          <v-tabs-items cycle>
            <v-tab-item>
              <Addresses :addresses="addressdetails"/>
            </v-tab-item>
            <v-tab-item>
              <PaymentMethods :paymentmethods="paymentmethods"/>
            </v-tab-item>
            <v-tab-item>
              <Deposits :deposits="deposits"/>
            </v-tab-item>
            <v-tab-item>
              <ShareDeposits :sharedeposits="sharedeposits"/>
            </v-tab-item>
            <v-tab-item>
              <MemberLoans :memberLoans="loans"/>
            </v-tab-item>
            <v-tab-item>
              <ShowNominees :nominees="nominees"/>
            </v-tab-item>
            <v-tab-item>
              <UserOperations :memberId="member.memberId"/>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-actions>
    </v-card>
    <base-snackbar/>
  </v-container>
</template>

<script>
import bugsnagClient from "@/helpers/errorreporting";
import SaccoAPI from "@/api";
import Addresses from "@/components/administrators/AddressDetails/Address";
import PaymentMethods from "@/components/administrators/PaymentMethods/PaymentMethods";
import ShowNominees from "@/components/administrators/Nominees/ShowNominees";
import Deposits from "@/components/administrators/Deposits/MemberDeposits";
import ShareDeposits from "@/components/administrators/Shares/MemberShareDeposits";
import MemberLoans from "@/components/administrators/MemberLoans/MemberLoans";
import UserOperations from "@/components/administrators/Member/UserOperations";

export default {
  data() {
    return {
      memberId: this.$route.params.memberId,
      member: {},
      addressdetails: [],
      paymentmethods: [],
      deposits: [],
      sharedeposits: [],
      loans: [],
      nominees: [],
      activeTab: null,
      tabs: [
        `Address(es)`,
        `Payment Methods`,
        `Deposits`,
        `Shares`,
        `Loans`,
        `Nominees`,
        `User Operations`
      ],
      apiErrors: []
    };
  },
  components: {
    Addresses,
    PaymentMethods,
    ShowNominees,
    Deposits,
    ShareDeposits,
    MemberLoans,
    UserOperations
  },
  methods: {
    fetchMember() {
      if (this.$can(`read`, `Member`)) {
        SaccoAPI.get(`members/${this.memberId}`)
          .then(response => {
            this.member = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error);

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to load this member at this time`,
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
    fetchAddressDetails() {
      if (this.$can(`read`, `AddressDetail`)) {
        SaccoAPI.get(`/addressdetails/members/${this.memberId}`)
          .then(response => {
            this.addressdetails = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error);

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to load this member's addresses at this time`,
              type: `error`
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view address details`,
          type: `error`
        });
      }
    },
    fetchPaymentMethods() {
      if (this.$can(`read`, `PaymentMethod`)) {
        SaccoAPI.get(`/paymentdetails/members/${this.memberId}`)
          .then(response => {
            this.paymentmethods = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error);

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to load this member's payment methods at this time`,
              type: `error`
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view payment methods`,
          type: `error`
        });
      }
    },
    fetchNominees() {
      if (this.$can(`read`, `Nominee`)) {
        SaccoAPI.get(`/nominees/members/${this.memberId}`)
          .then(response => {
            this.nominees = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error);

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to load this member's nominees at this time`,
              type: `error`
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view nominees`,
          type: `error`
        });
      }
    },
    fetchDeposits() {
      if (this.$can(`read`, `MemberDeposit`)) {
        SaccoAPI.get(`/memberdeposits/members/${this.memberId}`)
          .then(response => {
            this.deposits = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error);

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to load this member's deposits at this time`,
              type: `error`
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view member deposits`,
          type: `error`
        });
      }
    },
    fetchShares() {
      if (this.$can(`read`, `MemberShare`)) {
        SaccoAPI.get(`/membershares/members/${this.memberId}`)
          .then(response => {
            this.sharedeposits = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error);

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to load this member's shares at this time`,
              type: `error`
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view member shares`,
          type: `error`
        });
      }
    },
    fetchLoans() {
      if (this.$can(`read`, `MemberLoan`)) {
        SaccoAPI.get(`loans/member/${this.memberId}`)
          .then(response => {
            this.loans = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error);

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to load this member's loans at this time`,
              type: `error`
            });
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to view member loans`,
          type: `error`
        });
      }
    }
  },
  created() {
    this.fetchMember();
    this.fetchAddressDetails();
    this.fetchPaymentMethods();
    this.fetchNominees();
    this.fetchDeposits();
    this.fetchShares();
    this.fetchLoans();
  }
};
</script>
