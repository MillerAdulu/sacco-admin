import Vue from 'vue'
import Router from 'vue-router'

import store from '../store'

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
import LoanDetails from '@/components/administrators/MemberLoans/Loan'
import Addresses from '@/components/administrators/AddressDetails/Address'
import EditAddress from '@/components/administrators/AddressDetails/EditAddress'
import PaymentMethods from '@/components/administrators/PaymentMethods/PaymentMethods'

import Administrator from '@/components/administrators/Administrator'
import MemberArea from '@/components/members/MemberArea'

import DepositProfile from '@/components/members/components/DepositProfile'
import LoanProfile from '@/components/members/components/LoanProfile'

import Auth from '@/components/authentication/views/Auth'
import SignIn from '@/components/authentication/views/Signin'

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
          path: 'editaddress/:address',
          component: EditAddress,
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
          component: Addresses,
          props: true
        },
        {
          path: `paymentdetails`,
          name: `PaymentMethodsProfile`,
          component: PaymentMethods,
          props: true
        }
      ],
      
    },
    {
      path: `/`,
      component: Auth,
      children: [
        {
          path: `login`,
          component: SignIn,
        },
      ]
    },
    {
      path: `*`, redirect: `/login`
    },
    {
      path: `/`,
      redirect: `/login`
    }
  ]
})

router.beforeEach((to, from, next) => {
  
  if(to.path === `/login`) next()

  if(to.path === `/` && store.getters.loggedInUser.token) next(`/login`)
  
  if(!store.getters.loggedInUser.token) next(`/login`)
  
  next()
  
})

export default router