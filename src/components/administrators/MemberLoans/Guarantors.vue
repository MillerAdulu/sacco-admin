<template>
  <v-data-iterator
      :items="loanGuarantors"
      :rows-per-page-items="rowsPerPageItems"
      content-tag="v-layout"
      row
      wrap>
    <v-flex
        slot="item"
        slot-scope="props"
        xs6>
      <v-card>
        <v-card-title><h4>{{ props.item.lastName }}, {{ props.item.firstName }} {{ props.item.otherName }}</h4></v-card-title>
        <v-divider />
        <v-list dense>
          <v-list-tile>
            <v-list-tile-content>Phone Number:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.phoneNumber }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>ID/Passport Number:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.identificationNumber }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Phone Number:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.phoneNumber }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Email:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.email }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <base-snackbar />
  </v-data-iterator>
</template>

<script>
  import bugsnagClient from '@/helpers/errorreporting'
  import SaccoAPI from '@/api'

  export default {
    name: `Guarantors`,
    data() {
      return {
        loanGuarantors: [],
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 3
        },
      }
    },
    methods: {
      fetchGuarantors() {
        // if(this.$can(`read`, `LoanGuarantor`)) {
        SaccoAPI.get(`loans/loan/${ this.$route.params.memberLoanId }`)
          .then(response => {
            this.loanGuarantors = response.data
          })
          .catch(error => {
            bugsnagClient.notify(error)

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch loan guarantors at this moment`,
              type: `error`,
              model: true,
            })
          })
        // } else {

        //   this.$store.commit(`setSnackbar`, {
        //     msg: `You don't have permissions to view loan guarantors`,
        //     type: `error`,
        //     model: true,
        //   })

        // }
      }
    },
    created() {
      this.fetchGuarantors()
    }
  }
</script>
