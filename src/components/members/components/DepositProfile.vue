<template>
  <v-data-iterator
      :items="contributions"
      :rows-per-page-items="rowsPerPageItems"
      content-tag="v-layout"
      row
      wrap
  >
    <v-flex
        slot="item"
        slot-scope="props"
        xs12
        lg6
    >
      <v-card>
        <v-card-title><h5>Deposit ID: {{ props.item.memberDepositId }}</h5></v-card-title>
        <v-divider />
        <v-list dense>
          <v-list-tile>
            <v-list-tile-content>Payment Method:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.paymentMethod.paymentMethod }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Deposit Amount:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.depositAmount }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Deposit Amount:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ moment(props.item.createdAt).format('MMMM Do YYYY') }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="props.item.comment">
            <v-list-tile-content>Comment</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.comment }}</v-list-tile-content>
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
  import moment from "moment";
  export default {
    name: `DepositProfile`,

    data() {
      return {
        moment,
        loggedInUser: this.$store.getters.loggedInUser,
        contributions: [],
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 3
        }
      };
    },
    methods: {
      fetchDeposits() {
        // if (this.$can(`read`, `MemberDeposit`)) {
          SaccoAPI.get(`memberdeposits/members/${this.loggedInUser.member.memberId}`)
            .then(response => {
              this.contributions = response.data;
            })
            .catch(error => {
              bugsnagClient.notify(error)
              
              this.$store.commit(`setSnackbar`, {
                msg: `Unable to fetch your contributions at this time`,
                type: `error`,
                model: true
              });
            });
        // } else {
        //   this.$store.commit(`setSnackbar`, {
        //     msg: `You don't have permissions to view member contributions`,
        //     type: `error`,
        //     model: true
        //   });
        // }
      }
    },

    created() {
      this.fetchDeposits();
    }
  };
</script>
