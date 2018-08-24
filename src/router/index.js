import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/administrators/Dashboard'
import MemberDashboard from '@/components/members/components/MemberDashboard'
import Registration from '@/components/administrators/Member/Registration'
import MemberList from '@/components/administrators/Member/List'
import Member from '@/components/administrators/Member/Member'
import MemberUpdate from '@/components/administrators/Member/Update'
import PaymentDetailsCapture from '@/components/administrators/PaymentDetails/PaymentDetailsCapture'
import NomineeDetailsCapture from '@/components/administrators/Nominees/NomineeDetailsCapture'
import AddressDetailsCapture from '@/components/administrators/AddressDetails/AddressDetailsCapture'
import Contributions from '@/components/administrators/Contributions/Contributions'
import AddContribution from '@/components/administrators/Contributions/AddContribution'
import MemberAccounts from '@/components/administrators/Contributions/Accounts'
import MemberLoans from '@/components/administrators/MemberLoans/List'
import LoanDetails from '@/components/administrators/MemberLoans/Loan'
import Addresses from '@/components/administrators/AddressDetails/Address'
import EditAddress from '@/components/administrators/AddressDetails/EditAddress'
import PaymentDetails from '@/components/administrators/PaymentDetails/PaymentDetails'

import Administrator from '@/components/administrators/Administrator'
import MemberArea from '@/components/members/MemberArea'

import ContributionProfile from '@/components/members/components/ContributionProfile'
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
          name: `PaymentDetailsCapture`,
          component: PaymentDetailsCapture,
        },
        {
          path: `addnominee`,
          name: `AddNominee`,
          component: NomineeDetailsCapture,
        },
        {
          path: `membercontributions`,
          name: `Contributions`,
          component: Contributions,
        },
        {
          path: `addcontribution`,
          name: `AddContribution`,
          component: AddContribution,
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
          path: 'editaddress',
          component: EditAddress,
        }
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
          path: `contributions`,
          name: `ContributionProfile`,
          component: ContributionProfile,
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
          name: `PaymentDetailsProfile`,
          component: PaymentDetails,
          props: true
        }
      ],
      
    },
    {
      path: `/:path`,
      component: Auth,
      children: [
        {
          path: `/login`,
          component: SignIn,
        },
      ]
    },
    {
      path: `*`, redirect: `/login`
    }
  ]
})

router.beforeEach((to, from, next) => {
  
  if(to.path === `/login`) next()
  
  if(!JSON.parse(localStorage.getItem('loggedInUser'))) next(`/login`)
  
  next()
  
})

export default router