<template>
  <v-container>
    <v-card>
      <v-card-title>All Contributions
      <v-spacer />
      <v-text-field
      v-model="search"
      append-icon="search"
      label="Search"
      single-line
      hide-details
      />
      </v-card-title>
      <v-data-table
      :loading=dataLoading
      :rows-per-page-items="[20, 30, 40]"
      :headers="headers"
      :search="search"
      item-key="memberContributionId"
      :items="contributions"
      >

      <v-progress-linear slot="progress" color="blue" indeterminate />

      <template slot="items" slot-scope="props">
        <td>{{ props.item.member.lastName }}</td>
        <td>{{ props.item.paymentMethod.paymentMethod }}</td>
        <td>{{ props.item.contributionAmount }}</td>
        <td>{{ props.item.createdAt }}</td>
        <td>
          <router-link :to='{name: `Member`, params: {
            memberId: props.item.memberContributionId}
            }'>
          <v-icon>
          list
          </v-icon>
          </router-link>

          <router-link :to='{name: `MemberUpdate`, params: {
            memberId: props.item.memberContributionId
            }}'>
          <v-icon>
          edit
          </v-icon>
          </router-link>
        </td>        
      </template>

      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import HTTP from '../../config'
import queryString from 'querystring'

export default {
  name: `Contributions`,
  data() {
    return {
      search: '',
      dataLoading: false,
      headers:[
        {
          text: `Member`,
          value: `member.lastName`,
        },
        {
          text: `Payment Method`,
          value: `paymentMethod.paymentMethod`
        },
        {
          text: `Contribution Amount`,
          value: `contributionAmount`
        },
        {
          text: `Date`,
          value: `createdAt`
        }
      ],
      contributions: []
    }
  },
  methods: {
    fetchAccountData(){
      this.dataLoading = true
      HTTP.get(`membercontributions`)
      .then(response => {
        this.contributions = response.data
        this.dataLoading = false
      })
      .catch(error => {
        console.log(error)
        this.dataLoading = false
      })
    },
  },
  created(){
    this.dataLoading = true
    this.fetchAccountData()
  }
}
</script>

