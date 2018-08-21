<template>
  <v-data-iterator
      :items="nominees"
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
        </v-list>
      </v-card>
    </v-flex>
  </v-data-iterator>
</template>

<script>
  export default {
    data() {
      return {
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 3
        }
      }
    },
    methods: {},
    props: {
      nominees: Array
    }
  }
</script>

