<template>
  <v-container>
    <v-card>
      <v-card-title>
        All Members
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
        />
      </v-card-title>
      <v-data-table
          :loading="dataLoading"
          :rows-per-page-items="[20, 30, 40]"
          :headers="headers"
          :search="search"
          item-key="memberId"
          :items="members">

        <v-progress-linear slot="progress" color="blue" indeterminate />

        <template slot="items" slot-scope="props">
          <td>{{ props.item.memberId }}</td>
          <td>{{ props.item.identificationNumber }}</td>
          <td>{{ props.item.firstName }}</td>
          <td>{{ props.item.lastName }}</td>
          <td>{{ props.item.phoneNumber }}</td>
          <td>{{ props.item.proposedMonthlyDeposit }}</td>
          <td>
            <Can I="read" a="Member">
              <router-link :to='{name: `Member`, params: {
            memberId: props.item.memberId}
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
    name: "MemberList",
    data() {
      return {
        dataLoading: true,
        snack: false,
        snackColor: "",
        snackText: "",
        members: [],
        search: "",
        headers: [
          {
            text: `Member ID`,
            value: `memberId`
          },
          {
            text: `ID/Passport Number`,
            value: `identificationNumber`
          },
          {
            text: `First Name`,
            value: `firstName`
          },
          {
            text: `Last Name`,
            value: `lastName`
          },
          {
            text: `Phone Number`,
            value: `phoneNumber`
          },
          {
            text: `Monthly Deposit`,
            value: `proposedMonthlyDeposit`
          },
          {
            text: `Actions`,
            value: `name`,
            sortable: false
          }
        ],
        apiErrors: []
      };
    },
    methods: {
      fetchMembers() {
        if (this.$can(`read`, `Member`)) {
        this.startLoading();

        SaccoAPI.get(`members`)
          .then(response => {
            this.members = response.data;
            this.stopLoading();
          })
          .catch(error => {
            bugsnagClient.notify(error)

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to fetch members at this time`,
              type: `error`,
              model: true
            });

            this.stopLoading();
          });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to view members`,
            type: `error`,
            model: true
          });
        }
      },
      startLoading() {
        this.dataLoading = true;
      },
      stopLoading() {
        this.dataLoading = false;
      }
    },
    created() {
      this.fetchMembers();
    }
  };
</script>