<template>
  <v-container>
    <v-card>
      <v-card-title>All Share Accounts
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
          item-key="member.memberId"
          :items="accounts"
      >

        <v-progress-linear slot="progress" color="blue" indeterminate />

        <template slot="items" slot-scope="props">
          <td>{{ props.item.member.lastName }}</td>
          <td>{{ props.item.member.firstName }}</td>
          <td>{{ props.item.member.otherName }}</td>
          <td>{{ props.item.depositTotal }}</td>
          <td>
            <Can I="read" a="Member">
              <router-link :to='{name: `Member`, params: {
            memberId: props.item.member.memberId}
            }'>
                <v-icon>
                  list
                </v-icon>
              </router-link>
            </Can>
          </td>
        </template>

      </v-data-table>
    </v-card>
    <base-snackbar />
  </v-container>
</template>

<script>

  import bugsnagClient from '@/helpers/errorreporting'
  import SaccoAPI from '@/api'

  export default {
    name: `ShareAccounts`,
    data() {
      return {
        search: "",
        dataLoading: false,
        headers:[
          {
            text: `Last Name`,
            value: `member.lastName`,
          },
          {
            text: `First Name`,
            value: `member.firstName`,
          },
          {
            text: `Other Name`,
            value: `member.otherName`,
          },
          {
            text: `Total Deposits`,
            value: `depositTotal`
          },
          {
            text: `Actions`,
            value: `name`
          }
        
        ],
        accounts: []
      }
    },
    methods: {
      fetchAccountData(){
        if(this.$can('read', 'MemberAccount')) {

        this.startLoading()

        SaccoAPI.get(`membershares/members/accounts/all`)
          .then(response => {

            this.accounts = response.data

            this.stopLoading()
          })
          .catch(error => {
            bugsnagClient.notify(error)

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch these accounts at the moment`,
              type: `error`,
              
            })

            this.stopLoading()
          })

        } else {

          this.$store.commit(`setSnackbar`, {
            msg: `You dont' have permission to view this section`,
            type: `error`,
            
          })

          this.stopLoading()

        }

      },
      startLoading() {
        this.dataLoading = true
      },
      stopLoading() {
        this.dataLoading = false
      }
    },
    created(){
      this.fetchAccountData()
    }
  }
</script>

