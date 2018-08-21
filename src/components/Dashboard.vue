<template>
  <v-container>
    <v-layout row>
      <v-flex xs4>
        <v-card>
          <v-card-title>
            Total Members
            <v-spacer />
            <v-btn to="memberlist">View All</v-btn>
            </v-card-title>
          <v-card-text>
            <v-chip>{{ totalMembers }}</v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card>
          <v-card-title>
            Total Member Contributions
            <v-spacer />
            <v-btn to="membercontributions">View All</v-btn>
            </v-card-title>
          <v-card-text>
            <v-chip>{{ totalContributions }} KES</v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card>
          <v-card-title>
            Total Member Loans
            <v-spacer />
            <v-btn to="memberloans">View All</v-btn>
            </v-card-title>
          <v-card-text>
            <v-chip>{{ totalMemberLoans }} KES</v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HTTP from "../config";
export default {
  name: `Dashboard`,
  data() {
    return {
      totalMembers: null,
      totalContributions: null,
      totalMemberLoans: null
    };
  },
  methods: {
    fetchMembers() {
      HTTP.get(`/dashboard/members`)
        .then(response => {
          this.totalMembers = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchContributions() {
      HTTP.get(`/dashboard/contributions`)
        .then(response => {
          this.totalContributions = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchMemberLoans() {
      HTTP.get(`/dashboard/memberloans`)
        .then(response => {
          this.totalMemberLoans = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.fetchMembers();
    this.fetchContributions();
    this.fetchMemberLoans();
  }
};
</script>

