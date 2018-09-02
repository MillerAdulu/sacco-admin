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
            <Can I="update" a="AddressDetails">
              <v-btn  @click="editAddress(props.item.addressDetailId)">Edit</v-btn>
            </Can>
            <Can I="delete" a="AddressDetails">
              <v-btn  @click="deleteAddress(props.item)" :loading="btnLoading">Delete</v-btn>
            </Can>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <base-snackbar />
  </v-data-iterator>
</template>

<script>
  import HTTP from "../../../api";
  import { mapMutations } from "vuex";
  export default {
    data() {
      return {
        btnLoading: false,
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
        if (this.$can(`delete`, `AddressDetails`)) {
          this.startLoading();

          HTTP.delete(`addressdetails/${address.addressDetailId}`)
            .then(response => {
              let snackbar = {
                msg: response
                  ? `This address has been deleted`
                  : response.statusText,
                type: `success`,
                model: true
              };
              this.$store.commit(`setSnackbar`, snackbar);
              this.addresses.pop(address);
              this.stopLoading();
            })
            .catch(error => {
              let snackbar = {
                msg: `Currently unable to delete this address`,
                type: `error`,
                model: true
              };
              this.$store.commit(`setSnackbar`, snackbar);
              this.stopLoading();
            });
        } else {
          let snackbar = {
            msg: `You don't have permissions to delete this address`,
            type: `error`,
            model: true
          };

          this.$store.commit(`setSnackbar`, snackbar);
        }
      },
      editAddress(address) {
        if (this.$can(`update`, `AddressDetails`)) {
          this.$router.push(`/admin/editaddress/${address}`);
        } else {
          let snackbar = {
            msg: `You don't have permissions to edit this address`,
            type: `error`,
            model: true
          };

          this.$store.commit(`setSnackbar`, snackbar);
        }
      },
      startLoading() {
        this.btnLoading = true;
      },
      stopLoading() {
        this.btnLoading = false;
      }
    }
  };
</script>
