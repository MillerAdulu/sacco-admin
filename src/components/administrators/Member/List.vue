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
        <td>{{ props.item.proposedMonthlyContribution }}</td>
        <td>
          <router-link :to='{name: `Member`, params: {
            memberId: props.item.memberId}
            }'>
          <v-icon>
          list
          </v-icon>
          </router-link>

          <!-- <router-link :to='{name: `MemberUpdate`, params: {
            memberId: props.item.memberId
            }}'>
          <v-icon>
          edit
          </v-icon>
          </router-link> -->
        </td>
    </template>
    <template slot="no-data">
      <v-alert :value="true" color="error" icon="warning">
        You don't have permissions to view this section
      </v-alert>
    </template>
    </v-data-table>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>

    </v-card>
</v-container>
</template>
<script>
import HTTP from "../../config";
import queryString from "querystring";

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
          text: `Monthly Contribution`,
          value: `proposedMonthlyContribution`
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
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    getMembers() {
      if (this.$can("read", "Member")) {
        HTTP.get("members")
          .then(response => {
            this.members = response.data;
            this.stopLoading()
          })
          .catch(error => {
            this.apiErrors.push(error);
          });
      } else {
        console.log(`You don't have permissions to view this section`)
        this.stopLoading()
      }
    },
    apiCall(memberId, dataItem) {
      return new Promise((resolved, rejected) => {
        HTTP.put(`members/${memberId}`, queryString.stringify(dataItem))
          .then(response => {
            this.dataLoading = false;
            this.apiErrors.push(response);
            resolved(true);
          })
          .catch(error => {
            this.dataLoading = false;
            this.apiErrors.push(error);
            rejected(false);
          });
      });
    },
    // deleteMember(member) {
    //   this.dataLoading = true
    //  //confirm('Are you sure you want to delete this member?')

    //   HTTP.delete(`members/${member}`)
    //   .then(response => {
    //     console.log(response)
    //     this.apiErrors.push(response)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     this.apiErrors.push(error)
    //   })

    //   this.dataLoading = false
    // },

    startLoading() {
      this.dataLoading = true
    },
    stopLoading() {
      this.dataLoading = false
    }
  },
  created() {
    this.getMembers();
  }
};
</script>