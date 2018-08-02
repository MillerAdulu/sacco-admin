import Vue from 'vue'
import Router from 'vue-router'

import Registration from '@/components/Member/Registration'
import MemberList from '@/components/Member/List'
import Member from '@/components/Member/Member'
import MemberUpdate from '@/components/Member/Update'
import AddPay from '@/components/PaymentDetails/AddPaymentDetail'
import AddNominee from '@/components/Nominees/AddNominee'
import AddAddress from '@/components/AddressDetails/AddAddress'
import Contributions from '@/components/Contributions/Contributions'
import AddContribution from '@/components/Contributions/AddContribution'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: `/addaddress`,
      name: `AddAddress`,
      component: AddAddress,
    },
    {
      path: `/register`,
      name: `Registration`,
      component: Registration,
    },
    {
      path: `/memberlist`,
      name: `MemberList`,
      component: MemberList
    },
    {
      path: `/member/:memberId`,
      name: `Member`,
      component: Member
    },
    {
      path: `/member/:memberId/edit`,
      name: `MemberUpdate`,
      component: MemberUpdate
    },
    {
      path: `/addpay`,
      name: `AddPay`,
      component: AddPay
    },
    {
      path: `/addnominee`,
      name: `AddNominee`,
      component: AddNominee
    },
    {
      path: `/membercontributions`,
      name: `Contributions`,
      component: Contributions
    },
    {
      path: `/addcontribution`,
      name: `AddContribution`,
      component: AddContribution
    }
  ]
})