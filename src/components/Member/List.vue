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
      ></v-text-field>
    </v-card-title>
    <v-data-table
    :loading="true"
    :headers="headers"
    :search="search"
    :items="members">
    <v-progress-linear slot="progress" color="blue"/>
    <template slot="items" slot-scope="props">
        <td>{{ props.item.memberId }} </td>
        <td>{{ props.item.identificationNumber }} </td>
        <td>{{ props.item.firstName }} </td>
        <td>{{ props.item.lastName }} </td>
        <td>{{ props.item.phoneNumber }} </td>
        <td>{{ props.item.proposedMonthlyContribution }} </td>
    </template>
    </v-data-table>
    </v-card>
</v-container>
</template>
<script>
import HTTP from '../../config'

export default {
    name: "MemberList",
    data() {
        return {
            members: [],
            search: '',
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
                }
            ],
            apiErrors: []
        }
    },
    created() {
        HTTP.get('members')
        .then(response => {
            this.members = response.data
        })
        .catch(error => {
            this.apiErrors.push(error)
        })
    },
}
</script>