import { AbilityBuilder } from '@casl/ability'

const accessLevel = localStorage.getItem('loggedInUser') ? JSON.parse(
  localStorage.getItem('loggedInUser')
).accessLevel : ''

export default AbilityBuilder.define(can => {
  switch ('SUPER_ADMIN') {
    case 'MEMBER':

      can('read', 'Member')

      break

    case 'SUPER_ADMIN':

      const allPermissions = ['read', 'create', 'update', 'delete']

      can(allPermissions,'Member')
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
      can(allPermissions, 'MemberContribution')
      can(allPermissions, 'MemberContributionTotal')
      can(allPermissions, 'MemberLoan')
      can(allPermissions, 'Nominee')
      can(allPermissions, 'PaymentDetails')
      can(allPermissions, 'PaymentMethod')
      can(allPermissions, 'PostOffice')
      can(allPermissions, 'Relationship')
      can(allPermissions, 'User')

      break
    default:
      break
  }
})