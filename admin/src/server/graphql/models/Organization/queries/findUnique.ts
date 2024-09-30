import { queryField, nonNull } from 'nexus'

export const OrganizationFindUniqueQuery = queryField(
  'findUniqueOrganization',
  {
    type: 'Organization',
    args: {
      where: nonNull('OrganizationWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.organization.findUnique({
        where,
        ...select,
      })
    },
  },
)
