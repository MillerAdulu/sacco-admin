<template>
  <v-container>

    <v-card>
      <v-layout row>
        <v-card-title primary-title>
          <div>
            <div class="display-1">{{ member.lastName }}, {{ member.firstName }} {{ member.otherName }}</div>
            <div class="title">Phone Number: <a tel="`${member.phoneNumber}`" >{{ member.phoneNumber }}</a></div>
            <div>Email: {{ member.email }}</div>
            <v-divider light/>
            <div class="subheading"> Member ID: {{ member.memberId }} </div>
            <div class="subheading"> Gender: {{ member.gender ? `Male` : `Female` }} </div>
            <div class="subheading" v-if="member.maritalStatus.maritalStatus"> Marital Status: {{ member.maritalStatus.maritalStatus }} </div>
          </div>
        </v-card-title>
        <v-spacer />
        <img
            :src="member.passportPhoto"
        />
      </v-layout>
      <v-divider light></v-divider>
      <v-card-actions class="pa-3">
        <v-tabs
            grow
            v-model="activeTab"
            fixed-tabs
        >
          <v-tab
              v-for="tab in tabs"
              :key="tabs.indexOf(tab)"
          > {{ tab}} </v-tab>
          <v-tabs-items>
            <v-tab-item>
              <Addresses :addresses="addressdetails" />
            </v-tab-item>
            <v-tab-item>
              <PaymentDetails :paymentdetails="paymentdetails" />
            </v-tab-item>
            <v-tab-item>
              <Contributions :contributions="contributions" />
            </v-tab-item>
            <v-tab-item>
              <MemberLoans :memberLoans="loans" />
            </v-tab-item>
            <v-tab-item>
              <ShowNominees :nominees="nominees" />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-actions>
    </v-card>

  </v-container>
</template>

<script>
  import HTTP from "../../../config";

  import Addresses from '@/components/administrators/AddressDetails/Address'
  import PaymentDetails from '@/components/administrators/PaymentDetails/PaymentDetails'
  import ShowNominees from '@/components/administrators/Nominees/ShowNominees'
  import Contributions from '@/components/administrators/Contributions/MemberContributions'
  import MemberLoans from '@/components/administrators/MemberLoans/MemberLoans'

  export default {
    data() {
      return {
        memberId: this.$route.params.memberId,
        member: {},
        addressdetails: [],
        paymentdetails: [],
        contributions: [],
        loans: [],
        nominees: [],
        activeTab: null,
        tabs: [
          `Address(es)`, `Payment Details`,
          `Contribution History`, `Loan History`,
          `Nominees`
        ],
        apiErrors: []
      };
    },
    components: {
      Addresses,
      PaymentDetails,
      ShowNominees,
      Contributions,
      MemberLoans,
    },
    methods: {
      fetchMember() {
        HTTP.get(`members/${this.memberId}`)
          .then(response => {
            this.member = response.data;
          })
          .catch(error => {
            this.apiErrors.push(error);
          });
      },
      fetchAddressDetails() {
        HTTP.get(`/addressdetails/members/${this.memberId}`)
          .then(response => {
            this.addressdetails = response.data;
          })
          .catch(error => {
            this.apiErrors.push(error);
          });
      },
      fetchPaymentDetails() {
        HTTP.get(`/paymentdetails/members/${this.memberId}`)
          .then(response => {
            this.paymentdetails = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      fetchNominees() {
        HTTP.get(`/nominees/members/${this.memberId}`)
          .then(response => {
            this.nominees = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      fetchContributions() {
        HTTP.get(`/membercontributions/members/${this.memberId}`)
          .then(response => {
            this.contributions = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      fetchLoans() {
        HTTP.get(`loans/member/${this.memberId}`)
          .then(response => {
            this.loans = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    created() {
      this.fetchMember()
      this.fetchAddressDetails()
      this.fetchPaymentDetails()
      this.fetchNominees()
      this.fetchContributions()
      this.fetchLoans()
    }
  };
</script>
