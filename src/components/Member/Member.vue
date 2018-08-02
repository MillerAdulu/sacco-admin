<template>
<v-container>

<v-card>
  <v-layout row>
    <v-flex xs7>
      <v-card-title primary-title>
        <div>
          <div class="display-1">{{ member.lastName }}, {{ member.firstName }} {{ member.otherName }}</div>
          <div class="title">Phone Number: <a tel="`${member.phoneNumber}`" >{{ member.phoneNumber }}</a></div>
            <div>Email: {{ member.email }}</div>
            <v-divider light/>
            <div class="subheading"> Member ID: {{ member.memberId }} </div>
        </div>
      </v-card-title>
    </v-flex>
    <v-flex xs5 pr-1>
      <img
        src="@/assets/milleradulu.png"
      />
    </v-flex>
  </v-layout>
  <v-divider light></v-divider>
  <v-card-actions class="pa-3">
    <v-tabs
      grow
      v-model="activeTab"
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
          Loan History
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
import HTTP from "../../config";

import Addresses from '@/components/AddressDetails/Address'
import PaymentDetails from '@/components/PaymentDetails/PaymentDetails'
import ShowNominees from '@/components/Nominees/ShowNominees'
import Contributions from '@/components/Contributions/MemberContributions'

export default {
  data() {
    return {
      member: {},
      addressdetails: [],
      paymentdetails: [],
      contributions: [],
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
  },
  methods: {
    fetchMember() {
      HTTP.get(`members/${this.$route.params.memberId}`)
        .then(response => {
          this.member = response.data;
        })
        .catch(error => {
          this.apiErrors.push(error);
        });
    },
    fetchAddressDetails() {
      HTTP.get(`/addressdetails/members/${this.$route.params.memberId}`)
        .then(response => {
          this.addressdetails = response.data;
        })
        .catch(error => {
          this.apiErrors.push(error);
        });
    },
    fetchPaymentDetails() {
      HTTP.get(`/paymentdetails/members/${this.$route.params.memberId}`)
      .then(response => {
        this.paymentdetails = response.data
      })
      .catch(error => {
        console.log(error)
      }) 
    },
    fetchNominees() {
      HTTP.get(`/nominees/members/${this.$route.params.memberId}`)
      .then(response => {
        this.nominees = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    fetchContributions() {
      HTTP.get(`/membercontributions/members/${this.$route.params.memberId}`)
      .then(response => {
        this.contributions = response.data
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
  }
};
</script>
