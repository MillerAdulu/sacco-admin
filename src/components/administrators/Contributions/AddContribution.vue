<template>
  <v-form>
    <v-layout row>
      <v-flex xs6 mx-2>
        <v-autocomplete
        label="Payment Method"
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
        label="Member ID"
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
        v-model="comment" />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-btn block color="success" @click="addMemberContribution">Add Member Contribution</v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import HTTP from '../../config'
import queryString from 'querystring'

export default {
  data() {
    return {
      memberId: '',
      contributionAmount: '',
      paymentMethodId: '',
      comment: '',

      members: [],
      paymentMethods: [],
    }
  },
  methods: {
    addMemberContribution() {
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
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    },
    fetchMembers() {
      HTTP.get(`members`)
      .then(response => {
        this.members = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    fetchPaymentMethods() {
      HTTP.get(`paymentmethods`)
      .then(response => {
        this.paymentMethods = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },
  },
  created() {
    this.fetchMembers()
    this.fetchPaymentMethods()
  }
}
</script>
