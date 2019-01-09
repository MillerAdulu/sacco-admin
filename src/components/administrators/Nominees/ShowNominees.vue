<template>
  <v-data-iterator
    :items="nominees"
    :rows-per-page-items="rowsPerPageItems"
    content-tag="v-layout"
    row
    wrap
  >
    <v-flex slot="item" slot-scope="props" xs6>
      <v-card>
        <v-card-title>
          <h4>{{ props.item.lastName }}, {{ props.item.firstName }} {{ props.item.otherName }}</h4>
        </v-card-title>
        <v-divider/>
        <v-list dense>
          <v-list-tile>
            <v-list-tile-content>Passport/ID Number:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.identificationNumber }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Relationship:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.relationship }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Phone Number:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.phoneNumber }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>Email:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.email }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <Can I="update" a="Nominee">
              <v-btn @click="update(props.item)" color="button">Update Nominee</v-btn>
            </Can>
            <Can I="delete" a="Nominee">
              <v-btn
                @click="deleteNominee(props.item)"
                :loading="btnLoading"
                color="error"
              >Delete Nominee</v-btn>
            </Can>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-data-iterator>
</template>

<script>
import bugsnagClient from "@/helpers/errorreporting";
import SaccoAPI from "@/api";
export default {
  data() {
    return {
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 3
      },
      btnLoading: false,
      dialog: false
    };
  },
  methods: {
    update(nominee) {
      if (this.$can(`update`, `Nominee`)) {
        this.$router.push({name: `EditNominee`, params: {
          nomineeId: nominee.nomineeId,
          identificationNumber: nominee.identificationNumber,
          relationship: nominee.relationship,
          firstName: nominee.firstName,
          lastName: nominee.lastName,
          otherName: nominee.otherName,
          phoneNumber: nominee.phoneNumber,
          email: nominee.email,
        }});
      } else {
        let snackbar = {
          msg: `You don't have permissions to edit nominees`,
          type: `error`,
          
        };

        this.$store.commit(`setSnackbar`, snackbar);
      }
    },
    deleteNominee(nominee) {
      if (this.$can(`delete`, `Nominee`)) {
        this.startLoading();

        SaccoAPI.delete(`nominees/${nominee.nomineeId}`)
          .then(response => {
            this.$store.commit(`setSnackbar`, {
              msg: response
                ? `This nominee has been deleted`
                : response.statusText,
              type: `success`,
              
            });
            this.nominees.pop(nominee);
            this.stopLoading();
          })
          .catch(error => {
            bugsnagClient.notify(error);

            this.$store.commit(`setSnackbar`, {
              msg: `Currently unable to delete this nominee`,
              type: `error`,
              
            });
            this.stopLoading();
          });
      } else {
        this.$store.commit(`setSnackbar`, {
          msg: `You don't have permissions to delete this nominee`,
          type: `error`,
          
        });
      }
    },
    startLoading() {
      this.btnLoading = true;
    },
    stopLoading() {
      this.btnLoading = false;
    }
  },
  props: {
    nominees: Array
  }
};
</script>

