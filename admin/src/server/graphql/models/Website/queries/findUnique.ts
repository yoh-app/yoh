import { queryField, nonNull } from 'nexus'

export const WebsiteFindUniqueQuery = queryField('findUniqueWebsite', {
  type: 'Website',
  args: {
    where: nonNull('WebsiteWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.website.findUnique({
      where,
      ...select,
    })
  },
})
