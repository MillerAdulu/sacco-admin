<template>
  <v-container>
    <v-card>
      <v-card-title>All Accounts
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
      :items="accounts"
      >

      <v-progress-linear slot="progress" color="blue" indeterminate />

      <template slot="items" slot-scope="props">

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
  name: `Accounts`,
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
        
      ],
      accounts: []
    }
  },
  methods: {
    fetchAccountData(){},
  },
  created(){
    this.fetchAccountData()
  }
}
</script>

