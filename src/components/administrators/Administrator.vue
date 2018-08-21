<template>
  <v-app v-if="loggedInState">
    <v-navigation-drawer
        persistent
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        enable-resize-watcher
        fixed
        app>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>bubble_chart</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            Administrator
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link to="/admin/dashboard">
                Dashboard
              </router-link>
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
              :key="subItem.title">

            <v-list-tile-content>
              <v-list-tile-title>
                <router-link :to='{ name: subItem.routerName }'>
                  {{ subItem.title }}
                </router-link>
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
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="danger" @click="logOut">Log Out</v-btn>
    </v-toolbar>
    <v-content>

      <router-view/>

    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; Frog Technologies</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: "Administrator",
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        loggedInState: JSON.parse(localStorage.getItem("loggedInUser")),
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
              }
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
                title: "Member Contributions",
                routerName: "Contributions"
              },
              {
                action: "add_circle",
                title: "Add Contribution",
                routerName: "AddContribution"
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
                title: "Issue Loan"
              }
            ]
          },
          {
            action: "attach_money",
            title: "Payments",
            items: [
              {
                action: "list",
                title: "All Payments"
              },
              {
                action: "assignment_turned_in",
                title: "View Payment Details"
              },
              {
                action: "add_circle",
                title: "Add Payment"
              },
              {
                action: "gesture",
                title: "Update Payment"
              },
              {
                action: "remove_circle",
                title: "Delete Payment"
              }
            ]
          },
          {
            action: "account_balance_wallet",
            title: "Payment Methods",
            items: [
              {
                action: "list",
                title: "All Methods"
              },
              {
                action: "add_circle",
                title: "Add Method"
              },
              {
                action: "gesture",
                title: "Update Method"
              },
              {
                action: "remove_circle",
                title: "Remove Method"
              }
            ]
          },
          {
            action: "assignment",
            title: "Report Generator",
            items: [
              {
                action: "account_circle",
                title: "All Members"
              },
              {
                action: "account_box",
                title: "All Accounts"
              },
              {
                action: "monetization_on",
                title: "All Loans"
              },
              {
                action: "attach_money",
                title: "All Payments"
              },
              {
                action: "create",
                title: "Custom Report"
              }
            ]
          }
        ],
        miniVariant: false,
        title: "Sacco"
      };
    },
    methods: {
      logOut() {
        localStorage.removeItem("loggedInUser");
        this.$router.push(`/`);
      }
    },
    watch: {
      loggedInState: function() {
        this.$router.push("/");
      }
    }
  };
</script>