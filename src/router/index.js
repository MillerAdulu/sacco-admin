import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/administrators/Dashboard'
import MemberDashboard from '@/components/members/components/MemberDashboard'
import Registration from '@/components/administrators/Member/Registration'
import MemberList from '@/components/administrators/Member/List'
import Member from '@/components/administrators/Member/Member'
import MemberUpdate from '@/components/administrators/Member/Update'
import PaymentMethodsCapture from '@/components/administrators/PaymentMethods/PaymentMethodsCapture'
import NomineeDetailsCapture from '@/components/administrators/Nominees/NomineeDetailsCapture'
import AddressDetailsCapture from '@/components/administrators/AddressDetails/AddressDetailsCapture'
import Deposits from '@/components/administrators/Deposits/Deposits'
import AddDeposit from '@/components/administrators/Deposits/AddDeposit'
import MemberAccounts from '@/components/administrators/Deposits/Accounts'
import MemberLoans from '@/components/administrators/MemberLoans/List'
import IssueMemberLoan from '@/components/administrators/MemberLoans/Issue'
import LoanDetails from '@/components/administrators/MemberLoans/Loan'
import AddressProfile from '@/components/members/components/AddressProfile'
import EditAddress from '@/components/administrators/AddressDetails/EditAddress'
import PaymentMethodsProfile from '@/components/members/components/PaymentMethodsProfile'
import MaritalStatusesList from '@/components/administrators/Management/MaritalStatuses'
import Administrator from '@/components/administrators/Administrator'
import MemberArea from '@/components/members/MemberArea'

import Auth from '@/components/authentication/authenticate';

import DepositProfile from '@/components/members/components/DepositProfile'
import LoanProfile from '@/components/members/components/LoanProfile'

import PaymentMethodsList from '@/components/administrators/Management/PaymentMethods'
import CountiesList from '@/components/administrators/Management/Counties'
import ConstituencyList from '@/components/administrators/Management/Constituencies'
import LocalityList from '@/components/administrators/Management/Localities'
import PostOfficeList from '@/components/administrators/Management/PostOffices'
import MemberRelationshipsList from '@/components/administrators/Management/MemberRelationships'

import Reports from '@/components/administrators/Reports/ReportGenerator'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: `/admin`,
      component: Administrator,
      children: [
        {
          path: `addaddress`,
          name: `AddAddress`,
          component: AddressDetailsCapture,
        },
        {
          path: `register`,
          name: `Registration`,
          component: Registration,
        },
        {
          path: `memberlist`,
          name: `MemberList`,
          component: MemberList,
        },
        {
          path: `member/:memberId`,
          name: `Member`,
          component: Member,
        },
        {
          path: `member/:memberId/edit`,
          name: `MemberUpdate`,
          component: MemberUpdate,
        },
        {
          path: `addpay`,
          name: `PaymentMethodsCapture`,
          component: PaymentMethodsCapture,
        },
        {
          path: `addnominee`,
          name: `AddNominee`,
          component: NomineeDetailsCapture,
        },
        {
          path: `memberdeposits`,
          name: `Deposits`,
          component: Deposits,
        },
        {
          path: `adddeposit`,
          name: `AddDeposit`,
          component: AddDeposit,
        },
        {
          path: `memberaccounts`,
          name: `MemberAccounts`,
          component: MemberAccounts,
        },
        {
          path: `memberloans`,
          name: `MemberLoans`,
          component: MemberLoans,
        },
        {
          path: `memberloans/issue`,
          name: 'IssueMemberLoan',
          component: IssueMemberLoan,
        },
        {
          path: `memberloans/:memberLoanId`,
          name: `LoanDetails`,
          component: LoanDetails,
        },
        {
          path: ``,
          name: `Dashboard`,
          component: Dashboard,
        },
        {
          path: `paymentmethods`,
          name: `PaymentMethodsList`,
          component: PaymentMethodsList
        },
        {
          path: 'editaddress/:address',
          component: EditAddress,
        },
        {
          path: `maritalstatuses`,
          name: `MaritalStatusesList`,
          component: MaritalStatusesList,
        },
        {
          path: `counties`,
          name: `CountiesList`,
          component: CountiesList,
        },
        {
          path: `constituencies`,
          name: `ConstituencyList`,
          component: ConstituencyList,
        },
        {
          path: `localities`,
          name: `LocalityList`,
          component: LocalityList,
        },
        {
          path: `postoffices`,
          name: `PostOfficeList`,
          component: PostOfficeList,
        },
        {
          path: `memberrelationships`,
          name: 'MemberRelationshipsList',
          component: MemberRelationshipsList
        },
        {
          path: `reports`,
          name: `Reports`,
          component: Reports,
        },
      ]
    },
    {
      path: `/member`,
      component: MemberArea,
      children: [
        {
          path: ``,
          name: `MemberDashboard`,
          component: MemberDashboard,
        },
        {
          path: `deposits`,
          name: `DepositProfile`,
          component: DepositProfile,
        },
        {
          path: `loans`,
          name: `LoanProfile`,
          component: LoanProfile
        },
        {
          path: `addresses`,
          name: `AddressProfile`,
          component: AddressProfile,
        },
        {
          path: `paymentdetails`,
          name: `PaymentMethodsProfile`,
          component: PaymentMethodsProfile,
        },
      ],
      
    },
    {
      path: `/auth/callback`,
      component: Auth,
      props: (route) => ({
        access_token: route.query.access_token
      })
    },
  ]
})

// router.beforeEach((to, from, next) => {
  
//   if(!localStorage.token) next(
//     window.location.href = 'http://127.0.0.1:8000/oauth/authorize?client_id=3&redirect_uri=http://localhost:8080/auth/callback&response_type=token&scope=*'
//   )
  
//   next()
  
// })

export default router