import { queryField, list } from 'nexus'

export const WebsiteFindFirstQuery = queryField('findFirstWebsite', {
  type: 'Website',
  args: {
    where: 'WebsiteWhereInput',
    orderBy: list('WebsiteOrderByWithRelationInput'),
    cursor: 'WebsiteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'WebsiteScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.website.findFirst({
      ...args,
      ...select,
    })
  },
})
