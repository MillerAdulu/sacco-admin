import { AbilityBuilder } from '@casl/ability'

export default AbilityBuilder.define(can => {
  switch (
  localStorage.getItem('loggedInUser') ? JSON.parse(
    localStorage.getItem('loggedInUser')
  ).accessLevel : ''
  ) {
    case 'MEMBER': {

      const memberPermissions = ['read']

      can(memberPermissions, 'Member')
      can(memberPermissions, 'MemberAccount')
      can(memberPermissions, 'AddressDetails')
      can(memberPermissions, 'BusinessNature')
      can(memberPermissions, 'Business')
      can(memberPermissions, 'Constituency')
      can(memberPermissions, 'County')
      can(memberPermissions, 'Employer')
      can(memberPermissions, 'JobTitle')
      can(memberPermissions, 'LoanGuarantor')
      can(memberPermissions, 'LoanIssuingStatus')
      can(memberPermissions, 'LoanRepaymentStatus')
      can(memberPermissions, 'LoanType')
      can(memberPermissions, 'Locality')
      can(memberPermissions, 'MaritalStatus')
      can(memberPermissions, 'MemberDeposit')
      can(memberPermissions, 'MemberDepositTotal')
      can(memberPermissions, 'MemberLoan')
      can(memberPermissions, 'Nominee')
      can(memberPermissions, 'PaymentMethods')
      can(memberPermissions, 'PaymentMethod')
      can(memberPermissions, 'PostOffice')
      can(memberPermissions, 'Relationship')
      can(memberPermissions, 'User')

      break
    }
    case 'CLERK': {
      const clerkPermissions = ['read', 'create']

      can(clerkPermissions, 'Member')
      can(clerkPermissions, 'MemberAccount')
      can(clerkPermissions, 'AddressDetails')
      can(clerkPermissions, 'BusinessNature')
      can(clerkPermissions, 'Business')
      can(clerkPermissions, 'Constituency')
      can(clerkPermissions, 'County')
      can(clerkPermissions, 'Employer')
      can(clerkPermissions, 'JobTitle')
      can(clerkPermissions, 'LoanGuarantor')
      can(clerkPermissions, 'LoanIssuingStatus')
      can(clerkPermissions, 'LoanRepaymentStatus')
      can(clerkPermissions, 'LoanType')
      can(clerkPermissions, 'Locality')
      can(clerkPermissions, 'MaritalStatus')
      can(clerkPermissions, 'MemberDeposit')
      can(clerkPermissions, 'MemberDepositTotal')
      can(clerkPermissions, 'MemberLoan')
      can(clerkPermissions, 'Nominee')
      can(clerkPermissions, 'PaymentMethods')
      can(clerkPermissions, 'PaymentMethod')
      can(clerkPermissions, 'PostOffice')
      can(clerkPermissions, 'Relationship')

      break
    }
    case 'SUPER_ADMIN': {

      const allPermissions = ['read', 'create', 'update', 'delete']

      can(allPermissions, 'Member')
      can(allPermissions, 'MemberAccount')
      can(allPermissions, 'AddressDetails')
      can(allPermissions, 'BusinessNature')
      can(allPermissions, 'Business')
      can(allPermissions, 'Constituency')
      can(allPermissions, 'County')
      can(allPermissions, 'Employer')
      can(allPermissions, 'JobTitle')
      can(allPermissions, 'LoanGuarantor')
      can(allPermissions, 'LoanIssuingStatus')
      can(allPermissions, 'LoanRepaymentStatus')
      can(allPermissions, 'LoanType')
      can(allPermissions, 'Locality')
      can(allPermissions, 'MaritalStatus')
      can(allPermissions, 'MemberDeposit')
      can(allPermissions, 'MemberDepositTotal')
      can(allPermissions, 'MemberLoan')
      can(allPermissions, 'Nominee')
      can(allPermissions, 'PaymentMethods')
      can(allPermissions, 'PostOffice')
      can(allPermissions, 'Relationship')
      can(allPermissions, 'User')

      break
    }
    default: {
      break
    }
  }
})