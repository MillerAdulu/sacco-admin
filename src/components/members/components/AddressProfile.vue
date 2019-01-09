<template>
  <v-data-iterator
      :items="addresses"
      :rows-per-page-items="rowsPerPageItems"
      content-tag="v-layout"
      row
      wrap
  >
    <v-flex
        slot="item"
        slot-scope="props"
        xs12
        md6
        lg6
        xl6
    >
      <v-card>
        <v-card-title><h4>Address</h4></v-card-title>
        <v-divider />
        <v-list dense>
          <v-list-tile>
            <v-list-tile-content>County:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.county.countyName }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Constituency:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.constituency.constituencyName }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Locality:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.locality.localityName }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Street:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.street }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Building Name:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.buildingName }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Floor:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.floor }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>House Number:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.houseNumber }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Post Office:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.postOffice.postOfficeName }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Postal Address:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.postalAddress }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <Can I="update" a="AddressDetail">
              <v-btn  @click="editAddress(props.item.addressDetailId)" color="button">Edit</v-btn>
            </Can>
            <Can I="delete" a="AddressDetail">
              <v-btn  @click="deleteAddress(props.item)" :loading="btnLoading" color="error">Delete</v-btn>
            </Can>
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
    name: `AddressProfile`,
    data() {
      return {
        btnLoading: false,
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 3
        },
        addresses: []
      };
    },
    methods: {
      fetchAddresses() {
        if (this.$can(`read`, `AddressDetail`)) {
        SaccoAPI.get(`/addressdetails/members/${this.$store.getters.loggedInUser.member.memberId}`)
          .then(response => {
            this.addresses = response.data;
          })
          .catch(error => {
            bugsnagClient.notify(error)

            this.$store.commit(`setSnackbar`, {
              msg: `Unable to load address details at this time`,
              type: `error`,
              
            });
          });
        } else {
          this.$store.commit(`setSnackbar`, {
            msg: `You don't have permissions to view address details`,
            type: `error`,
            
          });
        }
      },
    },
    created() {
        this.fetchAddresses()
      }
  };

</script>
