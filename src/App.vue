<template>
  <v-app>
    <v-navigation-drawer
            persistent
            :mini-variant="miniVariant"
            :clipped="clipped"
            v-model="drawer"
            enable-resize-watcher
            fixed
            app
    >
      <v-list-tile>
        <v-icon>bubble_chart</v-icon>
        <v-list-tile-content>
          Administrator
        </v-list-tile-content>
      </v-list-tile>
      <v-list>
        <v-list-tile>
          <v-icon>dashboard</v-icon>
          <v-list-tile-content>
            Dashboard
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
                  @click="setTab(subItem.tab)">

            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
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
    </v-toolbar>
    <v-content>

      <component :is="currentTab"></component>

    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Registration from './components/Member/Registration'
  import Address from './components/Member/Address'

  export default {
    name: 'App',
    components: {
      Registration,
      Address
    },
    data () {
      return {
        tabs: [
          Registration,
          Address
        ],
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          {
            action: 'account_circle',
            title: 'Member Management',
            items: [
              {
                action: 'list',
                title: 'All Members',
              },
              {
                action: 'add_circle',
                title: 'Register Member',
                tab: 'Registration'
              },
              {
                action: 'how_to_reg',
                title: 'View Member',
                tab: 'Address'
              },
              {
                action: 'gesture',
                title: 'Update Details'
              },
              {
                action: 'remove_circle',
                title: 'Delete Member'
              }
            ]
          },
          {
            action: 'account_box',
            title: 'Account Management',
            items: [
              {
                action: 'list',
                title: 'All Accounts'
              },
              {
                action: 'assignment_turned_in',
                title: 'View Contribution'
              },
              {
                action: 'gesture',
                title: 'Update Contribution'
              },
              {
                action: 'remove_circle',
                title: 'Delete Contribution'
              }
            ]
          },
          {
            action: 'monetization_on',
            title: 'Loan Management',
            items: [
              {
                action: 'list',
                title: 'All Loans'
              },
              {
                action: 'add_circle',
                title: 'Issue Loan'
              },
              {
                action: 'assignment_turned_in',
                title: 'View Loan Details'
              },
              {
                action: 'gesture',
                title: 'Update Loan'
              },
              {
                action: 'remove_circle',
                title: 'Delete Loan'
              }
            ]
          },
          {
            action: 'attach_money',
            title: 'Payments',
            items: [
              {
                action: 'list',
                title: 'All Payments'
              },
              {
                action: 'assignment_turned_in',
                title: 'View Payment Details'
              },
              {
                action: 'add_circle',
                title: 'Add Payment'
              },
              {
                action: 'gesture',
                title: 'Update Payment'
              },
              {
                action: 'remove_circle',
                title: 'Delete Payment'
              }
            ]
          },
          {
            action: 'account_balance_wallet',
            title: 'Payment Methods',
            items: [
              {
                action: 'list',
                title: 'All Methods'
              },
              {
                action: 'add_circle',
                title: 'Add Method'
              },
              {
                action: 'gesture',
                title: 'Update Method'
              },
              {
                action: 'remove_circle',
                title: 'Remove Method'
              }
            ]
          },
          {
            action: 'assignment',
            title: 'Report Generator',
            items: [
              {
                action: 'account_circle',
                title: 'All Members'
              },
              {
                action: 'account_box',
                title: 'All Accounts'
              },
              {
                action: 'monetization_on',
                title: 'All Loans'
              },
              {
                action: 'attach_money',
                title: 'All Payments'
              },
              {
                action: 'create',
                title: 'Custom Report'
              }
            ]
          }
        ],
        miniVariant: false,
        title: 'Sacco'
      }
    },
    methods: {
      setTab (tabName) {
        this.$store.commit('setCurrentTab', tabName)
      }
    },
    computed: {
      currentTab () {
        return this.$store.getters.currentTab
      }
    }
  }
</script>