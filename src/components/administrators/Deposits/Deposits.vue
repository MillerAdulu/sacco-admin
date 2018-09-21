<template>
  <v-container>
    <v-card>
      <v-card-title>All Deposits
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
          item-key="memberDepositId"
          :items="deposits"
      >

        <v-progress-linear slot="progress" color="blue" indeterminate />

        <template slot="items" slot-scope="props">
          <td>{{ props.item.member.lastName }}</td>
          <td>{{ props.item.paymentMethod.paymentMethod }}</td>
          <td>{{ props.item.depositAmount }}</td>
          <td>{{ props.item.createdAt }}</td>
          <td>
            <Can I="read" a="Member">
              <router-link :to='{name: `Member`, params: {
            memberId: props.item.memberDepositId}
            }'>
                <v-icon>
                  list
                </v-icon>
              </router-link>
            </Can>
            <Can I="update" a="Member">
              <router-link :to='{name: `MemberUpdate`, params: {
            memberId: props.item.memberDepositId
            }}'>
                <v-icon>
                  edit
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
  import queryString from "querystring";

  export default {
    name: `Deposits`,
    data() {
      return {
        search: "",
        dataLoading: false,
        headers: [
          {
            text: `Member`,
            value: `member.lastName`
          },
          {
            text: `Payment Method`,
            value: `paymentMethod.paymentMethod`
          },
          {
            text: `Deposit Amount`,
            value: `depositAmount`
          },
          {
            text: `Date`,
            value: `createdAt`
          }
        ],
        deposits: []
      };
    },
    methods: {
      fetchAccountData() {
        // if (this.$can(`read`, `MemberDeposit`)) {
          this.startLoading();

          SaccoAPI.get(`memberdeposits`)
            .then(response => {
              this.deposits = response.data;
              this.stopLoading();
            })
            .catch(error => {
              bugsnagClient.notify(error)
              
              this.$store.commit(`setSnackbar`, {
                msg: `Unable to fetch member deposits at this time`,
                type: `error`,
                model: true
              });

              this.stopLoading();
            });
        // } else {
        //   this.$store.commit(`setSnackbar`, {
        //     msg: `You don't have permissions to view deposits`,
        //     type: `error`,
        //     model: true
        //   });
        // }
      },
      startLoading() {
        this.dataLoading = true;
      },
      stopLoading() {
        this.dataLoading = false;
      }
    },
    created() {
      this.fetchAccountData();
    }
  };
</script>

