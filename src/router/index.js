import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import Registration from '@/components/Member/Registration'
import MemberList from '@/components/Member/List'
import Member from '@/components/Member/Member'
import MemberUpdate from '@/components/Member/Update'
import PaymentDetailsCapture from '@/components/PaymentDetails/PaymentDetailsCapture'
import NomineeDetailsCapture from '@/components/Nominees/NomineeDetailsCapture'
import AddressDetailsCapture from '@/components/AddressDetails/AddressDetailsCapture'
import Contributions from '@/components/Contributions/Contributions'
import AddContribution from '@/components/Contributions/AddContribution'
import MemberAccounts from '@/components/Contributions/Accounts'
import MemberLoans from '@/components/MemberLoans/List'
import LoanDetails from '@/components/MemberLoans/Loan'
import Up from '@/components/Member/UploadMemberImages'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: `/up`,
      component: Up,
    },
    {
      path: `/addaddress`,
      name: `AddAddress`,
      component: AddressDetailsCapture,
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
      name: `PaymentDetailsCapture`,
      component: PaymentDetailsCapture
    },
    {
      path: `/addnominee`,
      name: `AddNominee`,
      component: NomineeDetailsCapture
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
    },
    {
      path: `/memberaccounts`,
      name: `MemberAccounts`,
      component: MemberAccounts
    },
    {
      path: `/memberloans`,
      name: `MemberLoans`,
      component: MemberLoans
    },
    {
      path: `/memberloans/:memberLoanId`,
      name: `LoanDetails`,
      component: LoanDetails
    },
    {
      path: `/dashboard`,
      name: `Dashboard`,
      component: Dashboard
    }
  ]
})