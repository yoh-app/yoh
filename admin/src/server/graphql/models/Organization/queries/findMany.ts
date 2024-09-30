import { queryField, nonNull, list } from 'nexus'

export const OrganizationFindManyQuery = queryField('findManyOrganization', {
  type: nonNull(list(nonNull('Organization'))),
  args: {
    where: 'OrganizationWhereInput',
    orderBy: list('OrganizationOrderByWithRelationInput'),
    cursor: 'OrganizationWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'OrganizationScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.organization.findMany({
      ...args,
      ...select,
    })
  },
})
