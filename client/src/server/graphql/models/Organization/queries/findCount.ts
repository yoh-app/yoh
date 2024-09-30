import { queryField, nonNull, list } from 'nexus'

export const OrganizationFindCountQuery = queryField(
  'findManyOrganizationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'OrganizationWhereInput',
      orderBy: list('OrganizationOrderByWithRelationInput'),
      cursor: 'OrganizationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'OrganizationScalarFieldEnum',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.organization.count(args as any)
    },
  },
)
