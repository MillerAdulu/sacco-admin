<template>
  <v-app v-if="loggedInState" >
    <v-navigation-drawer
        persistent
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        enable-resize-watcher
        fixed
        app
        class="secondary"
    >
      <v-list class="pt-0">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>bubble_chart</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            Administrator
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile :to="{path: 'admin/'}">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Dashboard
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group
            v-for="item in items"
            :key="item.title"
            :prepend-icon = "item.action"
            no-action>
          <v-list-tile slot="activator">

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
              v-for="subItem in item.items"
              :key="subItem.title"
              :to='{ name: subItem.routerName }'>

            <v-list-tile-content>
              <v-list-tile-title>
                {{ subItem.title }}
              </v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon> {{ subItem.action }}</v-icon>
            </v-list-tile-action>

          </v-list-tile>

        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
        app
        :clipped-left="clipped"
        color="primary"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logOut" color="button" :loading="btnLoading">Log Out</v-btn>
    </v-toolbar>
    <v-content class="secondary">

      <router-view/>

    </v-content>
    <v-footer :fixed="fixed" app class="secondary">
      <span>&copy; Frog Technologies</span>
    </v-footer>
  </v-app>
</template>

<script>
  import logOutMixin from '@/components/administrators/mixins/logout'

  export default {
    name: "Administrator",
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        loggedInState: this.$store.getters.loggedInUser,
        items: [
          {
            action: "account_circle",
            title: "Member Management",
            items: [
              {
                action: "list",
                title: "All Members",
                routerName: "MemberList"
              },
              {
                action: "add_circle",
                title: "Register Member",
                routerName: "Registration"
              },
            ]
          },
          {
            action: "account_box",
            title: "Account Management",
            items: [
              {
                action: "list",
                title: "Member Accounts",
                routerName: "MemberAccounts"
              },
              {
                action: "assignment_turned_in",
                title: "Member Deposits",
                routerName: "Deposits"
              },
              {
                action: "add_circle",
                title: "Add Deposit",
                routerName: "AddDeposit"
              }
            ]
          },
          {
            action: "account_box",
            title: "Share Account Management",
            items: [
              {
                action: "list",
                title: "Member Share Accounts",
                routerName: "MemberShareAccounts"
              },
              {
                action: "assignment_turned_in",
                title: "Member Deposits",
                routerName: "ShareDeposits"
              },
              {
                action: "add_circle",
                title: "Add Deposit",
                routerName: "AddShareDeposit"
              }
            ]
          },
          {
            action: "monetization_on",
            title: "Loan Management",
            items: [
              {
                action: "list",
                title: "All Loans",
                routerName: `MemberLoans`
              },
              {
                action: "add_circle",
                title: "Issue Loan",
                routerName: `IssueMemberLoan`
              }
            ]
          },
          // {
          //   action: "attach_money",
          //   title: "Payments",
          //   items: [
          //     {
          //       action: "list",
          //       title: "All Payments"
          //     },
          //     {
          //       action: "assignment_turned_in",
          //       title: "View Payment Details"
          //     },
          //     {
          //       action: "add_circle",
          //       title: "Add Payment"
          //     },
          //     {
          //       action: "gesture",
          //       title: "Update Payment"
          //     },
          //     {
          //       action: "remove_circle",
          //       title: "Delete Payment"
          //     }
          //   ]
          // },
          // {
          //   action: "assignment",
          //   title: "Report Generator",
          //   items: [
          //     {
          //       action: "account_circle",
          //       title: "All Members"
          //     },
          //     {
          //       action: "account_box",
          //       title: "All Accounts"
          //     },
          //     {
          //       action: "monetization_on",
          //       title: "All Loans"
          //     },
          //     {
          //       action: "attach_money",
          //       title: "All Payments"
          //     },
          //     {
          //       action: "create",
          //       title: "Custom Report"
          //     }
          //   ]
          // },
          {
            action: "settings",
            title: "Management",
            items: [
              {
                action: "assignment_turned_in",
                title: "Reports",
                routerName: `Reports`
              },
              {
                action: "list",
                title: "Payment Methods",
                routerName: `PaymentMethodsList`
              },
              {
                action: "list",
                title: "Marital Statuses",
                routerName: `MaritalStatusesList`
              },
              {
                action: "list",
                title: "Counties",
                routerName: "CountiesList"
              },
              {
                action: "list",
                title: "Consitituencies",
                routerName: "ConstituencyList"
              },
              {
                action: "list",
                title: "Localities",
                routerName: "LocalityList"
              },
              {
                action: "list",
                title: "Post Offices",
                routerName: "PostOfficeList"
              },
              
              {
                action: "list",
                title: "Member Relationships",
                routerName: "MemberRelationshipsList"
              },
              {
                action: 'list',
                title: "Repayment Statuses",
                routerName: "RepaymentStatusesList"
              },
              {
                action: 'list',
                title: "Issuing Statuses",
                routerName: "IssuingStatusesList"
              },
              {
                action: 'list',
                title: "Loan Types",
                routerName: "LoanTypesList"
              },
            ]
          },
        ],
        miniVariant: false,
        title: "Sacco",
        btnLoading: false,
      };
    },
    mixins:[
      logOutMixin,
    ],
  };
</script>