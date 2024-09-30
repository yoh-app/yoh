import { queryField, list } from 'nexus'

export const OrganizationAggregateQuery = queryField('aggregateOrganization', {
  type: 'AggregateOrganization',
  args: {
    where: 'OrganizationWhereInput',
    orderBy: list('OrganizationOrderByWithRelationInput'),
    cursor: 'OrganizationWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.organization.aggregate({ ...args, ...select }) as any
  },
})
