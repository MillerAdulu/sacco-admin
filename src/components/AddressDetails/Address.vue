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
        lg4
        xl3
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
            <v-icon medium>edit</v-icon>
            <v-icon medium @click="deleteAddress(address.addressDetailId)">delete</v-icon>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-data-iterator>
</template>

<script>
  import HTTP from "../../../config"
  export default {
    data() {
      return {
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 3
        }
      };
    },
    props: {
      addresses: Array
    },
    methods: {
      deleteAddress(address) {
        HTTP.delete(`addressdetails/${address}`)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
</script>
