import { queryField, list } from 'nexus'

export const OrganizationFindFirstQuery = queryField('findFirstOrganization', {
  type: 'Organization',
  args: {
    where: 'OrganizationWhereInput',
    orderBy: list('OrganizationOrderByWithRelationInput'),
    cursor: 'OrganizationWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'OrganizationScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.organization.findFirst({
      ...args,
      ...select,
    })
  },
})
